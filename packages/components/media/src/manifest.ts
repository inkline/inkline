import type { ComponentManifest } from '@inkline/devtools';

export const manifest: ComponentManifest = {
    name: 'Media',
    props: [],
    events: [],
    slots: [
        {
            name: 'image',
            description: 'Slot for media image'
        },
        {
            name: 'default',
            description: 'Slot for default media content'
        }
    ],
    css: {
        selector: '.media',
        variables: []
    }
};

export default manifest;
