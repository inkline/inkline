import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'ILayoutFooter',
    props: [],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default layout footer content '
        }
    ],
    css: {
        selector: '.layout-footer',
        variables: []
    }
};

export default manifest;
