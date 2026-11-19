import * as s from "../core/validation/index.js";
/** The customer's tax ID type. */
export const TaxIdType = {
    /** The individual tax ID type, typically is 11 characters long. */
    BrCpf: "BR_CPF",
    /** The business tax ID type, typically is 14 characters long. */
    BrCnpj: "BR_CNPJ",
};
export const taxIdTypeSchema = s.enumOf(TaxIdType);
//# sourceMappingURL=tax-id-type.js.map