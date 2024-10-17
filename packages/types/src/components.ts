import type { FormOption } from './forms';

export interface SelectOption extends FormOption {
    active?: boolean;
}

export interface CheckboxGroupOption extends FormOption {
    indeterminate?: boolean;
}

export type RadioGroupOption = FormOption;
