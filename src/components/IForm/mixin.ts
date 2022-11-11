import type { InjectionKey } from 'vue';

export interface FormInjection {
    schema?: any;
    onInput: (name: any, value: any) => void;
    onBlur: (name: any, event: any) => void;
}

export const FormKey = Symbol('Form') as InjectionKey<FormInjection>;
