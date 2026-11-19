import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type LinkDescription } from "./link-description.js";
import { type Subscription } from "./subscription.js";
/** The list of subscriptions. */
export type SubscriptionCollection = {
    /** An array of subscriptions. */
    subscriptions?: Subscription[];
    /**
     * An array of request-related [HATEOAS links](/docs/api/reference/api-responses/#hateoas-links).
     */
    links?: LinkDescription[];
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const subscriptionCollectionInternalSchema: Schema<SubscriptionCollection>;
export declare const subscriptionCollectionSchema: Schema<SubscriptionCollection>;
