import { InklineAddon, InklineOptions } from '@inkline/types';
import { h, render } from 'vue';
import { ModalContainer, modalEventBus, modalService } from '@inkline/component-modal';
import { InklineModalKey } from './symbols';
import { defaultModalAddonOptions, defaultModalContainerId } from './constants';

export function modalAddon(addonOptions?: InklineOptions['modal']): InklineAddon {
    return (app, options) => {
        app.config.globalProperties.$modal = modalService;
        app.provide(InklineModalKey, modalService);

        if (typeof window === 'undefined') {
            return;
        }

        if (addonOptions) {
            options.value.modal = {
                ...defaultModalAddonOptions,
                ...options.value.modal,
                ...addonOptions
            };
        }

        const containerId = defaultModalContainerId;
        const containerDataAttribute = `data-${containerId}`;
        let container = document.querySelector(`#${containerId}`);
        if (!container) {
            container = document.createElement('div');
            container.id = containerId;
            document.body.appendChild(container);
        }

        if (!container.hasAttribute(containerDataAttribute)) {
            const vNode = h(ModalContainer, {
                eventBus: modalEventBus
            });

            vNode.appContext = app._context;
            render(vNode, container);
        }
    };
}

export * from './constants';
export * from './symbols';

export default modalAddon;
