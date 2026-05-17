import type { InjectionKey } from 'vue';
import type { InklineService } from '@inkline/inkline/plugin';
import type { ModalService, ToastService, SvgNode } from '@inkline/inkline/types';
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
} from '@inkline/inkline/components';

/**
 * Plugins
 */

export const InklineKey = Symbol('inkline') as InjectionKey<InklineService>;

export const InklineIconsKey = Symbol('inklineIcons') as InjectionKey<Record<string, SvgNode>>;

export const InklineModalKey = Symbol('inklineModal') as InjectionKey<ModalService>;

export const InklineToastKey = Symbol('inklineToast') as InjectionKey<ToastService>;

/**
 * Components
 */

export const ButtonGroupKey = Symbol('ButtonGroup') as InjectionKey<ButtonGroupInjection>;

export const CheckboxGroupKey = Symbol('CheckboxGroup') as InjectionKey<CheckboxGroupInjection>;

export const CollapsibleKey = Symbol('Collapsible') as InjectionKey<CollapsibleInjection>;

export const DropdownKey = Symbol('Dropdown') as InjectionKey<DropdownInjection>;

export const FormKey = Symbol('Form') as InjectionKey<FormInjection>;

export const FormGroupKey = Symbol('FormGroup') as InjectionKey<FormGroupInjection>;

export const NavKey = Symbol('Nav') as InjectionKey<NavInjection>;

export const NavbarKey = Symbol('Navbar') as InjectionKey<NavbarInjection>;

export const ProgressKey = Symbol('Progress') as InjectionKey<ProgressInjection>;

export const RadioGroupKey = Symbol('RadioGroup') as InjectionKey<RadioGroupInjection>;

export const SelectKey = Symbol('Select') as InjectionKey<SelectInjection>;

export const SidebarKey = Symbol('Sidebar') as InjectionKey<SidebarInjection>;

export const TabsKey = Symbol('Tabs') as InjectionKey<TabsInjection>;
