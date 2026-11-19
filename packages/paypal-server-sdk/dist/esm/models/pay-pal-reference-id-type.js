import * as s from "../core/validation/index.js";
/** The PayPal reference ID type. */
export const PayPalReferenceIdType = {
    /** An order ID. */
    Odr: "ODR",
    /** A transaction ID. */
    Txn: "TXN",
    /** A subscription ID. */
    Sub: "SUB",
    /** A pre-approved payment ID. */
    Pap: "PAP",
};
export const payPalReferenceIdTypeSchema = s.enumOf(PayPalReferenceIdType);
