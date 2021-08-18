import { on, isVisible } from '../helpers';
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
const ClickOutsideDirective = {
    beforeMount(element, binding) {
        if (typeof window !== 'undefined') {
            on(window.document, 'mouseup', onClickOutside(element, binding));
        }
    }
};
export default ClickOutsideDirective;
//# sourceMappingURL=click-outside.js.map