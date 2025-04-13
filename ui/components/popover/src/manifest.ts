import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'PopoverFooter',
        props: [],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for popover footer content'
            }
        ]
    },
    {
        name: 'PopoverHeader',
        props: [],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for popover header content'
            }
        ]
    },
    {
        name: 'Popover',
        props: [
            {
                name: 'color',
                type: "'light' | 'dark'",
                description: 'The color variant of the popover',
                default: 'undefined'
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: 'The disabled state of the popover',
                default: 'false'
            },
            {
                name: 'visible',
                type: 'boolean',
                description: 'Used to manually control the visibility of the popover',
                default: 'undefined'
            },
            {
                name: 'name',
                type: 'string',
                description: 'The identifier of the popover',
                default: 'uid()'
            },
            {
                name: 'arrow',
                type: 'boolean',
                description: 'Displays an arrow on the popover pointing to the trigger element',
                default: 'true'
            },
            {
                name: 'placement',
                type: "'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'",
                description: 'The placement of the popover',
                default: "'top'"
            },
            {
                name: 'listener',
                type: "'hover' | 'focus' | 'click' | 'manual'",
                description: 'The listener used to trigger the popover',
                default: 'hover, focus'
            },
            {
                name: 'offset',
                type: 'number',
                description: 'The offset of the popover relative to the trigger element',
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
                type: 'ComputePositionConfig',
                description:
                    'Used to override the floating-ui options used for creating the popover',
                default: ''
            },
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                description: 'The size variant of the popover',
                default: ''
            },
            {
                name: 'hoverHideDelay',
                type: 'number',
                description: 'Delay in milliseconds before the popover is hidden on hover',
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
                name: 'Popover',
                description: 'Event emitted for setting the visible'
            },
            {
                name: 'Popover',
                description: 'Event emitted when clicking outside the popover'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Slot for popover trigger'
            },
            {
                name: 'default',
                description: 'Slot for popover body content'
            }
        ],
        css: {
            namespace: 'popover',
            variables: [
                {
                    name: '--popover--border-top-width',
                    value: 'var(--border-top-width)'
                },
                {
                    name: '--popover--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--popover--border-top-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--popover--border-right-width',
                    value: 'var(--border-right-width)'
                },
                {
                    name: '--popover--border-right-style',
                    value: 'var(--border-right-style)'
                },
                {
                    name: '--popover--border-right-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--popover--border-bottom-width',
                    value: 'var(--border-bottom-width)'
                },
                {
                    name: '--popover--border-bottom-style',
                    value: 'var(--border-bottom-style)'
                },
                {
                    name: '--popover--border-bottom-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--popover--border-left-width',
                    value: 'var(--border-left-width)'
                },
                {
                    name: '--popover--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--popover--border-left-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--popover--border-width',
                    value: 'var(--popover--border-top-width) var(--popover--border-right-width) var(--popover--border-bottom-width) var(--popover--border-left-width)'
                },
                {
                    name: '--popover--border-style',
                    value: 'var(--popover--border-top-style) var(--popover--border-right-style) var(--popover--border-bottom-style) var(--popover--border-left-style)'
                },
                {
                    name: '--popover--border-color',
                    value: 'var(--popover--border-top-color) var(--popover--border-right-color) var(--popover--border-bottom-color) var(--popover--border-left-color)'
                },
                {
                    name: '--popover--border-top',
                    value: 'var(--popover--border-top-width) var(--popover--border-top-style) var(--popover--border-top-color)'
                },
                {
                    name: '--popover--border-right',
                    value: 'var(--popover--border-right-width) var(--popover--border-right-style) var(--popover--border-right-color)'
                },
                {
                    name: '--popover--border-bottom',
                    value: 'var(--popover--border-bottom-width) var(--popover--border-bottom-style) var(--popover--border-bottom-color)'
                },
                {
                    name: '--popover--border-left',
                    value: 'var(--popover--border-left-width) var(--popover--border-left-style) var(--popover--border-left-color)'
                },
                {
                    name: '--popover--border',
                    value: 'var(--popover--border-top-width) var(--popover--border-top-style) var(--popover--border-top-color)'
                },
                {
                    name: '--popover--border-top-left-radius',
                    value: 'var(--border-top-left-radius)'
                },
                {
                    name: '--popover--border-top-right-radius',
                    value: 'var(--border-top-right-radius)'
                },
                {
                    name: '--popover--border-bottom-right-radius',
                    value: 'var(--border-bottom-right-radius)'
                },
                {
                    name: '--popover--border-bottom-left-radius',
                    value: 'var(--border-bottom-left-radius)'
                },
                {
                    name: '--popover--border-radius',
                    value: 'var(--popover--border-top-left-radius) var(--popover--border-top-right-radius) var(--popover--border-bottom-right-radius) var(--popover--border-bottom-left-radius)'
                },
                {
                    name: '--popover--font-size',
                    value: 'var(--font-size)'
                },
                {
                    name: '--popover--padding-top',
                    value: 'calc(var(--spacing) * 0.75)'
                },
                {
                    name: '--popover--padding-right',
                    value: 'var(--spacing)'
                },
                {
                    name: '--popover--padding-bottom',
                    value: 'calc(var(--spacing) * 0.75)'
                },
                {
                    name: '--popover--padding-left',
                    value: 'var(--spacing)'
                },
                {
                    name: '--popover--padding',
                    value: 'var(--popover--padding-top) var(--popover--padding-right) var(--popover--padding-bottom) var(--popover--padding-left)'
                },
                {
                    name: '--popover--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--popover--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--popover--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--popover--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--popover--box-shadow-color',
                    value: 'var(--box-shadow-color)'
                },
                {
                    name: '--popover--box-shadow',
                    value: 'var(--popover--box-shadow-offset-x) var(--popover--box-shadow-offset-y) var(--popover--box-shadow-blur-radius) var(--popover--box-shadow-spread-radius) var(--popover--box-shadow-color)'
                },
                {
                    name: '--popover--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--popover--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--popover--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--popover--transition',
                    value: 'var(--popover--transition-property) var(--popover--transition-duration) var(--popover--transition-timing-function)'
                },
                {
                    name: '--popover--max-width',
                    value: '90vw'
                },
                {
                    name: '--popover--z-index',
                    value: '2000'
                },
                {
                    name: '--popover--arrow--size',
                    value: 'calc(var(--spacing) * 0.5)'
                },
                {
                    name: '--popover--background',
                    value: 'var(--color-white)'
                },
                {
                    name: '--popover--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--popover--width',
                    value: 'calc(var(--spacing-md) * 18)'
                },
                {
                    name: '--popover--{color}--border-top-color'
                },
                {
                    name: '--popover--{color}--border-right-color'
                },
                {
                    name: '--popover--{color}--border-bottom-color'
                },
                {
                    name: '--popover--{color}--border-left-color'
                },
                {
                    name: '--popover--{color}--background'
                },
                {
                    name: '--popover--{color}--color'
                },
                {
                    name: '--popover--{size}--width'
                }
            ]
        }
    },
    {
        css: {
            namespace: '',
            variables: [
                {
                    name: '--popover--border-top-width',
                    value: 'var(--border-top-width)'
                },
                {
                    name: '--popover--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--popover--border-top-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--popover--border-right-width',
                    value: 'var(--border-right-width)'
                },
                {
                    name: '--popover--border-right-style',
                    value: 'var(--border-right-style)'
                },
                {
                    name: '--popover--border-right-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--popover--border-bottom-width',
                    value: 'var(--border-bottom-width)'
                },
                {
                    name: '--popover--border-bottom-style',
                    value: 'var(--border-bottom-style)'
                },
                {
                    name: '--popover--border-bottom-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--popover--border-left-width',
                    value: 'var(--border-left-width)'
                },
                {
                    name: '--popover--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--popover--border-left-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--popover--border-width',
                    value: 'var(--popover--border-top-width) var(--popover--border-right-width) var(--popover--border-bottom-width) var(--popover--border-left-width)'
                },
                {
                    name: '--popover--border-style',
                    value: 'var(--popover--border-top-style) var(--popover--border-right-style) var(--popover--border-bottom-style) var(--popover--border-left-style)'
                },
                {
                    name: '--popover--border-color',
                    value: 'var(--popover--border-top-color) var(--popover--border-right-color) var(--popover--border-bottom-color) var(--popover--border-left-color)'
                },
                {
                    name: '--popover--border-top',
                    value: 'var(--popover--border-top-width) var(--popover--border-top-style) var(--popover--border-top-color)'
                },
                {
                    name: '--popover--border-right',
                    value: 'var(--popover--border-right-width) var(--popover--border-right-style) var(--popover--border-right-color)'
                },
                {
                    name: '--popover--border-bottom',
                    value: 'var(--popover--border-bottom-width) var(--popover--border-bottom-style) var(--popover--border-bottom-color)'
                },
                {
                    name: '--popover--border-left',
                    value: 'var(--popover--border-left-width) var(--popover--border-left-style) var(--popover--border-left-color)'
                },
                {
                    name: '--popover--border',
                    value: 'var(--popover--border-top-width) var(--popover--border-top-style) var(--popover--border-top-color)'
                },
                {
                    name: '--popover--border-top-left-radius',
                    value: 'var(--border-top-left-radius)'
                },
                {
                    name: '--popover--border-top-right-radius',
                    value: 'var(--border-top-right-radius)'
                },
                {
                    name: '--popover--border-bottom-right-radius',
                    value: 'var(--border-bottom-right-radius)'
                },
                {
                    name: '--popover--border-bottom-left-radius',
                    value: 'var(--border-bottom-left-radius)'
                },
                {
                    name: '--popover--border-radius',
                    value: 'var(--popover--border-top-left-radius) var(--popover--border-top-right-radius) var(--popover--border-bottom-right-radius) var(--popover--border-bottom-left-radius)'
                },
                {
                    name: '--popover--font-size',
                    value: 'var(--font-size)'
                },
                {
                    name: '--popover--padding-top',
                    value: 'calc(var(--spacing) * 0.75)'
                },
                {
                    name: '--popover--padding-right',
                    value: 'var(--spacing)'
                },
                {
                    name: '--popover--padding-bottom',
                    value: 'calc(var(--spacing) * 0.75)'
                },
                {
                    name: '--popover--padding-left',
                    value: 'var(--spacing)'
                },
                {
                    name: '--popover--padding',
                    value: 'var(--popover--padding-top) var(--popover--padding-right) var(--popover--padding-bottom) var(--popover--padding-left)'
                },
                {
                    name: '--popover--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--popover--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--popover--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--popover--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--popover--box-shadow-color',
                    value: 'var(--box-shadow-color)'
                },
                {
                    name: '--popover--box-shadow',
                    value: 'var(--popover--box-shadow-offset-x) var(--popover--box-shadow-offset-y) var(--popover--box-shadow-blur-radius) var(--popover--box-shadow-spread-radius) var(--popover--box-shadow-color)'
                },
                {
                    name: '--popover--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--popover--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--popover--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--popover--transition',
                    value: 'var(--popover--transition-property) var(--popover--transition-duration) var(--popover--transition-timing-function)'
                },
                {
                    name: '--popover--max-width',
                    value: '90vw'
                },
                {
                    name: '--popover--z-index',
                    value: '2000'
                },
                {
                    name: '--popover--arrow--size',
                    value: 'calc(var(--spacing) * 0.5)'
                },
                {
                    name: '--popover--background',
                    value: 'var(--color-white)'
                },
                {
                    name: '--popover--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--popover--width',
                    value: 'calc(var(--spacing-md) * 18)'
                }
            ]
        }
    }
];

export default manifest;
