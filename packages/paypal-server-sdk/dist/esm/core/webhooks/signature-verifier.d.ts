import type { SecretProvider } from "../auth/credentials.js";
import type { WebhookRequest } from "./webhook-request.js";
type SignatureAlgorithm = "SHA-256" | "SHA-512";
type SignatureDigestEncoding = "hex" | "base64" | "base64url";
type MessageSegment = {
    readonly kind: "literal";
    readonly text: string;
} | {
    readonly kind: "body";
} | {
    readonly kind: "header";
    readonly name: string;
};
type SignatureHeaderFormat = {
    readonly kind: "raw";
} | {
    readonly kind: "keyValue";
    readonly key: string;
};
export type SignatureVerifierOptions = {
    readonly secret: SecretProvider;
    readonly algorithm: SignatureAlgorithm;
    readonly digestEncoding: SignatureDigestEncoding;
    readonly messageSegments: readonly MessageSegment[];
    readonly signatureHeaderName: string;
    readonly signatureHeaderFormat: SignatureHeaderFormat;
    readonly timestampHeaderName?: string;
    readonly replayTolerance: number | false;
};
export declare class SignatureVerifier {
    #private;
    constructor(options: SignatureVerifierOptions);
    verify(request: WebhookRequest, signal?: AbortSignal): Promise<boolean>;
}
export {};
