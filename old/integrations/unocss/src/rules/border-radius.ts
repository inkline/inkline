import type { Rule } from "@unocss/core";
import { cornersPropertyRule } from "./helpers";
import type { ResolvedTheme } from "@inkline/config";

export const borderRadiusRules: Rule<ResolvedTheme>[] = [
    [
        /^border-radius()(?::(-?.+))?$/,
        cornersPropertyRule,
        { autocomplete: ["border-radius:<value>"] },
    ],
    [
        /^border-(top-left|top-right|bottom-right|bottom-left|top|right|bottom|left)-radius(?::(-?.+))?$/,
        cornersPropertyRule,
        {
            autocomplete:
                "border-(top-left|top-right|bottom-right|bottom-left|top|right|bottom|left)-radius:<value>",
        },
    ],
];
