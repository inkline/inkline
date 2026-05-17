import type { Ref, ComponentPublicInstance } from 'vue';
import { unref } from 'vue';

export function extractRefHTMLElement(
    ref: Ref<ComponentPublicInstance | HTMLElement | null>
): HTMLElement | null {
    const value = unref(ref);
    if (value) {
        if (value instanceof HTMLElement) {
            return value;
        }

        return value.$el;
    }

    return null;
}
