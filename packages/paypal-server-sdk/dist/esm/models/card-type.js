import * as s from "../core/validation/index.js";
/** Type of card. i.e Credit, Debit and so on. */
export const CardType = {
    /** A credit card. */
    Credit: "CREDIT",
    /** A debit card. */
    Debit: "DEBIT",
    /** A Prepaid card. */
    Prepaid: "PREPAID",
    /** A store card. */
    Store: "STORE",
    /** Card type cannot be determined. */
    Unknown: "UNKNOWN",
};
export const cardTypeSchema = s.enumOf(CardType);
//# sourceMappingURL=card-type.js.map