import * as s from "../core/validation/index.js";
import { applePayCardInternalSchema, applePayCardSchema } from "./apple-pay-card.js";
const applePayPaymentTokenProperties = {
    card: s.optional(s.lazy(() => applePayCardInternalSchema)),
};
export const applePayPaymentTokenInternalSchema = s.object(applePayPaymentTokenProperties, { additionalProperties: s.json() });
export const applePayPaymentTokenSchema = s.lazySchema(() => s.object({
    ...applePayPaymentTokenProperties,
    card: s.optional(s.lazy(() => applePayCardSchema)),
}, { additionalProperties: s.json() }));
