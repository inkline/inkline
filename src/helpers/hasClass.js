/**
 * Check whether given element has given className
 *
 * @param element
 * @param className
 * @returns {boolean}
 */
export function hasClass (element, className) {
    if (!element || !className) return false;
    if (className.indexOf(' ') !== -1) throw new Error('Class name should not contain spaces.');

    if (element.classList) {
        return element.classList.contains(className);
    } else {
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    }
}
