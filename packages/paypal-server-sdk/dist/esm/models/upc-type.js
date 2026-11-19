import * as s from "../core/validation/index.js";
/** The Universal Product Code type. */
export const UpcType = {
    UpcA: "UPC-A",
    UpcB: "UPC-B",
    UpcC: "UPC-C",
    UpcD: "UPC-D",
    UpcE: "UPC-E",
    Upc2: "UPC-2",
    Upc5: "UPC-5",
};
export const upcTypeSchema = s.enumOf(UpcType);
