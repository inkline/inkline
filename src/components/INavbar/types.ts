import { Ref } from 'vue';

export interface NavbarInjection {
    collapsible: Ref<boolean>;
    open: Ref<boolean>;
    onItemClick: (event: Event) => void;
}
