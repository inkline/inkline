export function removeEventListenerBinding(element, event, handler) {
    if (element && event) {
        element.removeEventListener(event, handler, false);
    }
}
export function detachEventBinding(element, event, handler) {
    if (element && event) {
        element.detachEvent('on' + event, handler);
    }
}
export const _off = () => {
    if (typeof window === 'undefined') {
        return () => { };
    }
    // @ts-ignore
    if (window.document.removeEventListener) {
        return removeEventListenerBinding;
    }
    else {
        return detachEventBinding;
    }
};
export const off = _off();
//# sourceMappingURL=off.js.map