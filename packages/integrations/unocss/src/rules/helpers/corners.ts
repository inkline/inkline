import { CSSEntries } from "@unocss/core";
import { cornersMap } from "../../utilities";
import { cornersPropertyKeys } from "@inkline/config";
import { toKebabCase } from "@grozav/utils";

export function cornersPropertyRule([_, corner, value]: string[]):
    | CSSEntries
    | undefined {
    if (!value) {
        value = "1";
    }

    const getComputedSize = (side: string, size: string): string =>
        /^-?\d+(\.\d+)?$/.test(size)
            ? size === "1"
                ? `var(--border-${side}-radius)`
                : `calc(var(--border-${side}-radius) * ${size})`
            : size;

    if (value) {
        if (corner) {
            return cornersMap[corner].map((cornerKey) => [
                `border-${cornerKey}-radius`,
                getComputedSize(cornerKey, value),
            ]);
        }

        return cornersPropertyKeys.map((key) => {
            const cornerKey = toKebabCase(key);

            return [
                `border-${cornerKey}-radius`,
                getComputedSize(cornerKey, value),
            ];
        });
    }

    return undefined;
}
