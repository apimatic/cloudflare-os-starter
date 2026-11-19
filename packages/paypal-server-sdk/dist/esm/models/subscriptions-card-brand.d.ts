import type { EnumSchema } from "../core/validation/schema.js";
/** The card network or brand. Applies to credit, debit, gift, and payment cards. */
export declare const SubscriptionsCardBrand: {
    /** Visa card. */
    readonly Visa: "VISA";
    /** Mastercard card. */
    readonly Mastercard: "MASTERCARD";
    /** Discover card. */
    readonly Discover: "DISCOVER";
    /** American Express card. */
    readonly Amex: "AMEX";
    /** Solo debit card. */
    readonly Solo: "SOLO";
    /** Japan Credit Bureau card. */
    readonly Jcb: "JCB";
    /** Military Star card. */
    readonly Star: "STAR";
    /** Delta Airlines card. */
    readonly Delta: "DELTA";
    /** Switch credit card. */
    readonly Switch: "SWITCH";
    /** Maestro credit card. */
    readonly Maestro: "MAESTRO";
    /** Carte Bancaire (CB) credit card. */
    readonly CbNationale: "CB_NATIONALE";
    /** Configoga credit card. */
    readonly Configoga: "CONFIGOGA";
    /** Confidis credit card. */
    readonly Confidis: "CONFIDIS";
    /** Visa Electron credit card. */
    readonly Electron: "ELECTRON";
    /** Cetelem credit card. */
    readonly Cetelem: "CETELEM";
    /** China union pay credit card. */
    readonly ChinaUnionPay: "CHINA_UNION_PAY";
    /**
     * The Diners Club International banking and payment services capability network owned by Discover
     * Financial Services (DFS), one of the most recognized brands in US financial services.
     */
    readonly Diners: "DINERS";
    /** The Brazilian Elo card payment network. */
    readonly Elo: "ELO";
    /** The Hiper - Ingenico ePayment network. */
    readonly Hiper: "HIPER";
    /** The Brazilian Hipercard payment network that's widely accepted in the retail market. */
    readonly Hipercard: "HIPERCARD";
    /** The RuPay payment network. */
    readonly Rupay: "RUPAY";
    /** The GE Credit Union 3Point card payment network. */
    readonly Ge: "GE";
    /** The Synchrony Financial (SYF) payment network. */
    readonly Synchrony: "SYNCHRONY";
    /** The Electronic Fund Transfer At Point of Sale(EFTPOS) Debit card payment network. */
    readonly Eftpos: "EFTPOS";
    /** UNKNOWN payment network. */
    readonly Unknown: "UNKNOWN";
};
export type SubscriptionsCardBrand = (typeof SubscriptionsCardBrand)[keyof typeof SubscriptionsCardBrand] | (string & {});
export declare const subscriptionsCardBrandSchema: EnumSchema<SubscriptionsCardBrand>;
