import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'INav',
    props: [
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the nav'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the nav'
        },
        {
            name: 'vertical',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the nav with vertical orientation'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default nav content '
        }
    ],
    css: {
        selector: '.nav',
        variables: []
    }
};

export default manifest;
