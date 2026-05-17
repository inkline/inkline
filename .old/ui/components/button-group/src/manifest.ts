import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'ButtonGroup',
        props: [
            {
                name: 'vertical',
                type: 'boolean',
                description: 'Display the button group with vertical orientation',
                default: 'false'
            },
            {
                name: 'block',
                type: 'boolean',
                description:
                    'Display the button group as a block, spanning the full container width',
                default: 'false'
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: 'The disabled state of the button group',
                default: 'false'
            },
            {
                name: 'size',
                type: 'string',
                description: 'The size of the button group',
                default: ''
            },
            {
                name: 'color',
                type: 'string',
                description: 'The color of the button group',
                default: ''
            },
            {
                name: 'variant',
                type: 'string',
                description: 'The variant of the button',
                default: ''
            }
        ],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for default button group content'
            }
        ],
        css: {
            namespace: 'button-group',
            variables: []
        }
    }
];

export default manifest;
