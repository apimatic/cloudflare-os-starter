import * as s from "../core/validation/index.js";
import { incentiveDetailsInternalSchema, incentiveDetailsSchema, } from "./incentive-details.js";
const incentiveInformationProperties = {
    incentiveDetails: s.optional(s.array(s.lazy(() => incentiveDetailsInternalSchema))),
    _keysMap: {
        incentiveDetails: "incentive_details",
    },
};
export const incentiveInformationInternalSchema = s.object(incentiveInformationProperties, { additionalProperties: s.json() });
export const incentiveInformationSchema = s.lazySchema(() => s.object({
    ...incentiveInformationProperties,
    incentiveDetails: s.optional(s.array(s.lazy(() => incentiveDetailsSchema)).check(s.minLength(1), s.maxLength(32767))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=incentive-information.js.map