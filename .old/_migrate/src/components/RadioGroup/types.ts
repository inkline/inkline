import type { Ref } from 'vue';
import type { FormOption } from '@inkline/inkline/types';

export interface RadioGroupInjection {
    name: Ref<string>;
    value: Ref;
    size: Ref<string>;
    color: Ref<string>;
    disabled: Ref<boolean>;
    readonly: Ref<boolean>;
    onChange: (value: any) => void;
    onBlur: (event: FocusEvent) => void;
}

export type RadioGroupOption = FormOption;
