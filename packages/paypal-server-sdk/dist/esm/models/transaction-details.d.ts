import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type AuctionInformation } from "./auction-information.js";
import { type CartInformation } from "./cart-information.js";
import { type IncentiveInformation } from "./incentive-information.js";
import { type PayerInformation } from "./payer-information.js";
import { type ShippingInformation } from "./shipping-information.js";
import { type StoreInformation } from "./store-information.js";
import { type TransactionInformation } from "./transaction-information.js";
/** The transaction details. */
export type TransactionDetails = {
    /** The transaction information. */
    transactionInfo?: TransactionInformation;
    /** The payer information. */
    payerInfo?: PayerInformation;
    /** The shipping information. */
    shippingInfo?: ShippingInformation;
    /** The cart information. */
    cartInfo?: CartInformation;
    /** The store information. */
    storeInfo?: StoreInformation;
    /** The auction information. */
    auctionInfo?: AuctionInformation;
    /** The incentive details. */
    incentiveInfo?: IncentiveInformation;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const transactionDetailsInternalSchema: Schema<TransactionDetails>;
export declare const transactionDetailsSchema: Schema<TransactionDetails>;
