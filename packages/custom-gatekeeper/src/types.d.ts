// PayPal, sandbox only. Exposed as one binding (suggested name: PAYPAL) to agents and Gadgets.
//
// Every method is named after the PayPal Server SDK operation it performs and takes the same flat
// request object: path, query and header fields at the top level, the JSON body under `body`, field
// names in the SDK's camelCase. Models carry the SDK's names (Order, CapturedPayment, Refund, ...).
// Only the fields a store needs are declared; responses may carry more, which you can ignore:
// other SDK fields in camelCase (`links`, `updateTime`, ...) and, under `additionalProperties`,
// fields the SDK doesn't model, keyed by PayPal's snake_case wire names. Build each request afresh
// from declared fields; never send a response object (or a spread of one) back as a request.
//
// Credentials are handled for you: never put a PayPal client id, secret or token in code. All calls
// go to the PayPal sandbox; no real money moves.
//
// Amounts are `Money` objects whose `value` is a decimal string ("19.99", never 19.99). Timestamps
// are RFC 3339 strings. Status enums are open-ended: handle values you don't recognise.
//
// Nothing here throws for a PayPal or network failure: every method resolves to a result whose
// `kind` says what happened. Check `kind` before reading `value`. A call still rejects when the
// binding itself is unusable (not attached, a method or field name that doesn't exist, a value of
// the wrong type) and `getActionResult()` rejects for an unknown `actionId`.

/** An amount of money. `value` is a decimal string with the currency's usual decimals ("10.00"). */
export interface Money {
  /** ISO 4217 code, e.g. "USD". */
  currencyCode: string;
  value: string;
}

// ---------------------------------------------------------------------------------------------
// Results
// ---------------------------------------------------------------------------------------------

/** Outcome of a read. */
export type PayPalResult<T> =
  | { kind: "ok"; httpStatus: number; value: T }
  | { kind: "error"; error: PayPalError };

/**
 * Outcome of a call that changes something at PayPal.
 *
 * Usually `"ok"` or `"error"`, like a read. It is `"pending"` when the call has been accepted but not
 * yet carried out; pass `actionId` to `getActionResult()` later for the outcome. A gadget should show
 * the payment as "processing" and check again, never repeat the call. If the call runs inside the
 * agent's executeCode, return from executeCode and check after the next turn starts.
 * `"declined"` means the user did not allow the call; nothing was sent to PayPal.
 */
export type PayPalWriteResult<T> =
  | PayPalResult<T>
  | { kind: "pending"; actionId: number; message: string }
  | { kind: "declined"; message: string };

/** Why a call failed. */
export interface PayPalError {
  /**
   * - `"api"`: PayPal answered with an error status; see `httpStatus`, `name` and `details`.
   *   `name` "NOT_CONFIGURED" (the deployment has no PayPal credentials) and
   *   "AUTHENTICATION_FAILURE" (no access token: credentials refused or PayPal's token service down)
   *   come without `httpStatus` and are for the deployment administrator, not a code bug.
   *   "UNREADABLE_RESPONSE", or an `httpStatus` of 500 or more, means a write may or may not have
   *   taken effect.
   * - `"invalid_request"`: refused before anything was sent (a malformed card number, a bad amount
   *   string, a date range over 31 days, a reused `payPalRequestId`, ...). Nothing happened at PayPal.
   * - `"network"`: PayPal could not be reached or did not answer in time. A write may or may not
   *   have taken effect: repeating it with the SAME `payPalRequestId` and the same request is safe,
   *   since PayPal returns the original result if the first attempt landed. The same holds for the
   *   unknown `"api"` outcomes above.
   */
  kind: "api" | "invalid_request" | "network";
  httpStatus?: number;
  /** PayPal's error name, e.g. "UNPROCESSABLE_ENTITY", "RESOURCE_NOT_FOUND", "INVALID_REQUEST". */
  name?: string;
  /** Human-readable summary. Safe to log; never contains card details. */
  message: string;
  /** PayPal's debug id, to quote when asking PayPal support about this call. */
  debugId?: string;
  /**
   * PayPal's specific issues. `issue` is the code to branch on, e.g. "INSTRUMENT_DECLINED",
   * "AUTHORIZATION_EXPIRED", "AUTHORIZATION_ALREADY_CAPTURED", "REFUND_AMOUNT_EXCEEDED",
   * "DUPLICATE_INVOICE_ID", "TRANSACTION_REFUSED". `field` is PayPal's snake_case path to the
   * offending value (e.g. "/purchase_units/0/amount/value"); `location` reads "body" when PayPal
   * names none.
   */
  details?: Array<{ issue: string; description?: string; field?: string; location?: string }>;
}

