import Vue from 'vue';

export function removeEventListenerBinding (element, event, handler) {
    if (element && event) {
        element.removeEventListener(event, handler, false);
    }
}

export function detachEventBinding (element, event, handler) {
    if (element && event) {
        element.detachEvent('on' + event, handler);
    }
}

export const off = (function() {
    if (!Vue.prototype.$isServer && document.removeEventListener) {
        return removeEventListenerBinding;
    } else {
        return detachEventBinding;
    }
})();