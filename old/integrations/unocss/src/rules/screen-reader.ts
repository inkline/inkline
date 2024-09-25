import { toEscapedSelector as e } from "unocss";
import type { Rule } from "@unocss/core";
import type { ResolvedTheme } from "@inkline/config";

const visuallyHiddenCSS = `    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    top: 1px;
    left: 1px;
    overflow: hidden;`;

export const screenReaderRules: Rule<ResolvedTheme>[] = [
    [
        /^visually-hidden$/,
        (_, { rawSelector }) => {
            const selector = e(rawSelector);

            return `${selector} {${visuallyHiddenCSS}}`;
        },
    ],
    [
        /^visually-hidden:focusable$/,
        (_, { rawSelector }) => {
            const selector = e(rawSelector);

            return `${selector}:not(:focus):not(:active) {${visuallyHiddenCSS}}`;
        },
    ],
];
