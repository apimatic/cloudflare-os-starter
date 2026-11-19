import type { ClientOptions } from "./client-options.js";
import type { UrlTemplate } from "./core/api-request.js";
export declare const ServerEnvironment: {
    readonly Sandbox: "sandbox";
    readonly Production: "production";
};
export type ServerEnvironment = (typeof ServerEnvironment)[keyof typeof ServerEnvironment];
export type Servers = {
    default: (subPath: string) => UrlTemplate;
};
export declare function buildServers(options: ClientOptions): Servers;
