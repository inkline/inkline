import { toDashCase } from './to-dash-case';

export function breakpointClass (className, breakpoint) {
    if (typeof breakpoint === 'string' && breakpoint !== '') {
        return `${toDashCase(className)}-${breakpoint}`;
    }

    return breakpoint ? toDashCase(className) : '';
}
