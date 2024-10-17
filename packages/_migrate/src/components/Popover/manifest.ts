import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'Popover',
    props: [
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the popover'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the popover'
        },
        {
            name: 'visible',
            type: ['Boolean'],
            default: 'undefined',
            description: 'Used to manually control the visibility of the popover'
        },
        {
            name: 'name',
            type: ['String'],
            default: 'uid()',
            description: 'The identifier of the popover'
        },
        {
            name: 'arrow',
            type: ['Boolean'],
            default: 'true',
            description: 'Displays an arrow on the popover pointing to the trigger element'
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
            description: 'The placement of the popover'
        },
        {
            name: 'events',
            type: ['hover', 'focus', 'click', 'manual'],
            default: 'hover, focus',
            description: 'The events used to trigger the popover'
        },
        {
            name: 'offset',
            type: ['Number'],
            default: '6',
            description: 'The offset of the popover relative to the trigger element'
        },
        {
            name: 'interactable',
            type: ['Boolean'],
            default: 'false',
            description:
                'Determines whether hover state should be transferred from trigger to popup'
        },
        {
            name: 'popupOptions',
            type: ['Object'],
            default: '',
            description: 'Used to override the floating-ui options used for creating the popover'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the popover'
        },
        {
            name: 'hoverHideDelay',
            type: ['Number'],
            default: '300',
            description: 'Delay in milliseconds before the popover is hidden on hover'
        },
        {
            name: 'animationDuration',
            type: ['Number'],
            default: '300',
            description: 'Animation duration in milliseconds'
        }
    ],
    events: [
        {
            description: 'Event emitted for setting the visible',
            name: 'update:visible'
        },
        {
            description: 'Event emitted when clicking outside the popover',
            name: 'click:outside'
        }
    ],
    slots: [
        {
            name: 'default',
            description: 'Slot for popover trigger '
        },
        {
            name: 'header',
            description: 'Slot for popover header content '
        },
        {
            name: 'body',
            description: 'Slot for popover body content '
        },
        {
            name: 'footer',
            description: 'Slot for popover footer content '
        }
    ],
    css: {
        selector: '.popover-wrapper',
        variables: [
            {
                name: '--popover--z-index',
                value: []
            },
            {
                name: '--popover--line-height',
                value: []
            },
            {
                name: '--popover--box-shadow',
                value: []
            },
            {
                name: '--popover--color',
                value: []
            },
            {
                name: '--popover--font-size',
                value: []
            },
            {
                name: '--popover--width',
                value: []
            },
            {
                name: '--popover--max-width',
                value: []
            },
            {
                name: '--popover--arrow--size',
                value: []
            },
            {
                name: '--popover--header--background',
                value: []
            },
            {
                name: '--popover--header--border-width',
                value: []
            },
            {
                name: '--popover--header--border-style',
                value: []
            },
            {
                name: '--popover--header--border-color',
                value: []
            },
            {
                name: '--popover--header--padding',
                value: []
            },
            {
                name: '--popover--header--transition',
                value: [
                    {
                        name: '--popover--header--transition-property'
                    },
                    {
                        name: '--popover--header--transition-duration'
                    },
                    {
                        name: '--popover--header--transition-timing-function'
                    }
                ]
            },
            {
                name: '--popover--body--background',
                value: []
            },
            {
                name: '--popover--body--border-width',
                value: []
            },
            {
                name: '--popover--body--border-style',
                value: []
            },
            {
                name: '--popover--body--border-color',
                value: []
            },
            {
                name: '--popover--body--padding',
                value: []
            },
            {
                name: '--popover--footer--background',
                value: []
            },
            {
                name: '--popover--footer--border-width',
                value: []
            },
            {
                name: '--popover--footer--border-style',
                value: []
            },
            {
                name: '--popover--footer--border-color',
                value: []
            },
            {
                name: '--popover--footer--padding',
                value: []
            },
            {
                name: '--popover--border-radius',
                value: [
                    {
                        name: '--popover--border-top-left-radius'
                    },
                    {
                        name: '--popover--border-top-right-radius'
                    },
                    {
                        name: '--popover--border-bottom-left-radius'
                    },
                    {
                        name: '--popover--border-bottom-right-radius'
                    }
                ]
            },
            {
                name: '--popover--border-color',
                value: [
                    {
                        name: '--popover--border-bottom-color'
                    },
                    {
                        name: '--popover--border-left-color'
                    },
                    {
                        name: '--popover--border-top-color'
                    },
                    {
                        name: '--popover--border-right-color'
                    }
                ]
            },
            {
                name: '--popover--background',
                value: []
            }
        ]
    }
};

export default manifest;
