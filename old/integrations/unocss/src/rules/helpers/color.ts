import { CSSEntries, DynamicMatcher } from "@unocss/core";

export function colorPropertyRule(propertyName: string): DynamicMatcher {
    return ([_, value]: string[]): CSSEntries | undefined => {
        const getComputedSize = (color: string): string | number =>
            /^[A-Za-z-]+(-\d+)?$/.test(color) ? `var(--color-${color})` : color;

        if (value) {
            return [[propertyName, getComputedSize(value)]];
        }

        return undefined;
    };
}
