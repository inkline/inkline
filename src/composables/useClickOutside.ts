import type { Ref} from 'vue';
import { onMounted, onUnmounted, unref } from 'vue';
import { isVisible, off, on } from '@grozav/utils';

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

    onMounted(() => {
        if (typeof window !== 'undefined') {
            on(window.document, 'mousedown', binding);
        }
    });

    onUnmounted(() => {
        if (typeof window !== 'undefined') {
            off(window.document, 'mousedown', binding);
        }
    });
}
