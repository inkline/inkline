import type { InjectionKey, Ref } from 'vue';
import type {
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
} from './provide';
import type { InklineOptions } from './plugin';

/**
 * Symbols
 *
 * We're casting the string to a symbol to prevent collisions between ESM and CJS module imports.
 * Symbols have different references in memory, so they will not be equal when compared, leading to
 * provide/inject working as expected.
 */

export const InklineOptionsKey: InjectionKey<Ref<InklineOptions>> =
    'InklineOptions' as unknown as symbol;

export const ButtonGroupKey: InjectionKey<ButtonGroupInjection> =
    'ButtonGroup' as unknown as symbol;

export const CheckboxGroupKey: InjectionKey<CheckboxGroupInjection> =
    'CheckboxGroup' as unknown as symbol;

export const CollapsibleKey: InjectionKey<CollapsibleInjection> =
    'Collapsible' as unknown as symbol;

export const DropdownKey: InjectionKey<DropdownInjection> = 'Dropdown' as unknown as symbol;

export const FormKey: InjectionKey<FormInjection> = 'Form' as unknown as symbol;

export const FormGroupKey: InjectionKey<FormGroupInjection> = 'FormGroup' as unknown as symbol;

export const NavKey: InjectionKey<NavInjection> = 'Nav' as unknown as symbol;

export const NavbarKey: InjectionKey<NavbarInjection> = 'Navbar' as unknown as symbol;

export const ProgressKey: InjectionKey<ProgressInjection> = 'Progress' as unknown as symbol;

export const RadioGroupKey: InjectionKey<RadioGroupInjection> = 'RadioGroup' as unknown as symbol;

export const SelectKey: InjectionKey<SelectInjection> = 'Select' as unknown as symbol;

export const SidebarKey: InjectionKey<SidebarInjection> = 'Sidebar' as unknown as symbol;

export const TabsKey: InjectionKey<TabsInjection> = 'Tabs' as unknown as symbol;
