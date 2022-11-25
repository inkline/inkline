import { InjectionKey, Ref } from 'vue';

export interface TabsInjection {
    active: Ref<string>;
    setActive: (name: string) => void;
}

export const TabsKey = Symbol('Tabs') as InjectionKey<TabsInjection>;
