import type { ToastPosition, StringOrRenderableType } from '@inkline/types';

export interface ToastOptions {
    id: string;
    title: StringOrRenderableType;
    message: StringOrRenderableType;
    icon: StringOrRenderableType;
    position: ToastPosition;
    duration: number;
    dismissible: boolean;
    showProgress: boolean;
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
    size: 'sm' | 'md' | 'lg' | string;
}

export interface ToastEventBusPayload {
    show: [Partial<ToastOptions>];
    hide: [{ id: string }];
    hideAll: [];
}

export interface ToastService {
    show: (...args: ToastEventBusPayload['show']) => void;
    hide: (...args: ToastEventBusPayload['hide']) => void;
    hideAll: (...args: ToastEventBusPayload['hideAll']) => void;
}
