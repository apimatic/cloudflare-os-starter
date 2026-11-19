import * as s from "../core/validation/index.js";
import { nameInternalSchema, nameSchema } from "./name.js";
import { shippingDetailsSubscriptionsInternalSchema, shippingDetailsSubscriptionsSchema, } from "./shipping-details-subscriptions.js";
import { subscriptionPaymentSourceResponseInternalSchema, subscriptionPaymentSourceResponseSchema, } from "./subscription-payment-source-response.js";
const subscriberProperties = {
    name: s.optional(s.lazy(() => nameInternalSchema)),
    shippingAddress: s.optional(s.lazy(() => shippingDetailsSubscriptionsInternalSchema)),
    paymentSource: s.optional(s.lazy(() => subscriptionPaymentSourceResponseInternalSchema)),
    _keysMap: {
        shippingAddress: "shipping_address",
        paymentSource: "payment_source",
    },
};
export const subscriberInternalSchema = s.object(subscriberProperties, {
    additionalProperties: s.json(),
});
export const subscriberSchema = s.lazySchema(() => s.object({
    ...subscriberProperties,
    name: s.optional(s.lazy(() => nameSchema)),
    shippingAddress: s.optional(s.lazy(() => shippingDetailsSubscriptionsSchema)),
    paymentSource: s.optional(s.lazy(() => subscriptionPaymentSourceResponseSchema)),
}, { additionalProperties: s.json() }));
