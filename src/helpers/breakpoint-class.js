export function helper (className, breakpoint) {
    if (typeof breakpoint === 'string') {
        return `${className}-${breakpoint}`;
    }

    return breakpoint ? className : '';
}