// ---------------------------------------------------------------------------------------------
// The session
// ---------------------------------------------------------------------------------------------

/**
 * PayPal sandbox account shared by this deployment.
 *
 * `payPalRequestId` (1 to 108 printable characters, no spaces) is required on every call that moves
 * money or saves a card. Derive it from your own record (e.g. `shop-order-${orderId}-authorize-1`),
 * never from a random value made per attempt. Within a workspace, each id names ONE request of one
 * operation:
 * - The same id with the same request returns that request's outcome without acting again, for as
 *   long as the workspace exists. A PayPal answer, success or refusal (e.g. "INSTRUMENT_DECLINED"),
 *   is final for its id: to try again differently (another card, a corrected amount) use a new id,
 *   e.g. by counting attempts (`...-authorize-2`).
 * - An attempt whose outcome is unknown or never reached PayPal (`"declined"`, a `"network"`
 *   error, an `"api"` error with `httpStatus` 500 or more or named "UNREADABLE_RESPONSE",
 *   "NOT_CONFIGURED" or "AUTHENTICATION_FAILURE") is sent again when repeated with the same id and
 *   request. An `"api"` error with `httpStatus` 429 is final for its id, like any other refusal.
 * - Once sent, an id stays bound to that request. The same id with a different request is refused
 *   (`"invalid_request"`, naming the id): a second partial refund, a retry with another card and a
 *   new payment after an expired hold each need their own id.
 * - Ids are shared by every gadget and chat in the workspace and kept for good: prefix them with
 *   your app's name and a store id that changes whenever the store's data is wiped.
 * PayPal itself also keeps each id (6 hours for orders, 45 days for payments, 3 hours for vault
 * tokens) and returns the original result for a repeat.
 *
 * `payPalMockResponse`, accepted by the calls that move money, makes the sandbox answer with a
 * chosen error instead of acting, so failure paths can be tested without real failures: e.g.
 * `'{"mock_application_codes":"INSTRUMENT_DECLINED"}'` on `authorizeOrder()`, or
 * `'{"mock_application_codes":"AUTHORIZATION_EXPIRED"}'` on `captureAuthorizedPayment()`. Use it
 * only in tests, with a payPalRequestId of its own.
 *
 * Other checks made before anything is sent: ids are letters, digits, "-" and "_"; `Money.value`
 * has at most 10 digits before the point and 3 after; card `number` is 13 to 19 digits, `expiry`
 * "YYYY-MM", `securityCode` 3 or 4 digits.
 */
export interface PayPalSandbox {
  // --- Orders ---------------------------------------------------------------------------------

  /**
   * Creates an order. For a hold on a card use `intent: "AUTHORIZE"` and exactly one purchase unit
   * whose `amount` is the order total. With `paymentSource.card` the card is charged as part of
   * creation (check `purchaseUnits[0].payments.authorizations[0]`); without it, call
   * `authorizeOrder()` next with the card. `intent: "CAPTURE"` takes the money at once and is only
   * accepted with `paymentSource.card` (there is no separate order capture here).
   */
  createOrder(request: {
    body: OrderRequest;
    payPalRequestId: string;
    payPalMockResponse?: string;
  }): Promise<PayPalWriteResult<Order>>;

  /**
   * Authorizes an order created with `intent: "AUTHORIZE"`: puts a hold on the payer's funds without
   * taking them. Pay with a new card (`paymentSource.card` with number, expiry, securityCode) or a
   * saved one (`paymentSource.card.vaultId`). The hold is
   * `value.purchaseUnits[0].payments.authorizations[0]`; its `status` is "CREATED" when funds are
   * held and "DENIED" when the card was declined (a decline can also come back as an error whose
   * issue is "INSTRUMENT_DECLINED").
   */
  authorizeOrder(request: {
    /** The order id from `createOrder()`. */
    id: string;
    body?: OrderAuthorizeRequest;
    payPalRequestId: string;
    payPalMockResponse?: string;
  }): Promise<PayPalWriteResult<OrderAuthorizeResponse>>;

