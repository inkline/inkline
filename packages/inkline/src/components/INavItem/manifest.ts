import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'INavItem',
    props: [
        {
            name: 'active',
            type: ['Boolean'],
            default: 'false',
            description: 'The active state of the nav item'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the nav item'
        },
        {
            name: 'to',
            type: ['String'],
            default: 'undefined',
            description: 'Renders the component as an anchor link with a `href` attribute'
        },
        {
            name: 'stopPropagation',
            type: ['Boolean'],
            default: 'false',
            description:
                'Used to close the nearest navbar or sidebar by propagating the onClick event'
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
            description: 'Slot for default nav item content '
        }
    ],
    css: {
        selector: '.nav-item',
        variables: [
            {
                name: '--nav--item--color',
                value: []
            },
            {
                name: '--nav--item--font-size',
                value: []
            },
            {
                name: '--nav--item--transition',
                value: [
                    {
                        name: '--nav--item--transition-property'
                    },
                    {
                        name: '--nav--item--transition-duration'
                    },
                    {
                        name: '--nav--item--transition-timing-function'
                    }
                ]
            },
            {
                name: '--nav--item--padding',
                value: []
            },
            {
                name: '--nav--item--disabled--color',
                value: []
            },
            {
                name: '--nav--item--active--color',
                value: []
            },
            {
                name: '--nav--item--active--font-weight',
                value: []
            }
        ]
    }
};

export default manifest;
