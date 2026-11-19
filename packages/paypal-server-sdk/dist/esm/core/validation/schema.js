import * as zod from "zod/v4-mini";
import { SchemaError, issuesList, issuesMessage } from "./schema-error.js";
export function object(shape, options) {
    const bag = bagOf(options);
    const zodType = memoized(() => buildObject(shape, bag));
    return schemaOf(zodType, {
        tagged: (discriminator, value) => buildObject(shape, bag, [discriminator, value]),
        keys: () => declaredKeysOf(shape, bag),
    });
}
function bagOf(options) {
    return options === undefined ? undefined : Object.entries(options)[0];
}
export function bestFit(models) {
    const build = () => {
        const candidates = models.map((model) => {
            const schema = built(model);
            return { type: schema.zod(), keys: schema.keys() };
        });
        return zod.codec(zod.custom(isRecord), zod.custom(isRecord), {
            decode: (body) => {
                for (const { type } of rankByUndeclared(candidates, Object.keys(body), "wire")) {
                    const result = type.safeParse(body);
                    if (result.success)
                        return result.data;
                }
                return { ...body };
            },
            encode: (value) => {
                for (const { type } of rankByUndeclared(candidates, Object.keys(value), "sdk")) {
                    const result = zod.safeEncode(type, value);
                    if (result.success)
                        return result.data;
                }
                return value;
            },
        });
    };
    return schemaOf(memoized(build), { keys: () => keysOfAll(models) });
}
function rankByUndeclared(candidates, keys, side) {
    return candidates
        .map((candidate) => ({ candidate, undeclared: undeclaredCount(candidate.keys?.[side], keys) }))
        .sort((a, b) => a.undeclared - b.undeclared)
        .map(({ candidate }) => candidate);
}
function undeclaredCount(declared, keys) {
    if (declared === undefined)
        return Number.POSITIVE_INFINITY;
    return keys.filter((key) => !declared.has(key)).length;
}
export function discriminatedUnion(discriminator, variants) {
    const build = () => {
        const members = Object.entries(variants).map(([value, variant]) => built(variant).tagged(discriminator, value));
        return zod.discriminatedUnion(discriminator, members);
    };
    return schemaOf(memoized(build), {
        keys: () => keysOfAll(Object.values(variants), discriminator),
    });
}
export function enumOf(members) {
    const values = Object.values(members);
    const base = values.every((value) => typeof value === "number")
        ? zod.number()
        : zod.string();
    return {
        ...of(base),
        values,
    };
}
export function of(zodType) {
    return schemaOf(() => zodType);
}
export function decodeWith(zodType, value) {
    const result = zodType.safeParse(value);
    if (result.success)
        return result.data;
    throw new SchemaError(issuesMessage(result.error), result.error);
}
export function encodeWith(zodType, value) {
    const result = zod.safeEncode(zodType, value);
    if (result.success)
        return result.data;
    throw new SchemaError(issuesMessage(result.error, "Type could not be encoded for the wire."), result.error);
}
export function validateWith(zodType, value) {
    const result = zod.safeEncode(zodType, value);
    if (result.success)
        return { success: true };
    return { success: false, message: issuesList(result.error) };
}
export function matchesWith(zodType, value) {
    return zod.safeEncode(zodType, value).success;
}
export function decodeEntry(schema, value) {
    return isSchema(schema) ? schema.decode(value) : decodeWith(schema, value);
}
export function encodeEntry(schema, value) {
    return isSchema(schema) ? schema.encode(value) : encodeWith(schema, value);
}
export function lazySchema(target) {
    const schema = memoized(() => built(target()));
    return schemaOf(() => schema().zod(), {
        tagged: (discriminator, value) => schema().tagged(discriminator, value),
        keys: () => schema().keys(),
    });
}
function schemaOf(zodType, options = {}) {
    return {
        zod: zodType,
        tagged: options.tagged ?? (() => zodType()),
        keys: options.keys ?? (() => undefined),
        decode: (value) => decodeWith(zodType(), value),
        encode: (value) => encodeWith(zodType(), value),
        validate: (value) => validateWith(zodType(), value),
        matches: (value) => matchesWith(zodType(), value),
    };
}
function memoized(build) {
    let memo;
    return () => (memo ??= build());
}
function declaredKeysOf(shape, bag) {
    const keysMap = keysMapOf(shape);
    const fields = Object.keys(shape).filter((key) => key !== "_keysMap");
    return {
        wire: new Set(fields.map((key) => keysMap.get(key) ?? key)),
        sdk: new Set(bag === undefined ? fields : [...fields, bag[0]]),
    };
}
function keysOfAll(schemas, ...shared) {
    const wire = new Set(shared);
    const sdk = new Set(shared);
    for (const schema of schemas) {
        const own = built(schema).keys();
        if (own === undefined)
            return undefined;
        for (const key of own.wire)
            wire.add(key);
        for (const key of own.sdk)
            sdk.add(key);
    }
    return { wire, sdk };
}
function buildObject(shape, bag, tag) {
    const keysMap = keysMapOf(shape);
    const wire = {};
    const renames = [];
    for (const [key, entry] of Object.entries(shape)) {
        if (key === "_keysMap")
            continue;
        const wireKey = keysMap.get(key) ?? key;
        wire[wireKey] = resolve(entry);
        if (wireKey !== key)
            renames.push([wireKey, key]);
    }
    if (tag)
        wire[tag[0]] = zod.literal(tag[1]);
    if (bag !== undefined && Object.hasOwn(wire, bag[0])) {
        throw new Error(`${bag[0]} is both the additional-properties key and a wire key of the shape`);
    }
    const object = bag === undefined
        ? zod.looseObject(wire)
        : collectExtras(zod.looseObject(wire), new Set(Object.keys(wire)), bag[0], resolve(bag[1]));
    const renaming = renames.length === 0
        ? object
        : zod.codec(object, zod.custom(), {
            decode: (value) => renameKeys(value, renames, "decode"),
            encode: (value) => renameKeys(value, renames, "encode"),
        });
    return renaming;
}
function keysMapOf(shape) {
    return new Map(Object.entries(shape._keysMap ?? {}));
}
function collectExtras(declaredObject, declared, key, entry) {
    const codec = zod.codec(zod.custom(), declaredObject, {
        decode: (value, payload) => {
            if (!isRecord(value)) {
                payload.issues.push({ code: "invalid_type", expected: "object", input: value, path: [] });
                return value;
            }
            const out = {};
            const extras = {};
            let found = false;
            for (const wireKey of Object.keys(value)) {
                const item = value[wireKey];
                if (declared.has(wireKey)) {
                    setOwn(out, wireKey, item);
                    continue;
                }
                found = true;
                const result = entry.safeParse(item);
                if (result.success)
                    setOwn(extras, wireKey, result.data);
                else
                    for (const issue of result.error.issues)
                        payload.issues.push(nested(issue, [wireKey]));
            }
            if (found)
                out[key] = extras;
            return out;
        },
        encode: (value, payload) => {
            const { [key]: extras, ...out } = value;
            if (extras === undefined)
                return out;
            if (!isRecord(extras)) {
                payload.issues.push({ code: "invalid_type", expected: "record", input: extras, path: [key] });
                return out;
            }
            for (const wireKey of Object.keys(extras)) {
                const item = extras[wireKey];
                if (declared.has(wireKey)) {
                    payload.issues.push({
                        code: "custom",
                        message: "declared by the model, so not an additional property",
                        input: item,
                        path: [key, wireKey],
                    });
                    continue;
                }
                const result = zod.safeEncode(entry, item);
                if (result.success)
                    setOwn(out, wireKey, result.data);
                else
                    for (const issue of result.error.issues)
                        payload.issues.push(nested(issue, [key, wireKey]));
            }
            return out;
        },
    });
    codec._zod.propValues = declaredObject._zod.propValues;
    return codec;
}
function nested(issue, under) {
    return { ...issue, path: [...under, ...issue.path] };
}
function setOwn(target, key, value) {
    Object.defineProperty(target, key, { value, enumerable: true, writable: true, configurable: true });
}
function renameKeys(value, renames, direction) {
    const out = { ...value };
    for (const [wireKey, key] of renames) {
        const [from, to] = direction === "decode" ? [wireKey, key] : [key, wireKey];
        if (!Object.hasOwn(out, from))
            continue;
        setOwn(out, to, out[from]);
        delete out[from];
    }
    return out;
}
function isRecord(value) {
    if (value === null || typeof value !== "object")
        return false;
    const prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
}
export function resolve(entry) {
    return isSchema(entry) ? built(entry).zod() : entry;
}
function built(schema) {
    return schema;
}
function isSchema(entry) {
    return typeof entry.decode === "function";
}
//# sourceMappingURL=schema.js.map