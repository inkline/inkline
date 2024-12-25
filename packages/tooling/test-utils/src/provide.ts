/// <reference types="type-fest" />

import { resolveOptions } from '@inkline/vue';
import { InklineOptionsKey, InklineOptions, UserOptions } from '@inkline/types';
import { Ref, ref } from 'vue';

export function createTestingInklineOptionsProvide(
    userOptions: UserOptions = {}
): Record<string, Ref<InklineOptions>> {
    return {
        [InklineOptionsKey]: ref(resolveOptions(userOptions))
    };
}
