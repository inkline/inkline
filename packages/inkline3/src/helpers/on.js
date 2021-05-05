export function addEventListenerBinding (element, event, handler) {
    if (element && event && handler) {
        element.addEventListener(event, handler, false);
    }
}

export function attachEventBinding (element, event, handler) {
    if (element && event && handler) {
        element.attachEvent('on' + event, handler);
    }
}

export const _on = () => {
    if (typeof window === 'undefined') {
        return () => {};
    }

    if (window.document.addEventListener) {
        return addEventListenerBinding;
    } else {
        return attachEventBinding;
    }
};

export const on = _on();
