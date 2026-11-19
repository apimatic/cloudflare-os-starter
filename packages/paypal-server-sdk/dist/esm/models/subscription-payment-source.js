import * as s from "../core/validation/index.js";
import { subscriptionCardRequestInternalSchema, subscriptionCardRequestSchema, } from "./subscription-card-request.js";
const subscriptionPaymentSourceProperties = {
    card: s.optional(s.lazy(() => subscriptionCardRequestInternalSchema)),
};
export const subscriptionPaymentSourceInternalSchema = s.object(subscriptionPaymentSourceProperties, {
    additionalProperties: s.json(),
});
export const subscriptionPaymentSourceSchema = s.lazySchema(() => s.object({
    ...subscriptionPaymentSourceProperties,
    card: s.optional(s.lazy(() => subscriptionCardRequestSchema)),
}, { additionalProperties: s.json() }));
