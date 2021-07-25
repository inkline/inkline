module.exports = {
    name: 'toggle',
    slots: [
        {
            name: 'default',
            description: 'Slot for default checkbox label',
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
            description: 'The color variant of the checkbox',
            type: [
                'light',
                'dark'
            ],
            default: 'light'
        },
        {
            name: 'disabled',
            description: 'The disabled state of the checkbox',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'indeterminate',
            description: 'The indeterminate state of the checkbox',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'value',
            description: 'Used to set the checkbox value when used inside a checkbox group',
            type: [],
            default: 'false'
        },
        {
            name: 'modelValue',
            description: 'Used to set the checkbox value when used by itself',
            type: [],
            default: 'false'
        },
        {
            name: 'name',
            description: 'The unique identifier of the checkbox',
            type: [
                'String'
            ],
            default: 'uid()'
        },
        {
            name: 'readonly',
            description: 'The readonly state of the checkbox',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'size',
            description: 'The size variant of the checkbox',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md'
        },
        {
            name: 'tabindex',
            description: 'The tabindex of the checkbox',
            type: [
                'Number',
                'String'
            ],
            default: '1'
        }
    ],
    css: {
        selector: '.toggle',
        type: 'form',
        defaults: {
            size: 'md',
            color: 'light'
        },
	    variables: [
            {
                name: 'background',
                description: 'The background of the toggle component',
                type: 'color',
                variants: {
                    light: 'color(\'light\')',
                    dark: 'color(\'dark\')'
                }
            },
            {
                name: 'background--checked',
                description: 'The background of the toggle component when checked',
                type: 'color',
                variants: {
                    light: 'color(\'primary\')',
                    dark: 'color(\'primary\')'
                }
            },
            {
                name: 'background--disabled',
                description: 'The background of the toggle component when disabled',
                type: 'color',
                variants: {
                    light: 'color(\'light-40\')',
                    dark: 'color(\'dark-40\')'
                }
            },
            {
                name: 'background--checked-disabled',
                description: 'The background of the toggle component when checked and disabled',
                type: 'color',
                variants: {
                    light: 'color(\'primary-25\')',
                    dark: 'color(\'primary-75\')'
                }
            },
            {
                name: 'border-color',
                description: 'The border-color of the toggle component',
                type: 'color',
                variants: {
                    light: 'color(\'light-55\')',
                    dark: 'color(\'dark\')'
                }
            },
            {
                name: 'border-color--checked',
                description: 'The border-color of the toggle component when checked',
                type: 'color',
                variants: {
                    light: 'color(\'primary-55\')',
                    dark: 'color(\'primary-55\')'
                }
            },
            {
                name: 'border-color--disabled',
                description: 'The border-color of the toggle component when disabled',
                type: 'color',
                variants: {
                    light: 'color(\'light\')',
                    dark: 'color(\'dark\')'
                }
            },
            {
                name: 'border-color--checked-disabled',
                description: 'The border-color of the toggle component when checked and disabled',
                type: 'color',
                variants: {
                    light: 'color(\'primary-30\')',
                    dark: 'color(\'primary-70\')'
                }
            },
            {
                name: 'border-style',
                description: 'The border style of the toggle component',
                value: 'var(--border-style)'
            },
            {
                name: 'border-top-width',
                description: 'The border top width of the toggle component',
                value: 'var(--border-top-width)'
            },
            {
                name: 'border-right-width',
                description: 'The border right width of the toggle component',
                value: 'var(--border-right-width)'
            },
            {
                name: 'border-bottom-width',
                description: 'The border bottom width of the toggle component',
                value: 'var(--border-bottom-width)'
            },
            {
                name: 'border-left-width',
                description: 'The border left width of the toggle component',
                value: 'var(--border-left-width)'
            },
            {
                name: 'border-width',
                description: 'The border width of the toggle component',
                value: ['var(----border-top-width)', 'var(----border-right-width)', 'var(----border-bottom-width)', 'var(----border-left-width)']
            },
            {
                name: 'border-top-left-radius',
                description: 'The border top left radius of the toggle component',
                value: 'var(----height)'
            },
            {
                name: 'border-top-right-radius',
                description: 'The border top right radius of the toggle component',
                value: 'var(----height)'
            },
            {
                name: 'border-bottom-right-radius',
                description: 'The border bottom right radius of the toggle component',
                value: 'var(----height)'
            },
            {
                name: 'border-bottom-left-radius',
                description: 'The border bottom left radius of the toggle component',
                value: 'var(----height)'
            },
            {
                name: 'border-radius',
                description: 'The border radius of the toggle component',
                value: ['var(----border-top-left-radius)', 'var(----border-top-right-radius)', 'var(----border-bottom-right-radius)', 'var(----border-bottom-left-radius)']
            },
            {
                name: 'box-shadow-offset-x',
                description: 'The box shadow horizontal offset of the toggle component',
                value: 'var(--box-shadow-offset-x)'
            },
            {
                name: 'box-shadow-offset-y',
                description: 'The box shadow vertical offset of the toggle component',
                value: 'var(--box-shadow-offset-y)'
            },
            {
                name: 'box-shadow-blur-radius',
                description: 'The box shadow blur radius of the toggle component',
                value: 'var(--box-shadow-blur-radius)'
            },
            {
                name: 'box-shadow-spread-radius',
                description: 'The box shadow spread radius of the toggle component',
                value: 'var(--box-shadow-spread-radius)'
            },
            {
                name: 'box-shadow-color',
                description: 'The box shadow spread radius of the toggle component',
                value: 'var(--box-shadow-color)'
            },
            {
                name: 'box-shadow',
                description: 'The box shadow of the toggle component',
                value: ['var(----box-shadow-offset-x)', 'var(----box-shadow-offset-y)', 'var(----box-shadow-blur-radius)', 'var(----box-shadow-spread-radius)', 'var(----box-shadow-color)']
            },
            {
                name: 'margin-right',
                description: 'The right margin of the toggle component',
                value: 'var(--margin-right)'
            },
            {
                name: 'margin-top',
                description: 'The right margin of the toggle component',
                value: 'var(--margin-right)'
            },
            {
                name: 'width',
                description: 'The width of the toggle component',
                type: 'size',
                value: '40px'
            },
            {
                name: 'height',
                description: 'The height of the toggle component',
                type: 'size',
                value: '20px'
            },

            {
                name: 'transition-duration',
                description: 'The transition duration of the toggle component',
                value: 'var(--transition-duration)'
            },


            {
                name: 'indicator--background',
                description: 'The background of the toggle component indicator',
                type: 'color',
                variants: {
                    light: 'color(\'white\')',
                    dark: 'color(\'white\')'
                }
            },
            {
                name: 'indicator--background--checked',
                description: 'The background of the toggle component indicator when checked',
                value: 'var(----indicator--background)'
            },
            {
                name: 'indicator--background--disabled',
                description: 'The background of the toggle component indicator when disabled',
                type: 'color',
                variants: {
                    light: 'color(\'gray-05\')',
                    dark: 'color(\'gray-30\')'
                }
            },
            {
                name: 'indicator--background--checked-disabled',
                description: 'The background of the toggle component indicator when checked and disabled',
                type: 'color',
                variants: {
                    light: 'color(\'gray-10\')',
                    dark: 'color(\'dark-25\')'
                }
            },
            {
                name: 'indicator--border-top-left-radius',
                type: 'size',
                description: 'The border top left radius of the toggle component indicator',
                value: '50%'
            },
            {
                name: 'indicator--border-top-right-radius',
                type: 'size',
                description: 'The border top right radius of the toggle component indicator',
                value: '50%'
            },
            {
                name: 'indicator--border-bottom-right-radius',
                type: 'size',
                description: 'The border bottom right radius of the toggle component indicator',
                value: '50%'
            },
            {
                name: 'indicator--border-bottom-left-radius',
                type: 'size',
                description: 'The border bottom left radius of the toggle component indicator',
                value: '50%'
            },
            {
                name: 'indicator--border-radius',
                description: 'The border radius of the toggle component indicator',
                value: ['var(----indicator--border-top-left-radius)', 'var(----indicator--border-top-right-radius)', 'var(----indicator--border-bottom-right-radius)', 'var(----indicator--border-bottom-left-radius)']
            },
            {
                name: 'indicator--width',
                description: 'The width of the toggle component indicator',
                type: 'size',
                value: '16px'
            },
            {
                name: 'indicator--height',
                description: 'The height of the toggle component indicator',
                type: 'size',
                value: '16px'
            },
            {
                name: 'label--color',
                description: 'The color of the toggle component label',
                type: 'color',
                variants: {
                    light: 'contrast-color($color-light)',
                    dark: 'contrast-color($color-dark)'
                }
            },
            {
                name: 'label--color--disabled',
                description: 'The color of the toggle component label when disabled',
                type: 'color',
                variants: {
                    light: 'color(\'light-70\')',
                    dark: 'color(\'dark-30\')'
                }
            },
            {
                name: 'label--font-size',
                description: 'The font size of the toggle component label',
                type: 'size',
                value: 'font-size()'
            },
        ]
    }
};
