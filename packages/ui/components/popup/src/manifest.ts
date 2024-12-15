import type { ComponentManifest } from '@inkline/devtools';

export const manifest: ComponentManifest = {
    name: 'Popup',
    props: [
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the tooltip'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the tooltip'
        },
        {
            name: 'visible',
            type: ['Boolean'],
            default: 'undefined',
            description: 'Used to manually control the visibility of the tooltip'
        },
        {
            name: 'name',
            type: ['String'],
            default: 'uid()',
            description: 'The identifier of the tooltip'
        },
        {
            name: 'arrow',
            type: ['Boolean'],
            default: 'true',
            description: 'Displays an arrow on the tooltip pointing to the trigger element'
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
            description: 'The placement of the tooltip'
        },
        {
            name: 'events',
            type: ['hover', 'focus', 'click', 'manual'],
            default: 'hover, focus',
            description: 'The events used to trigger the tooltip'
        },
        {
            name: 'offset',
            type: ['Number'],
            default: '6',
            description: 'The offset of the tooltip relative to the trigger element'
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
            description: 'Used to override the floating-ui options used for creating the tooltip'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the tooltip'
        },
        {
            name: 'hoverHideDelay',
            type: ['Number'],
            default: '300',
            description: 'Delay in milliseconds before the tooltip is hidden on hover'
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
            description: 'Event emitted when clicking outside the tooltip',
            name: 'click:outside'
        }
    ],
    slots: [
        {
            name: 'default',
            description: 'Slot for tooltip trigger '
        },
        {
            name: 'body',
            description: 'Slot for tooltip body content '
        }
    ],
    css: {
        selector: '.tooltip-wrapper',
        variables: [
            {
                name: '--tooltip--background',
                value: []
            },
            {
                name: '--tooltip--border-style',
                value: []
            },
            {
                name: '--tooltip--border-width',
                value: []
            },
            {
                name: '--tooltip--border-color',
                value: [
                    {
                        name: '--tooltip--border-top-color'
                    },
                    {
                        name: '--tooltip--border-right-color'
                    },
                    {
                        name: '--tooltip--border-bottom-color'
                    },
                    {
                        name: '--tooltip--border-left-color'
                    }
                ]
            },
            {
                name: '--tooltip--border-radius',
                value: []
            },
            {
                name: '--tooltip--box-shadow',
                value: []
            },
            {
                name: '--tooltip--color',
                value: []
            },
            {
                name: '--tooltip--font-size',
                value: []
            },
            {
                name: '--tooltip--line-height',
                value: []
            },
            {
                name: '--tooltip--padding',
                value: []
            },
            {
                name: '--tooltip--z-index',
                value: []
            },
            {
                name: '--tooltip--arrow--size',
                value: []
            }
        ]
    }
};

export default manifest;
