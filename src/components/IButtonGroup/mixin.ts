import { ComputedRef, InjectionKey, Ref } from 'vue';

export interface ButtonGroupInjection {
    disabled: ComputedRef<boolean>;
    size: Ref<string>;
    color: Ref<string>;
}

export const ButtonGroupKey = Symbol('ButtonGroup') as InjectionKey<ButtonGroupInjection>;
