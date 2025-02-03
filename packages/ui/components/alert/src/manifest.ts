import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Alert',
        props: [
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                description: 'The size variant of the alert',
                default: 'undefined'
            },
            {
                name: 'color',
                type: "'info' | 'success' | 'warning' | 'danger'",
                description: 'The color variant of the alert',
                default: "'info'"
            },
            {
                name: 'modelValue',
                type: 'boolean',
                description: 'Used to show or hide the alert',
                default: 'undefined'
            },
            {
                name: 'dismissible',
                type: 'boolean',
                description: 'Shows a dismiss icon on the alert',
                default: 'false'
            },
            {
                name: 'dismissAriaLabel',
                type: 'string',
                description: 'The aria-label to use for the dismiss button',
                default: 'Dismiss'
            },
            {
                name: 'icon',
                type: 'string | VNode | VNode[]',
                description: 'The icon to be rendered in the toast',
                default: 'undefined'
            }
        ],
        events: [
            {
                name: 'Alert',
                description: 'Event emitted for setting the modelValue'
            }
        ],
        slots: [
            {
                name: 'icon',
                description: 'Slot for alert icon'
            },
            {
                name: 'default',
                description: 'Slot for default alert content'
            },
            {
                name: 'dismiss',
                description: 'Slot for alert dismiss button'
            }
        ],
        css: {
            namespace: 'alert',
            variables: [
                {
                    name: '--alert--border-top-width'
                },
                {
                    name: '--alert--border-top-style'
                },
                {
                    name: '--alert--border-top-color'
                },
                {
                    name: '--alert--border-right-width'
                },
                {
                    name: '--alert--border-right-style'
                },
                {
                    name: '--alert--border-right-color'
                },
                {
                    name: '--alert--border-bottom-width'
                },
                {
                    name: '--alert--border-bottom-style'
                },
                {
                    name: '--alert--border-bottom-color'
                },
                {
                    name: '--alert--border-left-width'
                },
                {
                    name: '--alert--border-left-style'
                },
                {
                    name: '--alert--border-left-color'
                },
                {
                    name: '--alert--border-width'
                },
                {
                    name: '--alert--border-style'
                },
                {
                    name: '--alert--border-color'
                },
                {
                    name: '--alert--border-top'
                },
                {
                    name: '--alert--border-right'
                },
                {
                    name: '--alert--border-bottom'
                },
                {
                    name: '--alert--border-left'
                },
                {
                    name: '--alert--border'
                },
                {
                    name: '--alert--box-shadow-offset-x'
                },
                {
                    name: '--alert--box-shadow-offset-y'
                },
                {
                    name: '--alert--box-shadow-blur-radius'
                },
                {
                    name: '--alert--box-shadow-spread-radius'
                },
                {
                    name: '--alert--box-shadow-color'
                },
                {
                    name: '--alert--box-shadow'
                },
                {
                    name: '--alert--transition-property'
                },
                {
                    name: '--alert--transition-duration'
                },
                {
                    name: '--alert--transition-timing-function'
                },
                {
                    name: '--alert--transition'
                },
                {
                    name: '--alert--link--font-weight'
                },
                {
                    name: '--alert--background'
                },
                {
                    name: '--alert--color'
                },
                {
                    name: '--alert--border-top-left-radius'
                },
                {
                    name: '--alert--border-top-right-radius'
                },
                {
                    name: '--alert--border-bottom-right-radius'
                },
                {
                    name: '--alert--border-bottom-left-radius'
                },
                {
                    name: '--alert--border-radius'
                },
                {
                    name: '--alert--font-size'
                },
                {
                    name: '--alert--padding-top'
                },
                {
                    name: '--alert--padding-right'
                },
                {
                    name: '--alert--padding-bottom'
                },
                {
                    name: '--alert--padding-left'
                },
                {
                    name: '--alert--padding'
                },
                {
                    name: '--alert--{color}--border-top-color'
                },
                {
                    name: '--alert--{color}--border-right-color'
                },
                {
                    name: '--alert--{color}--border-bottom-color'
                },
                {
                    name: '--alert--{color}--border-left-color'
                },
                {
                    name: '--alert--{color}--background'
                },
                {
                    name: '--alert--{color}--color'
                },
                {
                    name: '--alert--{size}--border-top-left-radius'
                },
                {
                    name: '--alert--{size}--border-top-right-radius'
                },
                {
                    name: '--alert--{size}--border-bottom-right-radius'
                },
                {
                    name: '--alert--{size}--border-bottom-left-radius'
                },
                {
                    name: '--alert--{size}--font-size'
                },
                {
                    name: '--alert--{size}--padding-top'
                },
                {
                    name: '--alert--{size}--padding-right'
                },
                {
                    name: '--alert--{size}--padding-bottom'
                },
                {
                    name: '--alert--{size}--padding-left'
                }
            ]
        }
    }
];

export default manifest;
