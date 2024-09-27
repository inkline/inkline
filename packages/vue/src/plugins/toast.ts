import { createApp } from 'vue';
import type { Plugin } from 'vue';
import {
    defaultToastContainerId,
    toastService,
    InklineKey,
    InklineToastKey,
    toastEventBus
} from '@inkline/inkline/constants';
import { IToastContainer } from '@inkline/inkline/components/IToastContainer';
import { IconsPlugin } from '@inkline/inkline/plugins';
import type { InklineService } from '@inkline/inkline/plugin';
import type { ToastOptions } from '@inkline/inkline/types';

export interface InklineToastOptions {
    toast?: Partial<Omit<ToastOptions, 'id'>>;
}

export interface InklineToastPluginOptions {
    inkline: InklineService;
}

export const ToastPlugin: Plugin = {
    install: (app, { inkline }: InklineToastPluginOptions) => {
        app.config.globalProperties.$toast = toastService;
        app.provide(InklineToastKey, toastService);

        if (typeof window === 'undefined') {
            return;
        }

        const containerId = defaultToastContainerId;
        const containerDataAttribute = `data-${containerId}`;
        let container = document.querySelector(`#${containerId}`);
        if (!container) {
            container = document.createElement('div');
            container.id = containerId;
            document.body.appendChild(container);
        }

        if (!container.hasAttribute(containerDataAttribute)) {
            const toastApp = createApp(IToastContainer, {
                eventBus: toastEventBus
            });

            toastApp.provide(InklineKey, inkline);
            toastApp.use(IconsPlugin);
            container.setAttribute(containerDataAttribute, '');
            toastApp.mount(container);
        }
    }
};
