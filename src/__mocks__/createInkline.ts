import { createInklineGlobals, defaultOptions } from '@inkline/inkline/plugin';

export function createInkline() {
    return createInklineGlobals(defaultOptions);
}
