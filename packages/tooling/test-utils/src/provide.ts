/// <reference types="type-fest" />

import { InklineOptionsKey, resolveOptions } from '@inkline/vue';
import { InklineOptions, UserOptions } from '@inkline/types';
import { Ref, ref } from 'vue';

export function createTestingInklineOptionsProvide(
    userOptions: UserOptions = {}
): Record<string, Ref<InklineOptions>> {
    return {
        [InklineOptionsKey]: ref(resolveOptions(userOptions))
    };
}
