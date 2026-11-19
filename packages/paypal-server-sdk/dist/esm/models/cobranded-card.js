import * as s from "../core/validation/index.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
import { payeeBaseInternalSchema, payeeBaseSchema } from "./payee-base.js";
const cobrandedCardProperties = {
    labels: s.optional(s.array(s.string())),
    payee: s.optional(s.lazy(() => payeeBaseInternalSchema)),
    amount: s.optional(s.lazy(() => moneyInternalSchema)),
};
export const cobrandedCardInternalSchema = s.object(cobrandedCardProperties, { additionalProperties: s.json() });
export const cobrandedCardSchema = s.lazySchema(() => s.object({
    ...cobrandedCardProperties,
    labels: s.optional(s.array(s.string().check(s.minLength(1), s.maxLength(256))).check(s.minLength(1), s.maxLength(25))),
    payee: s.optional(s.lazy(() => payeeBaseSchema)),
    amount: s.optional(s.lazy(() => moneySchema)),
}, { additionalProperties: s.json() }));
