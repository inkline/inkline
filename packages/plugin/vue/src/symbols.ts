import type { InjectionKey, Ref } from 'vue';
import type {
    InklineOptions,
    ButtonGroupInjection,
    CheckboxGroupInjection,
    CollapsibleInjection,
    DropdownInjection,
    FormGroupInjection,
    FormInjection,
    NavbarInjection,
    NavInjection,
    ProgressInjection,
    RadioGroupInjection,
    SidebarInjection,
    TabsInjection,
    SelectInjection
} from '@inkline/types';

/**
 * Symbols
 */

export const InklineOptionsKey: InjectionKey<Ref<InklineOptions>> = Symbol('InklineOptions');

/**
 * Component Symbols
 */

export const ButtonGroupKey: InjectionKey<ButtonGroupInjection> = Symbol('ButtonGroup');

export const CheckboxGroupKey: InjectionKey<CheckboxGroupInjection> = Symbol('CheckboxGroup');

export const CollapsibleKey: InjectionKey<CollapsibleInjection> = Symbol('Collapsible');

export const DropdownKey: InjectionKey<DropdownInjection> = Symbol('Dropdown');

export const FormKey: InjectionKey<FormInjection> = Symbol('Form');

export const FormGroupKey: InjectionKey<FormGroupInjection> = Symbol('FormGroup');

export const NavKey: InjectionKey<NavInjection> = Symbol('Nav');

export const NavbarKey: InjectionKey<NavbarInjection> = Symbol('Navbar');

export const ProgressKey: InjectionKey<ProgressInjection> = Symbol('Progress');

export const RadioGroupKey: InjectionKey<RadioGroupInjection> = Symbol('RadioGroup');

export const SelectKey: InjectionKey<SelectInjection> = Symbol('Select');

export const SidebarKey: InjectionKey<SidebarInjection> = Symbol('Sidebar');

export const TabsKey: InjectionKey<TabsInjection> = Symbol('Tabs');
