import type { ComputedRef, Ref } from 'vue';

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
