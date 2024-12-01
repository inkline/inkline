import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'LayoutHeader',
    props: [],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default layout header content '
        }
    ],
    css: {
        selector: '.layout-header',
        variables: []
    }
};

export default manifest;
