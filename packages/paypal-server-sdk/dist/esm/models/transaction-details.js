import * as s from "../core/validation/index.js";
import { auctionInformationInternalSchema, auctionInformationSchema, } from "./auction-information.js";
import { cartInformationInternalSchema, cartInformationSchema, } from "./cart-information.js";
import { incentiveInformationInternalSchema, incentiveInformationSchema, } from "./incentive-information.js";
import { payerInformationInternalSchema, payerInformationSchema, } from "./payer-information.js";
import { shippingInformationInternalSchema, shippingInformationSchema, } from "./shipping-information.js";
import { storeInformationInternalSchema, storeInformationSchema, } from "./store-information.js";
import { transactionInformationInternalSchema, transactionInformationSchema, } from "./transaction-information.js";
const transactionDetailsProperties = {
    transactionInfo: s.optional(s.lazy(() => transactionInformationInternalSchema)),
    payerInfo: s.optional(s.lazy(() => payerInformationInternalSchema)),
    shippingInfo: s.optional(s.lazy(() => shippingInformationInternalSchema)),
    cartInfo: s.optional(s.lazy(() => cartInformationInternalSchema)),
    storeInfo: s.optional(s.lazy(() => storeInformationInternalSchema)),
    auctionInfo: s.optional(s.lazy(() => auctionInformationInternalSchema)),
    incentiveInfo: s.optional(s.lazy(() => incentiveInformationInternalSchema)),
    _keysMap: {
        transactionInfo: "transaction_info",
        payerInfo: "payer_info",
        shippingInfo: "shipping_info",
        cartInfo: "cart_info",
        storeInfo: "store_info",
        auctionInfo: "auction_info",
        incentiveInfo: "incentive_info",
    },
};
export const transactionDetailsInternalSchema = s.object(transactionDetailsProperties, { additionalProperties: s.json() });
export const transactionDetailsSchema = s.lazySchema(() => s.object({
    ...transactionDetailsProperties,
    transactionInfo: s.optional(s.lazy(() => transactionInformationSchema)),
    payerInfo: s.optional(s.lazy(() => payerInformationSchema)),
    shippingInfo: s.optional(s.lazy(() => shippingInformationSchema)),
    cartInfo: s.optional(s.lazy(() => cartInformationSchema)),
    storeInfo: s.optional(s.lazy(() => storeInformationSchema)),
    auctionInfo: s.optional(s.lazy(() => auctionInformationSchema)),
    incentiveInfo: s.optional(s.lazy(() => incentiveInformationSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=transaction-details.js.map