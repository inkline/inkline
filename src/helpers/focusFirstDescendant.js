import { focusAttempt } from './focusAttempt';

/**
 * Set focus on descendant nodes until the first focusable element is found.
 *
 * @param element DOM node for which to find the first focusable descendant.
 * @returns true if a focusable element is found and focus is set.
 */
export function focusFirstDescendant (element) {
    for (let i = 0; i < element.childNodes.length; i++) {
        const child = element.childNodes[i];

        if (focusAttempt(child) || focusFirstDescendant(child)) {
            return true;
        }
    }

    return false;
}
