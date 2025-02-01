import type { HTMLAttributes, Ref } from 'vue';
import type { PopupTriggerListener } from '@inkline/types';
import type { Placement, Strategy } from '@floating-ui/dom';

export type UsePopupOptions = {
    disabled: Ref<boolean | undefined>;
    listener: Ref<PopupTriggerListener | PopupTriggerListener[]>;
    placement: Ref<Placement>;
    interactive: Ref<boolean>;
    interactiveDelay: Ref<number>;
    visible: Ref<boolean | undefined>;
    animationDuration: Ref<number>;
    hideOnClickOutside: Ref<boolean>;
    offset: Ref<number>;
    popupOptions: Ref<{
        strategy?: Strategy;
    }>;
    onClickOutside: (event: MouseEvent, ...args: any[]) => void;
    onUpdateModelValue: (visible: boolean) => void;
};
