import type { VariantContext, VariantObject } from "@unocss/core";
import type { ResolvedTheme } from "@inkline/config";
import { getMediaFromGenerator, getPrefixFromGenerator } from "../utilities";
import { PresetMediaQueryMatcher } from "../types";

const defaultMatchers: PresetMediaQueryMatcher[] = [
    { matcher: "print", mediaQuery: "@media print" },
];

export const printVariant: VariantObject = {
    name: "media",
    match(matcher, { generator }: VariantContext<ResolvedTheme>) {
        const prefix = getPrefixFromGenerator(generator);
        const matchers = [
            ...defaultMatchers,
            ...getMediaFromGenerator(generator),
        ];

        for (const { matcher: mediaMatcher, mediaQuery } of matchers) {
            if (matcher.startsWith(`${prefix}${mediaMatcher}:`)) {
                return {
                    matcher: `${prefix}${matcher.slice(
                        mediaMatcher.length + 2
                    )}`,
                    handle: (input, next) =>
                        next({
                            ...input,
                            parent: `${
                                input.parent ? `${input.parent} $$ ` : ""
                            }${mediaQuery}`,
                        }),
                };
            }
        }
    },
    multiPass: true,
};
