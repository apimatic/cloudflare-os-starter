import * as s from "../core/validation/index.js";
/** The funds that are held on behalf of the merchant. */
export const DisbursementMode = {
    /** The funds are released to the merchant immediately. */
    Instant: "INSTANT",
    /**
     * The funds are held for a finite number of days. The actual duration depends on the region and
     * type of integration. You can release the funds through a referenced payout. Otherwise, the
     * funds disbursed automatically after the specified duration.
     */
    Delayed: "DELAYED",
};
export const disbursementModeSchema = s.enumOf(DisbursementMode);
//# sourceMappingURL=disbursement-mode.js.map