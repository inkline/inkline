export function getStyleProperty (element: HTMLElement, property: string): any {
    if (!element || !property || typeof window === 'undefined') { return; }

    if ((element as any).currentStyle) {
        return (element as any).currentStyle[property];
    }

    if ((window as any).getComputedStyle.getPropertyValue) {
        return window.getComputedStyle(element, null).getPropertyValue(property);
    } else {
        return window.getComputedStyle(element)[property as any];
    }
}
