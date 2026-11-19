import * as s from "../core/validation/index.js";
const auctionInformationProperties = {
    auctionSite: s.optional(s.string()),
    auctionItemSite: s.optional(s.string()),
    auctionBuyerId: s.optional(s.string()),
    auctionClosingDate: s.optional(s.string()),
    _keysMap: {
        auctionSite: "auction_site",
        auctionItemSite: "auction_item_site",
        auctionBuyerId: "auction_buyer_id",
        auctionClosingDate: "auction_closing_date",
    },
};
export const auctionInformationInternalSchema = s.object(auctionInformationProperties, { additionalProperties: s.json() });
export const auctionInformationSchema = s.lazySchema(() => s.object({
    ...auctionInformationProperties,
    auctionSite: s.optional(s.string().check(s.minLength(1), s.maxLength(200), s.pattern("^[a-zA-Z0-9_'\\-., \":;\\!?]*$"))),
    auctionItemSite: s.optional(s.string().check(s.minLength(1), s.maxLength(4000), s.pattern("^[a-zA-Z0-9_'\\-., \":;\\!?]*$"))),
    auctionBuyerId: s.optional(s.string().check(s.minLength(1), s.maxLength(500), s.pattern("^[a-zA-Z0-9_'\\-., \":;\\!?]*$"))),
    auctionClosingDate: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
}, { additionalProperties: s.json() }));
