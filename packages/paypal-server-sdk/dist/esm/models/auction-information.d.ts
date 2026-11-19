import type { JsonValue, Schema } from "../core/validation/schema.js";
/** The auction information. */
export type AuctionInformation = {
    /** The name of the auction site. */
    auctionSite?: string;
    /** The auction site URL. */
    auctionItemSite?: string;
    /**
     * The ID of the buyer who makes the purchase in the auction. This ID might be different from the
     * payer ID provided for the payment.
     */
    auctionBuyerId?: string;
    /**
     * The date and time, in [Internet date and time
     * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
     * seconds are optional. Note: The regular expression provides guidance but does not reject all
     * invalid dates.
     */
    auctionClosingDate?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const auctionInformationInternalSchema: Schema<AuctionInformation>;
export declare const auctionInformationSchema: Schema<AuctionInformation>;