  /** Reads an order. */
  getOrder(request: { id: string }): Promise<PayPalResult<Order>>;

  // --- Authorizations, captures, refunds --------------------------------------------------------

  /** Reads an authorization (a hold), including its status and expiry. */
  getAuthorizedPayment(request: { authorizationId: string }): Promise<PayPalResult<PaymentAuthorization>>;

  /**
   * Takes held funds. With no `body.amount` the full authorized amount is captured. The result's
   * `sellerReceivableBreakdown` has the gross amount, PayPal's fee and the merchant's net. Fails with
   * issue "AUTHORIZATION_EXPIRED" once the hold is past its 29-day validity, when it can no longer
   * be renewed (`reauthorizePayment()` is refused too) and the order needs a new payment. A hold past
   * its 3-day honor period is renewed before capture (see `reauthorizePayment()`).
   */
  captureAuthorizedPayment(request: {
    authorizationId: string;
    body?: CaptureRequest;
    payPalRequestId: string;
    payPalMockResponse?: string;
  }): Promise<PayPalWriteResult<CapturedPayment>>;

  /**
   * Renews a hold whose 3-day honor period has passed, within 29 days of the original
   * authorization: call it before capturing such a hold. Returns a NEW authorization: capture that
   * one, not the old id. If the renewal is refused, the original id can still be captured until its
   * `expirationTime`. After 29 days a hold cannot be renewed and a new order must be authorized.
   * Whether card holds accept a reauthorization is unverified.
   */
  reauthorizePayment(request: {
    authorizationId: string;
    body?: ReauthorizeRequest;
    payPalRequestId: string;
    payPalMockResponse?: string;
  }): Promise<PayPalWriteResult<PaymentAuthorization>>;

  /**
   * Releases a hold so no money moves. Fails once the authorization is fully captured. An
   * authorization that is already voided or expired holds nothing either.
   */
  voidPayment(request: {
    authorizationId: string;
    payPalRequestId: string;
    payPalMockResponse?: string;
  }): Promise<PayPalWriteResult<PaymentAuthorization>>;

  /** Reads a capture, including its status and fee breakdown. */
  getCapturedPayment(request: { captureId: string }): Promise<PayPalResult<CapturedPayment>>;

  /**
   * Refunds a capture: in full with no `body.amount`, in part with one. Several partial refunds of
   * one capture are allowed up to the captured amount; PayPal refuses more with issue
   * "REFUND_AMOUNT_EXCEEDED". A refund with an earlier `payPalRequestId` returns that refund instead
   * of refunding again.
   */
  refundCapturedPayment(request: {
    captureId: string;
    body?: RefundRequest;
    payPalRequestId: string;
    payPalMockResponse?: string;
  }): Promise<PayPalWriteResult<Refund>>;

  /** Reads a refund. */
  getRefund(request: { refundId: string }): Promise<PayPalResult<Refund>>;

  // --- Saved cards (vault) ------------------------------------------------------------------------

  /**
   * Saves a card for later payments and returns its payment token. Pass `customer.id` to add the
   * card to an existing PayPal customer; omit it on a shopper's first card and keep the
   * `value.customer.id` PayPal assigns, since listing saved cards needs it. Pay with a saved card by
   * putting the token id in `paymentSource.card.vaultId` on `authorizeOrder()`.
   * A card can also be saved while paying: set `paymentSource.card.attributes.vault.storeInVault`
   * to "ON_SUCCESS" on `authorizeOrder()`; the token is then at
   * `paymentSource.card.attributes.vault.id` in its result.
   */
  createPaymentToken(request: {
    body: PaymentTokenRequest;
    payPalRequestId: string;
  }): Promise<PayPalWriteResult<PaymentTokenResponse>>;

  /**
   * Lists one page of a PayPal customer's saved cards (`page` starts at 1, `pageSize` defaults to 5,
   * at most 100).
   * Set `totalRequired: true` to get `totalPages`, and read every page to see all of them.
   */
  listCustomerPaymentTokens(request: {
    /** PayPal's customer id (from a saved card's `customer.id`), not your own shopper id. */
    customerId: string;
    pageSize?: number;
    page?: number;
    totalRequired?: boolean;
  }): Promise<PayPalResult<CustomerVaultPaymentTokensResponse>>;

