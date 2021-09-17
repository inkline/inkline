export function addEventListenerBinding (element: HTMLElement, event: string, handler: any): void {
    if (element && event && handler) {
        element.addEventListener(event, handler, false);
    }
}

export function attachEventBinding (element: HTMLElement, event: string, handler: any): void {
    if (element && event && handler) {
        (element as any).attachEvent('on' + event, handler);
    }
}

export const _on = () => {
    if (typeof window === 'undefined') {
        return () => {};
    }

    if ((window as any).document.addEventListener) {
        return addEventListenerBinding;
    } else {
        return attachEventBinding;
    }
};

export const on = _on();
