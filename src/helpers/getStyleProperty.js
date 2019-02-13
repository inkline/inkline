export function getStyleProperty (element, property) {
    if (!element || !property) { return; }

    if (element.currentStyle) {
        return element.currentStyle[property];
    }

    if (window.getComputedStyle.getPropertyValue) {
        return window.getComputedStyle(element, null).getPropertyValue(property);
    } else {
        return window.getComputedStyle(element)[property];
    }
}