  /** Reads one saved card. Check `customer.id` before acting on a token a caller handed you. */
  getPaymentToken(request: { id: string }): Promise<PayPalResult<PaymentTokenResponse>>;

  /** Deletes a saved card; it can no longer be used to pay. */
  deletePaymentToken(request: { id: string }): Promise<PayPalWriteResult<null>>;

  // --- Reporting --------------------------------------------------------------------------------

  /**
   * Lists ONE PAGE of PayPal's own record of transactions between `startDate` and `endDate` (RFC 3339
   * with seconds, at most 31 days apart). `page` starts at 1 and `pageSize` defaults to 100 (at most
   * 500); read pages until `page === totalPages`, and split a longer range into windows of at most
   * 31 days. New transactions can take up to 3 hours to appear. Each record carries its
   * `transactionInfo` only. By default only records that change the balance are listed (payments,
   * captures, refunds, fees); set `balanceAffectingRecordsOnly: false` to include the rest.
   */
  searchTransactions(request: {
    startDate: string;
    endDate: string;
    transactionId?: string;
    /** "D" denied, "P" pending, "S" success, "V" reversed. */
    transactionStatus?: string;
    transactionCurrency?: string;
    balanceAffectingRecordsOnly?: boolean;
    pageSize?: number;
    page?: number;
  }): Promise<PayPalResult<SearchResponse>>;

  // --- Pending calls ------------------------------------------------------------------------------

  /** The current outcome of a call that returned `kind: "pending"`. */
  getActionResult(actionId: number): Promise<PayPalWriteResult<unknown>>;
}

// ---------------------------------------------------------------------------------------------
// Request models
// ---------------------------------------------------------------------------------------------

export type CheckoutPaymentIntent = "AUTHORIZE" | "CAPTURE";

export interface OrderRequest {
  intent: CheckoutPaymentIntent;
  /** One unit per order is the norm; at most 10. */
  purchaseUnits: PurchaseUnitRequest[];
  paymentSource?: { card?: CardRequest };
}

export interface PurchaseUnitRequest {
  amount: Money;
  /** Your own id for this unit. */
  referenceId?: string;
  description?: string;
  /** Free-form id of yours, echoed back on captures and in transaction search. */
  customId?: string;
  /** Your invoice number; PayPal refuses one used before ("DUPLICATE_INVOICE_ID"). */
  invoiceId?: string;
}

export interface OrderAuthorizeRequest {
  paymentSource?: { card?: CardRequest };
}

/**
 * A card to pay with: either full details (`number`, `expiry`, `securityCode`, optionally `name`) or
 * a saved card's token in `vaultId`, never both. Card details are passed to PayPal and nowhere else:
 * don't store, log or echo them.
 */
export interface CardRequest {
  name?: string;
  /** 13 to 19 digits, no spaces. */
  number?: string;
  /** "YYYY-MM". */
  expiry?: string;
  /** 3 or 4 digits. */
  securityCode?: string;
  /** A saved card's payment token id. */
  vaultId?: string;
  attributes?: {
    /** The PayPal customer to save the card under. */
    customer?: { id?: string };
    /** Save the card if the payment succeeds. */
    vault?: { storeInVault: "ON_SUCCESS" };
  };
}

export interface CaptureRequest {
  /** Omit to capture the full authorized amount. */
  amount?: Money;
  invoiceId?: string;
  /** true (the default) releases whatever remains of the hold after this capture. */
  finalCapture?: boolean;
}

export interface ReauthorizeRequest {
  amount?: Money;
}

export interface RefundRequest {
  /** Omit to refund everything not yet refunded. */
  amount?: Money;
  invoiceId?: string;
  customId?: string;
  noteToPayer?: string;
}

export interface PaymentTokenRequest {
  customer?: { id?: string; merchantCustomerId?: string };
  paymentSource: {
    card: { name?: string; number: string; expiry: string; securityCode?: string };
  };
}

// ---------------------------------------------------------------------------------------------
// Response models (every field is optional: PayPal omits what doesn't apply)
// ---------------------------------------------------------------------------------------------

export type OrderStatus =
  | "CREATED" | "SAVED" | "APPROVED" | "VOIDED" | "COMPLETED" | "PAYER_ACTION_REQUIRED" | (string & {});

export interface Order {
  id?: string;
  status?: OrderStatus;
  intent?: CheckoutPaymentIntent;
  purchaseUnits?: PurchaseUnit[];
  paymentSource?: { card?: CardResponse };
  createTime?: string;
}

