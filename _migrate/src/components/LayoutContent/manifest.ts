import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'LayoutContent',
    props: [],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default layout content children '
        }
    ],
    css: {
        selector: '.layout-content',
        variables: []
    }
};

export default manifest;
