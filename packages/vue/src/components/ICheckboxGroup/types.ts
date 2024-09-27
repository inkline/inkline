import type { ComputedRef, Ref } from 'vue';
import type { FormOption } from '@inkline/inkline/types';

export interface CheckboxGroupInjection {
    name: Ref<string>;
    value: ComputedRef<unknown[]>;
    size: Ref<string>;
    color: Ref<string>;
    disabled: Ref<boolean>;
    readonly: Ref<boolean>;
    onChange: (value: any) => void;
    onBlur: (event: FocusEvent) => void;
}

export interface CheckboxGroupOption extends FormOption {
    indeterminate?: boolean;
}
