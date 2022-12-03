import { InjectionKey, Ref } from 'vue';

export interface SelectOption {
    active?: boolean;
    disabled?: boolean;
    label: string;
    value: any;

    [key: string]: any;
}

export interface SelectInjection {
    value: Ref<string>;
    onInput: (value: string | number | Record<string, any> | undefined, label: string) => void;
}

export const SelectKey = Symbol('Select') as InjectionKey<SelectInjection>;
