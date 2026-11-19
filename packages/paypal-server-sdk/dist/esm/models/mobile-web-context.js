import * as s from "../core/validation/index.js";
import { MobileReturnFlow, mobileReturnFlowSchema } from "./mobile-return-flow.js";
const mobileWebContextProperties = {
    returnFlow: s.defaulted(mobileReturnFlowSchema, MobileReturnFlow.Auto),
    buyerUserAgent: s.optional(s.string()),
    _keysMap: {
        returnFlow: "return_flow",
        buyerUserAgent: "buyer_user_agent",
    },
};
export const mobileWebContextInternalSchema = s.object(mobileWebContextProperties, { additionalProperties: s.json() });
export const mobileWebContextSchema = s.lazySchema(() => s.object({
    ...mobileWebContextProperties,
    buyerUserAgent: s.optional(s.string().check(s.minLength(1), s.maxLength(512), s.pattern("^.*$"))),
}, { additionalProperties: s.json() }));
