import type { Rule } from "@unocss/core";
import { sidesPropertyRule } from "./helpers";
import type { ResolvedTheme } from "@inkline/config";

export const paddingRules: Rule<ResolvedTheme>[] = [
    [
        /^padding()(?::(-?.+))?$/,
        sidesPropertyRule("padding"),
        { autocomplete: ["(margin|padding):<num>"] },
    ],
    [
        /^padding-(top|right|bottom|left|start|end|x|y)(?::(-?.+))?$/,
        sidesPropertyRule("padding"),
        { autocomplete: "(margin|padding)-<sides>:<num>" },
    ],
    [
        /^padding-(block|inline)(?::(-?.+))?$/,
        sidesPropertyRule("padding"),
        { autocomplete: "(margin|padding)-(block|inline):<num>" },
    ],
    [
        /^padding-(block-start|block-end|inline-start|inline-end)(?::(-?.+))?$/,
        sidesPropertyRule("padding"),
        {
            autocomplete:
                "(margin|padding)-(block-start|block-end|inline-start|inline-end):<num>",
        },
    ],
];

export const marginRules: Rule<ResolvedTheme>[] = [
    [/^margin()(?::(-?.+))?$/, sidesPropertyRule("margin")],
    [
        /^margin-(top|right|bottom|left|start|end|x|y)(?::(-?.+))?$/,
        sidesPropertyRule("margin"),
    ],
    [
        /^margin-(block|block-start|block-end|inline|inline-start|inline-end)(?::(-?.+))?$/,
        sidesPropertyRule("margin"),
    ],
];
