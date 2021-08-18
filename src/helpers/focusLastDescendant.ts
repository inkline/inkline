import { focusAttempt } from './focusAttempt';

/**
 * Find the last descendant node that is focusable.
 *
 * @param element DOM node for which to find the last focusable descendant.
 * @returns true if a focusable element is found and focus is set.
 */
export function focusLastDescendant (element: HTMLElement): boolean {
    for (let i = element.childNodes.length - 1; i >= 0; i--) {
        const child = element.childNodes[i];

        if (focusAttempt(child as any) || focusLastDescendant(child as any)) {
            return true;
        }
    }

    return false;
}
