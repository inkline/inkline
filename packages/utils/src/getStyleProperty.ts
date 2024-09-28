export function getStyleProperty(element: HTMLElement, property: string): string | number | null | undefined {
    if (!element || !property || typeof window === 'undefined') {
        return;
    }

    // Checking for currentStyle (used in older versions of IE)
    const currentStyle = (element as HTMLElement & { currentStyle?: CSSStyleDeclaration }).currentStyle;
    if (currentStyle && typeof currentStyle === 'object') {
        return currentStyle[property as keyof CSSStyleDeclaration] as string | number;
    }

    // Using getComputedStyle for modern browsers
    const computedStyle = window.getComputedStyle(element, null);
    const value = computedStyle.getPropertyValue
        ? computedStyle.getPropertyValue(property)
        : computedStyle[property as keyof typeof computedStyle];

    return value as string | number;
}
