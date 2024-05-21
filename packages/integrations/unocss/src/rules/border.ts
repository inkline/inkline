import type { Rule } from "@unocss/core";
import { borderPropertyRule } from "./helpers";
import type { ResolvedTheme } from "@inkline/config";

export const borderRules: Rule<ResolvedTheme>[] = [
    [
        /^border(?::(-?.+))?$/,
        borderPropertyRule,
        { autocomplete: ["border:<value>"] },
    ],
    [
        /^border-(width|style|color)(?::(-?.+))?$/,
        borderPropertyRule,
        { autocomplete: "border-(width|style|color):<value>" },
    ],
    [
        /^border-(top|right|bottom|left|start|end|x|y)(?::(-?.+))?$/,
        borderPropertyRule,
        {
            autocomplete:
                "border-(top|right|bottom|left|start|end|x|y):<value>",
        },
    ],
    [
        /^border(?:-(top|right|bottom|left|start|end|x|y))?(?:-(width|style|color))?(?::(-?.+))?$/,
        borderPropertyRule,
        {
            autocomplete:
                "border-(top|right|bottom|left|start|end|x|y)-(width|style|color):<value>",
        },
    ],
];
