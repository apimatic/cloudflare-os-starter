import * as s from "../core/validation/index.js";
import { OrdersCardVerificationMethod, ordersCardVerificationMethodSchema, } from "./orders-card-verification-method.js";
export const cardVerificationSchema = s.object({
    method: s.defaulted(ordersCardVerificationMethodSchema, OrdersCardVerificationMethod.ScaWhenRequired),
}, { additionalProperties: s.json() });
