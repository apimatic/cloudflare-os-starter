import * as s from "../core/validation/index.js";
import { authorizationWithAdditionalDataInternalSchema, authorizationWithAdditionalDataSchema, } from "./authorization-with-additional-data.js";
import { ordersCaptureInternalSchema, ordersCaptureSchema } from "./orders-capture.js";
import { refundInternalSchema, refundSchema } from "./refund.js";
const paymentCollectionProperties = {
    authorizations: s.optional(s.array(s.lazy(() => authorizationWithAdditionalDataInternalSchema))),
    captures: s.optional(s.array(s.lazy(() => ordersCaptureInternalSchema))),
    refunds: s.optional(s.array(s.lazy(() => refundInternalSchema))),
};
export const paymentCollectionInternalSchema = s.object(paymentCollectionProperties, { additionalProperties: s.json() });
export const paymentCollectionSchema = s.lazySchema(() => s.object({
    ...paymentCollectionProperties,
    authorizations: s.optional(s.array(s.lazy(() => authorizationWithAdditionalDataSchema))),
    captures: s.optional(s.array(s.lazy(() => ordersCaptureSchema))),
    refunds: s.optional(s.array(s.lazy(() => refundSchema))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=payment-collection.js.map