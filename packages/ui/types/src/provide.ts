import type { ComputedRef, Ref } from 'vue';
import type { SelectOption } from './components';
import { FormErrorCondition, ResolvedFormSchema } from './forms';

export interface ButtonGroupInjection {
    disabled: ComputedRef<boolean>;
    size: ComputedRef<string>;
    color: ComputedRef<string>;
}

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

export interface CollapsibleInjection {
    activeItems: Ref<string[]>;
    onItemClick: (id: string) => void;
}

export interface DropdownInjection {
    color: Ref<string>;
    disabled: Ref<boolean>;
    size: Ref<string>;
    onItemClick: (event: Event) => void;
}

export interface FormInjection {
    schema: Ref<ResolvedFormSchema<any> | undefined>;
    size: Ref<string>;
    color: Ref<string>;
    disabled: Ref<boolean>;
    readonly: Ref<boolean>;
    errorCondition: Ref<FormErrorCondition | undefined>;
    onInput: (name: string, value: any) => void;
    onBlur: (name: string, event: any) => void;
}

export interface FormGroupInjection {
    size: Ref<string>;
    color: Ref<string>;
    disabled: Ref<boolean>;
    readonly: Ref<boolean>;
    errorCondition: Ref<FormErrorCondition | undefined>;
    onInput: (name: any, value: any) => void;
    onBlur: (name: any, event: any) => void;
}

export interface ModalInjection {
    show: () => void;
    hide: () => void;
}

export interface NavInjection {
    onItemClick: (event: Event) => void;
}

export interface NavbarInjection {
    collapsible: Ref<boolean>;
    open: Ref<boolean>;
    onItemClick: (event: Event) => void;
}

export interface ProgressInjection {
    min: Ref<number | string>;
    max: Ref<number | string>;
}

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

export interface SelectInjection {
    value: Ref<SelectOption['id']>;
    disabled: Ref<boolean>;
    idField: Ref<string>;
    onInput: (option: SelectOption) => void;
}

export interface SidebarInjection {
    onItemClick: (event: Event) => void;
}

export interface TabsInjection {
    active: Ref<string>;
    color: Ref<string>;
    size: Ref<string>;
    seo: Ref<boolean>;
    setActive: (id: string) => void;
}
