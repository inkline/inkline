import { ComponentPublicInstance, MaybeRef, unref } from 'vue';

export function unrefHTMLElement(
    reference: MaybeRef<ComponentPublicInstance | HTMLElement | null>
): HTMLElement | null {
    const value = unref(reference);
    if (value) {
        if (value instanceof HTMLElement) {
            return value;
        }

        return value.$el as HTMLElement;
    }

    return null;
}
