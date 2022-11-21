import { InjectionKey } from 'vue';

export interface SidebarInjection {
    onItemClick: (event: Event) => void;
}

export const SidebarKey = Symbol('Sidebar') as InjectionKey<SidebarInjection>;
