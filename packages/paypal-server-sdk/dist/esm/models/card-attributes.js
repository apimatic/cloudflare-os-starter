import * as s from "../core/validation/index.js";
import { cardCustomerInformationInternalSchema, cardCustomerInformationSchema, } from "./card-customer-information.js";
import { cardVerificationSchema } from "./card-verification.js";
import { vaultInstructionBaseSchema } from "./vault-instruction-base.js";
const cardAttributesProperties = {
    customer: s.optional(s.lazy(() => cardCustomerInformationInternalSchema)),
    vault: s.optional(s.lazy(() => vaultInstructionBaseSchema)),
    verification: s.optional(s.lazy(() => cardVerificationSchema)),
};
export const cardAttributesInternalSchema = s.object(cardAttributesProperties, { additionalProperties: s.json() });
export const cardAttributesSchema = s.lazySchema(() => s.object({
    ...cardAttributesProperties,
    customer: s.optional(s.lazy(() => cardCustomerInformationSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=card-attributes.js.map