import type { StringOrRenderableType } from '@inkline/types';
import type { Ref } from 'vue';

export interface ModalOptions {
    id?: string;
    type?: string;
    class?: string | string[] | Record<string, boolean>;
    header?: StringOrRenderableType;
    icon?: StringOrRenderableType;
    body?: StringOrRenderableType;
    footer?: StringOrRenderableType;
    color?:
        | 'light'
        | 'dark'
        | 'primary'
        | 'secondary'
        | 'info'
        | 'success'
        | 'warning'
        | 'danger'
        | string;
    size?: 'sm' | 'md' | 'lg' | string;
    fullscreen?: boolean;
    dismissible?: boolean;
    hideOnClickOutside?: boolean;
    closeOnPressEscape?: boolean;
    onClose?: () => void;
    onClosed?: () => void;
    onOpen?: () => void;
    onOpened?: () => void;
}

export interface ModalEventBusPayload {
    show: [ModalOptions];
    hide: [{ id: string }];
    hideAll: [];
}

export interface ModalService {
    show: (...args: ModalEventBusPayload['show']) => void;
    hide: (...args: ModalEventBusPayload['hide']) => void;
    hideAll: (...args: ModalEventBusPayload['hideAll']) => void;
}

export interface ModalInstance {
    name: Ref<string>;
    elementRef: Ref<HTMLElement | null>;
    closeOnPressEscape: Ref<boolean>;
    hide: () => void;
}

export interface OverlayService {
    instances: Record<string, ModalInstance | undefined>;
    stack: string[];
    zIndex: number;
    register: (instance: ModalInstance) => void;
    unregister: (instance: ModalInstance) => void;
    open: (name: string) => void;
    close: (name: string) => void;
    getTopOverlay: () => ModalInstance | undefined;
    onPressEscape: () => void;
}
