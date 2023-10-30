import { Ref } from 'vue';
import { FormOption } from '@inkline/inkline/types';

export interface SelectOption extends FormOption {
    active?: boolean;
}

export interface SelectInjection {
    value: Ref<SelectOption['id']>;
    disabled: Ref<boolean>;
    idField: Ref<string>;
    onInput: (option: SelectOption) => void;
}
