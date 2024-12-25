import type { Ref } from 'vue';

export interface DropdownInjection {
    color: Ref<string>;
    disabled: Ref<boolean>;
    size: Ref<string>;
    onItemClick: (event: Event) => void;
}
