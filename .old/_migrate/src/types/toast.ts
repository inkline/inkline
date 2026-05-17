import type { StringOrRenderableType } from '@inkline/inkline/types';

export type ToastPosition =
    | 'top-left'
    | 'top'
    | 'top-right'
    | 'right'
    | 'bottom-right'
    | 'bottom'
    | 'bottom-left'
    | 'left'
    | string;

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

    size: 'sm' | 'md' | 'lg';
}

export interface ToastService {
    show: (options: Partial<ToastOptions>) => void;
    hide: (options: { id: string }) => void;
    hideAll: () => void;
}
