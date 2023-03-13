import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IListGroupItem',
    props: [
        {
            name: 'active',
            type: ['Boolean'],
            default: 'false',
            description: 'The active state of the list group item'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the list group item'
        },
        {
            name: 'to',
            type: ['String'],
            default: 'undefined',
            description: 'Renders the component as an anchor link with a `href` attribute'
        },
        {
            name: 'tag',
            type: ['String'],
            default: 'div',
            description: 'Set the HTML tag to be used for rendering the nav item'
        },
        {
            name: 'tabindex',
            type: ['Number', 'String'],
            default: '0',
            description: 'The tabindex of the list group item'
        },
        {
            name: 'to',
            type: ['String'],
            default: 'undefined',
            description: 'Renders the component as a Router Link component with a `to` attribute'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for list group item content '
        }
    ],
    css: {
        selector: '.list-group',
        variables: [
            {
                name: '--list-group--border-bottom-width',
                value: [
                    {
                        name: '--border-bottom-width'
                    }
                ]
            },
            {
                name: '--list-group--border-bottom-style',
                value: [
                    {
                        name: '--border-bottom-style'
                    }
                ]
            },
            {
                name: '--list-group--border-bottom-color',
                value: [
                    {
                        name: '--border-bottom-color'
                    }
                ]
            },
            {
                name: '--transition-duration'
            },
            {
                name: '--transition-timing-function'
            },
            {
                name: '--list-group--padding',
                value: [
                    {
                        name: '--list-group--padding-top',
                        value: [
                            {
                                name: '--padding-top'
                            }
                        ]
                    },
                    {
                        name: '--list-group--padding-right',
                        value: [
                            {
                                name: '--padding-right'
                            }
                        ]
                    },
                    {
                        name: '--list-group--padding-bottom',
                        value: [
                            {
                                name: '--padding-bottom'
                            }
                        ]
                    },
                    {
                        name: '--list-group--padding-left',
                        value: [
                            {
                                name: '--padding-left'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--list-group--active--color'
            },
            {
                name: '--list-group--active--background'
            },
            {
                name: '--list-group--active--border-color'
            },
            {
                name: '--list-group--border-top-left-radius'
            },
            {
                name: '--list-group--border-top-right-radius'
            },
            {
                name: '--list-group--border-bottom-left-radius'
            },
            {
                name: '--list-group--border-bottom-right-radius'
            },
            {
                name: '--list-group--disabled--color'
            }
        ]
    }
};

export default manifest;
