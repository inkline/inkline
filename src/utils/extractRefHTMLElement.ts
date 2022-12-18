import { Ref, ComponentPublicInstance } from 'vue';

export function extractRefHTMLElement(
    ref: Ref<ComponentPublicInstance | HTMLElement | null>
): HTMLElement | null {
    if (ref.value) {
        if (ref.value instanceof HTMLElement) {
            return ref.value;
        }

        return ref.value.$el;
    }

    return null;
}
