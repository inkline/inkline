import { InjectionKey, Plugin, VNode } from 'vue';
import { createEventBus } from '@grozav/utils';

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
    title: string | VNode | VNode[];
    message: string | VNode | VNode[];
    icon: string | VNode | VNode[];
    position: ToastPosition;
    duration: number;
    dismissible?: boolean;
    showProgress?: boolean;
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
}

export interface InklineToastOptions {
    toast?: Partial<Omit<ToastOptions, 'id'>>;
}

export interface ToastService {
    show: (options: Partial<ToastOptions>) => void;
    hide: (id: string) => void;
    hideAll: () => void;
}

export const toastEventBus = createEventBus();

export const createToastService = (): ToastService => ({
    show: (options) => {
        toastEventBus.emit('show', options);
    },
    hide: (id) => {
        toastEventBus.emit('hide', { id });
    },
    hideAll: () => {
        toastEventBus.emit('hideAll', {});
    }
});

export const ToastKey = Symbol('toast') as InjectionKey<ToastService>;

export const ToastPlugin: Plugin = {
    install: (app) => {
        const toastService = createToastService();

        app.config.globalProperties.$toast = toastService;
        app.provide(ToastKey, toastService);
    }
};
