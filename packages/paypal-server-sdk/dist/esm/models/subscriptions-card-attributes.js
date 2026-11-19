import * as s from "../core/validation/index.js";
import { cardCustomerInternalSchema, cardCustomerSchema } from "./card-customer.js";
import { cardVerificationSubscriptionsSchema, } from "./card-verification-subscriptions.js";
import { vaultInstructionBaseSchema } from "./vault-instruction-base.js";
const subscriptionsCardAttributesProperties = {
    customer: s.optional(s.lazy(() => cardCustomerInternalSchema)),
    vault: s.optional(s.lazy(() => vaultInstructionBaseSchema)),
    verification: s.optional(s.lazy(() => cardVerificationSubscriptionsSchema)),
};
export const subscriptionsCardAttributesInternalSchema = s.object(subscriptionsCardAttributesProperties, {
    additionalProperties: s.json(),
});
export const subscriptionsCardAttributesSchema = s.lazySchema(() => s.object({
    ...subscriptionsCardAttributesProperties,
    customer: s.optional(s.lazy(() => cardCustomerSchema)),
}, { additionalProperties: s.json() }));
