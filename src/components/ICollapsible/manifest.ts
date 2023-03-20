import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'ICollapsible',
    props: [
        {
            name: 'accordion',
            type: ['Boolean'],
            default: 'false',
            description:
                'Display the collapsible as an accordion, keeping a maximum of one open collapsible item'
        },
        {
            name: 'color',
            type: ['light', 'dark', 'transparent'],
            default: '',
            description: 'The color variant of the collapsible'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the collapsible'
        },
        {
            name: 'modelValue',
            type: ['String[]'],
            default: '',
            description: 'Used to determine which collapsible item is open'
        }
    ],
    events: [
        {
            description: 'Event emitted for setting the modelValue',
            name: 'update:modelValue'
        }
    ],
    slots: [
        {
            name: 'Default',
            description: 'slot for collapsible items '
        }
    ],
    css: {
        selector: '.collapsible',
        variables: [
            {
                name: '--collapsible--font-size',
                value: [
                    {
                        name: '--font-size'
                    }
                ],
                variants: [
                    {
                        name: '--collapsible--sm--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--collapsible--md--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--collapsible--lg--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
