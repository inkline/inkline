import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Nav',
        props: [
            {
                name: 'color',
                type: "'light' | 'dark'",
                description: 'The color variant of the nav',
                default: ''
            },
            {
                name: 'sizeMultiplier',
                type: "'sm' | 'md' | 'lg'",
                description: 'The size variant of the nav',
                default: ''
            },
            {
                name: 'vertical',
                type: 'boolean',
                description: 'Display the nav with vertical orientation',
                default: 'false'
            },
            {
                name: 'items',
                type: 'NavItemDefinition[]',
                description: 'Nav items to display',
                default: ''
            }
        ],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for default nav content'
            }
        ],
        css: {
            namespace: 'nav',
            variables: [
                {
                    name: '--nav--border-top-width'
                },
                {
                    name: '--nav--border-top-style'
                },
                {
                    name: '--nav--border-top-color'
                },
                {
                    name: '--nav--border-right-width'
                },
                {
                    name: '--nav--border-right-style'
                },
                {
                    name: '--nav--border-right-color'
                },
                {
                    name: '--nav--border-bottom-width'
                },
                {
                    name: '--nav--border-bottom-style'
                },
                {
                    name: '--nav--border-bottom-color'
                },
                {
                    name: '--nav--border-left-width'
                },
                {
                    name: '--nav--border-left-style'
                },
                {
                    name: '--nav--border-left-color'
                },
                {
                    name: '--nav--border-width'
                },
                {
                    name: '--nav--border-style'
                },
                {
                    name: '--nav--border-color'
                },
                {
                    name: '--nav--border-top'
                },
                {
                    name: '--nav--border-right'
                },
                {
                    name: '--nav--border-bottom'
                },
                {
                    name: '--nav--border-left'
                },
                {
                    name: '--nav--border'
                },
                {
                    name: '--nav--box-shadow-offset-x'
                },
                {
                    name: '--nav--box-shadow-offset-y'
                },
                {
                    name: '--nav--box-shadow-blur-radius'
                },
                {
                    name: '--nav--box-shadow-spread-radius'
                },
                {
                    name: '--nav--box-shadow-color'
                },
                {
                    name: '--nav--box-shadow'
                },
                {
                    name: '--nav--transition-property'
                },
                {
                    name: '--nav--transition-duration'
                },
                {
                    name: '--nav--transition-timing-function'
                },
                {
                    name: '--nav--transition'
                },
                {
                    name: '--nav--checkmark--color'
                },
                {
                    name: '--nav--checkmark--width'
                },
                {
                    name: '--nav--checkmark--height'
                },
                {
                    name: '--nav--disabled--color'
                },
                {
                    name: '--nav--disabled--background'
                },
                {
                    name: '--nav--disabled--border-top-width'
                },
                {
                    name: '--nav--disabled--border-top-style'
                },
                {
                    name: '--nav--disabled--border-top-color'
                },
                {
                    name: '--nav--disabled--border-right-width'
                },
                {
                    name: '--nav--disabled--border-right-style'
                },
                {
                    name: '--nav--disabled--border-right-color'
                },
                {
                    name: '--nav--disabled--border-bottom-width'
                },
                {
                    name: '--nav--disabled--border-bottom-style'
                },
                {
                    name: '--nav--disabled--border-bottom-color'
                },
                {
                    name: '--nav--disabled--border-left-width'
                },
                {
                    name: '--nav--disabled--border-left-style'
                },
                {
                    name: '--nav--disabled--border-left-color'
                },
                {
                    name: '--nav--disabled--border-width'
                },
                {
                    name: '--nav--disabled--border-style'
                },
                {
                    name: '--nav--disabled--border-color'
                },
                {
                    name: '--nav--disabled--border-top'
                },
                {
                    name: '--nav--disabled--border-right'
                },
                {
                    name: '--nav--disabled--border-bottom'
                },
                {
                    name: '--nav--disabled--border-left'
                },
                {
                    name: '--nav--disabled--border'
                },
                {
                    name: '--nav--readonly--color'
                },
                {
                    name: '--nav--readonly--background'
                },
                {
                    name: '--nav--readonly--border-top-width'
                },
                {
                    name: '--nav--readonly--border-top-style'
                },
                {
                    name: '--nav--readonly--border-top-color'
                },
                {
                    name: '--nav--readonly--border-right-width'
                },
                {
                    name: '--nav--readonly--border-right-style'
                },
                {
                    name: '--nav--readonly--border-right-color'
                },
                {
                    name: '--nav--readonly--border-bottom-width'
                },
                {
                    name: '--nav--readonly--border-bottom-style'
                },
                {
                    name: '--nav--readonly--border-bottom-color'
                },
                {
                    name: '--nav--readonly--border-left-width'
                },
                {
                    name: '--nav--readonly--border-left-style'
                },
                {
                    name: '--nav--readonly--border-left-color'
                },
                {
                    name: '--nav--readonly--border-width'
                },
                {
                    name: '--nav--readonly--border-style'
                },
                {
                    name: '--nav--readonly--border-color'
                },
                {
                    name: '--nav--readonly--border-top'
                },
                {
                    name: '--nav--readonly--border-right'
                },
                {
                    name: '--nav--readonly--border-bottom'
                },
                {
                    name: '--nav--readonly--border-left'
                },
                {
                    name: '--nav--readonly--border'
                },
                {
                    name: '--nav--checked--background'
                },
                {
                    name: '--nav--checked--border-top-width'
                },
                {
                    name: '--nav--checked--border-top-style'
                },
                {
                    name: '--nav--checked--border-top-color'
                },
                {
                    name: '--nav--checked--border-right-width'
                },
                {
                    name: '--nav--checked--border-right-style'
                },
                {
                    name: '--nav--checked--border-right-color'
                },
                {
                    name: '--nav--checked--border-bottom-width'
                },
                {
                    name: '--nav--checked--border-bottom-style'
                },
                {
                    name: '--nav--checked--border-bottom-color'
                },
                {
                    name: '--nav--checked--border-left-width'
                },
                {
                    name: '--nav--checked--border-left-style'
                },
                {
                    name: '--nav--checked--border-left-color'
                },
                {
                    name: '--nav--checked--border-width'
                },
                {
                    name: '--nav--checked--border-style'
                },
                {
                    name: '--nav--checked--border-color'
                },
                {
                    name: '--nav--checked--border-top'
                },
                {
                    name: '--nav--checked--border-right'
                },
                {
                    name: '--nav--checked--border-bottom'
                },
                {
                    name: '--nav--checked--border-left'
                },
                {
                    name: '--nav--checked--border'
                },
                {
                    name: '--nav--checked--disabled--background'
                },
                {
                    name: '--nav--checked--disabled--border-top-width'
                },
                {
                    name: '--nav--checked--disabled--border-top-style'
                },
                {
                    name: '--nav--checked--disabled--border-top-color'
                },
                {
                    name: '--nav--checked--disabled--border-right-width'
                },
                {
                    name: '--nav--checked--disabled--border-right-style'
                },
                {
                    name: '--nav--checked--disabled--border-right-color'
                },
                {
                    name: '--nav--checked--disabled--border-bottom-width'
                },
                {
                    name: '--nav--checked--disabled--border-bottom-style'
                },
                {
                    name: '--nav--checked--disabled--border-bottom-color'
                },
                {
                    name: '--nav--checked--disabled--border-left-width'
                },
                {
                    name: '--nav--checked--disabled--border-left-style'
                },
                {
                    name: '--nav--checked--disabled--border-left-color'
                },
                {
                    name: '--nav--checked--disabled--border-width'
                },
                {
                    name: '--nav--checked--disabled--border-style'
                },
                {
                    name: '--nav--checked--disabled--border-color'
                },
                {
                    name: '--nav--checked--disabled--border-top'
                },
                {
                    name: '--nav--checked--disabled--border-right'
                },
                {
                    name: '--nav--checked--disabled--border-bottom'
                },
                {
                    name: '--nav--checked--disabled--border-left'
                },
                {
                    name: '--nav--checked--disabled--border'
                },
                {
                    name: '--nav--checked--readonly--background'
                },
                {
                    name: '--nav--checked--readonly--border-top-width'
                },
                {
                    name: '--nav--checked--readonly--border-top-style'
                },
                {
                    name: '--nav--checked--readonly--border-top-color'
                },
                {
                    name: '--nav--checked--readonly--border-right-width'
                },
                {
                    name: '--nav--checked--readonly--border-right-style'
                },
                {
                    name: '--nav--checked--readonly--border-right-color'
                },
                {
                    name: '--nav--checked--readonly--border-bottom-width'
                },
                {
                    name: '--nav--checked--readonly--border-bottom-style'
                },
                {
                    name: '--nav--checked--readonly--border-bottom-color'
                },
                {
                    name: '--nav--checked--readonly--border-left-width'
                },
                {
                    name: '--nav--checked--readonly--border-left-style'
                },
                {
                    name: '--nav--checked--readonly--border-left-color'
                },
                {
                    name: '--nav--checked--readonly--border-width'
                },
                {
                    name: '--nav--checked--readonly--border-style'
                },
                {
                    name: '--nav--checked--readonly--border-color'
                },
                {
                    name: '--nav--checked--readonly--border-top'
                },
                {
                    name: '--nav--checked--readonly--border-right'
                },
                {
                    name: '--nav--checked--readonly--border-bottom'
                },
                {
                    name: '--nav--checked--readonly--border-left'
                },
                {
                    name: '--nav--checked--readonly--border'
                },
                {
                    name: '--nav--focus--box-shadow-offset-x'
                },
                {
                    name: '--nav--focus--box-shadow-offset-y'
                },
                {
                    name: '--nav--focus--box-shadow-blur-radius'
                },
                {
                    name: '--nav--focus--box-shadow-spread-radius'
                },
                {
                    name: '--nav--focus--box-shadow-color'
                },
                {
                    name: '--nav--focus--box-shadow'
                },
                {
                    name: '--nav--background'
                },
                {
                    name: '--nav--color'
                },
                {
                    name: '--nav--border-top-left-radius'
                },
                {
                    name: '--nav--border-top-right-radius'
                },
                {
                    name: '--nav--border-bottom-right-radius'
                },
                {
                    name: '--nav--border-bottom-left-radius'
                },
                {
                    name: '--nav--border-radius'
                },
                {
                    name: '--nav--font-size'
                },
                {
                    name: '--nav--margin-top'
                },
                {
                    name: '--nav--margin-right'
                },
                {
                    name: '--nav--margin-bottom'
                },
                {
                    name: '--nav--margin-left'
                },
                {
                    name: '--nav--margin'
                },
                {
                    name: '--nav--width'
                },
                {
                    name: '--nav--height'
                },
                {
                    name: '--nav--{color}--border-top-color'
                },
                {
                    name: '--nav--{color}--border-right-color'
                },
                {
                    name: '--nav--{color}--border-bottom-color'
                },
                {
                    name: '--nav--{color}--border-left-color'
                },
                {
                    name: '--nav--{color}--background'
                },
                {
                    name: '--nav--{color}--color'
                },
                {
                    name: '--nav--{color}--disabled--background'
                },
                {
                    name: '--nav--{color}--disabled--border-top-color'
                },
                {
                    name: '--nav--{color}--disabled--border-right-color'
                },
                {
                    name: '--nav--{color}--disabled--border-bottom-color'
                },
                {
                    name: '--nav--{color}--disabled--border-left-color'
                },
                {
                    name: '--nav--{color}--readonly--background'
                },
                {
                    name: '--nav--{color}--readonly--border-top-color'
                },
                {
                    name: '--nav--{color}--readonly--border-right-color'
                },
                {
                    name: '--nav--{color}--readonly--border-bottom-color'
                },
                {
                    name: '--nav--{color}--readonly--border-left-color'
                },
                {
                    name: '--nav--{color}--checked--disabled--background'
                },
                {
                    name: '--nav--{color}--checked--disabled--border-top-color'
                },
                {
                    name: '--nav--{color}--checked--disabled--border-right-color'
                },
                {
                    name: '--nav--{color}--checked--disabled--border-bottom-color'
                },
                {
                    name: '--nav--{color}--checked--disabled--border-left-color'
                },
                {
                    name: '--nav--{color}--checked--readonly--background'
                },
                {
                    name: '--nav--{color}--checked--readonly--border-top-color'
                },
                {
                    name: '--nav--{color}--checked--readonly--border-right-color'
                },
                {
                    name: '--nav--{color}--checked--readonly--border-bottom-color'
                },
                {
                    name: '--nav--{color}--checked--readonly--border-left-color'
                },
                {
                    name: '--nav--{size}--border-top-left-radius'
                },
                {
                    name: '--nav--{size}--border-top-right-radius'
                },
                {
                    name: '--nav--{size}--border-bottom-right-radius'
                },
                {
                    name: '--nav--{size}--border-bottom-left-radius'
                },
                {
                    name: '--nav--{size}--font-size'
                },
                {
                    name: '--nav--{size}--margin-top'
                },
                {
                    name: '--nav--{size}--margin-right'
                },
                {
                    name: '--nav--{size}--margin-bottom'
                },
                {
                    name: '--nav--{size}--margin-left'
                },
                {
                    name: '--nav--{size}--width'
                },
                {
                    name: '--nav--{size}--height'
                },
                {
                    name: '--nav--{size}--checkmark--width'
                },
                {
                    name: '--nav--{size}--checkmark--height'
                }
            ]
        }
    },
    {
        name: 'NavItem',
        props: [
            {
                name: 'active',
                type: 'boolean',
                description: 'The active state of the nav item',
                default: 'false'
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: 'The disabled state of the nav item',
                default: 'false'
            },
            {
                name: 'to',
                type: 'string',
                description: 'Renders the component as an anchor link with a `href` attribute',
                default: 'undefined'
            },
            {
                name: 'stopPropagation',
                type: 'boolean',
                description:
                    'Used to close the nearest navbar or sidebar by propagating the onClick event',
                default: 'false'
            },
            {
                name: 'tag',
                type: 'string',
                description: 'Set the HTML tag to be used for rendering the nav item',
                default: 'div'
            },
            {
                name: 'tabindex',
                type: 'number | string',
                description: 'The tabindex of the list group item',
                default: '0'
            },
            {
                name: 'to',
                type: 'string',
                description:
                    'Renders the component as a Router Link component with a `to` attribute',
                default: 'undefined'
            }
        ],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for default nav item content'
            }
        ],
        css: {
            namespace: '',
            variables: []
        }
    },
    {
        css: {
            namespace: '',
            variables: [
                {
                    name: '--nav--border-top-width'
                },
                {
                    name: '--nav--border-top-style'
                },
                {
                    name: '--nav--border-top-color'
                },
                {
                    name: '--nav--border-right-width'
                },
                {
                    name: '--nav--border-right-style'
                },
                {
                    name: '--nav--border-right-color'
                },
                {
                    name: '--nav--border-bottom-width'
                },
                {
                    name: '--nav--border-bottom-style'
                },
                {
                    name: '--nav--border-bottom-color'
                },
                {
                    name: '--nav--border-left-width'
                },
                {
                    name: '--nav--border-left-style'
                },
                {
                    name: '--nav--border-left-color'
                },
                {
                    name: '--nav--border-width'
                },
                {
                    name: '--nav--border-style'
                },
                {
                    name: '--nav--border-color'
                },
                {
                    name: '--nav--border-top'
                },
                {
                    name: '--nav--border-right'
                },
                {
                    name: '--nav--border-bottom'
                },
                {
                    name: '--nav--border-left'
                },
                {
                    name: '--nav--border'
                },
                {
                    name: '--nav--box-shadow-offset-x'
                },
                {
                    name: '--nav--box-shadow-offset-y'
                },
                {
                    name: '--nav--box-shadow-blur-radius'
                },
                {
                    name: '--nav--box-shadow-spread-radius'
                },
                {
                    name: '--nav--box-shadow-color'
                },
                {
                    name: '--nav--box-shadow'
                },
                {
                    name: '--nav--transition-property'
                },
                {
                    name: '--nav--transition-duration'
                },
                {
                    name: '--nav--transition-timing-function'
                },
                {
                    name: '--nav--transition'
                },
                {
                    name: '--nav--checkmark--color'
                },
                {
                    name: '--nav--checkmark--width'
                },
                {
                    name: '--nav--checkmark--height'
                },
                {
                    name: '--nav--disabled--color'
                },
                {
                    name: '--nav--disabled--background'
                },
                {
                    name: '--nav--disabled--border-top-width'
                },
                {
                    name: '--nav--disabled--border-top-style'
                },
                {
                    name: '--nav--disabled--border-top-color'
                },
                {
                    name: '--nav--disabled--border-right-width'
                },
                {
                    name: '--nav--disabled--border-right-style'
                },
                {
                    name: '--nav--disabled--border-right-color'
                },
                {
                    name: '--nav--disabled--border-bottom-width'
                },
                {
                    name: '--nav--disabled--border-bottom-style'
                },
                {
                    name: '--nav--disabled--border-bottom-color'
                },
                {
                    name: '--nav--disabled--border-left-width'
                },
                {
                    name: '--nav--disabled--border-left-style'
                },
                {
                    name: '--nav--disabled--border-left-color'
                },
                {
                    name: '--nav--disabled--border-width'
                },
                {
                    name: '--nav--disabled--border-style'
                },
                {
                    name: '--nav--disabled--border-color'
                },
                {
                    name: '--nav--disabled--border-top'
                },
                {
                    name: '--nav--disabled--border-right'
                },
                {
                    name: '--nav--disabled--border-bottom'
                },
                {
                    name: '--nav--disabled--border-left'
                },
                {
                    name: '--nav--disabled--border'
                },
                {
                    name: '--nav--readonly--color'
                },
                {
                    name: '--nav--readonly--background'
                },
                {
                    name: '--nav--readonly--border-top-width'
                },
                {
                    name: '--nav--readonly--border-top-style'
                },
                {
                    name: '--nav--readonly--border-top-color'
                },
                {
                    name: '--nav--readonly--border-right-width'
                },
                {
                    name: '--nav--readonly--border-right-style'
                },
                {
                    name: '--nav--readonly--border-right-color'
                },
                {
                    name: '--nav--readonly--border-bottom-width'
                },
                {
                    name: '--nav--readonly--border-bottom-style'
                },
                {
                    name: '--nav--readonly--border-bottom-color'
                },
                {
                    name: '--nav--readonly--border-left-width'
                },
                {
                    name: '--nav--readonly--border-left-style'
                },
                {
                    name: '--nav--readonly--border-left-color'
                },
                {
                    name: '--nav--readonly--border-width'
                },
                {
                    name: '--nav--readonly--border-style'
                },
                {
                    name: '--nav--readonly--border-color'
                },
                {
                    name: '--nav--readonly--border-top'
                },
                {
                    name: '--nav--readonly--border-right'
                },
                {
                    name: '--nav--readonly--border-bottom'
                },
                {
                    name: '--nav--readonly--border-left'
                },
                {
                    name: '--nav--readonly--border'
                },
                {
                    name: '--nav--checked--background'
                },
                {
                    name: '--nav--checked--border-top-width'
                },
                {
                    name: '--nav--checked--border-top-style'
                },
                {
                    name: '--nav--checked--border-top-color'
                },
                {
                    name: '--nav--checked--border-right-width'
                },
                {
                    name: '--nav--checked--border-right-style'
                },
                {
                    name: '--nav--checked--border-right-color'
                },
                {
                    name: '--nav--checked--border-bottom-width'
                },
                {
                    name: '--nav--checked--border-bottom-style'
                },
                {
                    name: '--nav--checked--border-bottom-color'
                },
                {
                    name: '--nav--checked--border-left-width'
                },
                {
                    name: '--nav--checked--border-left-style'
                },
                {
                    name: '--nav--checked--border-left-color'
                },
                {
                    name: '--nav--checked--border-width'
                },
                {
                    name: '--nav--checked--border-style'
                },
                {
                    name: '--nav--checked--border-color'
                },
                {
                    name: '--nav--checked--border-top'
                },
                {
                    name: '--nav--checked--border-right'
                },
                {
                    name: '--nav--checked--border-bottom'
                },
                {
                    name: '--nav--checked--border-left'
                },
                {
                    name: '--nav--checked--border'
                },
                {
                    name: '--nav--checked--disabled--background'
                },
                {
                    name: '--nav--checked--disabled--border-top-width'
                },
                {
                    name: '--nav--checked--disabled--border-top-style'
                },
                {
                    name: '--nav--checked--disabled--border-top-color'
                },
                {
                    name: '--nav--checked--disabled--border-right-width'
                },
                {
                    name: '--nav--checked--disabled--border-right-style'
                },
                {
                    name: '--nav--checked--disabled--border-right-color'
                },
                {
                    name: '--nav--checked--disabled--border-bottom-width'
                },
                {
                    name: '--nav--checked--disabled--border-bottom-style'
                },
                {
                    name: '--nav--checked--disabled--border-bottom-color'
                },
                {
                    name: '--nav--checked--disabled--border-left-width'
                },
                {
                    name: '--nav--checked--disabled--border-left-style'
                },
                {
                    name: '--nav--checked--disabled--border-left-color'
                },
                {
                    name: '--nav--checked--disabled--border-width'
                },
                {
                    name: '--nav--checked--disabled--border-style'
                },
                {
                    name: '--nav--checked--disabled--border-color'
                },
                {
                    name: '--nav--checked--disabled--border-top'
                },
                {
                    name: '--nav--checked--disabled--border-right'
                },
                {
                    name: '--nav--checked--disabled--border-bottom'
                },
                {
                    name: '--nav--checked--disabled--border-left'
                },
                {
                    name: '--nav--checked--disabled--border'
                },
                {
                    name: '--nav--checked--readonly--background'
                },
                {
                    name: '--nav--checked--readonly--border-top-width'
                },
                {
                    name: '--nav--checked--readonly--border-top-style'
                },
                {
                    name: '--nav--checked--readonly--border-top-color'
                },
                {
                    name: '--nav--checked--readonly--border-right-width'
                },
                {
                    name: '--nav--checked--readonly--border-right-style'
                },
                {
                    name: '--nav--checked--readonly--border-right-color'
                },
                {
                    name: '--nav--checked--readonly--border-bottom-width'
                },
                {
                    name: '--nav--checked--readonly--border-bottom-style'
                },
                {
                    name: '--nav--checked--readonly--border-bottom-color'
                },
                {
                    name: '--nav--checked--readonly--border-left-width'
                },
                {
                    name: '--nav--checked--readonly--border-left-style'
                },
                {
                    name: '--nav--checked--readonly--border-left-color'
                },
                {
                    name: '--nav--checked--readonly--border-width'
                },
                {
                    name: '--nav--checked--readonly--border-style'
                },
                {
                    name: '--nav--checked--readonly--border-color'
                },
                {
                    name: '--nav--checked--readonly--border-top'
                },
                {
                    name: '--nav--checked--readonly--border-right'
                },
                {
                    name: '--nav--checked--readonly--border-bottom'
                },
                {
                    name: '--nav--checked--readonly--border-left'
                },
                {
                    name: '--nav--checked--readonly--border'
                },
                {
                    name: '--nav--focus--box-shadow-offset-x'
                },
                {
                    name: '--nav--focus--box-shadow-offset-y'
                },
                {
                    name: '--nav--focus--box-shadow-blur-radius'
                },
                {
                    name: '--nav--focus--box-shadow-spread-radius'
                },
                {
                    name: '--nav--focus--box-shadow-color'
                },
                {
                    name: '--nav--focus--box-shadow'
                },
                {
                    name: '--nav--background'
                },
                {
                    name: '--nav--color'
                },
                {
                    name: '--nav--border-top-left-radius'
                },
                {
                    name: '--nav--border-top-right-radius'
                },
                {
                    name: '--nav--border-bottom-right-radius'
                },
                {
                    name: '--nav--border-bottom-left-radius'
                },
                {
                    name: '--nav--border-radius'
                },
                {
                    name: '--nav--font-size'
                },
                {
                    name: '--nav--margin-top'
                },
                {
                    name: '--nav--margin-right'
                },
                {
                    name: '--nav--margin-bottom'
                },
                {
                    name: '--nav--margin-left'
                },
                {
                    name: '--nav--margin'
                },
                {
                    name: '--nav--width'
                },
                {
                    name: '--nav--height'
                }
            ]
        }
    }
];

export default manifest;
