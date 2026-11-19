import type { EnumSchema } from "../core/validation/schema.js";
/** The funds that are held on behalf of the merchant. */
export declare const DisbursementMode: {
    /** The funds are released to the merchant immediately. */
    readonly Instant: "INSTANT";
    /**
     * The funds are held for a finite number of days. The actual duration depends on the region and
     * type of integration. You can release the funds through a referenced payout. Otherwise, the
     * funds disbursed automatically after the specified duration.
     */
    readonly Delayed: "DELAYED";
};
export type DisbursementMode = (typeof DisbursementMode)[keyof typeof DisbursementMode] | (string & {});
export declare const disbursementModeSchema: EnumSchema<DisbursementMode>;
