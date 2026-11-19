import * as s from "../core/validation/index.js";
import { cardResponseWithBillingAddressInternalSchema, cardResponseWithBillingAddressSchema, } from "./card-response-with-billing-address.js";
const subscriptionPaymentSourceResponseProperties = {
    card: s.optional(s.lazy(() => cardResponseWithBillingAddressInternalSchema)),
};
export const subscriptionPaymentSourceResponseInternalSchema = s.object(subscriptionPaymentSourceResponseProperties, {
    additionalProperties: s.json(),
});
export const subscriptionPaymentSourceResponseSchema = s.lazySchema(() => s.object({
    ...subscriptionPaymentSourceResponseProperties,
    card: s.optional(s.lazy(() => cardResponseWithBillingAddressSchema)),
}, { additionalProperties: s.json() }));
