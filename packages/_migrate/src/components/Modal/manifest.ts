import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'Modal',
    props: [
        {
            name: 'closeOnPressEscape',
            type: ['Boolean'],
            default: 'true',
            description: 'Determines if the modal should close when pressing escape'
        },
        {
            name: 'closeAriaLabel',
            type: ['String'],
            default: 'Close',
            description: 'The aria-label attribute of the close button'
        },
        {
            name: 'color',
            type: ['primary', 'success', 'light', 'dark', 'info', 'success', 'warning', 'danger'],
            default: '',
            description: 'The color variant of the modal'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the modal'
        },
        {
            name: 'fullscreen',
            type: ['Boolean'],
            default: 'false',
            description: 'Make the modal cover the entire screen'
        },
        {
            name: 'hideOnClickOutside',
            type: ['Boolean'],
            default: 'true',
            description: 'Determines if the modal should close when clicking the overlay'
        },
        {
            name: 'name',
            type: ['String'],
            default: 'uid()',
            description: 'The identifier of the modal'
        },
        {
            name: 'dismissible',
            type: ['Boolean'],
            default: 'false',
            description: 'Determines if the close icon should be visible in the modal header'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the modal'
        },
        {
            name: 'modelValue',
            type: ['Boolean'],
            default: 'false',
            description: 'Used to determine if modal is visible or not'
        },
        {
            name: 'transition',
            type: [
                'fade-in-transition',
                'fade-in-linear-transition',
                'zoom-in-top-transition',
                'zoom-in-bottom-transition',
                'zoom-in-center-transition',
                'zoom-in-left-transition',
                'zoom-in-right-transition'
            ],
            default: 'zoom-in-center-transition',
            description: 'The modal opening and closing animation'
        },
        {
            name: 'header',
            type: ['string', 'VNode', 'VNode[]'],
            default: 'undefined',
            description: 'The header of the modal'
        },
        {
            name: 'icon',
            type: ['string', 'VNode', 'VNode[]'],
            default: 'undefined',
            description: 'The icon of the modal'
        },
        {
            name: 'body',
            type: ['string', 'VNode', 'VNode[]'],
            default: 'undefined',
            description: 'The body of the modal'
        },
        {
            name: 'footer',
            type: ['string', 'VNode', 'VNode[]'],
            default: 'undefined',
            description: 'The footer of the modal'
        }
    ],
    events: [
        {
            description: 'Event emitted for setting the modelValue',
            name: 'update:modelValue'
        },
        {
            description: 'Event emitted when the modal is open',
            name: 'open'
        },
        {
            description: 'Event emitted when the modal is opened and animation is finished',
            name: 'opened'
        },
        {
            description: 'Event emitted when the modal is closed',
            name: 'close'
        },
        {
            description: 'Event emitted when the modal is closed and animation is finished',
            name: 'close'
        }
    ],
    slots: [
        {
            name: 'footer',
            description: 'Slot for modal header content '
        },
        {
            name: 'close',
            description: 'Close icon slot '
        },
        {
            name: 'default',
            description: 'Slot for modal body content '
        },
        {
            name: 'footer',
            description: 'Slot for modal footer content '
        }
    ],
    css: {
        selector: '.modal-wrapper',
        variables: [
            {
                name: '--modal--wrapper--background',
                value: []
            },
            {
                name: '--modal--footer--button--margin',
                value: []
            },
            {
                name: '--modal--border-radius',
                value: [
                    {
                        name: '--modal--border-top-left-radius'
                    },
                    {
                        name: '--modal--border-top-right-radius'
                    },
                    {
                        name: '--modal--border-bottom-left-radius'
                    },
                    {
                        name: '--modal--border-bottom-right-radius'
                    }
                ]
            },
            {
                name: '--modal--box-shadow',
                value: []
            },
            {
                name: '--modal--max-width',
                value: []
            },
            {
                name: '--modal--width',
                value: []
            },
            {
                name: '--modal--font-size',
                value: []
            },
            {
                name: '--modal--line-height',
                value: []
            },
            {
                name: '--modal--header--background',
                value: []
            },
            {
                name: '--modal--header--border-style',
                value: []
            },
            {
                name: '--modal--header--border-width',
                value: []
            },
            {
                name: '--modal--header--border-color',
                value: []
            },
            {
                name: '--modal--header--color',
                value: []
            },
            {
                name: '--modal--header--padding',
                value: []
            },
            {
                name: '--modal--header--close--border-radius',
                value: []
            },
            {
                name: '--modal--header--close--width',
                value: []
            },
            {
                name: '--modal--header--close--height',
                value: []
            },
            {
                name: '--modal--header--close--color',
                value: []
            },
            {
                name: '--modal--header--close--font-size',
                value: []
            },
            {
                name: '--modal--header--close--hover--background',
                value: []
            },
            {
                name: '--modal--header--close--focus--background',
                value: []
            },
            {
                name: '--modal--header--close--active--background',
                value: []
            },
            {
                name: '--modal--background',
                value: []
            },
            {
                name: '--modal--border-style',
                value: []
            },
            {
                name: '--modal--border-width',
                value: []
            },
            {
                name: '--modal--border-color',
                value: []
            },
            {
                name: '--modal--color',
                value: []
            },
            {
                name: '--modal--padding',
                value: []
            },
            {
                name: '--modal--icon--margin',
                value: []
            },
            {
                name: '--modal--footer--background',
                value: []
            },
            {
                name: '--modal--footer--border-style',
                value: []
            },
            {
                name: '--modal--footer--border-width',
                value: []
            },
            {
                name: '--modal--footer--border-color',
                value: []
            },
            {
                name: '--modal--footer--color',
                value: []
            },
            {
                name: '--modal--footer--padding',
                value: []
            },
            {
                name: '--modal--fullscreen--border-radius',
                value: [
                    {
                        name: '--modal--fullscreen--border-top-left-radius'
                    },
                    {
                        name: '--modal--fullscreen--border-top-right-radius'
                    },
                    {
                        name: '--modal--fullscreen--border-bottom-left-radius'
                    },
                    {
                        name: '--modal--fullscreen--border-bottom-right-radius'
                    }
                ]
            },
            {
                name: '--modal--fullscreen--header--background',
                value: []
            },
            {
                name: '--modal--fullscreen--body--background',
                value: []
            },
            {
                name: '--modal--fullscreen--footer--background',
                value: []
            }
        ]
    }
};

export default manifest;
