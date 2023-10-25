import { Ref } from 'vue';

export interface SelectOption {
    id?: string | number;
    label: string;
    active?: boolean;
    disabled?: boolean;
    [key: string]: any;
}

export interface SelectInjection {
    value: Ref;
    idField: Ref<string>;
    onInput: (option: SelectOption) => void;
}
