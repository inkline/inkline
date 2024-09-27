import { createInklineService, defaultOptions } from '@inkline/inkline/plugin';

export function createInkline() {
    return createInklineService(defaultOptions);
}
