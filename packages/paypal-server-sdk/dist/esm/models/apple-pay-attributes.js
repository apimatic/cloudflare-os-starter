import * as s from "../core/validation/index.js";
import { customerInformationInternalSchema, customerInformationSchema, } from "./customer-information.js";
import { vaultInstructionSchema } from "./vault-instruction.js";
const applePayAttributesProperties = {
    customer: s.optional(s.lazy(() => customerInformationInternalSchema)),
    vault: s.optional(s.lazy(() => vaultInstructionSchema)),
};
export const applePayAttributesInternalSchema = s.object(applePayAttributesProperties, { additionalProperties: s.json() });
export const applePayAttributesSchema = s.lazySchema(() => s.object({
    ...applePayAttributesProperties,
    customer: s.optional(s.lazy(() => customerInformationSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=apple-pay-attributes.js.map