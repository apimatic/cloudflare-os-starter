import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type SimplePostalAddressCoarseGrained } from "./simple-postal-address-coarse-grained.js";
/** The shipping information. */
export type ShippingInformation = {
    /** The recipient's name. */
    name?: string;
    /** The shipping method that is associated with this order. */
    method?: string;
    /**
     * A simple postal address with coarse-grained fields. Do not use for an international address.
     * Use for backward compatibility only. Does not contain phone.
     */
    address?: SimplePostalAddressCoarseGrained;
    /**
     * A simple postal address with coarse-grained fields. Do not use for an international address.
     * Use for backward compatibility only. Does not contain phone.
     */
    secondaryShippingAddress?: SimplePostalAddressCoarseGrained;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const shippingInformationInternalSchema: Schema<ShippingInformation>;
export declare const shippingInformationSchema: Schema<ShippingInformation>;
