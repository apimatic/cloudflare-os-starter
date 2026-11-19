import * as s from "../core/validation/index.js";
import { avsCodeSchema } from "./avs-code.js";
import { cvvCodeSchema } from "./cvv-code.js";
export const cardVerificationProcessorResponseSchema = s.object({
    avsCode: s.optional(s.lazy(() => avsCodeSchema)),
    cvvCode: s.optional(s.lazy(() => cvvCodeSchema)),
    _keysMap: {
        avsCode: "avs_code",
        cvvCode: "cvv_code",
    },
}, { additionalProperties: s.json() });
