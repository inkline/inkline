import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Drawer',
        props: [
            {
                name: 'closeOnPressEscape',
                type: 'boolean',
                description: 'Determines if the drawer should close when pressing escape',
                default: 'true'
            },
            {
                name: 'closeAriaLabel',
                type: 'string',
                description: 'The aria-label attribute of the close button',
                default: 'Close'
            },
            {
                name: 'color',
                type: "'primary' | 'success' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger'",
                description: 'The color variant of the drawer',
                default: ''
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: 'The disabled state of the drawer',
                default: 'false'
            },
            {
                name: 'fullscreen',
                type: 'boolean',
                description: 'Make the drawer cover the entire screen',
                default: 'false'
            },
            {
                name: 'hideOnClickOutside',
                type: 'boolean',
                description: 'Determines if the drawer should close when clicking the overlay',
                default: 'true'
            },
            {
                name: 'name',
                type: 'string',
                description: 'The identifier of the drawer',
                default: 'uid()'
            },
            {
                name: 'dismissible',
                type: 'boolean',
                description: 'Determines if the close icon should be visible in the drawer header',
                default: 'false'
            },
            {
                name: 'position',
                type: "'top' | 'right' | 'bottom' | 'left'",
                description: 'The position of the drawer',
                default: 'left'
            },
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                description: 'The size variant of the drawer',
                default: ''
            },
            {
                name: 'modelValue',
                type: 'boolean',
                description: 'Used to determine if drawer is visible or not',
                default: 'false'
            },
            {
                name: 'transition',
                type: "'fade-in-transition' | 'fade-in-linear-transition' | 'zoom-in-top-transition' | 'zoom-in-bottom-transition' | 'zoom-in-center-transition' | 'zoom-in-left-transition' | 'zoom-in-right-transition'",
                description: 'The drawer opening and closing animation',
                default: 'zoom-in-center-transition'
            },
            {
                name: 'header',
                type: 'string | VNode | VNode[]',
                description: 'The header of the drawer',
                default: 'undefined'
            },
            {
                name: 'icon',
                type: 'string | VNode | VNode[]',
                description: 'The icon of the drawer',
                default: 'undefined'
            },
            {
                name: 'body',
                type: 'string | VNode | VNode[]',
                description: 'The body of the drawer',
                default: 'undefined'
            },
            {
                name: 'footer',
                type: 'string | VNode | VNode[]',
                description: 'The footer of the drawer',
                default: 'undefined'
            }
        ],
        events: [
            {
                name: 'Drawer',
                description: 'Event emitted for setting the modelValue'
            },
            {
                name: 'Drawer',
                description: 'Event emitted when the drawer is open'
            },
            {
                name: 'Drawer',
                description: 'Event emitted when the drawer is opened and animation is finished'
            },
            {
                name: 'Drawer',
                description: 'Event emitted when the drawer is closed'
            },
            {
                name: 'Drawer',
                description: 'Event emitted when the drawer is closed and animation is finished'
            }
        ],
        slots: [
            {
                name: 'footer',
                description: 'Slot for drawer header content'
            },
            {
                name: 'close',
                description: 'Close button slot'
            },
            {
                name: 'default',
                description: 'Slot for drawer body content'
            },
            {
                name: 'footer',
                description: 'Slot for drawer footer content'
            }
        ],
        css: {
            namespace: 'drawer',
            variables: [
                {
                    name: '--drawer--border-top-width'
                },
                {
                    name: '--drawer--border-top-style'
                },
                {
                    name: '--drawer--border-top-color'
                },
                {
                    name: '--drawer--border-right-width'
                },
                {
                    name: '--drawer--border-right-style'
                },
                {
                    name: '--drawer--border-right-color'
                },
                {
                    name: '--drawer--border-bottom-width'
                },
                {
                    name: '--drawer--border-bottom-style'
                },
                {
                    name: '--drawer--border-bottom-color'
                },
                {
                    name: '--drawer--border-left-width'
                },
                {
                    name: '--drawer--border-left-style'
                },
                {
                    name: '--drawer--border-left-color'
                },
                {
                    name: '--drawer--border-width'
                },
                {
                    name: '--drawer--border-style'
                },
                {
                    name: '--drawer--border-color'
                },
                {
                    name: '--drawer--border-top'
                },
                {
                    name: '--drawer--border-right'
                },
                {
                    name: '--drawer--border-bottom'
                },
                {
                    name: '--drawer--border-left'
                },
                {
                    name: '--drawer--border'
                },
                {
                    name: '--drawer--box-shadow-offset-x'
                },
                {
                    name: '--drawer--box-shadow-offset-y'
                },
                {
                    name: '--drawer--box-shadow-blur-radius'
                },
                {
                    name: '--drawer--box-shadow-spread-radius'
                },
                {
                    name: '--drawer--box-shadow-color'
                },
                {
                    name: '--drawer--box-shadow'
                },
                {
                    name: '--drawer--transition-property'
                },
                {
                    name: '--drawer--transition-duration'
                },
                {
                    name: '--drawer--transition-timing-function'
                },
                {
                    name: '--drawer--transition'
                },
                {
                    name: '--drawer--width'
                },
                {
                    name: '--drawer--z-index'
                },
                {
                    name: '--drawer--wrapper--background'
                },
                {
                    name: '--drawer--close--color'
                },
                {
                    name: '--drawer--close--hover--background'
                },
                {
                    name: '--drawer--close--active--background'
                },
                {
                    name: '--drawer--close--size'
                },
                {
                    name: '--drawer--close--font-size'
                },
                {
                    name: '--drawer--background'
                },
                {
                    name: '--drawer--color'
                },
                {
                    name: '--drawer--header--background'
                },
                {
                    name: '--drawer--footer--background'
                },
                {
                    name: '--drawer--footer--button--margin-top'
                },
                {
                    name: '--drawer--footer--button--margin-right'
                },
                {
                    name: '--drawer--footer--button--margin-bottom'
                },
                {
                    name: '--drawer--footer--button--margin-left'
                },
                {
                    name: '--drawer--footer--button--margin'
                },
                {
                    name: '--drawer--border-top-left-radius'
                },
                {
                    name: '--drawer--border-top-right-radius'
                },
                {
                    name: '--drawer--border-bottom-right-radius'
                },
                {
                    name: '--drawer--border-bottom-left-radius'
                },
                {
                    name: '--drawer--border-radius'
                },
                {
                    name: '--drawer--font-size'
                },
                {
                    name: '--drawer--padding-top'
                },
                {
                    name: '--drawer--padding-right'
                },
                {
                    name: '--drawer--padding-bottom'
                },
                {
                    name: '--drawer--padding-left'
                },
                {
                    name: '--drawer--padding'
                },
                {
                    name: '--drawer--max-width'
                },
                {
                    name: '--drawer--icon--margin-top'
                },
                {
                    name: '--drawer--icon--margin-right'
                },
                {
                    name: '--drawer--icon--margin-bottom'
                },
                {
                    name: '--drawer--icon--margin-left'
                },
                {
                    name: '--drawer--icon--margin'
                },
                {
                    name: '--drawer--{color}--border-top-color'
                },
                {
                    name: '--drawer--{color}--border-right-color'
                },
                {
                    name: '--drawer--{color}--border-bottom-color'
                },
                {
                    name: '--drawer--{color}--border-left-color'
                },
                {
                    name: '--drawer--{color}--background'
                },
                {
                    name: '--drawer--{color}--color'
                },
                {
                    name: '--drawer--{color}--header--background'
                },
                {
                    name: '--drawer--{color}--footer--background'
                },
                {
                    name: '--drawer--{size}--border-top-left-radius'
                },
                {
                    name: '--drawer--{size}--border-top-right-radius'
                },
                {
                    name: '--drawer--{size}--border-bottom-right-radius'
                },
                {
                    name: '--drawer--{size}--border-bottom-left-radius'
                },
                {
                    name: '--drawer--{size}--font-size'
                },
                {
                    name: '--drawer--{size}--padding-top'
                },
                {
                    name: '--drawer--{size}--padding-right'
                },
                {
                    name: '--drawer--{size}--padding-bottom'
                },
                {
                    name: '--drawer--{size}--padding-left'
                },
                {
                    name: '--drawer--{size}--max-width'
                },
                {
                    name: '--drawer--{size}--close--size'
                },
                {
                    name: '--drawer--{size}--close--font-size'
                },
                {
                    name: '--drawer--{size}--icon--margin-top'
                },
                {
                    name: '--drawer--{size}--icon--margin-right'
                },
                {
                    name: '--drawer--{size}--icon--margin-bottom'
                },
                {
                    name: '--drawer--{size}--icon--margin-left'
                },
                {
                    name: '--drawer--{size}--footer--button--margin-top'
                },
                {
                    name: '--drawer--{size}--footer--button--margin-right'
                },
                {
                    name: '--drawer--{size}--footer--button--margin-bottom'
                },
                {
                    name: '--drawer--{size}--footer--button--margin-left'
                }
            ]
        }
    }
];

export default manifest;
