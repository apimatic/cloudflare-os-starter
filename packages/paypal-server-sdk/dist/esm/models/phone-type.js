import * as s from "../core/validation/index.js";
/** The phone type. */
export const PhoneType = {
    /** Fax number. */
    Fax: "FAX",
    /** Home phone number. */
    Home: "HOME",
    /** Mobile phone number. */
    Mobile: "MOBILE",
    /** Other phone number. */
    Other: "OTHER",
    /** Pager number. */
    Pager: "PAGER",
};
export const phoneTypeSchema = s.enumOf(PhoneType);
