import { createApp } from 'vue';
import type { Plugin } from 'vue';
import { defaultToastContainerId, InklineKey, InklineToastKey } from '@inkline/inkline/constants';
import { IToastContainer } from '@inkline/inkline/components/IToastContainer';
import { IconsPlugin } from '@inkline/inkline/plugins';
import type { InklineService } from '@inkline/inkline/plugin';
import type { ToastOptions } from '@inkline/inkline/types';
import { toastService } from '@inkline/inkline/services';

export interface InklineToastOptions {
    toast?: Partial<Omit<ToastOptions, 'id'>>;
}

export interface InklineToastPluginOptions {
    inkline: InklineService;
}

export const ToastPlugin: Plugin = {
    install: (app, { inkline }: InklineToastPluginOptions) => {
        const toastApp = createApp(IToastContainer);

        toastApp.provide(InklineKey, inkline);
        toastApp.use(IconsPlugin);

        if (typeof window !== 'undefined') {
            const containerId = defaultToastContainerId;
            const containerDataAttribute = `data-${containerId}`;
            let container = document.querySelector(`#${containerId}`);
            if (!container) {
                container = document.createElement('div');
                container.id = containerId;
                document.body.appendChild(container);
            }

            if (!container.hasAttribute(containerDataAttribute)) {
                container.setAttribute(containerDataAttribute, '');
                toastApp.mount(container);
            }
        }

        app.config.globalProperties.$toast = toastService;
        app.provide(InklineToastKey, toastService);
    }
};
