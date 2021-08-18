export function isFocusable (element: HTMLElement): boolean {
    if (element.tabIndex > 0 || (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)) {
        return true;
    }

    if ((element as any).disabled) {
        return false;
    }

    switch (element.nodeName) {
    case 'A':
        return !!(element as any).href && (element as any).rel !== 'ignore';
    case 'INPUT':
        return (element as any).type !== 'hidden' && (element as any).type !== 'file';
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA':
        return true;
    default:
        return false;
    }
}
