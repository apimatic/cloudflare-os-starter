/**
 * The headers of an incoming webhook, as a fetch `Headers` or as the record a Node server hands
 * over (`IncomingHttpHeaders` fits). Names are matched without regard to case; a repeated header
 * is joined with `","`; an undefined value counts as absent.
 */
export type RequestHeaders = Headers | Readonly<Record<string, string | readonly string[] | undefined>>;
/**
 * The body of an incoming webhook still being streamed: a web `ReadableStream`, or any async
 * iterable of byte chunks, which a Node `Readable` such as `IncomingMessage` is.
 */
export type RequestBodyStream = ReadableStream<Uint8Array> | AsyncIterable<Uint8Array>;
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
export declare class WebhookRequest {
    #private;
    readonly body: Uint8Array;
    private constructor();
    /** The value of a header, matched without regard to case, or `undefined` when absent. */
    header(name: string): string | undefined;
    /** Builds a request from a body a framework has already buffered. */
    static fromBytes(body: string | Uint8Array | ArrayBuffer, headers: RequestHeaders): WebhookRequest;
    /**
     * Builds a request from a body still being streamed, reading it to the end. The stream is
     * consumed; read the bytes back from {@link WebhookRequest.body}.
     */
    static fromStream(body: RequestBodyStream, headers: RequestHeaders): Promise<WebhookRequest>;
    /** Builds a request from a fetch `Request`, reading a clone so the caller's body stays unread. */
    static fromRequest(request: Request): Promise<WebhookRequest>;
}
