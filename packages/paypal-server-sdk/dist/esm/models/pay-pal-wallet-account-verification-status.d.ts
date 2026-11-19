import type { EnumSchema } from "../core/validation/schema.js";
/**
 * The account status indicates whether the buyer has verified the financial details associated with
 * their PayPal account.
 */
export declare const PayPalWalletAccountVerificationStatus: {
    /**
     * The buyer has completed the verification of the financial details associated with this PayPal
     * account. For example: confirming their bank account.
     */
    readonly Verified: "VERIFIED";
    /**
     * The buyer has not completed the verification of the financial details associated with this
     * PayPal account. For example: confirming their bank account.
     */
    readonly Unverified: "UNVERIFIED";
};
export type PayPalWalletAccountVerificationStatus = (typeof PayPalWalletAccountVerificationStatus)[keyof typeof PayPalWalletAccountVerificationStatus] | (string & {});
export declare const payPalWalletAccountVerificationStatusSchema: EnumSchema<PayPalWalletAccountVerificationStatus>;
