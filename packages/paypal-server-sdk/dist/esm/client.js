import { buildAuthSchemes } from "./auth-schemes.js";
import { buildCoreClientOptions } from "./core/client-options.js";
import { RawClient } from "./core/raw-client.js";
import * as host from "./core/runtime-environment.js";
import * as s from "./core/validation/index.js";
import { Orders } from "./resources/orders.js";
import { Payments } from "./resources/payments.js";
import { Subscriptions } from "./resources/subscriptions.js";
import { TransactionSearch } from "./resources/transaction-search.js";
import { Vault } from "./resources/vault.js";
import { buildServers } from "./servers.js";
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
export class PayPalServerSdkClient {
    #rawClient;
    #servers;
    #auth;
    #orders;
    #payments;
    #vault;
    #transactionSearch;
    #subscriptions;
    constructor(options = {}) {
        this.#rawClient = new RawClient({
            ...buildCoreClientOptions(options, "PAY_PAL_SERVER_SDK_CLIENT_LOG"),
            defaultHeaders: [
                { name: "User-Agent", value: "PayPalServerSdkClient/2.29.0 TypeScript", schema: s.string() },
                { name: "X-APIMatic-Lang", value: "TypeScript", schema: s.string() },
                { name: "X-APIMatic-Package-Version", value: "2.29.0", schema: s.string() },
                { name: "X-APIMatic-Gen-Version", value: "4.0.0", schema: s.string() },
                { name: "X-APIMatic-OS", value: host.operatingSystem(), schema: s.optional(s.string()) },
                { name: "X-APIMatic-Runtime", value: host.runtimeDescription(), schema: s.optional(s.string()) },
            ],
            defaultQuery: [],
            defaultPathParams: [],
        });
        this.#servers = buildServers(options);
        this.#auth = buildAuthSchemes(options, this.#servers, this.#rawClient);
    }
    /**
     * Use the `/orders` resource to create, update, retrieve, authorize, capture and track orders.
     */
    get orders() {
        return (this.#orders ??= new Orders(this.#rawClient, this.#servers, this.#auth));
    }
    /**
     * Use the `/payments` resource to authorize, capture, void authorizations, and retrieve captures.
     */
    get payments() {
        return (this.#payments ??= new Payments(this.#rawClient, this.#servers, this.#auth));
    }
    /**
     * Use the `/vault` resource to create, retrieve, and delete payment and setup tokens.
     */
    get vault() {
        return (this.#vault ??= new Vault(this.#rawClient, this.#servers, this.#auth));
    }
    /**
     * Use the `/transactions` resource to list transactions and the `/balances` resource to list
     * balances.
     */
    get transactionSearch() {
        return (this.#transactionSearch ??= new TransactionSearch(this.#rawClient, this.#servers, this.#auth));
    }
    /**
     * Use the `/subscriptions` resource to create, update, retrieve, and cancel subscriptions and
     * their associated plans.
     */
    get subscriptions() {
        return (this.#subscriptions ??= new Subscriptions(this.#rawClient, this.#servers, this.#auth));
    }
}
//# sourceMappingURL=client.js.map