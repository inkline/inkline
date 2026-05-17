import type { StringOrRenderableType } from '@inkline/inkline/types';

export interface ModalOptions {
    id: string;
    type: string;
    class: string | string[] | Record<string, boolean>;
    header: StringOrRenderableType;
    icon: StringOrRenderableType;
    body: StringOrRenderableType;
    footer: StringOrRenderableType;
    color:
        | 'light'
        | 'dark'
        | 'primary'
        | 'secondary'
        | 'info'
        | 'success'
        | 'warning'
        | 'danger'
        | string;
    size: 'sm' | 'md' | 'lg';
    fullscreen: boolean;
    dismissible: boolean;
    hideOnClickOutside: boolean;
    closeOnPressEscape: boolean;
    onClose: () => void;
    onClosed: () => void;
    onOpen: () => void;
    onOpened: () => void;
}

export interface ModalService {
    show: (options: Partial<ModalOptions>) => void;
    hide: (options: { id: string }) => void;
    hideAll: () => void;
}
