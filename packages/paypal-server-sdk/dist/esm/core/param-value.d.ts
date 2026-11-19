import { type Entry } from "./validation/schema.js";
export type ParamStyle = "plain" | "indexed" | "unindexed" | "csv" | "ssv" | "tsv" | "psv";
export type ParamValue = string | number | boolean | bigint | null | undefined | readonly ParamValue[] | {
    readonly [key: string]: ParamValue;
};
export type Param = {
    readonly name: string;
    readonly value: unknown;
    readonly schema: Entry<unknown>;
};
export type StyledParam = {
    readonly name?: string;
    readonly value: unknown;
    readonly schema: Entry<unknown>;
    readonly style?: ParamStyle | undefined;
};
export type ParamPair = readonly [name: string, value: string];
export declare function flattenValue(value: ParamValue): string[];
export declare function encodedParam(source: StyledParam): ParamValue;
export declare function flatten(sources: readonly StyledParam[], join?: (items: readonly string[], separator: string) => string): ParamPair[];
export declare function isScalar(value: ParamValue): value is string | number | boolean | bigint;
export declare function scalar(value: string | number | boolean | bigint): string;
export declare function jsonValue(value: ParamValue): string;
