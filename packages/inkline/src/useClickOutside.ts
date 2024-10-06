import type { Ref } from 'vue';
import { unref } from 'vue';
import { isVisible, off, on } from '@inkline/utils';

type UseClickOutsideCallbackFn = ((event: Event) => void) | (() => void);

export function useClickOutside(props: {
    elementRef: Ref<HTMLElement | null>;
    fn: UseClickOutsideCallbackFn | Ref<UseClickOutsideCallbackFn>;
}) {
    const binding = (event: Event) => {
        const fn = unref(props.fn);

        if (!props.elementRef.value) {
            return;
        }

        const target = event.target as HTMLElement;

        if (!isVisible(props.elementRef.value) || !target) {
            return;
        }

        if (props.elementRef.value === target || props.elementRef.value.contains(target)) {
            return;
        }

        fn(event);
    };

    function addOnClickOutsideEventBindings() {
        if (typeof window === 'undefined') return;

        on(window.document, 'mousedown', binding);
    }

    function removeOnClickOutsideEventBindings() {
        if (typeof window === 'undefined') return;

        off(window.document, 'mousedown', binding);
    }

    return {
        addOnClickOutsideEventBindings,
        removeOnClickOutsideEventBindings
    };
}
