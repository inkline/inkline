import type { InjectionKey } from 'vue';

export interface CheckboxGroupInjection {
    name: string;
    value: any[];
    onChange: (value: any) => void;
    onBlur: (event: FocusEvent) => void;
}

export const CheckboxGroupKey = Symbol('CheckboxGroup') as InjectionKey<CheckboxGroupInjection>;