/** Same shape as `Order`; returned by `authorizeOrder()`. */
export type OrderAuthorizeResponse = Order;

export interface PurchaseUnit {
  referenceId?: string;
  customId?: string;
  invoiceId?: string;
  amount?: Money;
  payments?: {
    authorizations?: PaymentAuthorization[];
    captures?: CapturedPayment[];
    refunds?: Refund[];
  };
}

/** A card as PayPal reports it back: never the full number. */
export interface CardResponse {
  name?: string;
  /** e.g. "VISA", "MASTERCARD", "AMEX". */
  brand?: string;
  lastDigits?: string;
  /** "YYYY-MM". */
  expiry?: string;
  attributes?: {
    vault?: {
      /** The saved card's payment token id. */
      id?: string;
      status?: "VAULTED" | "CREATED" | "APPROVED" | (string & {});
      customer?: { id?: string };
    };
  };
}

export type AuthorizationStatus =
  | "CREATED" | "CAPTURED" | "DENIED" | "PARTIALLY_CAPTURED" | "VOIDED" | "PENDING" | (string & {});

export interface PaymentAuthorization {
  id?: string;
  status?: AuthorizationStatus;
  statusDetails?: { reason?: "PENDING_REVIEW" | "DECLINED_BY_RISK_FRAUD_FILTERS" | (string & {}) };
  amount?: Money;
  invoiceId?: string;
  customId?: string;
  /** When the hold lapses. */
  expirationTime?: string;
  createTime?: string;
  updateTime?: string;
}

export type CaptureStatus =
  | "COMPLETED" | "DECLINED" | "PARTIALLY_REFUNDED" | "PENDING" | "REFUNDED" | "FAILED" | (string & {});

export interface CapturedPayment {
  id?: string;
  status?: CaptureStatus;
  statusDetails?: { reason?: string };
  amount?: Money;
  finalCapture?: boolean;
  /** What the merchant receives for this capture. */
  sellerReceivableBreakdown?: { grossAmount?: Money; paypalFee?: Money; netAmount?: Money };
  invoiceId?: string;
  customId?: string;
  createTime?: string;
}

export type RefundStatus = "CANCELLED" | "FAILED" | "PENDING" | "COMPLETED" | (string & {});

export interface Refund {
  id?: string;
  status?: RefundStatus;
  statusDetails?: { reason?: string };
  amount?: Money;
  invoiceId?: string;
  customId?: string;
  sellerPayableBreakdown?: {
    grossAmount?: Money;
    paypalFee?: Money;
    netAmount?: Money;
    /** Everything refunded on the capture so far, this refund included. */
    totalRefundedAmount?: Money;
  };
  createTime?: string;
}

export interface PaymentTokenResponse {
  /** The payment token id: pass it as `vaultId` to pay, or to `deletePaymentToken()`. */
  id?: string;
  customer?: { id?: string; merchantCustomerId?: string };
  paymentSource?: { card?: { name?: string; brand?: string; lastDigits?: string; expiry?: string } };
}

export interface CustomerVaultPaymentTokensResponse {
  /** Present when `totalRequired` was true. */
  totalItems?: number;
  totalPages?: number;
  customer?: { id?: string; merchantCustomerId?: string };
  paymentTokens?: PaymentTokenResponse[];
}

export interface SearchResponse {
  transactionDetails?: Array<{ transactionInfo?: TransactionInformation }>;
  page?: number;
  totalItems?: number;
  totalPages?: number;
  startDate?: string;
  endDate?: string;
  /** Data is complete up to this time. */
  lastRefreshedDatetime?: string;
}

export interface TransactionInformation {
  transactionId?: string;
  /** Id of a related transaction, e.g. the capture a refund belongs to. */
  paypalReferenceId?: string;
  /** PayPal's event code, e.g. "T0006" (payment), "T1107" (refund). */
  transactionEventCode?: string;
  transactionInitiationDate?: string;
  transactionUpdatedDate?: string;
  /** Negative for money leaving the merchant (refunds). */
  transactionAmount?: Money;
  feeAmount?: Money;
  /** "D" denied, "P" pending, "S" success, "V" reversed. */
  transactionStatus?: string;
  invoiceId?: string;
  /** The `customId` you set on the purchase unit. */
  customField?: string;
}
