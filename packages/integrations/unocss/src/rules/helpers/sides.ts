import { CSSEntries, DynamicMatcher } from "@unocss/core";
import { sidesMap } from "../../utilities";
import { SidesPropertyKey, sidesPropertyKeys } from "@inkline/config";

const modifierMap = {
    block: ["block"],
    "block-start": ["block-start"],
    "block-end": ["block-end"],
    inline: ["inline"],
    "inline-start": ["inline-start"],
    "inline-end": ["inline-end"],
};

export function sidesPropertyRule(propertyName: string): DynamicMatcher {
    return ([_, side, value]: string[]): CSSEntries | undefined => {
        if (!value) {
            value = "1";
        }

        const getComputedSize = (
            propertyName: string,
            side: SidesPropertyKey,
            size: string,
        ): string => {
            const variable = sidesPropertyKeys.includes(side)
                ? `var(--${propertyName}-${side})`
                : "var(--spacing)";

            return /^-?\d+(\.\d+)?(\/\d+)?$/.test(size)
                ? size === "1"
                    ? variable
                    : `calc(${variable} * ${size})`
                : size;
        };

        if (value) {
            if (side) {
                return { ...sidesMap, ...modifierMap }[side].map(
                    (sideKey: SidesPropertyKey) => [
                        `${propertyName}-${sideKey}`,
                        getComputedSize(propertyName, sideKey, value),
                    ],
                );
            }

            return sidesPropertyKeys.map((key) => [
                `${propertyName}-${key}`,
                getComputedSize(propertyName, key, value),
            ]);
        }

        return undefined;
    };
}
