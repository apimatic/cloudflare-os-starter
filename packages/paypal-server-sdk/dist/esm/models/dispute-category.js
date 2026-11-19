import * as s from "../core/validation/index.js";
/** The condition that is covered for the transaction. */
export const DisputeCategory = {
    /** The payer paid for an item that they did not receive. */
    ItemNotReceived: "ITEM_NOT_RECEIVED",
    /** The payer did not authorize the payment. */
    UnauthorizedTransaction: "UNAUTHORIZED_TRANSACTION",
};
export const disputeCategorySchema = s.enumOf(DisputeCategory);
