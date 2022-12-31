import { createInklineGlobal, defaultOptions } from '@inkline/inkline/plugin';

export function createInkline() {
    return createInklineGlobal(defaultOptions);
}
