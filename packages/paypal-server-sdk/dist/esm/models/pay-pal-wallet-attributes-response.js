import * as s from "../core/validation/index.js";
import { cobrandedCardInternalSchema, cobrandedCardSchema } from "./cobranded-card.js";
import { payPalWalletVaultResponseInternalSchema, payPalWalletVaultResponseSchema, } from "./pay-pal-wallet-vault-response.js";
const payPalWalletAttributesResponseProperties = {
    vault: s.optional(s.lazy(() => payPalWalletVaultResponseInternalSchema)),
    cobrandedCards: s.optional(s.array(s.lazy(() => cobrandedCardInternalSchema))),
    _keysMap: {
        cobrandedCards: "cobranded_cards",
    },
};
export const payPalWalletAttributesResponseInternalSchema = s.object(payPalWalletAttributesResponseProperties, {
    additionalProperties: s.json(),
});
export const payPalWalletAttributesResponseSchema = s.lazySchema(() => s.object({
    ...payPalWalletAttributesResponseProperties,
    vault: s.optional(s.lazy(() => payPalWalletVaultResponseSchema)),
    cobrandedCards: s.optional(s.array(s.lazy(() => cobrandedCardSchema)).check(s.minLength(0), s.maxLength(25))),
}, { additionalProperties: s.json() }));
