import * as s from "../core/validation/index.js";
import { SubscriptionCardVerificationMethod, subscriptionCardVerificationMethodSchema, } from "./subscription-card-verification-method.js";
export const cardVerificationSubscriptionsSchema = s.object({
    method: s.defaulted(subscriptionCardVerificationMethodSchema, SubscriptionCardVerificationMethod.ScaWhenRequired),
}, { additionalProperties: s.json() });
