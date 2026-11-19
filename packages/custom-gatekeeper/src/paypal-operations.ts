// The PayPal operations the session offers: for each, the SDK call it makes, the checks its request
// must pass before anything is sent, and (for writes) how it is described to the approver.
//
// Requests reach this module already shape-checked by `@validateRpc()` against `types.d.ts`; the
// checks here are the value rules that types cannot express (formats, ranges, mutual exclusion).
// The SDK encodes requests with lenient schemas, so these are the only format checks before PayPal.

import type { PayPalServerSdkClient } from "paypal-server-sdk";
import type { ActionField } from "@gadgets/workshop-shared/gatekeeper";
import { errorFromApiFailure, errorFromThrown, invalidRequest } from "./paypal-errors.js";
import type {
  CardRequest,
  Money,
  PayPalError,
  PayPalResult,
  PaymentTokenRequest,
  PayPalSandbox,
} from "./types.js";

/** Every PayPal operation name the session exposes. */
export type OperationName = Exclude<keyof PayPalSandbox, "getActionResult">;

/** The request object each operation takes. */
export type RequestOf<Op extends OperationName> = Parameters<PayPalSandbox[Op]>[0];

/** What the approver is shown for a write. Never carries card numbers or security codes. */
export type WriteSummary = { title: string; description: string; fields: ActionField[] };

/** Asks PayPal for the full resource in POST answers; the minimal default omits ids and amounts. */
const REPRESENTATION = "return=representation";

const MAX_TRANSACTION_RANGE_MS = 31 * 24 * 60 * 60 * 1000;

type SdkCall = { asApiResult(): Promise<SdkResult> };
type SdkResult =
  | { ok: true; status: number; value: unknown }
  | { ok: false; status: number; message: string; payload: unknown };

type Operation = {
  kind: "read" | "write";
  // Each operation's own request type is enforced where it is declared, below; the table is keyed
  // by name, so the shared signature here takes the request loosely.
  check(request: any): string | undefined;
  call(client: PayPalServerSdkClient, request: any): SdkCall;
  /** One line for the activity log. */
  title(request: any): string;
  summarize?(request: any): WriteSummary;
};

function op<Op extends OperationName>(definition: {
  kind: "read" | "write";
  check?(request: RequestOf<Op>): string | undefined;
  call(client: PayPalServerSdkClient, request: RequestOf<Op>): SdkCall;
  title(request: RequestOf<Op>): string;
  summarize?(request: RequestOf<Op>): WriteSummary;
}): Operation {
  return { check: () => undefined, ...definition } as Operation;
}

