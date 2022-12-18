import { InjectionKey, Ref } from 'vue';

export interface NavbarInjection {
    collapsible: Ref<boolean>;
    open: Ref<boolean>;
    onItemClick: (event: Event) => void;
}

export const NavbarKey = Symbol('Navbar') as InjectionKey<NavbarInjection>;
