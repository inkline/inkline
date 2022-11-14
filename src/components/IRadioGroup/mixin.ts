import type { InjectionKey, Ref } from 'vue';

export interface RadioGroupInjection {
    name: string;
    value: Ref;
    size: Ref<string>;
    color: Ref<string>;
    disabled: Ref<boolean>;
    readonly: Ref<boolean>;
    onChange: (value: any) => void;
    onBlur: (event: FocusEvent) => void;
}

export const RadioGroupKey = Symbol('RadioGroup') as InjectionKey<RadioGroupInjection>;
