import type { Ref } from 'vue';

export interface CollapsibleInjection {
    activeItems: Ref<string[]>;
    onItemClick: (id: string) => void;
}
