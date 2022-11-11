import type { InjectionKey } from 'vue';
import { Ref } from 'vue';

export interface FormGroupInjection {
    size: Ref<string>;
    color: Ref<string>;
    disabled: Ref<boolean>;
    readonly: Ref<boolean>;
    onInput: (name: any, value: any) => void;
    onBlur: (name: any, event: any) => void;
}

export const FormGroupKey = Symbol('FormGroup') as InjectionKey<FormGroupInjection>;
