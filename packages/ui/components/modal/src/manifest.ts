import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'ModalClose',
        props: [
            {
                name: 'closeAriaLabel',
                type: 'string',
                description: 'The aria-label attribute of the close button',
                default: 'Close'
            }
        ],
        events: [],
        slots: [
            {
                name: 'close',
                description: 'Close button slot'
            }
        ]
    },
    {
        name: 'ModalContainer',
        props: [
            {
                name: 'eventBus',
                type: 'EventBus',
                description: 'The event bus to use for showing/hiding modals',
                default: 'modalEventBus'
            }
        ],
        events: [],
        slots: [],
        css: {
            namespace: '',
            variables: []
        }
    },
    {
        name: 'Modal',
        props: [
            {
                name: 'closeOnPressEscape',
                type: 'boolean',
                description: 'Determines if the modal should close when pressing escape',
                default: 'true'
            },
            {
                name: 'color',
                type: "'primary' | 'success' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger'",
                description: 'The color variant of the modal',
                default: ''
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: 'The disabled state of the modal',
                default: 'false'
            },
            {
                name: 'fullscreen',
                type: 'boolean',
                description: 'Make the modal cover the entire screen',
                default: 'false'
            },
            {
                name: 'hideOnClickOutside',
                type: 'boolean',
                description: 'Determines if the modal should close when clicking the overlay',
                default: 'true'
            },
            {
                name: 'name',
                type: 'string',
                description: 'The identifier of the modal',
                default: 'uid()'
            },
            {
                name: 'dismissible',
                type: 'boolean',
                description: 'Determines if the close icon should be visible in the modal header',
                default: 'false'
            },
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                description: 'The size variant of the modal',
                default: ''
            },
            {
                name: 'modelValue',
                type: 'boolean',
                description: 'Used to determine if modal is visible or not',
                default: 'false'
            },
            {
                name: 'transition',
                type: "'fade-in-transition' | 'fade-in-linear-transition' | 'zoom-in-top-transition' | 'zoom-in-bottom-transition' | 'zoom-in-center-transition' | 'zoom-in-left-transition' | 'zoom-in-right-transition'",
                description: 'The modal opening and closing animation',
                default: 'zoom-in-center-transition'
            },
            {
                name: 'header',
                type: 'string | VNode | VNode[]',
                description: 'The header of the modal',
                default: 'undefined'
            },
            {
                name: 'icon',
                type: 'string | VNode | VNode[]',
                description: 'The icon of the modal',
                default: 'undefined'
            },
            {
                name: 'content',
                type: 'string | VNode | VNode[]',
                description: 'The content of the modal',
                default: 'undefined'
            },
            {
                name: 'footer',
                type: 'string | VNode | VNode[]',
                description: 'The footer of the modal',
                default: 'undefined'
            }
        ],
        events: [
            {
                name: 'Modal',
                description: 'Event emitted for setting the modelValue'
            },
            {
                name: 'Modal',
                description: 'Event emitted when the modal is open'
            },
            {
                name: 'Modal',
                description: 'Event emitted when the modal is opened and animation is finished'
            },
            {
                name: 'Modal',
                description: 'Event emitted when the modal is closed'
            },
            {
                name: 'Modal',
                description: 'Event emitted when the modal is closed and animation is finished'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Slot for modal content'
            }
        ],
        css: {
            namespace: 'modal',
            variables: [
                {
                    name: '--modal--border-top-width'
                },
                {
                    name: '--modal--border-top-style'
                },
                {
                    name: '--modal--border-top-color'
                },
                {
                    name: '--modal--border-right-width'
                },
                {
                    name: '--modal--border-right-style'
                },
                {
                    name: '--modal--border-right-color'
                },
                {
                    name: '--modal--border-bottom-width'
                },
                {
                    name: '--modal--border-bottom-style'
                },
                {
                    name: '--modal--border-bottom-color'
                },
                {
                    name: '--modal--border-left-width'
                },
                {
                    name: '--modal--border-left-style'
                },
                {
                    name: '--modal--border-left-color'
                },
                {
                    name: '--modal--border-width'
                },
                {
                    name: '--modal--border-style'
                },
                {
                    name: '--modal--border-color'
                },
                {
                    name: '--modal--border-top'
                },
                {
                    name: '--modal--border-right'
                },
                {
                    name: '--modal--border-bottom'
                },
                {
                    name: '--modal--border-left'
                },
                {
                    name: '--modal--border'
                },
                {
                    name: '--modal--box-shadow-offset-x'
                },
                {
                    name: '--modal--box-shadow-offset-y'
                },
                {
                    name: '--modal--box-shadow-blur-radius'
                },
                {
                    name: '--modal--box-shadow-spread-radius'
                },
                {
                    name: '--modal--box-shadow-color'
                },
                {
                    name: '--modal--box-shadow'
                },
                {
                    name: '--modal--transition-property'
                },
                {
                    name: '--modal--transition-duration'
                },
                {
                    name: '--modal--transition-timing-function'
                },
                {
                    name: '--modal--transition'
                },
                {
                    name: '--modal--width'
                },
                {
                    name: '--modal--z-index'
                },
                {
                    name: '--modal--wrapper--background'
                },
                {
                    name: '--modal--close--color'
                },
                {
                    name: '--modal--close--hover--background'
                },
                {
                    name: '--modal--close--active--background'
                },
                {
                    name: '--modal--close--size'
                },
                {
                    name: '--modal--close--font-size'
                },
                {
                    name: '--modal--background'
                },
                {
                    name: '--modal--color'
                },
                {
                    name: '--modal--border-top-left-radius'
                },
                {
                    name: '--modal--border-top-right-radius'
                },
                {
                    name: '--modal--border-bottom-right-radius'
                },
                {
                    name: '--modal--border-bottom-left-radius'
                },
                {
                    name: '--modal--border-radius'
                },
                {
                    name: '--modal--font-size'
                },
                {
                    name: '--modal--padding-top'
                },
                {
                    name: '--modal--padding-right'
                },
                {
                    name: '--modal--padding-bottom'
                },
                {
                    name: '--modal--padding-left'
                },
                {
                    name: '--modal--padding'
                },
                {
                    name: '--modal--max-width'
                },
                {
                    name: '--modal--footer--gap'
                },
                {
                    name: '--modal--{color}--border-top-color'
                },
                {
                    name: '--modal--{color}--border-right-color'
                },
                {
                    name: '--modal--{color}--border-bottom-color'
                },
                {
                    name: '--modal--{color}--border-left-color'
                },
                {
                    name: '--modal--{color}--background'
                },
                {
                    name: '--modal--{color}--color'
                },
                {
                    name: '--modal--{size}--border-top-left-radius'
                },
                {
                    name: '--modal--{size}--border-top-right-radius'
                },
                {
                    name: '--modal--{size}--border-bottom-right-radius'
                },
                {
                    name: '--modal--{size}--border-bottom-left-radius'
                },
                {
                    name: '--modal--{size}--font-size'
                },
                {
                    name: '--modal--{size}--padding-top'
                },
                {
                    name: '--modal--{size}--padding-right'
                },
                {
                    name: '--modal--{size}--padding-bottom'
                },
                {
                    name: '--modal--{size}--padding-left'
                },
                {
                    name: '--modal--{size}--max-width'
                },
                {
                    name: '--modal--{size}--close--size'
                },
                {
                    name: '--modal--{size}--close--font-size'
                },
                {
                    name: '--modal--{size}--footer--gap'
                }
            ]
        }
    },
    {
        css: {
            namespace: '',
            variables: [
                {
                    name: '--modal--border-top-width'
                },
                {
                    name: '--modal--border-top-style'
                },
                {
                    name: '--modal--border-top-color'
                },
                {
                    name: '--modal--border-right-width'
                },
                {
                    name: '--modal--border-right-style'
                },
                {
                    name: '--modal--border-right-color'
                },
                {
                    name: '--modal--border-bottom-width'
                },
                {
                    name: '--modal--border-bottom-style'
                },
                {
                    name: '--modal--border-bottom-color'
                },
                {
                    name: '--modal--border-left-width'
                },
                {
                    name: '--modal--border-left-style'
                },
                {
                    name: '--modal--border-left-color'
                },
                {
                    name: '--modal--border-width'
                },
                {
                    name: '--modal--border-style'
                },
                {
                    name: '--modal--border-color'
                },
                {
                    name: '--modal--border-top'
                },
                {
                    name: '--modal--border-right'
                },
                {
                    name: '--modal--border-bottom'
                },
                {
                    name: '--modal--border-left'
                },
                {
                    name: '--modal--border'
                },
                {
                    name: '--modal--box-shadow-offset-x'
                },
                {
                    name: '--modal--box-shadow-offset-y'
                },
                {
                    name: '--modal--box-shadow-blur-radius'
                },
                {
                    name: '--modal--box-shadow-spread-radius'
                },
                {
                    name: '--modal--box-shadow-color'
                },
                {
                    name: '--modal--box-shadow'
                },
                {
                    name: '--modal--transition-property'
                },
                {
                    name: '--modal--transition-duration'
                },
                {
                    name: '--modal--transition-timing-function'
                },
                {
                    name: '--modal--transition'
                },
                {
                    name: '--modal--width'
                },
                {
                    name: '--modal--z-index'
                },
                {
                    name: '--modal--wrapper--background'
                },
                {
                    name: '--modal--close--color'
                },
                {
                    name: '--modal--close--hover--background'
                },
                {
                    name: '--modal--close--active--background'
                },
                {
                    name: '--modal--close--size'
                },
                {
                    name: '--modal--close--font-size'
                },
                {
                    name: '--modal--background'
                },
                {
                    name: '--modal--color'
                },
                {
                    name: '--modal--border-top-left-radius'
                },
                {
                    name: '--modal--border-top-right-radius'
                },
                {
                    name: '--modal--border-bottom-right-radius'
                },
                {
                    name: '--modal--border-bottom-left-radius'
                },
                {
                    name: '--modal--border-radius'
                },
                {
                    name: '--modal--font-size'
                },
                {
                    name: '--modal--padding-top'
                },
                {
                    name: '--modal--padding-right'
                },
                {
                    name: '--modal--padding-bottom'
                },
                {
                    name: '--modal--padding-left'
                },
                {
                    name: '--modal--padding'
                },
                {
                    name: '--modal--max-width'
                },
                {
                    name: '--modal--footer--gap'
                }
            ]
        }
    }
];

export default manifest;
