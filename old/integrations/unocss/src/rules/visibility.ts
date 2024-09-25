import type { Rule } from "@unocss/core";
import type { ResolvedTheme } from "@inkline/config";

export const visibilityRules: Rule<ResolvedTheme>[] = [
    [
        /^visible(?::(.+))?$/,
        ([_, display]) => ({
            display: `${display || "block"} !important`,
        }),
    ],
    [
        /^hidden$/,
        () => ({
            display: "none !important",
        }),
    ],
];
