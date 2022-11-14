import type { InjectionKey, Ref } from 'vue';

export interface CheckboxGroupInjection {
    name: string;
    value: any[];
    size: Ref<string>;
    color: Ref<string>;
    disabled: Ref<boolean>;
    readonly: Ref<boolean>;
    onChange: (value: any) => void;
    onBlur: (event: FocusEvent) => void;
}

export const CheckboxGroupKey = Symbol('CheckboxGroup') as InjectionKey<CheckboxGroupInjection>;
