/// <reference types="type-fest" />

import { InklineOptionsKey, resolveOptions, UserOptions } from '@inkline/vue';

export function createTestingInklineOptionsProvide(userOptions: UserOptions = {}) {
    return {
        [InklineOptionsKey]: resolveOptions(userOptions)
    };
}