export const OPERATIONS: Record<OperationName, Operation> = {
  createOrder: op<"createOrder">({
    kind: "write",
    check: r => checkRequestId(r.payPalRequestId) ?? checkMock(r.payPalMockResponse) ??
      checkOrderRequest(r.body),
    call: (client, r) => client.orders.createOrder({ ...r, prefer: REPRESENTATION }),
    title: r => `Create PayPal order for ${orderTotal(r.body.purchaseUnits)}`,
    summarize: r => ({
      title: `Create PayPal order for ${orderTotal(r.body.purchaseUnits)}`,
      description: `Create a PayPal sandbox order with intent **${r.body.intent}**` +
        (r.body.paymentSource?.card ? `, paid with ${cardLabel(r.body.paymentSource.card)}.` : "."),
      fields: [
        inline("Intent", r.body.intent),
        { label: "Amounts", kind: "list", items: r.body.purchaseUnits.map(u => money(u.amount)) },
        ...cardFields(r.body.paymentSource?.card),
        inline("Request id", r.payPalRequestId),
        ...mockField(r.payPalMockResponse),
      ],
    }),
  }),

  authorizeOrder: op<"authorizeOrder">({
    kind: "write",
    check: r => checkId(r.id, "id") ?? checkRequestId(r.payPalRequestId) ??
      checkMock(r.payPalMockResponse) ??
      (r.body?.paymentSource?.card ? checkCard(r.body.paymentSource.card) : undefined),
    call: (client, r) => client.orders.authorizeOrder({ ...r, prefer: REPRESENTATION }),
    title: r => `Authorize PayPal order ${r.id}`,
    summarize: r => ({
      title: `Authorize PayPal order ${r.id}`,
      description: "Put a hold on the payer's funds for this PayPal sandbox order" +
        (r.body?.paymentSource?.card ? `, using ${cardLabel(r.body.paymentSource.card)}.` : "."),
      fields: [
        inline("Order", r.id),
        ...cardFields(r.body?.paymentSource?.card),
        inline("Request id", r.payPalRequestId),
        ...mockField(r.payPalMockResponse),
      ],
    }),
  }),

  getOrder: op<"getOrder">({
    kind: "read",
    check: r => checkId(r.id, "id"),
    call: (client, r) => client.orders.getOrder({ id: r.id }),
    title: r => `Read PayPal order ${r.id}`,
  }),

  getAuthorizedPayment: op<"getAuthorizedPayment">({
    kind: "read",
    check: r => checkId(r.authorizationId, "authorizationId"),
    call: (client, r) => client.payments.getAuthorizedPayment({ authorizationId: r.authorizationId }),
    title: r => `Read PayPal authorization ${r.authorizationId}`,
  }),

  captureAuthorizedPayment: op<"captureAuthorizedPayment">({
    kind: "write",
    check: r => checkId(r.authorizationId, "authorizationId") ??
      checkRequestId(r.payPalRequestId) ?? checkMock(r.payPalMockResponse) ??
      (r.body?.amount ? checkMoney(r.body.amount, "body.amount") : undefined),
    call: (client, r) => client.payments.captureAuthorizedPayment({ ...r, prefer: REPRESENTATION }),
    title: r => `Capture PayPal authorization ${r.authorizationId}`,
    summarize: r => ({
      title: `Capture ${r.body?.amount ? money(r.body.amount) : "the full amount"} of PayPal authorization ${r.authorizationId}`,
      description: "Take the held funds of this PayPal sandbox authorization.",
      fields: [
        inline("Authorization", r.authorizationId),
        inline("Amount", r.body?.amount ? money(r.body.amount) : "Full authorized amount"),
        ...(r.body?.finalCapture === false ? [inline("Final capture", "No")] : []),
        inline("Request id", r.payPalRequestId),
        ...mockField(r.payPalMockResponse),
      ],
    }),
  }),

  reauthorizePayment: op<"reauthorizePayment">({
    kind: "write",
    check: r => checkId(r.authorizationId, "authorizationId") ??
      checkRequestId(r.payPalRequestId) ?? checkMock(r.payPalMockResponse) ??
      (r.body?.amount ? checkMoney(r.body.amount, "body.amount") : undefined),
    call: (client, r) => client.payments.reauthorizePayment({ ...r, prefer: REPRESENTATION }),
    title: r => `Reauthorize PayPal authorization ${r.authorizationId}`,
    summarize: r => ({
      title: `Reauthorize PayPal authorization ${r.authorizationId}`,
      description: "Renew the hold of this PayPal sandbox authorization.",
      fields: [
        inline("Authorization", r.authorizationId),
        ...(r.body?.amount ? [inline("Amount", money(r.body.amount))] : []),
        inline("Request id", r.payPalRequestId),
        ...mockField(r.payPalMockResponse),
      ],
    }),
  }),

  voidPayment: op<"voidPayment">({
    kind: "write",
    check: r => checkId(r.authorizationId, "authorizationId") ??
      checkRequestId(r.payPalRequestId) ?? checkMock(r.payPalMockResponse),
    call: (client, r) => client.payments.voidPayment({ ...r, prefer: REPRESENTATION }),
    title: r => `Void PayPal authorization ${r.authorizationId}`,
    summarize: r => ({
      title: `Void PayPal authorization ${r.authorizationId}`,
      description: "Release the hold of this PayPal sandbox authorization; no money moves.",
      fields: [
        inline("Authorization", r.authorizationId),
        inline("Request id", r.payPalRequestId),
        ...mockField(r.payPalMockResponse),
      ],
    }),
  }),

  getCapturedPayment: op<"getCapturedPayment">({
    kind: "read",
    check: r => checkId(r.captureId, "captureId"),
    call: (client, r) => client.payments.getCapturedPayment({ captureId: r.captureId }),
    title: r => `Read PayPal capture ${r.captureId}`,
  }),

  refundCapturedPayment: op<"refundCapturedPayment">({
    kind: "write",
    check: r => checkId(r.captureId, "captureId") ?? checkRequestId(r.payPalRequestId) ??
      checkMock(r.payPalMockResponse) ??
      (r.body?.amount ? checkMoney(r.body.amount, "body.amount") : undefined),
    call: (client, r) => client.payments.refundCapturedPayment({ ...r, prefer: REPRESENTATION }),
    title: r => `Refund PayPal capture ${r.captureId}`,
    summarize: r => ({
      title: `Refund ${r.body?.amount ? money(r.body.amount) : "the full remainder"} of PayPal capture ${r.captureId}`,
      description: "Return money from this PayPal sandbox capture to the payer.",
      fields: [
        inline("Capture", r.captureId),
        inline("Amount", r.body?.amount ? money(r.body.amount) : "Everything not yet refunded"),
        ...(r.body?.noteToPayer ? [{ label: "Note to payer", kind: "text" as const, value: r.body.noteToPayer }] : []),
        inline("Request id", r.payPalRequestId),
        ...mockField(r.payPalMockResponse),
      ],
    }),
  }),

  getRefund: op<"getRefund">({
    kind: "read",
    check: r => checkId(r.refundId, "refundId"),
    call: (client, r) => client.payments.getRefund({ refundId: r.refundId }),
    title: r => `Read PayPal refund ${r.refundId}`,
  }),

  createPaymentToken: op<"createPaymentToken">({
    kind: "write",
    check: r => checkRequestId(r.payPalRequestId) ?? checkTokenRequest(r.body),
    call: (client, r) => client.vault.createPaymentToken(r),
    title: () => "Save a card in the PayPal vault",
    summarize: r => ({
      title: `Save ${cardLabel(r.body.paymentSource.card)} in the PayPal vault`,
      description: "Save a card in the PayPal sandbox vault so later payments can use it.",
      fields: [
        inline("Card", cardLabel(r.body.paymentSource.card)),
        ...(r.body.customer?.id ? [inline("PayPal customer", r.body.customer.id)] : []),
        inline("Request id", r.payPalRequestId),
      ],
    }),
  }),

  listCustomerPaymentTokens: op<"listCustomerPaymentTokens">({
    kind: "read",
    check: r => checkCustomerId(r.customerId) ?? checkPaging(r.page, r.pageSize, 1, 100),
    call: (client, r) => client.vault.listCustomerPaymentTokens(r),
    title: r => `List saved cards of PayPal customer ${r.customerId}`,
  }),

  getPaymentToken: op<"getPaymentToken">({
    kind: "read",
    check: r => checkId(r.id, "id"),
    call: (client, r) => client.vault.getPaymentToken({ id: r.id }),
    title: r => `Read saved card ${r.id}`,
  }),

  deletePaymentToken: op<"deletePaymentToken">({
    kind: "write",
    check: r => checkId(r.id, "id"),
    call: (client, r) => client.vault.deletePaymentToken({ id: r.id }),
    title: r => `Delete saved card ${r.id}`,
    summarize: r => ({
      title: `Delete saved card ${r.id} from the PayPal vault`,
      description: "Delete a saved card from the PayPal sandbox vault; it can no longer be used to pay.",
      fields: [inline("Payment token", r.id)],
    }),
  }),

  searchTransactions: op<"searchTransactions">({
    kind: "read",
    check: r => checkTransactionRange(r.startDate, r.endDate) ?? checkPaging(r.page, r.pageSize, 1, 500) ??
      (r.transactionId !== undefined ? checkId(r.transactionId, "transactionId") : undefined) ??
      (r.transactionStatus !== undefined && !/^[DPSV]$/.test(r.transactionStatus)
        ? 'transactionStatus must be one of "D", "P", "S" or "V".' : undefined) ??
      (r.transactionCurrency !== undefined && !/^[A-Z]{3}$/.test(r.transactionCurrency)
        ? "transactionCurrency must be a three-letter ISO 4217 code." : undefined),
    call: (client, r) => client.transactionSearch.searchTransactions({
      ...r,
      fields: "transaction_info",
      balanceAffectingRecordsOnly: r.balanceAffectingRecordsOnly === false ? "N" : "Y",
    }),
    title: r => `Search PayPal transactions from ${r.startDate} to ${r.endDate}`,
  }),
};

