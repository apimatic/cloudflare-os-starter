import * as s from "../core/validation/index.js";
/** The phone type. */
export const PhoneTypeSubscriptions = {
    Fax: "FAX",
    Home: "HOME",
    Mobile: "MOBILE",
    Other: "OTHER",
    Pager: "PAGER",
};
export const phoneTypeSubscriptionsSchema = s.enumOf(PhoneTypeSubscriptions);
