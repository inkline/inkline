import type { Rule } from "@unocss/core";
import { globalKeywords } from "../utilities";
import type { ResolvedTheme } from "@inkline/config";

const textAlignments = [
    "center",
    "left",
    "right",
    "justify",
    "start",
    "end",
    ...globalKeywords,
];

export const typographyRules: Rule<ResolvedTheme>[] = [
    ...textAlignments.map(
        (value) =>
            [
                new RegExp(`^text(-align)?:${value}$`),
                () => ({ "text-align": value }),
                {
                    autocomplete: `(text-align|text):(${textAlignments.join(
                        "|",
                    )})`,
                },
            ] as Rule,
    ),
    [
        /^text(?:-transform)?:(none|lowercase|uppercase|capitalize)$/,
        ([, value]) => ({ "text-transform": value }),
    ],
    [
        /^(?:font-weight|text):(lighter|extralight|light|normal|semibold|bold|black|bolder)$/,
        ([, value]) => ({ "font-weight": `var(--font-weight-${value})` }),
    ],
    [
        /^(?:font-size|text):(xs|sm|md|lg|xl|xxl)$/,
        ([, value]) => ({ "font-size": `var(--font-size-${value})` }),
    ],
    [
        /^(?:font-style|text):(normal|italic|oblique)$/,
        ([, value]) => ({ "font-style": value }),
    ],
    [
        /^(?:font-family|text):(?:(primary|secondary)-)?(base|monospace|print)$/,
        ([, category, type]) => {
            const resolvedCategory = category ? `-${category}` : "";
            return {
                "font-family": `var(--font-family${resolvedCategory}-${type})`,
            };
        },
    ],
    [
        /^(?:white-space|text):(normal|nowrap|pre|pre-line|pre-wrap)$/,
        ([, value]) => ({ "white-space": value }),
    ],
    [
        /^text:(muted|weak|weaker|weakest)$/,
        ([, value]) => {
            const aliases = {
                muted: "weak",
            };

            return {
                color: `var(--text-color-${aliases[value] || value})`,
            };
        },
    ],
    ["text:reset", { color: "inherit" }],
    ["text:hide", { "text-indent": "-10000px" }],
    [
        "text:truncate",
        {
            overflow: "hidden",
            "text-overflow": "ellipsis",
            "white-space": "nowrap",
        },
    ],
    [
        "text:break-word",
        { "word-break": "break-word", "word-wrap": "break-word" },
    ],
    [
        /^text-decoration:(none|underline|line-through|overline|inherit)$/,
        ([, value]) => ({ "text-decoration": value }),
    ],
];
