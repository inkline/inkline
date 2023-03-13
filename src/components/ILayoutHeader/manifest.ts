import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'ILayoutHeader',
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
