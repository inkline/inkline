module.exports = {
    name: 'collapsible',
    events: [
        {
            name: 'update:modelValue',
            description: 'Event emitted for setting the modelValue',
            type: []
        }
    ],
    slots: [
        {
            name: 'default',
            description: 'Slot for default collapsible content',
            type: []
        }
    ],
    props: [
        {
            name: 'accordion',
            description: 'Display the collapsible as an accordion, keeping a maximum of one open collapsible item',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'color',
            description: 'The color variant of the collapsible',
            type: [
                'light',
                'dark',
                'blank'
            ],
            default: 'light'
        },
        {
            name: 'size',
            description: 'The size variant of the collapsible',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md'
        },
        {
            name: 'modelValue',
            description: 'Used to determine which collapsible item is open',
            type: [
                'Array.<String>'
            ],
            default: '{"type":"","default":""}'
        }
    ],
    css: {
	    selector: '.collapsible',
        defaults: {
            size: 'md',
            color: 'light'
        },
        variables: [
            {
                name: 'background',
                description: 'The background of the collapsible component',
                type: 'color',
                variants: {
                    light: 'color(\'light\')',
                    dark: 'color(\'dark\')'
                }
            },
            {
                name: 'border-color',
                description: 'The border color of the collapsible component',
                type: 'color',
                variants: {
                    light: 'color(\'light-60\')',
                    dark: 'color(\'dark-40\')'
                }
            },
            {
                name: 'border-style',
                description: 'The border style of the collapsible component',
                value: 'var(--border-style)'
            },
            {
                name: 'border-top-width',
                description: 'The border top width of the collapsible component',
                value: 'var(--border-top-width)'
            },
            {
                name: 'border-right-width',
                description: 'The border right width of the collapsible component',
                value: 'var(--border-right-width)'
            },
            {
                name: 'border-bottom-width',
                description: 'The border bottom width of the collapsible component',
                value: 'var(--border-bottom-width)'
            },
            {
                name: 'border-left-width',
                description: 'The border left width of the collapsible component',
                value: 'var(--border-left-width)'
            },
            {
                name: 'border-width',
                description: 'The border width of the collapsible component',
                value: ['var(----border-top-width)', 'var(----border-right-width)', 'var(----border-bottom-width)', 'var(----border-left-width)']
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                description: 'The border top left radius of the collapsible component',
                value: 'var(--border-top-left-radius)'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                description: 'The border top right radius of the collapsible component',
                value: 'var(--border-top-right-radius)'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                description: 'The border bottom right radius of the collapsible component',
                value: 'var(--border-bottom-right-radius)'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                description: 'The border bottom left radius of the collapsible component',
                value: 'var(--border-bottom-left-radius)'
            },
            {
                name: 'border-radius',
                description: 'The border radius of the collapsible component',
                value: ['var(----border-top-left-radius)', 'var(----border-top-right-radius)', 'var(----border-bottom-right-radius)', 'var(----border-bottom-left-radius)']
            },
            {
                name: 'box-shadow-offset-x',
                description: 'The box shadow horizontal offset of the collapsible component',
                value: 'var(--box-shadow-offset-x)'
            },
            {
                name: 'box-shadow-offset-y',
                description: 'The box shadow vertical offset of the collapsible component',
                value: 'var(--box-shadow-offset-y)'
            },
            {
                name: 'box-shadow-blur-radius',
                description: 'The box shadow blur radius of the collapsible component',
                value: 'var(--box-shadow-blur-radius)'
            },
            {
                name: 'box-shadow-spread-radius',
                description: 'The box shadow spread radius of the collapsible component',
                value: 'var(--box-shadow-spread-radius)'
            },
            {
                name: 'box-shadow-color',
                description: 'The box shadow spread radius of the collapsible component',
                value: 'var(--box-shadow-color)'
            },
            {
                name: 'box-shadow',
                description: 'The box shadow of the collapsible component',
                value: ['var(----box-shadow-offset-x)', 'var(----box-shadow-offset-y)', 'var(----box-shadow-blur-radius)', 'var(----box-shadow-spread-radius)', 'var(----box-shadow-color)']
            },
            {
                name: 'color',
                description: 'The color of the collapsible component',
                type: 'color',
                variants: {
                    light: 'contrast-color($color-light)',
                    dark: 'contrast-color($color-dark)'
                }
            },
            {
                name: 'font-size',
                description: 'The font size of the collapsible component',
                type: 'size',
                value: 'font-size()'
            },
            {
                name: 'padding-top',
                type: 'size',
                description: 'The padding top of the collapsible component',
                value: 'var(--padding-top)'
            },
            {
                name: 'padding-right',
                type: 'size',
                description: 'The padding right of the collapsible component',
                value: 'var(--padding-right)'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                description: 'The padding bottom of the collapsible component',
                value: 'var(--padding-bottom)'
            },
            {
                name: 'padding-left',
                type: 'size',
                description: 'The padding left of the collapsible component',
                value: 'var(--padding-left)'
            },
            {
                name: 'padding',
                description: 'The padding of the collapsible component',
                value: ['var(----padding-top)', 'var(----padding-right)', 'var(----padding-bottom)', 'var(----padding-left)']
            },
            {
                name: 'header--background',
                description: 'The background of the collapsible component header',
                value: 'var(----background)'
            },
            {
                name: 'header--border-color',
                description: 'The border color of the collapsible component header',
                value: 'var(----border-color)'
            },
            {
                name: 'header--border-style',
                description: 'The border style of the collapsible component header',
                value: 'var(----border-style)'
            },
            {
                name: 'header--border-top-width',
                description: 'The border top width of the collapsible component header',
                value: 'var(----border-top-width)'
            },
            {
                name: 'header--border-right-width',
                description: 'The border right width of the collapsible component header',
                value: 'var(----border-right-width)'
            },
            {
                name: 'header--border-bottom-width',
                description: 'The border bottom width of the collapsible component header',
                value: 'var(----border-bottom-width)'
            },
            {
                name: 'header--border-left-width',
                description: 'The border left width of the collapsible component header',
                value: 'var(----border-left-width)'
            },
            {
                name: 'header--border-width',
                description: 'The border width of the collapsible component header',
                value: ['var(----header--border-top-width)', 'var(----header--border-right-width)', 'var(----header--border-bottom-width)', 'var(----header--border-left-width)']
            },
            {
                name: 'header--color',
                description: 'The color of the collapsible component header',
                value: 'var(----color)'
            },
            {
                name: 'header--padding-top',
                type: 'size',
                description: 'The padding top of the collapsible component header',
                value: 'var(----padding-top)'
            },
            {
                name: 'header--padding-right',
                type: 'size',
                description: 'The padding right of the collapsible component header',
                value: 'var(----padding-right)'
            },
            {
                name: 'header--padding-bottom',
                type: 'size',
                description: 'The padding bottom of the collapsible component header',
                value: 'var(----padding-bottom)'
            },
            {
                name: 'header--padding-left',
                type: 'size',
                description: 'The padding left of the collapsible component header',
                value: 'var(----padding-left)'
            },
            {
                name: 'header--padding',
                description: 'The padding of the collapsible component header',
                value: ['var(----header--padding-top)', 'var(----header--padding-right)', 'var(----header--padding-bottom)', 'var(----header--padding-left)']
            },
            {
                name: 'body--background',
                description: 'The background of the collapsible component body',
                type: 'color',
                variants: {
                    light: 'color(\'white\')',
                    dark: 'color(\'dark-45\')'
                }
            },
            {
                name: 'body--border-color',
                description: 'The border color of the collapsible component body',
                value: 'var(----border-color)'
            },
            {
                name: 'body--border-style',
                description: 'The border style of the collapsible component body',
                value: 'var(----border-style)'
            },
            {
                name: 'body--border-top-width',
                description: 'The border top width of the collapsible component body',
                value: '0'
            },
            {
                name: 'body--border-right-width',
                description: 'The border right width of the collapsible component body',
                value: 'var(----border-right-width)'
            },
            {
                name: 'body--border-bottom-width',
                description: 'The border bottom width of the collapsible component body',
                value: 'var(----border-bottom-width)'
            },
            {
                name: 'body--border-left-width',
                description: 'The border left width of the collapsible component body',
                value: 'var(----border-left-width)'
            },
            {
                name: 'body--border-width',
                description: 'The border width of the collapsible component body',
                value: ['var(----body--border-top-width)', 'var(----body--border-right-width)', 'var(----body--border-bottom-width)', 'var(----body--border-left-width)']
            },
            {
                name: 'body--color',
                description: 'The color of the collapsible component body',
                value: 'var(----color)'
            },
            {
                name: 'body--padding-top',
                type: 'size',
                description: 'The padding top of the collapsible component body',
                value: 'var(----padding-top)'
            },
            {
                name: 'body--padding-right',
                type: 'size',
                description: 'The padding right of the collapsible component body',
                value: 'var(----padding-right)'
            },
            {
                name: 'body--padding-bottom',
                type: 'size',
                description: 'The padding bottom of the collapsible component body',
                value: 'var(----padding-bottom)'
            },
            {
                name: 'body--padding-left',
                type: 'size',
                description: 'The padding left of the collapsible component body',
                value: 'var(----padding-left)'
            },
            {
                name: 'body--padding',
                description: 'The padding of the collapsible component body',
                value: ['var(----body--padding-top)', 'var(----body--padding-right)', 'var(----body--padding-bottom)', 'var(----body--padding-left)']
            }
        ]
    }
};
