import { createApp } from 'vue';
import type { Plugin } from 'vue';
import { createEventBus } from '@grozav/utils';
import type { EventBus } from '@grozav/utils';
import { InklineKey, InklineToastKey, IToastContainer, IconsPlugin } from '@inkline/inkline';
import type { InklineService, StringOrRenderableType } from '@inkline/inkline';

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

    size: 'sm' | 'md' | 'lg';
}

export interface InklineToastOptions {
    toast?: Partial<Omit<ToastOptions, 'id'>>;
}

export interface ToastService {
    show: (options: Partial<ToastOptions>) => void;
    hide: (options: { id: string }) => void;
    hideAll: () => void;
}

export interface InklineToastPluginOptions {
    inkline: InklineService;
}

export const toastEventBus: EventBus = createEventBus();

export const createToastService = (): ToastService => ({
    show: (options) => {
        toastEventBus.emit('show', options);
    },
    hide: (options) => {
        toastEventBus.emit('hide', options);
    },
    hideAll: () => {
        toastEventBus.emit('hideAll', {});
    }
});

export const ToastPlugin: Plugin = {
    install: (app, { inkline }: InklineToastPluginOptions) => {
        const toastService = createToastService();
        const toastApp = createApp(IToastContainer);

        toastApp.provide(InklineKey, inkline);
        toastApp.use(IconsPlugin);

        if (typeof window !== 'undefined') {
            const containerId = 'inkline-toast-container';
            let container = document.querySelector(`#${containerId}`);
            if (!container) {
                container = document.createElement('div');
                container.id = containerId;
                document.body.appendChild(container);
            }

            toastApp.mount(container);
        }

        app.config.globalProperties.$toast = toastService;
        app.provide(InklineToastKey, toastService);
    }
};
