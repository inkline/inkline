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
                type: "'primary' | 'secondary' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger' | string",
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
                type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | string",
                description: 'The size variant of the button',
                default: ''
            },
            {
                name: 'variant',
                type: 'string | string[]',
                description: 'The variant of the button',
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
            variables: []
        }
    }
];

export default manifest;
