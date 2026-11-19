import type { EnumSchema } from "../core/validation/schema.js";
/** The customer's tax ID type. */
export declare const TaxIdType: {
    /** The individual tax ID type, typically is 11 characters long. */
    readonly BrCpf: "BR_CPF";
    /** The business tax ID type, typically is 14 characters long. */
    readonly BrCnpj: "BR_CNPJ";
};
export type TaxIdType = (typeof TaxIdType)[keyof typeof TaxIdType] | (string & {});
export declare const taxIdTypeSchema: EnumSchema<TaxIdType>;
