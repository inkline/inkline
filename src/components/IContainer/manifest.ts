import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IContainer',
    props: [
        {
            name: 'fluid',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the container as fluid, always spanning 100% width'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default container content '
        }
    ],
    css: {
        selector: '.container',
        variables: [
            {
                name: '--grid--xs--width'
            }
        ]
    }
};

export default manifest;
