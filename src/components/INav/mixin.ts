import { InjectionKey } from 'vue';

export interface NavInjection {
    onItemClick: (event: Event) => void;
}

export const NavKey = Symbol('Nav') as InjectionKey<NavInjection>;
