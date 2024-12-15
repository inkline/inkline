import type { ComponentManifest } from '@inkline/devtools';

export const manifest: ComponentManifest = {
    name: 'ModalContainer',
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
