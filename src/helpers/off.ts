export function removeEventListenerBinding (element: HTMLElement, event: string, handler: any): void {
    if (element && event) {
        element.removeEventListener(event, handler, false);
    }
}

export function detachEventBinding (element: HTMLElement, event: string, handler: any): void {
    if (element && event) {
        (element as any).detachEvent('on' + event, handler);
    }
}

export const _off = () => {
    if (typeof window === 'undefined') {
        return () => {};
    }

    if ((window as any).document.removeEventListener) {
        return removeEventListenerBinding;
    } else {
        return detachEventBinding;
    }
};

export const off = _off();
