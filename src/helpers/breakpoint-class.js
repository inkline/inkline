import {toDashCase} from './index';

export function helper (className, breakpoint) {
    if (typeof breakpoint === 'string' && breakpoint !== '') {
        return `${toDashCase(className)}-${breakpoint}`;
    }

    return breakpoint ? toDashCase(className) : '';
}
