// Turns the PayPal SDK's failures into the session's `PayPalError`.
//
// PayPal error bodies can quote a rejected field's value back (`details[].value`), which for a card
// is the card number, so only the codes, names and descriptions cross into a result; the SDK's own
// encode messages are replaced for the same reason.

import type { PayPalError } from "./types.js";

type ErrorDetail = NonNullable<PayPalError["details"]>[number];

const MAX_TEXT = 500;

/** `PayPalError.name` when PayPal answered but its answer could not be decoded. */
export const UNREADABLE_RESPONSE = "UNREADABLE_RESPONSE";

/** A PayPal error status, from the failure branch of an SDK `ApiResult`. */
export function errorFromApiFailure(status: number, _message: string, payload: unknown): PayPalError {
  const body = errorBody(payload);
  const error: PayPalError = {
    kind: "api",
    httpStatus: status,
    // Not the SDK's own `message` as a fallback: it names the method and URL, which belong in no UI.
    message: text(body?.message) ?? text(body?.error_description) ?? `PayPal answered with HTTP ${status}.`,
  };
  const name = text(body?.name) ?? text(body?.error);
  if (name) error.name = name;
  const debugId = text(body?.debugId) ?? text(body?.debug_id);
  if (debugId) error.debugId = debugId;
  const details = errorDetails(body?.details);
  if (details.length > 0) error.details = details;
  return error;
}

/**
 * Anything the SDK threw instead of answering with an error status. Returns undefined for errors
 * outside the SDK's family (a bug), which the caller lets propagate.
 */
export function errorFromThrown(err: unknown): PayPalError | undefined {
  const kind = typeof err === "object" && err !== null ? (err as { kind?: unknown }).kind : undefined;
  switch (kind) {
    case "connection":
      return { kind: "network", message: "PayPal could not be reached." };
    case "timeout":
      return { kind: "network", message: "PayPal did not answer in time." };
    case "auth":
      return {
        kind: "api",
        name: "AUTHENTICATION_FAILURE",
        message: "PayPal did not issue an access token: either its token service is unavailable (retry later) " +
          "or it refused this deployment's sandbox credentials (ask the deployment administrator to check them).",
      };
    case "encode":
      return {
        kind: "invalid_request",
        message: "The request does not match the shape PayPal expects; nothing was sent.",
      };
    case "decode": {
      const status = (err as { status?: unknown }).status;
      return {
        kind: "api",
        ...(typeof status === "number" ? { httpStatus: status } : {}),
        name: UNREADABLE_RESPONSE,
        message: "PayPal's answer could not be read, so a write may or may not have taken effect.",
      };
    }
    case "pagination":
      return { kind: "api", message: "PayPal returned a page link that could not be followed." };
    default:
      return undefined;
  }
}

/** A request refused before anything was sent. */
export function invalidRequest(message: string): PayPalError {
  return { kind: "invalid_request", message };
}

type ErrorBody = Record<string, unknown>;

function errorBody(payload: unknown): ErrorBody | undefined {
  if (typeof payload !== "object" || payload === null) return undefined;
  const p = payload as { kind?: unknown; body?: unknown; rawBody?: unknown };
  if (p.kind === "undeclared") {
    if (!(p.rawBody instanceof ArrayBuffer)) return undefined;
    try {
      const parsed: unknown = JSON.parse(new TextDecoder().decode(p.rawBody));
      return typeof parsed === "object" && parsed !== null ? parsed as ErrorBody : undefined;
    } catch {
      return undefined;
    }
  }
  return typeof p.body === "object" && p.body !== null ? p.body as ErrorBody : undefined;
}

function errorDetails(value: unknown): ErrorDetail[] {
  if (!Array.isArray(value)) return [];
  const details: ErrorDetail[] = [];
  for (const item of value.slice(0, 20)) {
    if (typeof item !== "object" || item === null) continue;
    const d = item as Record<string, unknown>;
    const issue = text(d.issue);
    if (!issue) continue;
    const detail: ErrorDetail = { issue };
    const description = text(d.description);
    if (description) detail.description = description;
    const field = text(d.field);
    if (field) detail.field = field;
    const location = text(d.location);
    if (location) detail.location = location;
    details.push(detail);
  }
  return details;
}

function text(value: unknown): string | undefined {
  if (typeof value !== "string" || value.length === 0) return undefined;
  return value.length > MAX_TEXT ? `${value.slice(0, MAX_TEXT)}…` : value;
}
