import { isArray } from "./isArray";

export function toVariantList(variant: string | string[]) {
    if (!variant) {
        return [];
    }

    if (isArray<string>(variant)) {
        return variant;
    }

    return variant.split(/\s+/g);
}
