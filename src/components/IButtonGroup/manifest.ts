import { ComponentManifest } from '@inkline/inkline/types';

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
                name: '--button-group--font-size',
                value: [
                    {
                        name: '--button--font-size'
                    }
                ]
            },
            {
                name: '--button-group--padding',
                value: [
                    {
                        name: '--button-group--padding-top',
                        value: [
                            {
                                name: '--button--padding-top'
                            }
                        ]
                    },
                    {
                        name: '--button-group--padding-right',
                        value: [
                            {
                                name: '--button--padding-right'
                            }
                        ]
                    },
                    {
                        name: '--button-group--padding-bottom',
                        value: [
                            {
                                name: '--button--padding-bottom'
                            }
                        ]
                    },
                    {
                        name: '--button-group--padding-left',
                        value: [
                            {
                                name: '--button--padding-left'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--button--circle--size'
            },
            {
                name: '--button-group--border-top-right-radius',
                value: [
                    {
                        name: '--button--border-top-right-radius'
                    }
                ]
            },
            {
                name: '--button-group--border-bottom-right-radius',
                value: [
                    {
                        name: '--button--border-bottom-right-radius'
                    }
                ]
            },
            {
                name: '--button-group--border-top-left-radius',
                value: [
                    {
                        name: '--button--border-top-left-radius'
                    }
                ]
            },
            {
                name: '--button-group--border-bottom-left-radius',
                value: [
                    {
                        name: '--button--border-bottom-left-radius'
                    }
                ]
            }
        ]
    }
};

export default manifest;
