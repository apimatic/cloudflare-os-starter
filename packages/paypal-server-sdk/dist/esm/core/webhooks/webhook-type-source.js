import { SchemaError } from "../validation/schema-error.js";
/**
 * Reads the event type the source points at. A body field counts only when it is a JSON string;
 * a header counts when the request has it. Anything else throws `SchemaError`.
 */
export function resolveWebhookType(source, body, request) {
    const value = source.kind === "header" ? request.header(source.name) : body[source.field];
    if (typeof value !== "string") {
        throw new SchemaError("Event body is missing the required discriminator.");
    }
    return value;
}
//# sourceMappingURL=webhook-type-source.js.map