import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Button',
        props: [
            {
                name: 'active',
                type: 'boolean',
                description: 'The active state of the button',
                default: 'false'
            },
            {
                name: 'block',
                type: 'boolean',
                description: 'Display the button as a block, spanning the full container width',
                default: 'false'
            },
            {
                name: 'circle',
                type: 'boolean',
                description: 'Display the button as a circle',
                default: 'false'
            },
            {
                name: 'color',
                type: "'primary' | 'success' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger'",
                description: 'The color variant of the button',
                default: ''
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: 'The disabled state of the button',
                default: 'false'
            },
            {
                name: 'to',
                type: 'string',
                description: 'Renders the component as an anchor link with a `href` attribute',
                default: 'undefined'
            },
            {
                name: 'link',
                type: 'boolean',
                description: 'Display the button as a link',
                default: 'false'
            },
            {
                name: 'loading',
                type: 'boolean',
                description: 'The loading state of the button',
                default: 'false'
            },
            {
                name: 'outline',
                type: 'boolean',
                description: 'Display the button as an outline button',
                default: 'false'
            },
            {
                name: 'square',
                type: 'boolean',
                description: 'Display the button as a square',
                default: 'false'
            },
            {
                name: 'tag',
                type: 'string',
                description: 'Set the HTML tag to be used for rendering the button',
                default: 'button'
            },
            {
                name: 'tabindex',
                type: 'number | string',
                description: 'The tabindex of the button',
                default: '0'
            },
            {
                name: 'to',
                type: 'string',
                description:
                    'Renders the component as a Router Link component with a `to` attribute',
                default: 'undefined'
            },
            {
                name: 'type',
                type: "'button' | 'submit' | 'reset' | string",
                description: 'The type of the button',
                default: ''
            },
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                description: 'The size variant of the button',
                default: ''
            }
        ],
        events: [
            {
                name: 'Button',
                description: 'Emitted when the button is clicked'
            }
        ],
        slots: [
            {
                name: 'loading-icon',
                description: 'Slot for button loading icon'
            },
            {
                name: 'loading',
                description: 'Slot for button loading text'
            },
            {
                name: 'icon',
                description: 'Slot for button icon'
            },
            {
                name: 'default',
                description: 'Slot for default button content'
            }
        ],
        css: {
            namespace: 'button',
            variables: [
                {
                    name: '--button--border-top-width'
                },
                {
                    name: '--button--border-top-style'
                },
                {
                    name: '--button--border-top-color'
                },
                {
                    name: '--button--border-right-width'
                },
                {
                    name: '--button--border-right-style'
                },
                {
                    name: '--button--border-right-color'
                },
                {
                    name: '--button--border-bottom-width'
                },
                {
                    name: '--button--border-bottom-style'
                },
                {
                    name: '--button--border-bottom-color'
                },
                {
                    name: '--button--border-left-width'
                },
                {
                    name: '--button--border-left-style'
                },
                {
                    name: '--button--border-left-color'
                },
                {
                    name: '--button--border-width'
                },
                {
                    name: '--button--border-style'
                },
                {
                    name: '--button--border-color'
                },
                {
                    name: '--button--border-top'
                },
                {
                    name: '--button--border-right'
                },
                {
                    name: '--button--border-bottom'
                },
                {
                    name: '--button--border-left'
                },
                {
                    name: '--button--border'
                },
                {
                    name: '--button--box-shadow-offset-x'
                },
                {
                    name: '--button--box-shadow-offset-y'
                },
                {
                    name: '--button--box-shadow-blur-radius'
                },
                {
                    name: '--button--box-shadow-spread-radius'
                },
                {
                    name: '--button--box-shadow-color'
                },
                {
                    name: '--button--box-shadow'
                },
                {
                    name: '--button--line-height'
                },
                {
                    name: '--button--transition-property'
                },
                {
                    name: '--button--transition-duration'
                },
                {
                    name: '--button--transition-timing-function'
                },
                {
                    name: '--button--transition'
                },
                {
                    name: '--button--disabled--opacity'
                },
                {
                    name: '--button--block--margin-top'
                },
                {
                    name: '--button--block--margin-right'
                },
                {
                    name: '--button--block--margin-bottom'
                },
                {
                    name: '--button--block--margin-left'
                },
                {
                    name: '--button--block--margin'
                },
                {
                    name: '--button--icon--margin-top'
                },
                {
                    name: '--button--icon--margin-right'
                },
                {
                    name: '--button--icon--margin-bottom'
                },
                {
                    name: '--button--icon--margin-left'
                },
                {
                    name: '--button--icon--margin'
                },
                {
                    name: '--button--background'
                },
                {
                    name: '--button--color'
                },
                {
                    name: '--button--active--border-top-width'
                },
                {
                    name: '--button--active--border-top-style'
                },
                {
                    name: '--button--active--border-top-color'
                },
                {
                    name: '--button--active--border-right-width'
                },
                {
                    name: '--button--active--border-right-style'
                },
                {
                    name: '--button--active--border-right-color'
                },
                {
                    name: '--button--active--border-bottom-width'
                },
                {
                    name: '--button--active--border-bottom-style'
                },
                {
                    name: '--button--active--border-bottom-color'
                },
                {
                    name: '--button--active--border-left-width'
                },
                {
                    name: '--button--active--border-left-style'
                },
                {
                    name: '--button--active--border-left-color'
                },
                {
                    name: '--button--active--border-width'
                },
                {
                    name: '--button--active--border-style'
                },
                {
                    name: '--button--active--border-color'
                },
                {
                    name: '--button--active--border-top'
                },
                {
                    name: '--button--active--border-right'
                },
                {
                    name: '--button--active--border-bottom'
                },
                {
                    name: '--button--active--border-left'
                },
                {
                    name: '--button--active--border'
                },
                {
                    name: '--button--active--background'
                },
                {
                    name: '--button--hover--border-top-width'
                },
                {
                    name: '--button--hover--border-top-style'
                },
                {
                    name: '--button--hover--border-top-color'
                },
                {
                    name: '--button--hover--border-right-width'
                },
                {
                    name: '--button--hover--border-right-style'
                },
                {
                    name: '--button--hover--border-right-color'
                },
                {
                    name: '--button--hover--border-bottom-width'
                },
                {
                    name: '--button--hover--border-bottom-style'
                },
                {
                    name: '--button--hover--border-bottom-color'
                },
                {
                    name: '--button--hover--border-left-width'
                },
                {
                    name: '--button--hover--border-left-style'
                },
                {
                    name: '--button--hover--border-left-color'
                },
                {
                    name: '--button--hover--border-width'
                },
                {
                    name: '--button--hover--border-style'
                },
                {
                    name: '--button--hover--border-color'
                },
                {
                    name: '--button--hover--border-top'
                },
                {
                    name: '--button--hover--border-right'
                },
                {
                    name: '--button--hover--border-bottom'
                },
                {
                    name: '--button--hover--border-left'
                },
                {
                    name: '--button--hover--border'
                },
                {
                    name: '--button--hover--background'
                },
                {
                    name: '--button--focus--border-top-width'
                },
                {
                    name: '--button--focus--border-top-style'
                },
                {
                    name: '--button--focus--border-top-color'
                },
                {
                    name: '--button--focus--border-right-width'
                },
                {
                    name: '--button--focus--border-right-style'
                },
                {
                    name: '--button--focus--border-right-color'
                },
                {
                    name: '--button--focus--border-bottom-width'
                },
                {
                    name: '--button--focus--border-bottom-style'
                },
                {
                    name: '--button--focus--border-bottom-color'
                },
                {
                    name: '--button--focus--border-left-width'
                },
                {
                    name: '--button--focus--border-left-style'
                },
                {
                    name: '--button--focus--border-left-color'
                },
                {
                    name: '--button--focus--border-width'
                },
                {
                    name: '--button--focus--border-style'
                },
                {
                    name: '--button--focus--border-color'
                },
                {
                    name: '--button--focus--border-top'
                },
                {
                    name: '--button--focus--border-right'
                },
                {
                    name: '--button--focus--border-bottom'
                },
                {
                    name: '--button--focus--border-left'
                },
                {
                    name: '--button--focus--border'
                },
                {
                    name: '--button--focus--background'
                },
                {
                    name: '--button--outline--border-top-width'
                },
                {
                    name: '--button--outline--border-top-style'
                },
                {
                    name: '--button--outline--border-top-color'
                },
                {
                    name: '--button--outline--border-right-width'
                },
                {
                    name: '--button--outline--border-right-style'
                },
                {
                    name: '--button--outline--border-right-color'
                },
                {
                    name: '--button--outline--border-bottom-width'
                },
                {
                    name: '--button--outline--border-bottom-style'
                },
                {
                    name: '--button--outline--border-bottom-color'
                },
                {
                    name: '--button--outline--border-left-width'
                },
                {
                    name: '--button--outline--border-left-style'
                },
                {
                    name: '--button--outline--border-left-color'
                },
                {
                    name: '--button--outline--border-width'
                },
                {
                    name: '--button--outline--border-style'
                },
                {
                    name: '--button--outline--border-color'
                },
                {
                    name: '--button--outline--border-top'
                },
                {
                    name: '--button--outline--border-right'
                },
                {
                    name: '--button--outline--border-bottom'
                },
                {
                    name: '--button--outline--border-left'
                },
                {
                    name: '--button--outline--border'
                },
                {
                    name: '--button--outline--color'
                },
                {
                    name: '--button--link--color'
                },
                {
                    name: '--button--border-top-left-radius'
                },
                {
                    name: '--button--border-top-right-radius'
                },
                {
                    name: '--button--border-bottom-right-radius'
                },
                {
                    name: '--button--border-bottom-left-radius'
                },
                {
                    name: '--button--border-radius'
                },
                {
                    name: '--button--font-size'
                },
                {
                    name: '--button--padding-top'
                },
                {
                    name: '--button--padding-right'
                },
                {
                    name: '--button--padding-bottom'
                },
                {
                    name: '--button--padding-left'
                },
                {
                    name: '--button--padding'
                },
                {
                    name: '--button--loader--width'
                },
                {
                    name: '--button--loader--height'
                },
                {
                    name: '--button--{color}--border-top-color'
                },
                {
                    name: '--button--{color}--border-right-color'
                },
                {
                    name: '--button--{color}--border-bottom-color'
                },
                {
                    name: '--button--{color}--border-left-color'
                },
                {
                    name: '--button--{color}--background'
                },
                {
                    name: '--button--{color}--color'
                },
                {
                    name: '--button--{color}--active--border-top-color'
                },
                {
                    name: '--button--{color}--active--border-right-color'
                },
                {
                    name: '--button--{color}--active--border-bottom-color'
                },
                {
                    name: '--button--{color}--active--border-left-color'
                },
                {
                    name: '--button--{color}--active--background'
                },
                {
                    name: '--button--{color}--hover--border-top-color'
                },
                {
                    name: '--button--{color}--hover--border-right-color'
                },
                {
                    name: '--button--{color}--hover--border-bottom-color'
                },
                {
                    name: '--button--{color}--hover--border-left-color'
                },
                {
                    name: '--button--{color}--hover--background'
                },
                {
                    name: '--button--{color}--focus--border-top-color'
                },
                {
                    name: '--button--{color}--focus--border-right-color'
                },
                {
                    name: '--button--{color}--focus--border-bottom-color'
                },
                {
                    name: '--button--{color}--focus--border-left-color'
                },
                {
                    name: '--button--{color}--focus--background'
                },
                {
                    name: '--button--{color}--outline--border-top-color'
                },
                {
                    name: '--button--{color}--outline--border-right-color'
                },
                {
                    name: '--button--{color}--outline--border-bottom-color'
                },
                {
                    name: '--button--{color}--outline--border-left-color'
                },
                {
                    name: '--button--{color}--outline--color'
                },
                {
                    name: '--button--{color}--link--color'
                },
                {
                    name: '--button--{size}--border-top-left-radius'
                },
                {
                    name: '--button--{size}--border-top-right-radius'
                },
                {
                    name: '--button--{size}--border-bottom-right-radius'
                },
                {
                    name: '--button--{size}--border-bottom-left-radius'
                },
                {
                    name: '--button--{size}--font-size'
                },
                {
                    name: '--button--{size}--padding-top'
                },
                {
                    name: '--button--{size}--padding-right'
                },
                {
                    name: '--button--{size}--padding-bottom'
                },
                {
                    name: '--button--{size}--padding-left'
                },
                {
                    name: '--button--{size}--loader--width'
                },
                {
                    name: '--button--{size}--loader--height'
                }
            ]
        }
    }
];

export default manifest;
