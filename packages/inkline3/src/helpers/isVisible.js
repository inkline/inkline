/**
 * Check if given element is visible
 *
 * @param element
 */
export function isVisible(element) {
    return Boolean(element) &&
        Boolean(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}