import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IModalContainer',
    props: [
        {
            name: 'eventBus',
            type: ['EventBus'],
            default: 'modalEventBus',
            description: 'The event bus to use for showing/hiding modals'
        }
    ],
    events: [],
    slots: [],
    css: {
        selector: '.modal-container',
        variables: []
    }
};

export default manifest;
