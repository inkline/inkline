import type { ComputedRef, Ref } from 'vue';

export interface ButtonGroupInjection {
    disabled: ComputedRef<boolean>;
    size: Ref<string>;
    color: Ref<string>;
}
