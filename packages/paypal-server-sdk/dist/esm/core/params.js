import { flatten } from "./param-value.js";
export function percentEncode(value) {
    return encodeURIComponent(value).replace(/[!'()*]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`);
}
export function formEncode(value) {
    return percentEncode(value).replace(/%20/g, "+");
}
export function queryString(layers) {
    return layers
        .flatMap((layer) => flatten(layer, queryValue))
        .map(([key, value]) => `${percentEncode(key)}=${value}`)
        .join("&");
}
export function formString(fields) {
    return serializePairs(flatten(fields), formEncode);
}
function queryValue(items, separator) {
    return items.map(percentEncode).join(separator === "," ? separator : percentEncode(separator));
}
export function serializePairs(pairs, encode) {
    return pairs.map(([key, value]) => `${encode(key)}=${encode(value)}`).join("&");
}
//# sourceMappingURL=params.js.map