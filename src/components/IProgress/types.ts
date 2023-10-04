import { Ref } from 'vue';

export interface ProgressInjection {
    min: Ref<number | string>;
    max: Ref<number | string>;
}
