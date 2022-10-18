import type { InjectionKey } from 'vue';

export interface FormGroupInjection {
    onInput?: (name: any, value: any) => void;
    onBlur?: (name: any, event: any) => void;
}

export const FormGroupKey = Symbol('FormGroup') as InjectionKey<FormGroupInjection>;
