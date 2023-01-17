import { InjectionKey, Ref } from 'vue';

export interface TabsInjection {
    active: Ref<string>;
    setActive: (id: string) => void;
    synchronize: () => void;
}

export const TabsKey = Symbol('Tabs') as InjectionKey<TabsInjection>;
