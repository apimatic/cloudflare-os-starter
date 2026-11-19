import * as s from "../core/validation/index.js";
import { itemDetailsInternalSchema, itemDetailsSchema } from "./item-details.js";
const cartInformationProperties = {
    itemDetails: s.optional(s.array(s.lazy(() => itemDetailsInternalSchema))),
    taxInclusive: s.defaulted(s.boolean(), false),
    paypalInvoiceId: s.optional(s.string()),
    _keysMap: {
        itemDetails: "item_details",
        taxInclusive: "tax_inclusive",
        paypalInvoiceId: "paypal_invoice_id",
    },
};
export const cartInformationInternalSchema = s.object(cartInformationProperties, { additionalProperties: s.json() });
export const cartInformationSchema = s.lazySchema(() => s.object({
    ...cartInformationProperties,
    itemDetails: s.optional(s.array(s.lazy(() => itemDetailsSchema)).check(s.minLength(1), s.maxLength(32767))),
    paypalInvoiceId: s.optional(s.string().check(s.minLength(1), s.maxLength(127), s.pattern("^[a-zA-Z0-9_'\\-., \":;\\!?]*$"))),
}, { additionalProperties: s.json() }));
