import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'Tabs',
    props: [
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the tabs'
        },
        {
            name: 'modelValue',
            type: ['String'],
            default: '',
            description: 'Used to set the currently active tab'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the tabs'
        },
        {
            name: 'stretch',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the tabs header as full width'
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
            name: 'header',
            description: 'Slot for tabs header '
        },
        {
            name: 'default',
            description: 'Slot for tab components '
        }
    ],
    css: {
        selector: '.tabs',
        variables: [
            {
                name: '--tabs--header--background',
                value: []
            },
            {
                name: '--tabs--header--border-radius',
                value: []
            },
            {
                name: '--tabs--header--border-color',
                value: []
            },
            {
                name: '--tabs--header--border-style',
                value: []
            },
            {
                name: '--tabs--header--border-width',
                value: []
            },
            {
                name: '--tabs--header--color',
                value: []
            },
            {
                name: '--tabs--header--font-size',
                value: []
            },
            {
                name: '--tabs--header--margin',
                value: [
                    {
                        name: '--tabs--header--margin-top',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--tabs--header--margin-right',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--tabs--header--margin-bottom',
                        value: [
                            {
                                name: '--margin-bottom'
                            }
                        ]
                    },
                    {
                        name: '--tabs--header--margin-left',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
