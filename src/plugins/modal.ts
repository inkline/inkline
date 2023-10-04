import { createApp } from 'vue';
import type { Plugin } from 'vue';
import { createEventBus } from '@grozav/utils';
import type { EventBus } from '@grozav/utils';
import { InklineKey, InklineModalKey } from '@inkline/inkline/constants';
import { IModalContainer } from '@inkline/inkline/components/IModalContainer';
import { IconsPlugin } from '@inkline/inkline/plugins/icons';
import type { InklineService } from '@inkline/inkline/plugin';
import type { StringOrRenderableType } from '@inkline/inkline/types';

export interface ModalOptions {
    id: string;
    type: string;
    class: string | string[] | Record<string, boolean>;
    header: StringOrRenderableType;
    icon: StringOrRenderableType;
    body: StringOrRenderableType;
    footer: StringOrRenderableType;
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
    fullscreen: boolean;
    dismissible: boolean;
    hideOnClickOutside: boolean;
    closeOnPressEscape: boolean;
    onClose: () => void;
    onClosed: () => void;
    onOpen: () => void;
    onOpened: () => void;
}

export interface InklineModalOptions {
    modal?: Partial<Omit<ModalOptions, 'id'>>;
}

export interface InklineModalPluginOptions {
    inkline: InklineService;
}

export interface ModalService {
    show: (options: Partial<ModalOptions>) => void;
    hide: (options: { id: string }) => void;
    hideAll: () => void;
}

export const modalEventBus: EventBus = createEventBus();

export const createModalService = (): ModalService => ({
    show: (options) => {
        modalEventBus.emit('show', options);
    },
    hide: (options) => {
        modalEventBus.emit('hide', options);
    },
    hideAll: () => {
        modalEventBus.emit('hideAll', {});
    }
});

export const ModalPlugin: Plugin = {
    install: (app, { inkline }: InklineModalPluginOptions) => {
        const modalService = createModalService();
        const modalApp = createApp(IModalContainer);

        modalApp.provide(InklineKey, inkline);
        modalApp.use(IconsPlugin);

        if (typeof window !== 'undefined') {
            const containerId = 'inkline-modal-container';
            let container = document.querySelector(`#${containerId}`);
            if (!container) {
                container = document.createElement('div');
                container.id = containerId;
                document.body.appendChild(container);
            }

            modalApp.mount(container);
        }

        app.config.globalProperties.$modal = modalService;
        app.provide(InklineModalKey, modalService);
    }
};
