import * as s from "../core/validation/index.js";
import { avsCodeSchema } from "./avs-code.js";
import { cvvCodeSchema } from "./cvv-code.js";
import { paymentAdviceCodeSchema } from "./payment-advice-code.js";
import { processorResponseCodeSchema } from "./processor-response-code.js";
export const processorResponseSchema = s.object({
    avsCode: s.optional(s.lazy(() => avsCodeSchema)),
    cvvCode: s.optional(s.lazy(() => cvvCodeSchema)),
    responseCode: s.optional(s.lazy(() => processorResponseCodeSchema)),
    paymentAdviceCode: s.optional(s.lazy(() => paymentAdviceCodeSchema)),
    _keysMap: {
        avsCode: "avs_code",
        cvvCode: "cvv_code",
        responseCode: "response_code",
        paymentAdviceCode: "payment_advice_code",
    },
}, { additionalProperties: s.json() });
//# sourceMappingURL=processor-response.js.map