import type { Rule } from "@unocss/core";
import { globalKeywords } from "../utilities";
import type { ResolvedTheme } from "@inkline/config";

const verticalAlignments = [
    "baseline",
    "top",
    "middle",
    "bottom",
    "text-top",
    "text-bottom",
    "sub",
    "super",
    ...globalKeywords,
];

export const verticalAlignmentRules: Rule<ResolvedTheme>[] =
    verticalAlignments.map(
        (value) =>
            [
                new RegExp(`^vertical-align:${value}$`),
                () => ({ "vertical-align": value }),
                {
                    autocomplete: `(vertical-align):(${verticalAlignments.join(
                        "|"
                    )})`,
                },
            ] as Rule
    );
