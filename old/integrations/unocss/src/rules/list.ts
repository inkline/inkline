import { toEscapedSelector as e } from "unocss";
import type { Rule } from "@unocss/core";
import type { ResolvedTheme } from "@inkline/config";

export const listRules: Rule<ResolvedTheme>[] = [
    [
        /^list:inline$/,
        (_, { rawSelector }) => {
            const selector = e(rawSelector);

            return `${selector} {
    padding-left: 0;
    list-style: none;
}

${selector} > .item,
${selector} > li {
    display: inline-flex;
    margin-bottom: 0;
}

${selector} > .item:not(:last-child),
${selector} > li:not(:last-child) {
    margin-right: var(--list--inline--item--margin-right, var(--margin-right));
}`;
        },
    ],
    [
        "list:unstyled",
        {
            "padding-left": 0,
            "list-style": "none",
        },
    ],
];
