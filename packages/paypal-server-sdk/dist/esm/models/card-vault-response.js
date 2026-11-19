import * as s from "../core/validation/index.js";
import { cardCustomerInformationInternalSchema, cardCustomerInformationSchema, } from "./card-customer-information.js";
import { linkDescriptionSchema } from "./link-description.js";
import { vaultStatusSchema } from "./vault-status.js";
const cardVaultResponseProperties = {
    id: s.optional(s.string()),
    status: s.optional(s.lazy(() => vaultStatusSchema)),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    customer: s.optional(s.lazy(() => cardCustomerInformationInternalSchema)),
};
export const cardVaultResponseInternalSchema = s.object(cardVaultResponseProperties, { additionalProperties: s.json() });
export const cardVaultResponseSchema = s.lazySchema(() => s.object({
    ...cardVaultResponseProperties,
    id: s.optional(s.string().check(s.minLength(1), s.maxLength(255))),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema)).check(s.minLength(1), s.maxLength(10))),
    customer: s.optional(s.lazy(() => cardCustomerInformationSchema)),
}, { additionalProperties: s.json() }));
