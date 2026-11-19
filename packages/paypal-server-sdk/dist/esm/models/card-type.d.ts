import type { EnumSchema } from "../core/validation/schema.js";
/** Type of card. i.e Credit, Debit and so on. */
export declare const CardType: {
    /** A credit card. */
    readonly Credit: "CREDIT";
    /** A debit card. */
    readonly Debit: "DEBIT";
    /** A Prepaid card. */
    readonly Prepaid: "PREPAID";
    /** A store card. */
    readonly Store: "STORE";
    /** Card type cannot be determined. */
    readonly Unknown: "UNKNOWN";
};
export type CardType = (typeof CardType)[keyof typeof CardType] | (string & {});
export declare const cardTypeSchema: EnumSchema<CardType>;
