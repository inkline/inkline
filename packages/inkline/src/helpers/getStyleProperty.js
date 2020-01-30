import Vue from 'vue';

export function getStyleProperty (element, property) {
    if (!element || !property || Vue.prototype.$isServer && !window) { return; }

    if (element.currentStyle) {
        return element.currentStyle[property];
    }

    if (window.getComputedStyle.getPropertyValue) {
        return window.getComputedStyle(element, null).getPropertyValue(property);
    } else {
        return window.getComputedStyle(element)[property];
    }
}
