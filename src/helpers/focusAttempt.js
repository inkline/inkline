import Vue from 'vue';
import { isFocusable } from './isFocusable.js';

/**
 * Set Attempt to set focus on the current node.
 *
 * @param element The node to attempt to focus on.
 * @returns true if element is focused.
 */
export function focusAttempt (element) {
    if (!isFocusable(element)) {
        return false;
    }

    try {
        element.focus();

    // eslint-disable-next-line
    } catch (e) {}

    return !Vue.prototype.$isServer && document && document.activeElement === element;
}
