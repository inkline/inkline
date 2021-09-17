export function getStyleProperty (element: HTMLElement, property: string): any {
    if (!element || !property || typeof window === 'undefined') { return; }

    if ((element as any).currentStyle) {
        return (element as any).currentStyle[property];
    }

    const computedStyle = window.getComputedStyle(element, null);
    return computedStyle.getPropertyValue
        ? computedStyle.getPropertyValue(property)
        : computedStyle[property as any];
}
