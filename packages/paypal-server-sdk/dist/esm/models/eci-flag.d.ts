import type { EnumSchema } from "../core/validation/schema.js";
/**
 * Electronic Commerce Indicator (ECI). The ECI value is part of the 2 data elements that indicate
 * the transaction was processed electronically. This should be passed on the authorization
 * transaction to the Gateway/Processor.
 */
export declare const EciFlag: {
    /** Mastercard non-3-D Secure transaction. */
    readonly MastercardNon3DSecureTransaction: "MASTERCARD_NON_3D_SECURE_TRANSACTION";
    /** Mastercard attempted authentication transaction. */
    readonly MastercardAttemptedAuthenticationTransaction: "MASTERCARD_ATTEMPTED_AUTHENTICATION_TRANSACTION";
    /** Mastercard fully authenticated transaction. */
    readonly MastercardFullyAuthenticatedTransaction: "MASTERCARD_FULLY_AUTHENTICATED_TRANSACTION";
    /** VISA, AMEX, JCB, DINERS CLUB fully authenticated transaction. */
    readonly FullyAuthenticatedTransaction: "FULLY_AUTHENTICATED_TRANSACTION";
    /** VISA, AMEX, JCB, DINERS CLUB attempted authentication transaction. */
    readonly AttemptedAuthenticationTransaction: "ATTEMPTED_AUTHENTICATION_TRANSACTION";
    /** VISA, AMEX, JCB, DINERS CLUB non-3-D Secure transaction. */
    readonly Non3DSecureTransaction: "NON_3D_SECURE_TRANSACTION";
};
export type EciFlag = (typeof EciFlag)[keyof typeof EciFlag] | (string & {});
export declare const eciFlagSchema: EnumSchema<EciFlag>;
