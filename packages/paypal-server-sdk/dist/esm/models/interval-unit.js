import * as s from "../core/validation/index.js";
/** The interval at which the subscription is charged or billed. */
export const IntervalUnit = {
    /** A daily billing cycle. */
    Day: "DAY",
    /** A weekly billing cycle. */
    Week: "WEEK",
    /** A monthly billing cycle. */
    Month: "MONTH",
    /** A yearly billing cycle. */
    Year: "YEAR",
};
export const intervalUnitSchema = s.enumOf(IntervalUnit);
//# sourceMappingURL=interval-unit.js.map