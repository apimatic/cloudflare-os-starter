import * as s from "../core/validation/index.js";
/** The pricing model for the billing cycle. */
export const PricingModel = {
    /** A fixed pricing scheme where the customer is charged a fixed amount. */
    Fixed: "FIXED",
    /** A variable pricing scheme where the customer is charged a variable amount. */
    Variable: "VARIABLE",
    /** A auto-reload pricing scheme where the customer is charged a fixed amount for reload. */
    AutoReload: "AUTO_RELOAD",
};
export const pricingModelSchema = s.enumOf(PricingModel);
