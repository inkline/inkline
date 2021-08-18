module.exports = {
    name: 'progress',
    slots: [
        {
            name: 'default',
            description: 'Slot for default progress content',
            type: []
        }
    ],
    props: [
        {
            name: 'color',
            description: 'The color variant of the progress component',
            type: [
                'light',
                'dark'
            ],
            default: 'light'
        },
        {
            name: 'min',
            description: 'The value to consider as the 0% starting point',
            type: [
                'Number'
            ],
            default: '0'
        },
        {
            name: 'max',
            description: 'The value to consider as the 100% ending point',
            type: [
                'Number'
            ],
            default: '100'
        },
        {
            name: 'size',
            description: 'The size variant of the progress component',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md'
        }
    ],
    css: {
	    selector: '.progress',
        defaults: {
            size: 'md',
            color: 'light'
        },
	    variables: [
            {
                name: 'background',
                description: 'The background of the progress component',
                type: 'color',
                variants: {
                    light: 'color(\'light\')',
                    dark: 'color(\'dark\')'
                }
            },
            {
                name: 'border-top-color',
                description: 'The border top color of the progress component',
                type: 'color',
                variants: {
                    light: 'color(\'light-55\')',
                    dark: 'color(\'dark-45\')',
                }
            },
            {
                name: 'border-right-color',
                description: 'The border right color of the progress component',
                type: 'color',
                variants: {
                    light: 'color(\'light-55\')',
                    dark: 'color(\'dark-45\')',
                }
            },
            {
                name: 'border-bottom-color',
                description: 'The border bottom color of the progress component',
                type: 'color',
                variants: {
                    light: 'color(\'light-55\')',
                    dark: 'color(\'dark-45\')',
                }
            },
            {
                name: 'border-left-color',
                description: 'The border left color of the progress component',
                type: 'color',
                variants: {
                    light: 'color(\'light-55\')',
                    dark: 'color(\'dark-45\')',
                }
            },
            {
                name: 'border-color',
                description: 'The border color of the progress component',
                value: ['var(----border-top-color)', 'var(----border-right-color)', 'var(----border-bottom-color)', 'var(----border-left-color)']
            },
            {
                name: 'border-style',
                description: 'The border style of the progress component',
                value: 'var(--border-style)'
            },
            {
                name: 'border-top-width',
                description: 'The border top width of the progress component',
                value: 'var(--border-top-width)'
            },
            {
                name: 'border-right-width',
                description: 'The border right width of the progress component',
                value: 'var(--border-right-width)'
            },
            {
                name: 'border-bottom-width',
                description: 'The border bottom width of the progress component',
                value: 'var(--border-bottom-width)'
            },
            {
                name: 'border-left-width',
                description: 'The border left width of the progress component',
                value: 'var(--border-left-width)'
            },
            {
                name: 'border-width',
                description: 'The border width of the progress component',
                value: ['var(----border-top-width)', 'var(----border-right-width)', 'var(----border-bottom-width)', 'var(----border-left-width)']
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                description: 'The border top left radius of the progress component',
                value: 'var(--border-top-left-radius)'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                description: 'The border top right radius of the progress component',
                value: 'var(--border-top-right-radius)'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                description: 'The border bottom right radius of the progress component',
                value: 'var(--border-bottom-right-radius)'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                description: 'The border bottom left radius of the progress component',
                value: 'var(--border-bottom-left-radius)'
            },
            {
                name: 'border-radius',
                description: 'The border radius of the progress component',
                value: ['var(----border-top-left-radius)', 'var(----border-top-right-radius)', 'var(----border-bottom-right-radius)', 'var(----border-bottom-left-radius)']
            },

            {
                name: 'box-shadow-offset-x',
                description: 'The box shadow horizontal offset of the progress component',
                value: 'var(--box-shadow-offset-x)'
            },
            {
                name: 'box-shadow-offset-y',
                description: 'The box shadow vertical offset of the progress component',
                value: 'var(--box-shadow-offset-y)'
            },
            {
                name: 'box-shadow-blur-radius',
                description: 'The box shadow blur radius of the progress component',
                value: 'var(--box-shadow-blur-radius)'
            },
            {
                name: 'box-shadow-spread-radius',
                description: 'The box shadow spread radius of the progress component',
                value: 'var(--box-shadow-spread-radius)'
            },
            {
                name: 'box-shadow-color',
                description: 'The box shadow spread radius of the progress component',
                value: 'var(--box-shadow-color)'
            },
            {
                name: 'box-shadow',
                description: 'The box shadow of the progress component',
                value: ['var(----box-shadow-offset-x)', 'var(----box-shadow-offset-y)', 'var(----box-shadow-blur-radius)', 'var(----box-shadow-spread-radius)', 'var(----box-shadow-color)']
            },
            {
                name: 'height',
                description: 'The height of the progress component',
                type: 'size',
                value: 'spacing(\'3/4\')'
            }
        ]
    }
};
