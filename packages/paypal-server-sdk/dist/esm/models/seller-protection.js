import * as s from "../core/validation/index.js";
import { disputeCategorySchema } from "./dispute-category.js";
import { sellerProtectionStatusSchema } from "./seller-protection-status.js";
export const sellerProtectionSchema = s.object({
    status: s.optional(s.lazy(() => sellerProtectionStatusSchema)),
    disputeCategories: s.optional(s.array(s.lazy(() => disputeCategorySchema))),
    _keysMap: {
        disputeCategories: "dispute_categories",
    },
}, { additionalProperties: s.json() });
//# sourceMappingURL=seller-protection.js.map