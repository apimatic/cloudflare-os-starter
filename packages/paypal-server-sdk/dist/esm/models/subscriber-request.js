import * as s from "../core/validation/index.js";
import { nameInternalSchema, nameSchema } from "./name.js";
import { phoneWithTypeSubscriptionsInternalSchema, phoneWithTypeSubscriptionsSchema, } from "./phone-with-type-subscriptions.js";
import { shippingDetailsSubscriptionsInternalSchema, shippingDetailsSubscriptionsSchema, } from "./shipping-details-subscriptions.js";
import { subscriptionPaymentSourceInternalSchema, subscriptionPaymentSourceSchema, } from "./subscription-payment-source.js";
const subscriberRequestProperties = {
    name: s.optional(s.lazy(() => nameInternalSchema)),
    phone: s.optional(s.lazy(() => phoneWithTypeSubscriptionsInternalSchema)),
    shippingAddress: s.optional(s.lazy(() => shippingDetailsSubscriptionsInternalSchema)),
    paymentSource: s.optional(s.lazy(() => subscriptionPaymentSourceInternalSchema)),
    _keysMap: {
        shippingAddress: "shipping_address",
        paymentSource: "payment_source",
    },
};
export const subscriberRequestInternalSchema = s.object(subscriberRequestProperties, { additionalProperties: s.json() });
export const subscriberRequestSchema = s.lazySchema(() => s.object({
    ...subscriberRequestProperties,
    name: s.optional(s.lazy(() => nameSchema)),
    phone: s.optional(s.lazy(() => phoneWithTypeSubscriptionsSchema)),
    shippingAddress: s.optional(s.lazy(() => shippingDetailsSubscriptionsSchema)),
    paymentSource: s.optional(s.lazy(() => subscriptionPaymentSourceSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=subscriber-request.js.map