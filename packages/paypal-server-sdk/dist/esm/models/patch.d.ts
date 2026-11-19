import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type PatchOp } from "./patch-op.js";
/** The JSON patch object to apply partial updates to resources. */
export type Patch = {
    /** The operation. */
    op: PatchOp;
    /** The JSON Pointer to the target document location at which to complete the operation. */
    path?: string;
    /**
     * The value to apply. The remove, copy, and move operations do not require a value. Since JSON
     * Patch allows any type for value, the type property is not specified.
     */
    value?: JsonValue;
    /**
     * The JSON Pointer to the target document location from which to move the value. Required for the
     * move operation.
     */
    from?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const patchSchema: Schema<Patch>;
