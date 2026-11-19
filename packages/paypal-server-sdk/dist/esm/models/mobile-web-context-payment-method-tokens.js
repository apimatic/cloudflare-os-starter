import * as s from "../core/validation/index.js";
import { ReturnFlowPaymentMethodTokens, returnFlowPaymentMethodTokensSchema, } from "./return-flow-payment-method-tokens.js";
const mobileWebContextPaymentMethodTokensProperties = {
    returnFlow: s.defaulted(returnFlowPaymentMethodTokensSchema, ReturnFlowPaymentMethodTokens.Auto),
    buyerUserAgent: s.optional(s.string()),
    _keysMap: {
        returnFlow: "return_flow",
        buyerUserAgent: "buyer_user_agent",
    },
};
export const mobileWebContextPaymentMethodTokensInternalSchema = s.object(mobileWebContextPaymentMethodTokensProperties, {
    additionalProperties: s.json(),
});
export const mobileWebContextPaymentMethodTokensSchema = s.lazySchema(() => s.object({
    ...mobileWebContextPaymentMethodTokensProperties,
    buyerUserAgent: s.optional(s.string().check(s.minLength(1), s.maxLength(512), s.pattern("^.*$"))),
}, { additionalProperties: s.json() }));
