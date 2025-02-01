import type { ComponentManifest } from '@inkline/types';

export const ModalContainerManifest: ComponentManifest = {
    name: 'ModalContainer',
    props: [
        {
            name: 'eventBus',
            type: 'EventBus',
            description: 'The event bus to use for showing/hiding modals',
            default: 'modalEventBus'
        }
    ],
    events: [],
    slots: [],
    css: {
        selector: '.',
        variables: []
    }
};
