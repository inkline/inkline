import type { InjectionKey, Ref } from 'vue';

export interface CollapsibleInjection {
    activeItems: Ref<string[]>;
    onItemClick: (id: string) => void;
}

export const CollapsibleKey = Symbol('Collapsible') as InjectionKey<CollapsibleInjection>;
