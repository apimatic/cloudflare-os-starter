/**
 * An incoming webhook, buffered once so that `verify` and `parse` read the same bytes.
 *
 * @remarks
 * Build one with {@link WebhookRequest.fromBytes} from a body a framework has already buffered,
 * with {@link WebhookRequest.fromStream} from a body still being streamed, such as a Node
 * `IncomingMessage`, or with {@link WebhookRequest.fromRequest} from a fetch `Request`, which
 * reads a clone so the caller's request stays readable. The body must be the bytes or the text
 * the sender sent, never a value a framework has parsed, because re-serialising it can change the
 * bytes that were signed.
 */
export class WebhookRequest {
    body;
    #headers;
    constructor(body, headers) {
        this.body = body;
        this.#headers = headers;
    }
    /** The value of a header, matched without regard to case, or `undefined` when absent. */
    header(name) {
        return this.#headers.get(name.toLowerCase());
    }
    /** Builds a request from a body a framework has already buffered. */
    static fromBytes(body, headers) {
        return new WebhookRequest(toBytes(body), toHeaderMap(headers));
    }
    /**
     * Builds a request from a body still being streamed, reading it to the end. The stream is
     * consumed; read the bytes back from {@link WebhookRequest.body}.
     */
    static async fromStream(body, headers) {
        const chunks = [];
        for await (const chunk of body)
            chunks.push(chunk);
        const bytes = new Uint8Array(chunks.reduce((length, chunk) => length + chunk.byteLength, 0));
        let offset = 0;
        for (const chunk of chunks) {
            bytes.set(chunk, offset);
            offset += chunk.byteLength;
        }
        return WebhookRequest.fromBytes(bytes, headers);
    }
    /** Builds a request from a fetch `Request`, reading a clone so the caller's body stays unread. */
    static async fromRequest(request) {
        const body = new Uint8Array(await request.clone().arrayBuffer());
        return new WebhookRequest(body, toHeaderMap(request.headers));
    }
}
function toBytes(body) {
    if (typeof body === "string")
        return new TextEncoder().encode(body);
    if (body instanceof Uint8Array)
        return body;
    return new Uint8Array(body);
}
function toHeaderMap(headers) {
    const map = new Map();
    const add = (name, value) => {
        const key = name.toLowerCase();
        const existing = map.get(key);
        map.set(key, existing === undefined ? value : `${existing},${value}`);
    };
    if (headers instanceof Headers) {
        headers.forEach((value, name) => add(name, value));
        return map;
    }
    for (const [name, value] of Object.entries(headers)) {
        if (value === undefined)
            continue;
        if (typeof value === "string")
            add(name, value);
        else
            for (const item of value)
                add(name, item);
    }
    return map;
}
//# sourceMappingURL=webhook-request.js.map