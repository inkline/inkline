import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
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
                name: 'interactable',
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
                name: 'sizeMultiplier',
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
                name: 'header',
                description: 'Slot for popover header content'
            },
            {
                name: 'body',
                description: 'Slot for popover body content'
            },
            {
                name: 'footer',
                description: 'Slot for popover footer content'
            }
        ],
        css: {
            namespace: 'popover',
            variables: [
                {
                    name: '--popover--border-top-width'
                },
                {
                    name: '--popover--border-top-style'
                },
                {
                    name: '--popover--border-top-color'
                },
                {
                    name: '--popover--border-right-width'
                },
                {
                    name: '--popover--border-right-style'
                },
                {
                    name: '--popover--border-right-color'
                },
                {
                    name: '--popover--border-bottom-width'
                },
                {
                    name: '--popover--border-bottom-style'
                },
                {
                    name: '--popover--border-bottom-color'
                },
                {
                    name: '--popover--border-left-width'
                },
                {
                    name: '--popover--border-left-style'
                },
                {
                    name: '--popover--border-left-color'
                },
                {
                    name: '--popover--border-width'
                },
                {
                    name: '--popover--border-style'
                },
                {
                    name: '--popover--border-color'
                },
                {
                    name: '--popover--border-top'
                },
                {
                    name: '--popover--border-right'
                },
                {
                    name: '--popover--border-bottom'
                },
                {
                    name: '--popover--border-left'
                },
                {
                    name: '--popover--border'
                },
                {
                    name: '--popover--box-shadow-offset-x'
                },
                {
                    name: '--popover--box-shadow-offset-y'
                },
                {
                    name: '--popover--box-shadow-blur-radius'
                },
                {
                    name: '--popover--box-shadow-spread-radius'
                },
                {
                    name: '--popover--box-shadow-color'
                },
                {
                    name: '--popover--box-shadow'
                },
                {
                    name: '--popover--padding-top'
                },
                {
                    name: '--popover--padding-right'
                },
                {
                    name: '--popover--padding-bottom'
                },
                {
                    name: '--popover--padding-left'
                },
                {
                    name: '--popover--padding'
                },
                {
                    name: '--popover--transition-property'
                },
                {
                    name: '--popover--transition-duration'
                },
                {
                    name: '--popover--transition-timing-function'
                },
                {
                    name: '--popover--transition'
                },
                {
                    name: '--popover--max-width'
                },
                {
                    name: '--popover--z-index'
                },
                {
                    name: '--popover--background'
                },
                {
                    name: '--popover--color'
                },
                {
                    name: '--popover--border-top-left-radius'
                },
                {
                    name: '--popover--border-top-right-radius'
                },
                {
                    name: '--popover--border-bottom-right-radius'
                },
                {
                    name: '--popover--border-bottom-left-radius'
                },
                {
                    name: '--popover--border-radius'
                },
                {
                    name: '--popover--font-size'
                },
                {
                    name: '--popover--width'
                },
                {
                    name: '--popover--arrow--size'
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
                    name: '--popover--{size}--border-top-left-radius'
                },
                {
                    name: '--popover--{size}--border-top-right-radius'
                },
                {
                    name: '--popover--{size}--border-bottom-right-radius'
                },
                {
                    name: '--popover--{size}--border-bottom-left-radius'
                },
                {
                    name: '--popover--{size}--font-size'
                },
                {
                    name: '--popover--{size}--padding-top'
                },
                {
                    name: '--popover--{size}--padding-right'
                },
                {
                    name: '--popover--{size}--padding-bottom'
                },
                {
                    name: '--popover--{size}--padding-left'
                },
                {
                    name: '--popover--{size}--width'
                },
                {
                    name: '--popover--{size}--arrow--size'
                }
            ]
        }
    }
];

export default manifest;
