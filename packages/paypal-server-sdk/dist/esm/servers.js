import { ConfigurationError } from "./core/errors.js";
import { resolveBaseUrl } from "./core/url.js";
import * as s from "./core/validation/index.js";
export const ServerEnvironment = {
    Sandbox: "sandbox",
    Production: "production",
};
const sandboxSchemas = {
    baseUrl: s.of(s.defaulted(s.string(), "https://api-m.sandbox.paypal.com")),
};
const productionSchemas = {
    baseUrl: s.of(s.defaulted(s.string(), "https://api-m.paypal.com")),
};
export function buildServers(options) {
    const base = {
        default: resolveBaseUrl(defaultServer(options)),
    };
    return {
        default: (subPath) => ({ baseUrl: base.default, subPath }),
    };
}
function defaultServer(options) {
    const environment = options.serverEnvironment;
    switch (environment) {
        case ServerEnvironment.Sandbox:
        case undefined:
            return { baseUrl: sandboxSchemas.baseUrl.decode(options.serverOptions?.baseUrl) };
        case ServerEnvironment.Production:
            return { baseUrl: productionSchemas.baseUrl.decode(options.serverOptions?.baseUrl) };
        default:
            unknownEnvironment(environment);
    }
}
function unknownEnvironment(environment) {
    throw new ConfigurationError(`Unknown server environment: ${String(environment)}`);
}
