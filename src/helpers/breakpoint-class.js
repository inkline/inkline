export function helper (className, breakpoint) {
    if (typeof breakpoint === 'string' && breakpoint !== '') {
        return `${className}-${breakpoint}`;
    }

    return breakpoint ? className : '';
}
