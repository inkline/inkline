import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Image',
        props: [
            {
                name: 'src',
                type: 'string',
                description: 'The source of the image',
                default: ''
            },
            {
                name: 'alt',
                type: 'string',
                description: 'The alt text of the image',
                default: ''
            },
            {
                name: 'fluid',
                type: 'boolean',
                description:
                    'Make the image fluid, always taking up the full width of its container',
                default: 'false'
            },
            {
                name: 'responsive',
                type: 'boolean',
                description:
                    'Make the image responsive, always scaling to the size of its container, up to its original size',
                default: 'false'
            },
            {
                name: 'float',
                type: "'left' | 'right'",
                description: 'Float the image to the left or right',
                default: "''"
            }
        ],
        events: [],
        slots: [],
        css: {
            namespace: '',
            variables: []
        }
    }
];

export default manifest;
