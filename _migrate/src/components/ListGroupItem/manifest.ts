import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'ListGroupItem',
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
        selector: '.list-group-item',
        variables: [
            {
                name: '--list-group--item--border-width',
                value: [
                    {
                        name: '--list-group--item--border-bottom-width'
                    }
                ]
            },
            {
                name: '--list-group--item--border-style',
                value: [
                    {
                        name: '--list-group--item--border-bottom-style'
                    }
                ]
            },
            {
                name: '--list-group--item--border-color',
                value: [
                    {
                        name: '--list-group--item--border-bottom-color'
                    }
                ]
            },
            {
                name: '--list-group--item--padding',
                value: []
            },
            {
                name: '--list-group--item--transition',
                value: [
                    {
                        name: '--list-group--item--transition-property'
                    },
                    {
                        name: '--list-group--item--transition-duration'
                    },
                    {
                        name: '--list-group--item--transition-timing-function'
                    }
                ]
            },
            {
                name: '--list-group--item--border-radius',
                value: [
                    {
                        name: '--list-group--item--border-top-left-radius'
                    },
                    {
                        name: '--list-group--item--border-top-right-radius'
                    },
                    {
                        name: '--list-group--item--border-bottom-left-radius'
                    },
                    {
                        name: '--list-group--item--border-bottom-right-radius'
                    }
                ]
            },
            {
                name: '--list-group--item--active--background',
                value: []
            },
            {
                name: '--list-group--item--active--border-color',
                value: [
                    {
                        name: '--list-group--item--active--border-bottom-color'
                    }
                ]
            },
            {
                name: '--list-group--item--active--color',
                value: []
            },
            {
                name: '--list-group--item--disabled--color',
                value: []
            }
        ]
    }
};

export default manifest;
