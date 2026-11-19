import { oauth2Scheme } from "./core/auth/oauth2-schemes.js";
import { oauth2ClientCredentialsStrategy } from "./core/auth/oauth2-strategies.js";
export function buildAuthSchemes(options, servers, rawClient) {
    return {
        oauth2: oauth2Scheme(options.oauth2, options.oauth2Strategy ??
            oauth2ClientCredentialsStrategy({
                tokenUrl: servers.default("/v1/oauth2/token"),
                rawClient,
                placement: "header",
            })),
    };
}
//# sourceMappingURL=auth-schemes.js.map