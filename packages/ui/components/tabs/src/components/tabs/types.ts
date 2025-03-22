import type { Ref } from 'vue';

export interface TabsInjection {
    active: Ref<string>;
    setActive: (id: string) => void;
    synchronize: () => void;
}
