import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type TenureType1 } from "./tenure-type1.js";
/** The regular and trial execution details for a billing cycle. */
export type CycleExecution = {
    /** The type of the billing cycle. */
    tenureType: TenureType1;
    /** The order in which to run this cycle among other billing cycles. */
    sequence: number;
    /** The number of billing cycles that have completed. */
    cyclesCompleted: number;
    /**
     * For a finite billing cycle, cycles_remaining is the number of remaining cycles. For an infinite
     * billing cycle, cycles_remaining is set as 0.
     */
    cyclesRemaining?: number;
    /** The active pricing scheme version for the billing cycle. */
    currentPricingSchemeVersion?: number;
    /**
     * The number of times this billing cycle gets executed. Trial billing cycles can only be executed
     * a finite number of times (value between 1 and 999 for total_cycles). Regular billing cycles can
     * be executed infinite times (value of 0 for total_cycles) or a finite number of times (value
     * between 1 and 999 for total_cycles).
     */
    totalCycles?: number;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const cycleExecutionInternalSchema: Schema<CycleExecution>;
export declare const cycleExecutionSchema: Schema<CycleExecution>;
