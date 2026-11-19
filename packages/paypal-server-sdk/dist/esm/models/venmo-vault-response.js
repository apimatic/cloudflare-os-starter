import * as s from "../core/validation/index.js";
import { customerInformationInternalSchema, customerInformationSchema, } from "./customer-information.js";
import { linkDescriptionSchema } from "./link-description.js";
import { venmoVaultResponseStatusSchema, } from "./venmo-vault-response-status.js";
const venmoVaultResponseProperties = {
    id: s.optional(s.string()),
    status: s.optional(s.lazy(() => venmoVaultResponseStatusSchema)),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    customer: s.optional(s.lazy(() => customerInformationInternalSchema)),
};
export const venmoVaultResponseInternalSchema = s.object(venmoVaultResponseProperties, { additionalProperties: s.json() });
export const venmoVaultResponseSchema = s.lazySchema(() => s.object({
    ...venmoVaultResponseProperties,
    id: s.optional(s.string().check(s.minLength(1), s.maxLength(255))),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema)).check(s.minLength(1), s.maxLength(10))),
    customer: s.optional(s.lazy(() => customerInformationSchema)),
}, { additionalProperties: s.json() }));
