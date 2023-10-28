import { createApp } from 'vue';
import type { Plugin } from 'vue';
import { defaultModalContainerId, InklineKey, InklineModalKey } from '@inkline/inkline/constants';
import { IModalContainer } from '@inkline/inkline/components/IModalContainer';
import { IconsPlugin } from '@inkline/inkline/plugins/icons';
import type { InklineService } from '@inkline/inkline/plugin';
import type { ModalOptions } from '@inkline/inkline/types';
import { modalService } from '@inkline/inkline/services';

export interface InklineModalOptions {
    modal?: Partial<Omit<ModalOptions, 'id'>>;
}

export interface InklineModalPluginOptions {
    inkline: InklineService;
}

export const ModalPlugin: Plugin = {
    install: (app, { inkline }: InklineModalPluginOptions) => {
        const modalApp = createApp(IModalContainer);

        modalApp.provide(InklineKey, inkline);
        modalApp.use(IconsPlugin);

        if (typeof window !== 'undefined') {
            const containerId = defaultModalContainerId;
            const containerDataAttrbiute = `data-${containerId}`;
            let container = document.querySelector(`#${containerId}`);
            if (!container) {
                container = document.createElement('div');
                container.id = containerId;
                document.body.appendChild(container);
            }

            if (!container.hasAttribute(containerDataAttrbiute)) {
                container.setAttribute(containerDataAttrbiute, '');
                modalApp.mount(container);
            }
        }

        app.config.globalProperties.$modal = modalService;
        app.provide(InklineModalKey, modalService);
    }
};
