import * as s from "../core/validation/index.js";
/** The type of the billing cycle. */
export const TenureType1 = {
    /** A regular billing cycle. */
    Regular: "REGULAR",
    /** A trial billing cycle. */
    Trial: "TRIAL",
};
export const tenureType1Schema = s.enumOf(TenureType1);
