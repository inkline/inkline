export function getStyleProperty(element, property) {
    if (!element || !property || typeof window === 'undefined') {
        return;
    }
    if (element.currentStyle) {
        return element.currentStyle[property];
    }
    if (window.getComputedStyle.getPropertyValue) {
        return window.getComputedStyle(element, null).getPropertyValue(property);
    }
    else {
        return window.getComputedStyle(element)[property];
    }
}
//# sourceMappingURL=getStyleProperty.js.map