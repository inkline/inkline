import type { Rule } from "@unocss/core";
import type { ResolvedTheme } from "@inkline/config";

export const sizingRules: Rule<ResolvedTheme>[] = [
    [/^height:(.+)$/, ([, value]) => ({ height: value })],
    [/^max-height:(.+)$/, ([, value]) => ({ "max-height": value })],
    [/^width:(.+)$/, ([, value]) => ({ width: value })],
    [/^max-width:(.+)$/, ([, value]) => ({ "max-width": value })],
];
