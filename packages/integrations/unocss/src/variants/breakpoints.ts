import type { Variant } from "@unocss/core";
import type { ResolvedTheme, ResolvedThemeBreakpoint } from "@inkline/config";
import { getPrefixFromGenerator } from "../utilities";

const breakpointsRegExCache: Record<string, RegExp> = {};

export const calcMinWidthBySize = (size: string) => {
    const value = size.match(/^-?[0-9]+\.?[0-9]*/)?.[0] || "";
    const unit = size.slice(value.length) || "px";

    return `${value}${unit}`;
};

export const calcMaxWidthBySize = (size: string) => {
    const value = size.match(/^-?[0-9]+\.?[0-9]*/)?.[0] || "";
    const unit = size.slice(value.length) || "px";

    const maxWidth = parseFloat(value) - 0.1;
    return Number.isNaN(maxWidth) ? size : `${maxWidth}${unit}`;
};

// <div class="_lt-xs:margin-0 _md-up:margin-1"></div>

export const breakpointsVariant: Variant<ResolvedTheme> = {
    name: "breakpoints",
    match(prefixedMatcher, { theme, generator }) {
        const prefix = getPrefixFromGenerator(generator);

        const breakpointVariantEntries: Array<
            [string, ResolvedThemeBreakpoint, number]
        > = Object.entries(theme.breakpoints).map(([breakpoint, size], idx) => [
            breakpoint,
            size,
            idx,
        ]);

        for (const [breakpoint, size, idx] of breakpointVariantEntries) {
            if (!breakpointsRegExCache[breakpoint]) {
                breakpointsRegExCache[breakpoint] = new RegExp(
                    `^${prefix}((?:[@<>]|[alg]t-)?${breakpoint}:)`,
                );
            }

            const match = prefixedMatcher.match(
                breakpointsRegExCache[breakpoint],
            );
            if (!match) {
                continue;
            }

            const [, breakpointPrefix] = match;

            const matcher = prefixedMatcher.replace(breakpointPrefix, "");

            const isLtPrefix =
                breakpointPrefix.startsWith("lt-") ||
                breakpointPrefix.startsWith("<");
            const isAtPrefix =
                breakpointPrefix.startsWith("at-") ||
                breakpointPrefix.startsWith("@");

            let order = 1000;

            if (isLtPrefix) {
                order -= idx + 1;
                return {
                    matcher,
                    handle: (input, next) =>
                        next({
                            ...input,
                            parent: `${
                                input.parent ? `${input.parent} $$ ` : ""
                            }@media (max-width: ${calcMaxWidthBySize(
                                `${size}`,
                            )})`,
                            parentOrder: order,
                        }),
                };
            }

            order += idx + 1;

            // support for windicss @<breakpoint> => last breakpoint will not have the upper bound
            if (isAtPrefix && idx < breakpointVariantEntries.length - 1) {
                return {
                    matcher,
                    handle: (input, next) =>
                        next({
                            ...input,
                            parent: `${
                                input.parent ? `${input.parent} $$ ` : ""
                            }@media (min-width: ${calcMinWidthBySize(`${size}`)}) and (max-width: ${calcMaxWidthBySize(
                                `${breakpointVariantEntries[idx + 1][1]}`,
                            )})`,
                            parentOrder: order,
                        }),
                };
            }

            return {
                matcher,
                handle: (input, next) =>
                    next({
                        ...input,
                        parent: `${
                            input.parent ? `${input.parent} $$ ` : ""
                        }@media (min-width: ${calcMinWidthBySize(`${size}`)})`,
                        parentOrder: order,
                    }),
            };
        }
    },
    multiPass: true,
    autocomplete: "(at-|lt-|)$breakpoints:",
};
