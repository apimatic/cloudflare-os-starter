import type { ClientOptions } from "./client-options.js";
import { Orders } from "./resources/orders.js";
import { Payments } from "./resources/payments.js";
import { Subscriptions } from "./resources/subscriptions.js";
import { TransactionSearch } from "./resources/transaction-search.js";
import { Vault } from "./resources/vault.js";
/**
 * ### Important Notes
 *  - **Available Features:** This SDK currently contains only 5 of PayPal's API endpoints.
 *    Additional endpoints and functionality will be added in the future.
 *
 *  ## Information
 * The PayPal Server SDK provides integration access to the PayPal REST APIs. The API endpoints are
 * divided into distinct controllers:
 *  - Orders Controller: [Orders API v2](https://developer.paypal.com/docs/api/orders/v2/)
 *  - Payments Controller: [Payments API v2](https://developer.paypal.com/docs/api/payments/v2)
 *  - Vault Controller: [Payment Method Tokens API
 *    v3](https://developer.paypal.com/docs/api/payment-tokens/v3/) *Available in the US only.*
 *  - Transaction Search Controller: [Transaction Search API
 *    v1](https://developer.paypal.com/docs/api/transaction-search/v1/)
 *  - Subscriptions Controller: [Subscriptions API
 *    v1](https://developer.paypal.com/docs/api/subscriptions/v1/)
 */
export declare class PayPalServerSdkClient {
    #private;
    constructor(options?: ClientOptions);
    /**
     * Use the `/orders` resource to create, update, retrieve, authorize, capture and track orders.
     */
    get orders(): Orders;
    /**
     * Use the `/payments` resource to authorize, capture, void authorizations, and retrieve captures.
     */
    get payments(): Payments;
    /**
     * Use the `/vault` resource to create, retrieve, and delete payment and setup tokens.
     */
    get vault(): Vault;
    /**
     * Use the `/transactions` resource to list transactions and the `/balances` resource to list
     * balances.
     */
    get transactionSearch(): TransactionSearch;
    /**
     * Use the `/subscriptions` resource to create, update, retrieve, and cancel subscriptions and
     * their associated plans.
     */
    get subscriptions(): Subscriptions;
}
