import type { Rule } from "@unocss/core";
import type { ResolvedTheme } from "@inkline/config";

export const overflowRules: Rule<ResolvedTheme>[] = [
    [/^overflow:(.+)$/, ([_, value]) => ({ overflow: value })],
];
