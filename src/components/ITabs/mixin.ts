import { InjectionKey, Ref } from 'vue';

export interface TabsInjection {
    active: Ref<string>;
    setActive: (id: string) => void;
    registerTab: (id: string, title: string) => void;
    unregisterTab: (id: string) => void;
}

export const TabsKey = Symbol('Tabs') as InjectionKey<TabsInjection>;