/** Whether `name` is one of the session's operations. */
export function isOperationName(name: string): name is OperationName {
  return Object.hasOwn(OPERATIONS, name);
}

/** The request rules `types.d.ts` cannot express; a message when `request` breaks one. */
export function checkRequest(name: OperationName, request: unknown): PayPalError | undefined {
  const message = OPERATIONS[name].check(request);
  return message === undefined ? undefined : invalidRequest(message);
}

/**
 * Calls PayPal. A PayPal error status or a transport failure becomes a `kind: "error"` result;
 * only a fault outside the SDK (a bug) throws.
 */
export async function runOperation(
  client: PayPalServerSdkClient,
  name: OperationName,
  request: unknown,
): Promise<PayPalResult<unknown>> {
  try {
    const result = await OPERATIONS[name].call(client, request).asApiResult();
    if (result.ok) return { kind: "ok", httpStatus: result.status, value: result.value ?? null };
    return { kind: "error", error: errorFromApiFailure(result.status, result.message, result.payload) };
  } catch (err) {
    const error = errorFromThrown(err);
    if (!error) throw err;
    return { kind: "error", error };
  }
}

// --- Value checks ---------------------------------------------------------------------------------

const ID = /^[A-Za-z0-9_-]{1,128}$/;

function checkId(value: string, name: string): string | undefined {
  return ID.test(value) ? undefined : `${name} must be a PayPal id (letters, digits, "-" and "_").`;
}

