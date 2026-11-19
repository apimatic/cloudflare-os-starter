import type { EnumSchema } from "../core/validation/schema.js";
/** The condition that is covered for the transaction. */
export declare const DisputeCategory: {
    /** The payer paid for an item that they did not receive. */
    readonly ItemNotReceived: "ITEM_NOT_RECEIVED";
    /** The payer did not authorize the payment. */
    readonly UnauthorizedTransaction: "UNAUTHORIZED_TRANSACTION";
};
export type DisputeCategory = (typeof DisputeCategory)[keyof typeof DisputeCategory] | (string & {});
export declare const disputeCategorySchema: EnumSchema<DisputeCategory>;
