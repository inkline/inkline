import { InjectionKey, Ref } from 'vue';

export interface SelectOption {
    active?: boolean;
    disabled?: boolean;
    label: string;
    value: any;

    [key: string]: any;
}

export interface SelectInjection {
    value: Ref;
    idField: Ref<string>;
    onInput: (option: SelectOption) => void;
}

export const SelectKey = Symbol('Select') as InjectionKey<SelectInjection>;