function checkCustomerId(value: string): string | undefined {
  return /^[A-Za-z0-9_-]{1,22}$/.test(value)
    ? undefined
    : "customerId must be PayPal's customer id (1 to 22 letters, digits, \"-\" or \"_\"), as returned in a saved card's customer.id.";
}

function checkRequestId(value: string): string | undefined {
  return /^[\x21-\x7e]{1,108}$/.test(value)
    ? undefined
    : "payPalRequestId must be 1 to 108 printable characters with no spaces.";
}

function checkMock(value: string | undefined): string | undefined {
  return value === undefined || (value.length > 0 && value.length <= 1000)
    ? undefined
    : "payPalMockResponse must be a non-empty string of at most 1000 characters.";
}

function checkMoney(value: Money, name: string): string | undefined {
  if (!/^[A-Z]{3}$/.test(value.currencyCode)) {
    return `${name}.currencyCode must be a three-letter ISO 4217 code such as "USD".`;
  }
  if (!/^\d{1,10}(\.\d{1,3})?$/.test(value.value)) {
    return `${name}.value must be a decimal string such as "19.99", not a number.`;
  }
  return undefined;
}

function checkOrderRequest(body: RequestOf<"createOrder">["body"]): string | undefined {
  if (body.intent !== "AUTHORIZE" && body.intent !== "CAPTURE") {
    return 'body.intent must be "AUTHORIZE" or "CAPTURE".';
  }
  if (body.purchaseUnits.length < 1 || body.purchaseUnits.length > 10) {
    return "body.purchaseUnits must hold 1 to 10 purchase units.";
  }
  if (body.intent === "CAPTURE" && !body.paymentSource?.card) {
    // This session has no captureOrder: such an order could never be paid.
    return 'intent "CAPTURE" needs body.paymentSource.card, which charges the card as the order is created. ' +
      'For a hold to capture later, use intent "AUTHORIZE".';
  }
  for (const [i, unit] of body.purchaseUnits.entries()) {
    const message = checkMoney(unit.amount, `body.purchaseUnits[${i}].amount`);
    if (message) return message;
  }
  return body.paymentSource?.card ? checkCard(body.paymentSource.card) : undefined;
}

