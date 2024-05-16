import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IButtonGroup',
    props: [
        {
            name: 'vertical',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the button group with vertical orientation'
        },
        {
            name: 'block',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the button group as a block, spanning the full container width'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the button group'
        },
        {
            name: 'size',
            type: ['String'],
            default: '',
            description: 'The size of the button group'
        },
        {
            name: 'color',
            type: ['String'],
            default: '',
            description: 'The color of the button group'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default button group content '
        }
    ],
    css: {
        selector: '.button-group',
        variables: [
            {
                name: '--button-group--border-radius',
                value: [
                    {
                        name: '--button-group--border-bottom-left-radius',
                        value: []
                    },
                    {
                        name: '--button-group--border-bottom-right-radius',
                        value: []
                    },
                    {
                        name: '--button-group--border-top-left-radius',
                        value: []
                    },
                    {
                        name: '--button-group--border-top-right-radius',
                        value: []
                    },
                    {
                        name: '--button-group--border-top-left-radius',
                        value: []
                    },
                    {
                        name: '--button-group--border-top-right-radius',
                        value: []
                    },
                    {
                        name: '--button-group--border-bottom-right-radius',
                        value: []
                    },
                    {
                        name: '--button-group--border-bottom-left-radius',
                        value: []
                    }
                ]
            }
        ]
    }
};

export default manifest;
