import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IDropdown',
    props: [
        {
            name: 'animationDuration',
            type: ['Number'],
            default: '300',
            description: 'The duration of the hide and show animation'
        },
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the dropdown'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the dropdown'
        },
        {
            name: 'hideOnItemClick',
            type: ['Boolean'],
            default: 'false',
            description: 'Used to hide the dropdown when clicking or selecting a dropdown item'
        },
        {
            name: 'triggerKeyBindings',
            type: ['string[]'],
            default: 'up, down, enter, space, tab, esc',
            description: 'The keydown events bound to the trigger element'
        },
        {
            name: 'itemKeyBindings',
            type: ['string[]'],
            default: 'up, down, enter, space, tab, esc',
            description: 'The keydown events bound to the dropdown item elements'
        },
        {
            name: 'visible',
            type: ['Boolean'],
            default: 'false',
            description: 'Used to manually control the visibility of the dropdown'
        },
        {
            name: 'arrow',
            type: ['Boolean'],
            default: 'true',
            description: 'Displays an arrow on the dropdown pointing to the trigger element'
        },
        {
            name: 'placement',
            type: [
                'top',
                'top-start',
                'top-end',
                'bottom',
                'bottom-start',
                'bottom-end',
                'left',
                'left-start',
                'left-end',
                'right',
                'right-start',
                'right-end'
            ],
            default: 'false',
            description: 'The placement of the dropdown'
        },
        {
            name: 'trigger',
            type: ['hover', 'focus', 'click', 'manual'],
            default: 'click',
            description: 'The events used to trigger the dropdown'
        },
        {
            name: 'offset',
            type: ['Number'],
            default: '6',
            description: 'The offset of the dropdown relative to the trigger element'
        },
        {
            name: 'interactable',
            type: ['Boolean'],
            default: 'true',
            description:
                'Determines whether hover state should be transferred from trigger to popup'
        },
        {
            name: 'popupOptions',
            type: ['Object'],
            default: '',
            description: 'Used to override the floating-ui options used for creating the dropdown'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the dropdown'
        },
        {
            name: 'hoverHideDelay',
            type: ['Number'],
            default: '300',
            description: 'Delay in milliseconds before the popover is hidden on hover'
        }
    ],
    events: [
        {
            description: 'Event emitted when clicking outside the dropdown elements',
            name: 'click:outside'
        },
        {
            description: 'Event emitted for setting the visible',
            name: 'update:visible'
        }
    ],
    slots: [
        {
            name: 'default',
            description: 'Slot for dropdown trigger '
        },
        {
            name: 'header',
            description: 'Slot for dropdown header content '
        },
        {
            name: 'body',
            description: 'Slot for dropdown body content '
        },
        {
            name: 'footer',
            description: 'Slot for dropdown footer content '
        }
    ],
    css: {
        selector: '.dropdown-wrapper',
        variables: [
            {
                name: '--dropdown--z-index',
                value: []
            },
            {
                name: '--dropdown--box-shadow',
                value: []
            },
            {
                name: '--dropdown--font-size',
                value: []
            },
            {
                name: '--dropdown--line-height',
                value: []
            },
            {
                name: '--dropdown--color',
                value: []
            },
            {
                name: '--dropdown--min-width',
                value: []
            },
            {
                name: '--dropdown--max-width',
                value: []
            },
            {
                name: '--dropdown--arrow--size',
                value: []
            },
            {
                name: '--dropdown--header--border-width',
                value: []
            },
            {
                name: '--dropdown--header--border-style',
                value: []
            },
            {
                name: '--dropdown--header--border-color',
                value: []
            },
            {
                name: '--dropdown--header--background',
                value: []
            },
            {
                name: '--dropdown--header--padding',
                value: []
            },
            {
                name: '--dropdown--header--transition',
                value: [
                    {
                        name: '--dropdown--header--transition-property'
                    },
                    {
                        name: '--dropdown--header--transition-duration'
                    },
                    {
                        name: '--dropdown--header--transition-timing-function'
                    }
                ]
            },
            {
                name: '--dropdown--body--border-width',
                value: []
            },
            {
                name: '--dropdown--body--border-style',
                value: []
            },
            {
                name: '--dropdown--body--border-color',
                value: []
            },
            {
                name: '--dropdown--body--background',
                value: []
            },
            {
                name: '--dropdown--body--padding',
                value: []
            },
            {
                name: '--dropdown--body--transition',
                value: [
                    {
                        name: '--dropdown--body--transition-property'
                    },
                    {
                        name: '--dropdown--body--transition-duration'
                    },
                    {
                        name: '--dropdown--body--transition-timing-function'
                    }
                ]
            },
            {
                name: '--dropdown--footer--border-width',
                value: []
            },
            {
                name: '--dropdown--footer--border-style',
                value: []
            },
            {
                name: '--dropdown--footer--border-color',
                value: []
            },
            {
                name: '--dropdown--footer--background',
                value: []
            },
            {
                name: '--dropdown--footer--padding',
                value: []
            },
            {
                name: '--dropdown--footer--transition',
                value: [
                    {
                        name: '--dropdown--footer--transition-property'
                    },
                    {
                        name: '--dropdown--footer--transition-duration'
                    },
                    {
                        name: '--dropdown--footer--transition-timing-function'
                    }
                ]
            },
            {
                name: '--dropdown--border-radius',
                value: [
                    {
                        name: '--dropdown--border-top-left-radius'
                    },
                    {
                        name: '--dropdown--border-top-right-radius'
                    },
                    {
                        name: '--dropdown--border-bottom-left-radius'
                    },
                    {
                        name: '--dropdown--border-bottom-right-radius'
                    }
                ]
            },
            {
                name: '--dropdown--border-color',
                value: [
                    {
                        name: '--dropdown--border-bottom-color'
                    },
                    {
                        name: '--dropdown--border-left-color'
                    },
                    {
                        name: '--dropdown--border-top-color'
                    },
                    {
                        name: '--dropdown--border-right-color'
                    }
                ]
            },
            {
                name: '--dropdown--background',
                value: []
            }
        ]
    }
};

export default manifest;