function checkCard(card: CardRequest): string | undefined {
  if (card.vaultId !== undefined) {
    if (card.number !== undefined || card.securityCode !== undefined) {
      return "A card is either a saved card (vaultId) or new card details (number, expiry, securityCode), never both.";
    }
    return checkId(card.vaultId, "card.vaultId");
  }
  if (card.number === undefined) return "A card needs either vaultId or number, expiry and securityCode.";
  return checkCardDetails(card.number, card.expiry, card.securityCode);
}

function checkTokenRequest(body: PaymentTokenRequest): string | undefined {
  if (body.customer?.id !== undefined) {
    const message = checkCustomerId(body.customer.id);
    if (message) return message;
  }
  const card = body.paymentSource.card;
  return checkCardDetails(card.number, card.expiry, card.securityCode);
}

function checkCardDetails(number: string, expiry: string | undefined, securityCode: string | undefined)
    : string | undefined {
  if (!/^\d{13,19}$/.test(number)) return "card.number must be 13 to 19 digits with no spaces.";
  if (expiry === undefined || !/^\d{4}-(0[1-9]|1[0-2])$/.test(expiry)) {
    return 'card.expiry must be "YYYY-MM".';
  }
  if (securityCode !== undefined && !/^\d{3,4}$/.test(securityCode)) {
    return "card.securityCode must be 3 or 4 digits.";
  }
  return undefined;
}

function checkPaging(page: number | undefined, pageSize: number | undefined, min: number, max: number)
    : string | undefined {
  if (page !== undefined && (!Number.isInteger(page) || page < 1)) return "page must be an integer of at least 1.";
  if (pageSize !== undefined && (!Number.isInteger(pageSize) || pageSize < min || pageSize > max)) {
    return `pageSize must be an integer from ${min} to ${max}.`;
  }
  return undefined;
}

const RFC3339 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;

function checkTransactionRange(startDate: string, endDate: string): string | undefined {
  if (!RFC3339.test(startDate) || !RFC3339.test(endDate)) {
    return 'startDate and endDate must be RFC 3339 date-times with seconds, e.g. "2026-11-01T00:00:00Z".';
  }
  const start = Date.parse(startDate);
  const end = Date.parse(endDate);
  if (Number.isNaN(start) || Number.isNaN(end)) return "startDate and endDate must be valid dates.";
  if (end < start) return "endDate must not be before startDate.";
  if (end - start > MAX_TRANSACTION_RANGE_MS) {
    return "PayPal searches at most 31 days at a time: split the range into windows of 31 days or less.";
  }
  return undefined;
}

// --- Approver-facing descriptions ----------------------------------------------------------------

function inline(label: string, value: string): ActionField {
  return { label, kind: "inline", value };
}

function mockField(value: string | undefined): ActionField[] {
  return value === undefined ? [] : [inline("Sandbox mock response", value)];
}

function money(value: Money): string {
  return `${value.value} ${value.currencyCode}`;
}

function orderTotal(units: Array<{ amount: Money }>): string {
  return units.map(u => money(u.amount)).join(" + ");
}

/** A card as the approver may see it: the last four digits or the saved card's token, nothing more. */
export function cardLabel(card: { number?: string; vaultId?: string }): string {
  if (card.vaultId) return `saved card ${card.vaultId}`;
  if (card.number) return `card ending ${card.number.slice(-4)}`;
  return "a card";
}

function cardFields(card: CardRequest | undefined): ActionField[] {
  if (!card) return [];
  const fields: ActionField[] = [inline("Card", cardLabel(card))];
  if (card.attributes?.vault?.storeInVault) fields.push(inline("Save card", "If the payment succeeds"));
  if (card.attributes?.customer?.id) fields.push(inline("PayPal customer", card.attributes.customer.id));
  return fields;
}

/**
 * A request's identity for idempotency: its JSON with keys sorted and card details reduced to the
 * last four digits (the stored fingerprint must not hold a card number or security code).
 */
export function fingerprintOf(request: unknown): string {
  return JSON.stringify(request, (key, value: unknown) => {
    if (key === "number" && typeof value === "string") return `…${value.slice(-4)}`;
    if (key === "securityCode") return undefined;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return Object.fromEntries(Object.entries(value).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)));
    }
    return value;
  });
}
