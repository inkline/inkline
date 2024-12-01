import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'Collapsible',
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
                value: [],
                variants: [
                    {
                        name: '--collapsible--sm--font-size',
                        value: [
                            {
                                name: '--font-size-sm'
                            }
                        ]
                    },
                    {
                        name: '--collapsible--md--font-size',
                        value: [
                            {
                                name: '--font-size-md'
                            }
                        ]
                    },
                    {
                        name: '--collapsible--lg--font-size',
                        value: [
                            {
                                name: '--font-size-lg'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
