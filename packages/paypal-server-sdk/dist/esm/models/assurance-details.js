import * as s from "../core/validation/index.js";
export const assuranceDetailsSchema = s.object({
    accountVerified: s.defaulted(s.boolean(), false),
    cardHolderAuthenticated: s.defaulted(s.boolean(), false),
    _keysMap: {
        accountVerified: "account_verified",
        cardHolderAuthenticated: "card_holder_authenticated",
    },
}, { additionalProperties: s.json() });
//# sourceMappingURL=assurance-details.js.map