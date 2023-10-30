import { Ref } from 'vue';
import { FormOption } from '@inkline/inkline/types';

export interface SelectOption extends FormOption {
    active?: boolean;
}

export interface SelectInjection {
    value: Ref;
    idField: Ref<string>;
    onInput: (option: SelectOption) => void;
}
