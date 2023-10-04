import type { Ref } from 'vue';

export interface DropdownInjection {
    disabled: Ref<boolean>;
    onItemClick: (event: Event) => void;
}
