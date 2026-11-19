import { ConfigurationError } from "../errors.js";
import * as s from "../validation/index.js";
export class SignatureVerifier {
    #options;
    #key;
    #keySecret;
    constructor(options) {
        if (typeof options.secret === "string" && options.secret.trim() === "") {
            throw new ConfigurationError("Webhook signing secret is not configured or is blank.");
        }
        this.#options = options;
    }
    async verify(request, signal) {
        const options = this.#options;
        const signatureHeader = request.header(options.signatureHeaderName);
        if (signatureHeader === undefined)
            return false;
        if (options.replayTolerance !== false) {
            if (options.timestampHeaderName === undefined || options.timestampHeaderName === "")
                return false;
            const timestamp = request.header(options.timestampHeaderName);
            if (timestamp === undefined)
                return false;
            if (!isWithinReplayWindow(timestamp, Date.now(), options.replayTolerance))
                return false;
        }
        const providedSignatures = extractSignatures(options.signatureHeaderFormat, signatureHeader);
        if (providedSignatures.length === 0)
            return false;
        const message = messageBytes(options.messageSegments, request.body, (name) => request.header(name) ?? "");
        const key = await this.#keyFor(await resolveSecret(options.secret, signal));
        for (const provided of providedSignatures) {
            const signature = decodeDigest(options.digestEncoding, provided);
            if (signature === undefined)
                continue;
            if (await crypto.subtle.verify("HMAC", key, signature, message))
                return true;
        }
        return false;
    }
    #keyFor(secret) {
        if (this.#key === undefined || secret !== this.#keySecret) {
            this.#keySecret = secret;
            this.#key = crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: this.#options.algorithm }, false, ["verify"]);
        }
        return this.#key;
    }
}
async function resolveSecret(secret, signal) {
    const value = typeof secret === "function" ? await secret(signal ?? new AbortController().signal) : secret;
    if (typeof value !== "string") {
        throw new TypeError(`A webhook secret must be a string, received ${typeof value}.`);
    }
    if (value.trim() === "") {
        throw new ConfigurationError("Webhook signing secret is not configured or is blank.");
    }
    return value;
}
function isWithinReplayWindow(timestamp, now, tolerance) {
    const sentAtSeconds = Number(timestamp);
    if (!Number.isSafeInteger(sentAtSeconds))
        return false;
    const sentAt = sentAtSeconds * 1000;
    const window = tolerance * 1000;
    return sentAt >= now - window && sentAt <= now + window;
}
function extractSignatures(format, headerValue) {
    switch (format.kind) {
        case "raw":
            return [headerValue];
        case "keyValue":
            return headerValue.split(",").flatMap((pair) => {
                const [name, ...value] = pair.split("=");
                return value.length > 0 && name?.trim() === format.key ? [value.join("=").trim()] : [];
            });
    }
}
function messageBytes(segments, body, resolveHeader) {
    const parts = segments.map((segment) => segmentBytes(segment, body, resolveHeader));
    const message = new Uint8Array(parts.reduce((length, part) => length + part.byteLength, 0));
    let offset = 0;
    for (const part of parts) {
        message.set(part, offset);
        offset += part.byteLength;
    }
    return message;
}
function segmentBytes(segment, body, resolveHeader) {
    const encoder = new TextEncoder();
    switch (segment.kind) {
        case "literal":
            return encoder.encode(segment.text);
        case "body":
            return body;
        case "header":
            return encoder.encode(resolveHeader(segment.name));
    }
}
function decodeDigest(encoding, signature) {
    const result = digestSchema(encoding).safeParse(signature);
    return result.success ? new Uint8Array(result.data) : undefined;
}
function digestSchema(encoding) {
    switch (encoding) {
        case "hex":
            return s.base16Bytes();
        case "base64":
            return s.bytes();
        case "base64url":
            return s.base64UrlBytes();
    }
}
//# sourceMappingURL=signature-verifier.js.map