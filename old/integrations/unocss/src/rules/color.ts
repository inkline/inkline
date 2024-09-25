import type { Rule } from "@unocss/core";
import { colorPropertyRule } from "./helpers";
import type { ResolvedTheme } from "@inkline/config";

export const colorRules: Rule<ResolvedTheme>[] = [
    [
        /^(?:text-)?color(?::(-?.+))?$/,
        colorPropertyRule("color"),
        { autocomplete: ["color:<value>", "text-color:<value>"] },
    ],
    [
        /^background(?:-color)?(?::(-?.+))?$/,
        colorPropertyRule("background-color"),
        { autocomplete: ["background:<value>", "background-color:<value>"] },
    ],
];
