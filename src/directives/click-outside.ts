import { Directive } from 'vue';
import { on, isVisible } from '@inkline/inkline/src/helpers';

const onClickOutside = (element: HTMLElement, binding: any) => (e: { target: HTMLElement }) => {
    if (!isVisible(element) || !e.target) {
        return;
    }

    if (element === e.target || element.contains(e.target)) {
        return;
    }

    binding.value(e);
};

/**
 * v-click-outside
 * @example
 * ```vue
 * <div v-click-outside="handleClose">
 * ```
 */

const ClickOutsideDirective: Directive = {
    beforeMount(element: HTMLElement, binding: any) {
        if (typeof window !== 'undefined') {
            on(window.document as any, 'mouseup', onClickOutside(element, binding));
        }
    }
};

export default ClickOutsideDirective;
