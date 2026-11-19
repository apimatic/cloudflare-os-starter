import type { EnumSchema } from "../core/validation/schema.js";
/** The PayPal reference ID type. */
export declare const PayPalReferenceIdType: {
    /** An order ID. */
    readonly Odr: "ODR";
    /** A transaction ID. */
    readonly Txn: "TXN";
    /** A subscription ID. */
    readonly Sub: "SUB";
    /** A pre-approved payment ID. */
    readonly Pap: "PAP";
};
export type PayPalReferenceIdType = (typeof PayPalReferenceIdType)[keyof typeof PayPalReferenceIdType] | (string & {});
export declare const payPalReferenceIdTypeSchema: EnumSchema<PayPalReferenceIdType>;
