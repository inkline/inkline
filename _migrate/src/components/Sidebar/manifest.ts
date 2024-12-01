import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'Sidebar',
    props: [
        {
            name: 'ariaLabel',
            type: ['String'],
            default: 'Sidebar',
            description: 'The aria-label of the sidebar'
        },
        {
            name: 'collapse',
            type: ['Boolean', 'String'],
            default: "'md'",
            description:
                'Breakpoint to collapse the sidebar at. If boolean value, sets to always or never collapse'
        },
        {
            name: 'collapseOnItemClick',
            type: ['Boolean'],
            default: 'true',
            description: 'Determines if the sidebar should close when clicking a sidebar item'
        },
        {
            name: 'collapseOnClickOutside',
            type: ['Boolean'],
            default: 'true',
            description:
                'Determines if the sidebar should close when clicking outside, on the overlay'
        },
        {
            name: 'collapsePosition',
            type: ['fixed', 'absolute', 'relative'],
            default: 'absolute',
            description: 'The collapse position of the sidebar'
        },
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the sidebar'
        },
        {
            name: 'placement',
            type: ['left', 'right'],
            default: 'left',
            description: 'The placement of the sidebar'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the navbar'
        },
        {
            name: 'modelValue',
            type: ['Boolean'],
            default: 'false',
            description: 'Used to manually control the collapsed state of the sidebar'
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
            name: 'default',
            description: 'Slot for sidebar content '
        }
    ],
    css: {
        selector: '.sidebar-wrapper',
        variables: [
            {
                name: '--sidebar--z-index',
                value: []
            },
            {
                name: '--sidebar--width',
                value: []
            },
            {
                name: '--sidebar--overlay--background',
                value: []
            },
            {
                name: '--sidebar--border-radius',
                value: [
                    {
                        name: '--sidebar--border-top-left-radius'
                    },
                    {
                        name: '--sidebar--border-bottom-left-radius'
                    }
                ]
            },
            {
                name: '--sidebar--background',
                value: []
            },
            {
                name: '--sidebar--box-shadow',
                value: []
            },
            {
                name: '--sidebar--border-width',
                value: []
            },
            {
                name: '--sidebar--border-style',
                value: []
            },
            {
                name: '--sidebar--border-color',
                value: []
            },
            {
                name: '--sidebar--color',
                value: []
            },
            {
                name: '--sidebar--padding',
                value: []
            },
            {
                name: '--sidebar--transition',
                value: [
                    {
                        name: '--sidebar--transition-property'
                    },
                    {
                        name: '--sidebar--transition-duration'
                    },
                    {
                        name: '--sidebar--transition-timing-function'
                    }
                ]
            },
            {
                name: '--sidebar--item--background',
                value: []
            },
            {
                name: '--sidebar--item--border-radius',
                value: []
            },
            {
                name: '--sidebar--item--color',
                value: []
            },
            {
                name: '--sidebar--item--font-size',
                value: []
            },
            {
                name: '--sidebar--item--padding',
                value: []
            },
            {
                name: '--sidebar--item--transition',
                value: [
                    {
                        name: '--sidebar--item--transition-property'
                    },
                    {
                        name: '--sidebar--item--transition-duration'
                    },
                    {
                        name: '--sidebar--item--transition-timing-function'
                    }
                ]
            },
            {
                name: '--sidebar--item--hover--background',
                value: []
            },
            {
                name: '--sidebar--item--hover--color',
                value: []
            },
            {
                name: '--sidebar--item--focus--background',
                value: []
            },
            {
                name: '--sidebar--item--focus--color',
                value: []
            },
            {
                name: '--sidebar--item--active--background',
                value: []
            },
            {
                name: '--sidebar--item--active--color',
                value: []
            }
        ]
    }
};

export default manifest;
