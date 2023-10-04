import type { InjectionKey } from 'vue';
import type { InklineService } from '@inkline/inkline/plugin';
import type { ModalService, ToastService } from '@inkline/inkline/plugins';
import type { SvgNode } from '@inkline/inkline/types';
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

export const InklineKey = 'inkline' as unknown as InjectionKey<InklineService>;

export const InklineIconsKey = 'inklineIcons' as unknown as InjectionKey<Record<string, SvgNode>>;

export const InklineModalKey = 'inklineModal' as unknown as InjectionKey<ModalService>;

export const InklineToastKey = 'inklineToast' as unknown as InjectionKey<ToastService>;

/**
 * Components
 */

export const ButtonGroupKey = 'ButtonGroup' as unknown as InjectionKey<ButtonGroupInjection>;

export const CheckboxGroupKey = 'CheckboxGroup' as unknown as InjectionKey<CheckboxGroupInjection>;

export const CollapsibleKey = 'Collapsible' as unknown as InjectionKey<CollapsibleInjection>;

export const DropdownKey = 'Dropdown' as unknown as InjectionKey<DropdownInjection>;

export const FormKey = 'Form' as unknown as InjectionKey<FormInjection>;

export const FormGroupKey = 'FormGroup' as unknown as InjectionKey<FormGroupInjection>;

export const NavKey = 'Nav' as unknown as InjectionKey<NavInjection>;

export const NavbarKey = 'Navbar' as unknown as InjectionKey<NavbarInjection>;

export const ProgressKey = 'Progress' as unknown as InjectionKey<ProgressInjection>;

export const RadioGroupKey = 'RadioGroup' as unknown as InjectionKey<RadioGroupInjection>;

export const SelectKey = 'Select' as unknown as InjectionKey<SelectInjection>;

export const SidebarKey = 'Sidebar' as unknown as InjectionKey<SidebarInjection>;

export const TabsKey = 'Tabs' as unknown as InjectionKey<TabsInjection>;
