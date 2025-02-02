import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'ToastContainer',
        props: [
            {
                name: 'eventBus',
                type: 'EventBus',
                description: 'The event bus to use for showing/hiding toasts',
                default: 'toastEventBus'
            },
            {
                name: 'duration',
                type: 'number',
                description:
                    'The default duration for toasts in milliseconds, if not specified in the plugin or toast display options',
                default: 'undefined'
            },
            {
                name: 'dismissible',
                type: 'boolean',
                description:
                    'The default dismissible state for toasts, if not specified in the plugin or toast display options',
                default: 'undefined'
            },
            {
                name: 'showProgress',
                type: 'boolean',
                description:
                    'The default option for showing the progress bar for toasts, if not specified in the plugin or toast display options',
                default: 'undefined'
            }
        ],
        events: [],
        slots: [],
        css: {
            namespace: 'toast-container',
            variables: [
                {
                    name: '--toast-container--margin-top'
                },
                {
                    name: '--toast-container--margin-right'
                },
                {
                    name: '--toast-container--margin-bottom'
                },
                {
                    name: '--toast-container--margin-left'
                },
                {
                    name: '--toast-container--margin'
                },
                {
                    name: '--toast-container--width'
                },
                {
                    name: '--toast-container--z-index'
                },
                {
                    name: '--toast-container--toast--margin-top'
                },
                {
                    name: '--toast-container--toast--margin-right'
                },
                {
                    name: '--toast-container--toast--margin-bottom'
                },
                {
                    name: '--toast-container--toast--margin-left'
                },
                {
                    name: '--toast-container--toast--margin'
                },
                {
                    name: '--toast-container--toast--transition-property'
                },
                {
                    name: '--toast-container--toast--transition-duration'
                },
                {
                    name: '--toast-container--toast--transition-timing-function'
                },
                {
                    name: '--toast-container--toast--transition'
                }
            ]
        }
    },
    {
        name: 'Toast',
        props: [
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                description: 'The size variant of the toast',
                default: ''
            },
            {
                name: 'color',
                type: 'light | dark | info | success | warning | danger',
                description: 'The color variant of the toast',
                default: 'light'
            },
            {
                name: 'duration',
                type: 'number',
                description:
                    'The duration of the toast, in milliseconds. A duration of 0 will show the toast indefinitely.',
                default: '0'
            },
            {
                name: 'showProgress',
                type: 'boolean',
                description: 'Show progress bar for the duration of the toast',
                default: 'true'
            },
            {
                name: 'icon',
                type: 'string | VNode | VNode[]',
                description: 'The icon to be rendered in the toast',
                default: 'undefined'
            },
            {
                name: 'title',
                type: 'string | VNode | VNode[]',
                description: 'The title to be rendered in the toast',
                default: 'undefined'
            },
            {
                name: 'message',
                type: 'string | VNode | VNode[]',
                description: 'The message to be rendered in the toast',
                default: 'undefined'
            },
            {
                name: 'modelValue',
                type: 'boolean',
                description: 'Used to show or hide a dismissible toast',
                default: 'true'
            },
            {
                name: 'position',
                type: "'top-left' | 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left'",
                description: 'Used to set the position of the toast',
                default: 'top-right'
            },
            {
                name: 'dismissible',
                type: 'boolean',
                description: 'Shows a dismiss icon on the toast',
                default: 'false'
            },
            {
                name: 'dismissAriaLabel',
                type: 'string',
                description: 'The aria-label to use for the dismiss button',
                default: 'Dismiss'
            }
        ],
        events: [
            {
                name: 'Toast',
                description: 'Event emitted when the toast is dismissed'
            }
        ],
        slots: [
            {
                name: 'icon',
                description: 'Slot for toast icon'
            },
            {
                name: 'title',
                description: 'Slot for toast title'
            },
            {
                name: 'default',
                description: 'Slot for default toast content'
            },
            {
                name: 'dismiss',
                description: 'Slot for toast dismiss button'
            }
        ],
        css: {
            namespace: 'toast',
            variables: [
                {
                    name: '--toast--border-top-width'
                },
                {
                    name: '--toast--border-top-style'
                },
                {
                    name: '--toast--border-top-color'
                },
                {
                    name: '--toast--border-right-width'
                },
                {
                    name: '--toast--border-right-style'
                },
                {
                    name: '--toast--border-right-color'
                },
                {
                    name: '--toast--border-bottom-width'
                },
                {
                    name: '--toast--border-bottom-style'
                },
                {
                    name: '--toast--border-bottom-color'
                },
                {
                    name: '--toast--border-left-width'
                },
                {
                    name: '--toast--border-left-style'
                },
                {
                    name: '--toast--border-left-color'
                },
                {
                    name: '--toast--border-width'
                },
                {
                    name: '--toast--border-style'
                },
                {
                    name: '--toast--border-color'
                },
                {
                    name: '--toast--border-top'
                },
                {
                    name: '--toast--border-right'
                },
                {
                    name: '--toast--border-bottom'
                },
                {
                    name: '--toast--border-left'
                },
                {
                    name: '--toast--border'
                },
                {
                    name: '--toast--box-shadow-offset-x'
                },
                {
                    name: '--toast--box-shadow-offset-y'
                },
                {
                    name: '--toast--box-shadow-blur-radius'
                },
                {
                    name: '--toast--box-shadow-spread-radius'
                },
                {
                    name: '--toast--box-shadow-color'
                },
                {
                    name: '--toast--box-shadow'
                },
                {
                    name: '--toast--transition-property'
                },
                {
                    name: '--toast--transition-duration'
                },
                {
                    name: '--toast--transition-timing-function'
                },
                {
                    name: '--toast--transition'
                },
                {
                    name: '--toast--link--font-weight'
                },
                {
                    name: '--toast--title--font-weight'
                },
                {
                    name: '--toast--title--font-size'
                },
                {
                    name: '--toast--background'
                },
                {
                    name: '--toast--color'
                },
                {
                    name: '--toast--progress--background'
                },
                {
                    name: '--toast--progress--bar--background'
                },
                {
                    name: '--toast--progress--height'
                },
                {
                    name: '--toast--code--background'
                },
                {
                    name: '--toast--border-top-left-radius'
                },
                {
                    name: '--toast--border-top-right-radius'
                },
                {
                    name: '--toast--border-bottom-right-radius'
                },
                {
                    name: '--toast--border-bottom-left-radius'
                },
                {
                    name: '--toast--border-radius'
                },
                {
                    name: '--toast--font-size'
                },
                {
                    name: '--toast--padding-top'
                },
                {
                    name: '--toast--padding-right'
                },
                {
                    name: '--toast--padding-bottom'
                },
                {
                    name: '--toast--padding-left'
                },
                {
                    name: '--toast--padding'
                },
                {
                    name: '--toast--{color}--border-top-color'
                },
                {
                    name: '--toast--{color}--border-right-color'
                },
                {
                    name: '--toast--{color}--border-bottom-color'
                },
                {
                    name: '--toast--{color}--border-left-color'
                },
                {
                    name: '--toast--{color}--background'
                },
                {
                    name: '--toast--{color}--color'
                },
                {
                    name: '--toast--{color}--progress--background'
                },
                {
                    name: '--toast--{color}--progress--bar--background'
                },
                {
                    name: '--toast--{color}--code--background'
                },
                {
                    name: '--toast--{size}--border-top-left-radius'
                },
                {
                    name: '--toast--{size}--border-top-right-radius'
                },
                {
                    name: '--toast--{size}--border-bottom-right-radius'
                },
                {
                    name: '--toast--{size}--border-bottom-left-radius'
                },
                {
                    name: '--toast--{size}--font-size'
                },
                {
                    name: '--toast--{size}--padding-top'
                },
                {
                    name: '--toast--{size}--padding-right'
                },
                {
                    name: '--toast--{size}--padding-bottom'
                },
                {
                    name: '--toast--{size}--padding-left'
                },
                {
                    name: '--toast--{size}--progress--height'
                }
            ]
        }
    },
    {
        css: {
            namespace: '',
            variables: [
                {
                    name: '--toast--border-top-width'
                },
                {
                    name: '--toast--border-top-style'
                },
                {
                    name: '--toast--border-top-color'
                },
                {
                    name: '--toast--border-right-width'
                },
                {
                    name: '--toast--border-right-style'
                },
                {
                    name: '--toast--border-right-color'
                },
                {
                    name: '--toast--border-bottom-width'
                },
                {
                    name: '--toast--border-bottom-style'
                },
                {
                    name: '--toast--border-bottom-color'
                },
                {
                    name: '--toast--border-left-width'
                },
                {
                    name: '--toast--border-left-style'
                },
                {
                    name: '--toast--border-left-color'
                },
                {
                    name: '--toast--border-width'
                },
                {
                    name: '--toast--border-style'
                },
                {
                    name: '--toast--border-color'
                },
                {
                    name: '--toast--border-top'
                },
                {
                    name: '--toast--border-right'
                },
                {
                    name: '--toast--border-bottom'
                },
                {
                    name: '--toast--border-left'
                },
                {
                    name: '--toast--border'
                },
                {
                    name: '--toast--box-shadow-offset-x'
                },
                {
                    name: '--toast--box-shadow-offset-y'
                },
                {
                    name: '--toast--box-shadow-blur-radius'
                },
                {
                    name: '--toast--box-shadow-spread-radius'
                },
                {
                    name: '--toast--box-shadow-color'
                },
                {
                    name: '--toast--box-shadow'
                },
                {
                    name: '--toast--transition-property'
                },
                {
                    name: '--toast--transition-duration'
                },
                {
                    name: '--toast--transition-timing-function'
                },
                {
                    name: '--toast--transition'
                },
                {
                    name: '--toast--link--font-weight'
                },
                {
                    name: '--toast--title--font-weight'
                },
                {
                    name: '--toast--title--font-size'
                },
                {
                    name: '--toast--background'
                },
                {
                    name: '--toast--color'
                },
                {
                    name: '--toast--progress--background'
                },
                {
                    name: '--toast--progress--bar--background'
                },
                {
                    name: '--toast--progress--height'
                },
                {
                    name: '--toast--code--background'
                },
                {
                    name: '--toast--border-top-left-radius'
                },
                {
                    name: '--toast--border-top-right-radius'
                },
                {
                    name: '--toast--border-bottom-right-radius'
                },
                {
                    name: '--toast--border-bottom-left-radius'
                },
                {
                    name: '--toast--border-radius'
                },
                {
                    name: '--toast--font-size'
                },
                {
                    name: '--toast--padding-top'
                },
                {
                    name: '--toast--padding-right'
                },
                {
                    name: '--toast--padding-bottom'
                },
                {
                    name: '--toast--padding-left'
                },
                {
                    name: '--toast--padding'
                },
                {
                    name: '--toast-container--margin-top'
                },
                {
                    name: '--toast-container--margin-right'
                },
                {
                    name: '--toast-container--margin-bottom'
                },
                {
                    name: '--toast-container--margin-left'
                },
                {
                    name: '--toast-container--margin'
                },
                {
                    name: '--toast-container--width'
                },
                {
                    name: '--toast-container--z-index'
                },
                {
                    name: '--toast-container--toast--margin-top'
                },
                {
                    name: '--toast-container--toast--margin-right'
                },
                {
                    name: '--toast-container--toast--margin-bottom'
                },
                {
                    name: '--toast-container--toast--margin-left'
                },
                {
                    name: '--toast-container--toast--margin'
                },
                {
                    name: '--toast-container--toast--transition-property'
                },
                {
                    name: '--toast-container--toast--transition-duration'
                },
                {
                    name: '--toast-container--toast--transition-timing-function'
                },
                {
                    name: '--toast-container--toast--transition'
                }
            ]
        }
    }
];

export default manifest;
