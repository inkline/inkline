import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Tooltip',
        props: [
            {
                name: 'content',
                type: 'string',
                description: 'The content of the tooltip, if not using the content slot',
                default: "''"
            },
            {
                name: 'color',
                type: "'light' | 'dark' | undefined",
                description: 'The color variant of the tooltip',
                default: 'undefined'
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: 'The disabled state of the tooltip',
                default: 'false'
            },
            {
                name: 'visible',
                type: 'boolean',
                description: 'Used to manually control the visibility of the tooltip',
                default: 'undefined'
            },
            {
                name: 'name',
                type: 'string',
                description: 'The identifier of the tooltip',
                default: 'uid()'
            },
            {
                name: 'arrow',
                type: 'boolean',
                description: 'Displays an arrow on the tooltip pointing to the trigger element',
                default: 'true'
            },
            {
                name: 'placement',
                type: "'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'",
                description: 'The placement of the tooltip',
                default: 'false'
            },
            {
                name: 'listener',
                type: "'hover' | 'focus' | 'click' | 'manual'",
                description: 'The listener used to trigger the tooltip',
                default: 'hover, focus'
            },
            {
                name: 'offset',
                type: 'number',
                description: 'The offset of the tooltip relative to the trigger element',
                default: '6'
            },
            {
                name: 'interactable',
                type: 'boolean',
                description:
                    'Determines whether hover state should be transferred from trigger to popup',
                default: 'false'
            },
            {
                name: 'popupOptions',
                type: 'Object',
                description:
                    'Used to override the floating-ui options used for creating the tooltip',
                default: ''
            },
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                description: 'The size variant of the tooltip',
                default: ''
            },
            {
                name: 'hoverHideDelay',
                type: 'number',
                description: 'Delay in milliseconds before the tooltip is hidden on hover',
                default: '300'
            },
            {
                name: 'animationDuration',
                type: 'number',
                description: 'Animation duration in milliseconds',
                default: '300'
            }
        ],
        events: [
            {
                name: 'Tooltip',
                description: 'Event emitted for setting the visible'
            },
            {
                name: 'Tooltip',
                description: 'Event emitted when clicking outside the tooltip'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Slot for tooltip trigger'
            },
            {
                name: 'content',
                description: 'Slot for tooltip content'
            }
        ],
        css: {
            namespace: 'tooltip',
            variables: [
                {
                    name: '--tooltip--border-top-width'
                },
                {
                    name: '--tooltip--border-top-style'
                },
                {
                    name: '--tooltip--border-top-color'
                },
                {
                    name: '--tooltip--border-right-width'
                },
                {
                    name: '--tooltip--border-right-style'
                },
                {
                    name: '--tooltip--border-right-color'
                },
                {
                    name: '--tooltip--border-bottom-width'
                },
                {
                    name: '--tooltip--border-bottom-style'
                },
                {
                    name: '--tooltip--border-bottom-color'
                },
                {
                    name: '--tooltip--border-left-width'
                },
                {
                    name: '--tooltip--border-left-style'
                },
                {
                    name: '--tooltip--border-left-color'
                },
                {
                    name: '--tooltip--border-width'
                },
                {
                    name: '--tooltip--border-style'
                },
                {
                    name: '--tooltip--border-color'
                },
                {
                    name: '--tooltip--border-top'
                },
                {
                    name: '--tooltip--border-right'
                },
                {
                    name: '--tooltip--border-bottom'
                },
                {
                    name: '--tooltip--border-left'
                },
                {
                    name: '--tooltip--border'
                },
                {
                    name: '--tooltip--box-shadow-offset-x'
                },
                {
                    name: '--tooltip--box-shadow-offset-y'
                },
                {
                    name: '--tooltip--box-shadow-blur-radius'
                },
                {
                    name: '--tooltip--box-shadow-spread-radius'
                },
                {
                    name: '--tooltip--box-shadow-color'
                },
                {
                    name: '--tooltip--box-shadow'
                },
                {
                    name: '--tooltip--transition-property'
                },
                {
                    name: '--tooltip--transition-duration'
                },
                {
                    name: '--tooltip--transition-timing-function'
                },
                {
                    name: '--tooltip--transition'
                },
                {
                    name: '--tooltip--z-index'
                },
                {
                    name: '--tooltip--background'
                },
                {
                    name: '--tooltip--color'
                },
                {
                    name: '--tooltip--border-top-left-radius'
                },
                {
                    name: '--tooltip--border-top-right-radius'
                },
                {
                    name: '--tooltip--border-bottom-right-radius'
                },
                {
                    name: '--tooltip--border-bottom-left-radius'
                },
                {
                    name: '--tooltip--border-radius'
                },
                {
                    name: '--tooltip--font-size'
                },
                {
                    name: '--tooltip--padding-top'
                },
                {
                    name: '--tooltip--padding-right'
                },
                {
                    name: '--tooltip--padding-bottom'
                },
                {
                    name: '--tooltip--padding-left'
                },
                {
                    name: '--tooltip--padding'
                },
                {
                    name: '--tooltip--width'
                },
                {
                    name: '--tooltip--arrow--size'
                },
                {
                    name: '--tooltip--{color}--border-top-color'
                },
                {
                    name: '--tooltip--{color}--border-right-color'
                },
                {
                    name: '--tooltip--{color}--border-bottom-color'
                },
                {
                    name: '--tooltip--{color}--border-left-color'
                },
                {
                    name: '--tooltip--{color}--background'
                },
                {
                    name: '--tooltip--{color}--color'
                },
                {
                    name: '--tooltip--{size}--border-top-left-radius'
                },
                {
                    name: '--tooltip--{size}--border-top-right-radius'
                },
                {
                    name: '--tooltip--{size}--border-bottom-right-radius'
                },
                {
                    name: '--tooltip--{size}--border-bottom-left-radius'
                },
                {
                    name: '--tooltip--{size}--font-size'
                },
                {
                    name: '--tooltip--{size}--padding-top'
                },
                {
                    name: '--tooltip--{size}--padding-right'
                },
                {
                    name: '--tooltip--{size}--padding-bottom'
                },
                {
                    name: '--tooltip--{size}--padding-left'
                },
                {
                    name: '--tooltip--{size}--width'
                },
                {
                    name: '--tooltip--{size}--arrow--size'
                }
            ]
        }
    }
];

export default manifest;
