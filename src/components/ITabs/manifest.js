module.exports = {
    name: 'tabs',
    slots: [
        {
            name: 'default',
            description: 'Slot for default tabs content',
            type: []
        }
    ],
    events: [
        {
            name: 'update:modelValue',
            description: 'Event emitted for setting the modelValue',
            type: []
        }
    ],
    props: [
        {
            name: 'color',
            description: 'The color variant of the header',
            type: [
                'primary',
                'light',
                'dark'
            ],
            default: 'light'
        },
        {
            name: 'modelValue',
            description: 'Used to set the currently active tab',
            type: [
                'String'
            ],
            default: '{"type":"","default":""}'
        },
        {
            name: 'size',
            description: 'The size variant of the tabs',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md'
        },
        {
            name: 'stretch',
            description: 'Display the tabs header as full width',
            type: [
                'Boolean'
            ],
            default: 'false'
        }
    ],
    css: {
        selector: '.tabs',
        defaults: {
            size: 'md',
            color: 'light'
        },
	    variables: [
            {
                name: 'background',
                description: 'The background of the tabs component',
                type: 'color',
                variants: {
                    light: 'color(\'white\')',
                    dark: 'color(\'dark\')'
                }
            },
            {
                name: 'border-color',
                description: 'The border-color of the tabs component',
                type: 'color',
                variants: {
                    light: 'color(\'light\')',
                    dark: 'color(\'dark-60\')'
                }
            },
            {
                name: 'border-style',
                description: 'The border style of the tabs component',
                value: 'var(--border-style)'
            },
            {
                name: 'border-top-width',
                description: 'The border top width of the tabs component',
                value: 'var(--border-top-width)'
            },
            {
                name: 'border-right-width',
                description: 'The border right width of the tabs component',
                value: 'var(--border-right-width)'
            },
            {
                name: 'border-bottom-width',
                description: 'The border bottom width of the tabs component',
                value: 'var(--border-bottom-width)'
            },
            {
                name: 'border-left-width',
                description: 'The border left width of the tabs component',
                value: 'var(--border-left-width)'
            },
            {
                name: 'border-width',
                description: 'The border width of the tabs component',
                value: ['var(----border-top-width)', 'var(----border-right-width)', 'var(----border-bottom-width)', 'var(----border-left-width)']
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                description: 'The border top left radius of the tabs component',
                value: 'var(--border-top-left-radius)'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                description: 'The border top right radius of the tabs component',
                value: 'var(--border-top-right-radius)'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                description: 'The border bottom right radius of the tabs component',
                value: 'var(--border-bottom-right-radius)'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                description: 'The border bottom left radius of the tabs component',
                value: 'var(--border-bottom-left-radius)'
            },
            {
                name: 'border-radius',
                description: 'The border radius of the tabs component',
                value: ['var(----border-top-left-radius)', 'var(----border-top-right-radius)', 'var(----border-bottom-right-radius)', 'var(----border-bottom-left-radius)']
            },
            {
                name: 'box-shadow-offset-x',
                description: 'The box shadow horizontal offset of the tabs component',
                value: 'var(--box-shadow-offset-x)'
            },
            {
                name: 'box-shadow-offset-y',
                description: 'The box shadow vertical offset of the tabs component',
                value: 'var(--box-shadow-offset-y)'
            },
            {
                name: 'box-shadow-blur-radius',
                description: 'The box shadow blur radius of the tabs component',
                value: 'var(--box-shadow-blur-radius)'
            },
            {
                name: 'box-shadow-spread-radius',
                description: 'The box shadow spread radius of the tabs component',
                value: 'var(--box-shadow-spread-radius)'
            },
            {
                name: 'box-shadow-color',
                description: 'The box shadow spread radius of the tabs component',
                value: 'var(--box-shadow-color)'
            },
            {
                name: 'box-shadow',
                description: 'The box shadow of the tabs component',
                value: ['var(----box-shadow-offset-x)', 'var(----box-shadow-offset-y)', 'var(----box-shadow-blur-radius)', 'var(----box-shadow-spread-radius)', 'var(----box-shadow-color)']
            },
            {
                name: 'color',
                description: 'The color of the tabs component item',
                type: 'color',
                variants: {
                    light: 'contrast-color($color-white)',
                    dark: 'contrast-color($color-dark)'
                }
            },
            {
                name: 'font-size',
                description: 'The font size of the tabs component',
                type: 'size',
                value: 'font-size()'
            },
            {
                name: 'padding-top',
                type: 'size',
                description: 'The padding top of the tabs component',
                value: 'var(--padding-top)'
            },
            {
                name: 'padding-right',
                type: 'size',
                description: 'The padding right of the tabs component',
                value: 'var(--padding-right)'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                description: 'The padding bottom of the tabs component',
                value: 'var(--padding-bottom)'
            },
            {
                name: 'padding-left',
                type: 'size',
                description: 'The padding left of the tabs component',
                value: 'var(--padding-left)'
            },
            {
                name: 'padding',
                description: 'The padding of the tabs component',
                value: ['var(----padding-top)', 'var(----padding-right)', 'var(----padding-bottom)', 'var(----padding-left)']
            },
            {
                name: 'header--background',
                description: 'The background of the tabs component header',
                type: 'color',
                variants: {
                    light: 'color(\'white\')',
                    dark: 'color(\'dark\')'
                }
            },
            {
                name: 'header--background--active',
                description: 'The background of the tabs component header when active',
                type: 'color',
                variants: {
                    light: 'color(\'white\')',
                    dark: 'color(\'dark\')'
                }
            },
            {
                name: 'header--background--hover',
                description: 'The background of the tabs component header when hovered or focused',
                type: 'color',
                variants: {
                    light: 'color(\'gray-05\')',
                    dark: 'color(\'dark-45\')'
                }
            },
            {
                name: 'header--border-color',
                description: 'The border color of the tabs component header',
                type: 'color',
                variants: {
                    light: 'transparent',
                    dark: 'transparent'
                }
            },
            {
                name: 'header--border-color--active',
                description: 'The border color of the tabs component header when active',
                value: 'color(\'primary\')'
            },
            {
                name: 'header--color--active',
                description: 'The color of the tabs component header when active',
                value: 'var(----color)'
            },
            {
                name: 'header--border-style',
                description: 'The border style of the tabs component header',
                value: 'var(--border-style)'
            },
            {
                name: 'header--border-top-width',
                description: 'The border top width of the tabs component header',
                value: '0'
            },
            {
                name: 'header--border-right-width',
                description: 'The border right width of the tabs component header',
                value: '0'
            },
            {
                name: 'header--border-bottom-width',
                description: 'The border bottom width of the tabs component header',
                value: '2px'
            },
            {
                name: 'header--border-left-width',
                description: 'The border left width of the tabs component header',
                value: '0'
            },
            {
                name: 'header--border-width',
                description: 'The border width of the tabs component header',
                value: ['var(----header--border-top-width)', 'var(----header--border-right-width)', 'var(----header--border-bottom-width)', 'var(----header--border-left-width)']
            },
            {
                name: 'header--margin-bottom',
                description: 'The bottom margin of the tabs component header',
                value: '-1px'
            },
            {
                name: 'header--padding-top',
                description: 'The padding top of the tabs component header',
                value: 'var(----padding-top)'
            },
            {
                name: 'header--padding-right',
                description: 'The padding right of the tabs component header',
                value: 'var(----padding-right)'
            },
            {
                name: 'header--padding-bottom',
                type: 'size',
                description: 'The padding bottom of the tabs component header',
                value: 'var(----padding-bottom)'
            },
            {
                name: 'header--padding-left',
                type: 'size',
                description: 'The padding left of the tabs component header',
                value: 'var(----padding-left)'
            },
            {
                name: 'header--padding',
                description: 'The padding of the tabs component header',
                value: ['var(----header--padding-top)', 'var(----header--padding-right)', 'var(----header--padding-bottom)', 'var(----header--padding-left)']
            },
        ]
    }
};
