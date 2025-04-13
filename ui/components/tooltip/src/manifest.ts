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
                name: 'interactive',
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
                    name: '--tooltip--border-top-width',
                    value: 'var(--border-top-width)'
                },
                {
                    name: '--tooltip--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--tooltip--border-top-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tooltip--border-right-width',
                    value: 'var(--border-right-width)'
                },
                {
                    name: '--tooltip--border-right-style',
                    value: 'var(--border-right-style)'
                },
                {
                    name: '--tooltip--border-right-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tooltip--border-bottom-width',
                    value: 'var(--border-bottom-width)'
                },
                {
                    name: '--tooltip--border-bottom-style',
                    value: 'var(--border-bottom-style)'
                },
                {
                    name: '--tooltip--border-bottom-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tooltip--border-left-width',
                    value: 'var(--border-left-width)'
                },
                {
                    name: '--tooltip--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--tooltip--border-left-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tooltip--border-width',
                    value: 'var(--tooltip--border-top-width) var(--tooltip--border-right-width) var(--tooltip--border-bottom-width) var(--tooltip--border-left-width)'
                },
                {
                    name: '--tooltip--border-style',
                    value: 'var(--tooltip--border-top-style) var(--tooltip--border-right-style) var(--tooltip--border-bottom-style) var(--tooltip--border-left-style)'
                },
                {
                    name: '--tooltip--border-color',
                    value: 'var(--tooltip--border-top-color) var(--tooltip--border-right-color) var(--tooltip--border-bottom-color) var(--tooltip--border-left-color)'
                },
                {
                    name: '--tooltip--border-top',
                    value: 'var(--tooltip--border-top-width) var(--tooltip--border-top-style) var(--tooltip--border-top-color)'
                },
                {
                    name: '--tooltip--border-right',
                    value: 'var(--tooltip--border-right-width) var(--tooltip--border-right-style) var(--tooltip--border-right-color)'
                },
                {
                    name: '--tooltip--border-bottom',
                    value: 'var(--tooltip--border-bottom-width) var(--tooltip--border-bottom-style) var(--tooltip--border-bottom-color)'
                },
                {
                    name: '--tooltip--border-left',
                    value: 'var(--tooltip--border-left-width) var(--tooltip--border-left-style) var(--tooltip--border-left-color)'
                },
                {
                    name: '--tooltip--border',
                    value: 'var(--tooltip--border-top-width) var(--tooltip--border-top-style) var(--tooltip--border-top-color)'
                },
                {
                    name: '--tooltip--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--tooltip--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--tooltip--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--tooltip--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--tooltip--box-shadow-color',
                    value: 'var(--box-shadow-color)'
                },
                {
                    name: '--tooltip--box-shadow',
                    value: 'var(--tooltip--box-shadow-offset-x) var(--tooltip--box-shadow-offset-y) var(--tooltip--box-shadow-blur-radius) var(--tooltip--box-shadow-spread-radius) var(--tooltip--box-shadow-color)'
                },
                {
                    name: '--tooltip--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--tooltip--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--tooltip--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--tooltip--transition',
                    value: 'var(--tooltip--transition-property) var(--tooltip--transition-duration) var(--tooltip--transition-timing-function)'
                },
                {
                    name: '--tooltip--z-index',
                    value: '2000'
                },
                {
                    name: '--tooltip--background',
                    value: 'var(--color-white)'
                },
                {
                    name: '--tooltip--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--tooltip--border-top-left-radius',
                    value: 'var(--border-top-left-radius-md)'
                },
                {
                    name: '--tooltip--border-top-right-radius',
                    value: 'var(--border-top-right-radius-md)'
                },
                {
                    name: '--tooltip--border-bottom-right-radius',
                    value: 'var(--border-bottom-right-radius-md)'
                },
                {
                    name: '--tooltip--border-bottom-left-radius',
                    value: 'var(--border-bottom-left-radius-md)'
                },
                {
                    name: '--tooltip--border-radius',
                    value: 'var(--tooltip--border-top-left-radius) var(--tooltip--border-top-right-radius) var(--tooltip--border-bottom-right-radius) var(--tooltip--border-bottom-left-radius)'
                },
                {
                    name: '--tooltip--font-size',
                    value: 'var(--font-size-md)'
                },
                {
                    name: '--tooltip--padding-top',
                    value: 'calc(var(--spacing-md) * 0.75)'
                },
                {
                    name: '--tooltip--padding-right',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--tooltip--padding-bottom',
                    value: 'calc(var(--spacing-md) * 0.75)'
                },
                {
                    name: '--tooltip--padding-left',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--tooltip--padding',
                    value: 'var(--tooltip--padding-top) var(--tooltip--padding-right) var(--tooltip--padding-bottom) var(--tooltip--padding-left)'
                },
                {
                    name: '--tooltip--width',
                    value: 'calc(var(--spacing-md) * 18)'
                },
                {
                    name: '--tooltip--arrow--size',
                    value: 'calc(var(--spacing-md) * 0.5)'
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
