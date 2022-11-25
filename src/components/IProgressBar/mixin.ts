import { InjectionKey, Ref } from 'vue';

export interface ProgressInjection {
    min: Ref<number | string>;
    max: Ref<number | string>;
}

export const ProgressKey = Symbol('Progress') as InjectionKey<ProgressInjection>;
