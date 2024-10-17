/// <reference types="type-fest" />

import { InklineOptionsKey, resolveOptions } from '@inkline/vue';
import type { UserOptions } from '@inkline/types';

export function createTestingInklineOptionsProvide(userOptions: UserOptions = {}) {
    return {
        [InklineOptionsKey]: resolveOptions(userOptions)
    };
}
