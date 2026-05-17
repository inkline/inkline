import { InklineAddon, InklineOptions } from '@inkline/types';
import { h, render } from 'vue';
import { ToastContainer, toastEventBus, toastService } from '@inkline/component-toast';
import { InklineToastKey } from './symbols';
import { defaultToastAddonOptions, defaultToastContainerId } from './constants';

export function toastAddon(addonOptions?: InklineOptions['toast']): InklineAddon {
    return (app, options) => {
        app.config.globalProperties.$toast = toastService;
        app.provide(InklineToastKey, toastService);

        if (typeof window === 'undefined') {
            return;
        }

        if (addonOptions) {
            options.value.toast = {
                ...defaultToastAddonOptions,
                ...options.value.toast,
                ...addonOptions
            };
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
            const vNode = h(ToastContainer, {
                eventBus: toastEventBus
            });

            vNode.appContext = app._context;
            render(vNode, container);
        }
    };
}

export * from './constants';
export * from './symbols';

export default toastAddon;
