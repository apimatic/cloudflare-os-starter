import * as s from "../core/validation/index.js";
/**
 * The account status indicates whether the buyer has verified the financial details associated with
 * their PayPal account.
 */
export const PayPalWalletAccountVerificationStatus = {
    /**
     * The buyer has completed the verification of the financial details associated with this PayPal
     * account. For example: confirming their bank account.
     */
    Verified: "VERIFIED",
    /**
     * The buyer has not completed the verification of the financial details associated with this
     * PayPal account. For example: confirming their bank account.
     */
    Unverified: "UNVERIFIED",
};
export const payPalWalletAccountVerificationStatusSchema = s.enumOf(PayPalWalletAccountVerificationStatus);
//# sourceMappingURL=pay-pal-wallet-account-verification-status.js.map