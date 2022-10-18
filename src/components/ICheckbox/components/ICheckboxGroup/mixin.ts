import type { InjectionKey } from 'vue';

export interface CheckboxGroupInjection {
    onChange?: any;
    onBlur?: any;
    values?: any[];
}

export const CheckboxGroupKey = Symbol('CheckboxGroup') as InjectionKey<CheckboxGroupInjection>;
