import { on, isVisible } from '@inkline/inkline/src/helpers';

const onClickOutside = (element, binding) => (e) => {
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
export default {
    beforeMount(element, binding, vnode) {
        if (typeof window !== 'undefined') {
            on(window.document, 'mouseup', onClickOutside(element, binding, vnode));
        }
    }
};
