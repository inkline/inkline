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
                type: "'primary' | 'secondary' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger'",
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
            },
            {
                name: 'variant',
                type: "'primary' | 'secondary' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger'",
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
            variables: [
                {
                    name: '--button--border-top-width',
                    value: 'var(--border-top-width)'
                },
                {
                    name: '--button--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--button--border-top-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--button--border-right-width',
                    value: 'var(--border-right-width)'
                },
                {
                    name: '--button--border-right-style',
                    value: 'var(--border-right-style)'
                },
                {
                    name: '--button--border-right-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--button--border-bottom-width',
                    value: 'var(--border-bottom-width)'
                },
                {
                    name: '--button--border-bottom-style',
                    value: 'var(--border-bottom-style)'
                },
                {
                    name: '--button--border-bottom-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--button--border-left-width',
                    value: 'var(--border-left-width)'
                },
                {
                    name: '--button--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--button--border-left-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--button--border-width',
                    value: 'var(--button--border-top-width) var(--button--border-right-width) var(--button--border-bottom-width) var(--button--border-left-width)'
                },
                {
                    name: '--button--border-style',
                    value: 'var(--button--border-top-style) var(--button--border-right-style) var(--button--border-bottom-style) var(--button--border-left-style)'
                },
                {
                    name: '--button--border-color',
                    value: 'var(--button--border-top-color) var(--button--border-right-color) var(--button--border-bottom-color) var(--button--border-left-color)'
                },
                {
                    name: '--button--border-top',
                    value: 'var(--button--border-top-width) var(--button--border-top-style) var(--button--border-top-color)'
                },
                {
                    name: '--button--border-right',
                    value: 'var(--button--border-right-width) var(--button--border-right-style) var(--button--border-right-color)'
                },
                {
                    name: '--button--border-bottom',
                    value: 'var(--button--border-bottom-width) var(--button--border-bottom-style) var(--button--border-bottom-color)'
                },
                {
                    name: '--button--border-left',
                    value: 'var(--button--border-left-width) var(--button--border-left-style) var(--button--border-left-color)'
                },
                {
                    name: '--button--border',
                    value: 'var(--button--border-top-width) var(--button--border-top-style) var(--button--border-top-color)'
                },
                {
                    name: '--button--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--button--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--button--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--button--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--button--box-shadow-color',
                    value: 'var(--box-shadow-color)'
                },
                {
                    name: '--button--box-shadow',
                    value: 'var(--button--box-shadow-offset-x) var(--button--box-shadow-offset-y) var(--button--box-shadow-blur-radius) var(--button--box-shadow-spread-radius) var(--button--box-shadow-color)'
                },
                {
                    name: '--button--line-height',
                    value: 'var(--line-height)'
                },
                {
                    name: '--button--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--button--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--button--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--button--transition',
                    value: 'var(--button--transition-property) var(--button--transition-duration) var(--button--transition-timing-function)'
                },
                {
                    name: '--button--disabled--opacity',
                    value: '0.8'
                },
                {
                    name: '--button--block--margin-top',
                    value: 'var(--spacing)'
                },
                {
                    name: '--button--block--margin-right',
                    value: '0'
                },
                {
                    name: '--button--block--margin-bottom',
                    value: '0'
                },
                {
                    name: '--button--block--margin-left',
                    value: '0'
                },
                {
                    name: '--button--block--margin',
                    value: 'var(--button--block--margin-top) var(--button--block--margin-right) var(--button--block--margin-bottom) var(--button--block--margin-left)'
                },
                {
                    name: '--button--icon--margin-top',
                    value: '0'
                },
                {
                    name: '--button--icon--margin-right',
                    value: '0'
                },
                {
                    name: '--button--icon--margin-bottom',
                    value: '0'
                },
                {
                    name: '--button--icon--margin-left',
                    value: 'var(--spacing-xs)'
                },
                {
                    name: '--button--icon--margin',
                    value: 'var(--button--icon--margin-top) var(--button--icon--margin-right) var(--button--icon--margin-bottom) var(--button--icon--margin-left)'
                },
                {
                    name: '--button--background',
                    value: 'var(--color-light)'
                },
                {
                    name: '--button--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--button--active--border-top-width',
                    value: '0'
                },
                {
                    name: '--button--active--border-top-style',
                    value: 'none'
                },
                {
                    name: '--button--active--border-top-color',
                    value: 'var(--color-light-shade-100)'
                },
                {
                    name: '--button--active--border-right-width',
                    value: '0'
                },
                {
                    name: '--button--active--border-right-style',
                    value: 'none'
                },
                {
                    name: '--button--active--border-right-color',
                    value: 'var(--color-light-shade-100)'
                },
                {
                    name: '--button--active--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--button--active--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--button--active--border-bottom-color',
                    value: 'var(--color-light-shade-100)'
                },
                {
                    name: '--button--active--border-left-width',
                    value: '0'
                },
                {
                    name: '--button--active--border-left-style',
                    value: 'none'
                },
                {
                    name: '--button--active--border-left-color',
                    value: 'var(--color-light-shade-100)'
                },
                {
                    name: '--button--active--border-width',
                    value: 'var(--button--active--border-top-width) var(--button--active--border-right-width) var(--button--active--border-bottom-width) var(--button--active--border-left-width)'
                },
                {
                    name: '--button--active--border-style',
                    value: 'var(--button--active--border-top-style) var(--button--active--border-right-style) var(--button--active--border-bottom-style) var(--button--active--border-left-style)'
                },
                {
                    name: '--button--active--border-color',
                    value: 'var(--button--active--border-top-color) var(--button--active--border-right-color) var(--button--active--border-bottom-color) var(--button--active--border-left-color)'
                },
                {
                    name: '--button--active--border-top',
                    value: 'var(--button--active--border-top-width) var(--button--active--border-top-style) var(--button--active--border-top-color)'
                },
                {
                    name: '--button--active--border-right',
                    value: 'var(--button--active--border-right-width) var(--button--active--border-right-style) var(--button--active--border-right-color)'
                },
                {
                    name: '--button--active--border-bottom',
                    value: 'var(--button--active--border-bottom-width) var(--button--active--border-bottom-style) var(--button--active--border-bottom-color)'
                },
                {
                    name: '--button--active--border-left',
                    value: 'var(--button--active--border-left-width) var(--button--active--border-left-style) var(--button--active--border-left-color)'
                },
                {
                    name: '--button--active--border',
                    value: 'var(--button--active--border-top-width) var(--button--active--border-top-style) var(--button--active--border-top-color)'
                },
                {
                    name: '--button--active--background',
                    value: 'var(--color-light-shade-100)'
                },
                {
                    name: '--button--hover--border-top-width',
                    value: '0'
                },
                {
                    name: '--button--hover--border-top-style',
                    value: 'none'
                },
                {
                    name: '--button--hover--border-top-color',
                    value: 'var(--color-light-shade-100)'
                },
                {
                    name: '--button--hover--border-right-width',
                    value: '0'
                },
                {
                    name: '--button--hover--border-right-style',
                    value: 'none'
                },
                {
                    name: '--button--hover--border-right-color',
                    value: 'var(--color-light-shade-100)'
                },
                {
                    name: '--button--hover--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--button--hover--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--button--hover--border-bottom-color',
                    value: 'var(--color-light-shade-100)'
                },
                {
                    name: '--button--hover--border-left-width',
                    value: '0'
                },
                {
                    name: '--button--hover--border-left-style',
                    value: 'none'
                },
                {
                    name: '--button--hover--border-left-color',
                    value: 'var(--color-light-shade-100)'
                },
                {
                    name: '--button--hover--border-width',
                    value: 'var(--button--hover--border-top-width) var(--button--hover--border-right-width) var(--button--hover--border-bottom-width) var(--button--hover--border-left-width)'
                },
                {
                    name: '--button--hover--border-style',
                    value: 'var(--button--hover--border-top-style) var(--button--hover--border-right-style) var(--button--hover--border-bottom-style) var(--button--hover--border-left-style)'
                },
                {
                    name: '--button--hover--border-color',
                    value: 'var(--button--hover--border-top-color) var(--button--hover--border-right-color) var(--button--hover--border-bottom-color) var(--button--hover--border-left-color)'
                },
                {
                    name: '--button--hover--border-top',
                    value: 'var(--button--hover--border-top-width) var(--button--hover--border-top-style) var(--button--hover--border-top-color)'
                },
                {
                    name: '--button--hover--border-right',
                    value: 'var(--button--hover--border-right-width) var(--button--hover--border-right-style) var(--button--hover--border-right-color)'
                },
                {
                    name: '--button--hover--border-bottom',
                    value: 'var(--button--hover--border-bottom-width) var(--button--hover--border-bottom-style) var(--button--hover--border-bottom-color)'
                },
                {
                    name: '--button--hover--border-left',
                    value: 'var(--button--hover--border-left-width) var(--button--hover--border-left-style) var(--button--hover--border-left-color)'
                },
                {
                    name: '--button--hover--border',
                    value: 'var(--button--hover--border-top-width) var(--button--hover--border-top-style) var(--button--hover--border-top-color)'
                },
                {
                    name: '--button--hover--background',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--button--focus--border-top-width',
                    value: '0'
                },
                {
                    name: '--button--focus--border-top-style',
                    value: 'none'
                },
                {
                    name: '--button--focus--border-top-color',
                    value: 'var(--color-light-shade-100)'
                },
                {
                    name: '--button--focus--border-right-width',
                    value: '0'
                },
                {
                    name: '--button--focus--border-right-style',
                    value: 'none'
                },
                {
                    name: '--button--focus--border-right-color',
                    value: 'var(--color-light-shade-100)'
                },
                {
                    name: '--button--focus--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--button--focus--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--button--focus--border-bottom-color',
                    value: 'var(--color-light-shade-100)'
                },
                {
                    name: '--button--focus--border-left-width',
                    value: '0'
                },
                {
                    name: '--button--focus--border-left-style',
                    value: 'none'
                },
                {
                    name: '--button--focus--border-left-color',
                    value: 'var(--color-light-shade-100)'
                },
                {
                    name: '--button--focus--border-width',
                    value: 'var(--button--focus--border-top-width) var(--button--focus--border-right-width) var(--button--focus--border-bottom-width) var(--button--focus--border-left-width)'
                },
                {
                    name: '--button--focus--border-style',
                    value: 'var(--button--focus--border-top-style) var(--button--focus--border-right-style) var(--button--focus--border-bottom-style) var(--button--focus--border-left-style)'
                },
                {
                    name: '--button--focus--border-color',
                    value: 'var(--button--focus--border-top-color) var(--button--focus--border-right-color) var(--button--focus--border-bottom-color) var(--button--focus--border-left-color)'
                },
                {
                    name: '--button--focus--border-top',
                    value: 'var(--button--focus--border-top-width) var(--button--focus--border-top-style) var(--button--focus--border-top-color)'
                },
                {
                    name: '--button--focus--border-right',
                    value: 'var(--button--focus--border-right-width) var(--button--focus--border-right-style) var(--button--focus--border-right-color)'
                },
                {
                    name: '--button--focus--border-bottom',
                    value: 'var(--button--focus--border-bottom-width) var(--button--focus--border-bottom-style) var(--button--focus--border-bottom-color)'
                },
                {
                    name: '--button--focus--border-left',
                    value: 'var(--button--focus--border-left-width) var(--button--focus--border-left-style) var(--button--focus--border-left-color)'
                },
                {
                    name: '--button--focus--border',
                    value: 'var(--button--focus--border-top-width) var(--button--focus--border-top-style) var(--button--focus--border-top-color)'
                },
                {
                    name: '--button--focus--background',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--button--outline--border-top-width',
                    value: '0'
                },
                {
                    name: '--button--outline--border-top-style',
                    value: 'none'
                },
                {
                    name: '--button--outline--border-top-color',
                    value: 'var(--color-light)'
                },
                {
                    name: '--button--outline--border-right-width',
                    value: '0'
                },
                {
                    name: '--button--outline--border-right-style',
                    value: 'none'
                },
                {
                    name: '--button--outline--border-right-color',
                    value: 'var(--color-light)'
                },
                {
                    name: '--button--outline--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--button--outline--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--button--outline--border-bottom-color',
                    value: 'var(--color-light)'
                },
                {
                    name: '--button--outline--border-left-width',
                    value: '0'
                },
                {
                    name: '--button--outline--border-left-style',
                    value: 'none'
                },
                {
                    name: '--button--outline--border-left-color',
                    value: 'var(--color-light)'
                },
                {
                    name: '--button--outline--border-width',
                    value: 'var(--button--outline--border-top-width) var(--button--outline--border-right-width) var(--button--outline--border-bottom-width) var(--button--outline--border-left-width)'
                },
                {
                    name: '--button--outline--border-style',
                    value: 'var(--button--outline--border-top-style) var(--button--outline--border-right-style) var(--button--outline--border-bottom-style) var(--button--outline--border-left-style)'
                },
                {
                    name: '--button--outline--border-color',
                    value: 'var(--button--outline--border-top-color) var(--button--outline--border-right-color) var(--button--outline--border-bottom-color) var(--button--outline--border-left-color)'
                },
                {
                    name: '--button--outline--border-top',
                    value: 'var(--button--outline--border-top-width) var(--button--outline--border-top-style) var(--button--outline--border-top-color)'
                },
                {
                    name: '--button--outline--border-right',
                    value: 'var(--button--outline--border-right-width) var(--button--outline--border-right-style) var(--button--outline--border-right-color)'
                },
                {
                    name: '--button--outline--border-bottom',
                    value: 'var(--button--outline--border-bottom-width) var(--button--outline--border-bottom-style) var(--button--outline--border-bottom-color)'
                },
                {
                    name: '--button--outline--border-left',
                    value: 'var(--button--outline--border-left-width) var(--button--outline--border-left-style) var(--button--outline--border-left-color)'
                },
                {
                    name: '--button--outline--border',
                    value: 'var(--button--outline--border-top-width) var(--button--outline--border-top-style) var(--button--outline--border-top-color)'
                },
                {
                    name: '--button--outline--color',
                    value: 'var(--color-light)'
                },
                {
                    name: '--button--link--color',
                    value: 'var(--color-light)'
                },
                {
                    name: '--button--border-top-left-radius',
                    value: 'var(--border-top-left-radius-md)'
                },
                {
                    name: '--button--border-top-right-radius',
                    value: 'var(--border-top-right-radius-md)'
                },
                {
                    name: '--button--border-bottom-right-radius',
                    value: 'var(--border-bottom-right-radius-md)'
                },
                {
                    name: '--button--border-bottom-left-radius',
                    value: 'var(--border-bottom-left-radius-md)'
                },
                {
                    name: '--button--border-radius',
                    value: 'var(--button--border-top-left-radius) var(--button--border-top-right-radius) var(--button--border-bottom-right-radius) var(--button--border-bottom-left-radius)'
                },
                {
                    name: '--button--font-size',
                    value: 'var(--font-size-md)'
                },
                {
                    name: '--button--padding-top',
                    value: 'calc(var(--spacing-md) * 0.5)'
                },
                {
                    name: '--button--padding-right',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--button--padding-bottom',
                    value: 'calc(var(--spacing-md) * 0.5)'
                },
                {
                    name: '--button--padding-left',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--button--padding',
                    value: 'var(--button--padding-top) var(--button--padding-right) var(--button--padding-bottom) var(--button--padding-left)'
                },
                {
                    name: '--button--loader--width',
                    value: '1rem'
                },
                {
                    name: '--button--loader--height',
                    value: '1rem'
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
