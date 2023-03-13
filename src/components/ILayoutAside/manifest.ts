import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'ILayoutAside',
    props: [],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default layout aside content '
        }
    ],
    css: {
        selector: '.layout-aside',
        variables: [
            {
                name: '--layout-aside--width',
                value: [
                    {
                        value: '320px'
                    }
                ]
            }
        ]
    }
};

export default manifest;
