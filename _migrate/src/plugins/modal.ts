import { createApp } from 'vue';
import type { Plugin } from 'vue';
import {
    defaultModalContainerId,
    modalService,
    InklineKey,
    InklineModalKey,
    modalEventBus
} from '@inkline/inkline/constants';
import { ModalContainer } from '@inkline/inkline/components/ModalContainer';
import { IconsPlugin } from '@inkline/inkline/plugins/icons';
import type { InklineService } from '@inkline/inkline/plugin';
import type { ModalOptions } from '@inkline/inkline/types';

export interface InklineModalOptions {
    modal?: Partial<Omit<ModalOptions, 'id'>>;
}

export interface InklineModalPluginOptions {
    inkline: InklineService;
}

export const ModalPlugin: Plugin = {
    install: (app, { inkline }: InklineModalPluginOptions) => {
        app.config.globalProperties.$modal = modalService;
        app.provide(InklineModalKey, modalService);

        if (typeof window === 'undefined') {
            return;
        }

        const containerId = defaultModalContainerId;
        const containerDataAttrbiute = `data-${containerId}`;
        let container = document.querySelector(`#${containerId}`);
        if (!container) {
            container = document.createElement('div');
            container.id = containerId;
            document.body.appendChild(container);
        }

        if (!container.hasAttribute(containerDataAttrbiute)) {
            const modalApp = createApp(ModalContainer, {
                eventBus: modalEventBus
            });

            modalApp.provide(InklineKey, inkline);
            modalApp.use(IconsPlugin);
            container.setAttribute(containerDataAttrbiute, '');
            modalApp.mount(container);
        }
    }
};
