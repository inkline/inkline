import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'ButtonGroup',
        props: [
            {
                name: 'vertical',
                type: 'Boolean',
                description: 'Display the button group with vertical orientation',
                default: 'false'
            },
            {
                name: 'block',
                type: 'Boolean',
                description:
                    'Display the button group as a block, spanning the full container width',
                default: 'false'
            },
            {
                name: 'disabled',
                type: 'Boolean',
                description: 'The disabled state of the button group',
                default: 'false'
            },
            {
                name: 'sizeMultiplier',
                type: 'String',
                description: 'The size of the button group',
                default: ''
            },
            {
                name: 'color',
                type: 'String',
                description: 'The color of the button group',
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
            variables: [
                {
                    name: '--button-group--box-shadow-offset-x'
                },
                {
                    name: '--button-group--box-shadow-offset-y'
                },
                {
                    name: '--button-group--box-shadow-blur-radius'
                },
                {
                    name: '--button-group--box-shadow-spread-radius'
                },
                {
                    name: '--button-group--box-shadow-color'
                },
                {
                    name: '--button-group--box-shadow'
                }
            ]
        }
    }
];

export default manifest;
