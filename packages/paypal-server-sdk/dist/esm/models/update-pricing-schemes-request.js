import * as s from "../core/validation/index.js";
import { updatePricingSchemeInternalSchema, updatePricingSchemeSchema, } from "./update-pricing-scheme.js";
const updatePricingSchemesRequestProperties = {
    pricingSchemes: s.array(s.lazy(() => updatePricingSchemeInternalSchema)),
    _keysMap: {
        pricingSchemes: "pricing_schemes",
    },
};
export const updatePricingSchemesRequestInternalSchema = s.object(updatePricingSchemesRequestProperties, {
    additionalProperties: s.json(),
});
export const updatePricingSchemesRequestSchema = s.lazySchema(() => s.object({
    ...updatePricingSchemesRequestProperties,
    pricingSchemes: s.array(s.lazy(() => updatePricingSchemeSchema)).check(s.minLength(1), s.maxLength(99)),
}, { additionalProperties: s.json() }));
