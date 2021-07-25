module.exports = {
    name: 'input',
    slots: [
        {
            name: 'prefix',
            description: 'Slot for the input prefix content',
            type: []
        },
        {
            name: 'suffix',
            description: 'Slot for the input suffix content',
            type: []
        },
        {
            name: 'prepend',
            description: 'Slot for the input prepend content',
            type: []
        },
        {
            name: 'append',
            description: 'Slot for the input append content',
            type: []
        },
        {
            name: 'clearable',
            description: 'Slot for the clearable button',
            type: []
        }
    ],
    events: [
        {
            name: 'update:modelValue',
            description: 'Event emitted for setting the modelValue',
            type: []
        },
        {
            name: 'clear',
            description: 'Event emitted when clearing the input element',
            type: []
        }
    ],
    props: [
        {
            name: 'color',
            description: 'The color variant of the input',
            type: [
                'light',
                'dark'
            ],
            default: 'light'
        },
        {
            name: 'clearable',
            description: 'Display the input as clearable',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'disabled',
            description: 'The disabled state of the input',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'id',
            description: 'The id of the internal input element',
            type: [
                'String'
            ],
            default: '{"type":"","default":""}'
        },
        {
            name: 'modelValue',
            description: 'Used to set the field value',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'name',
            description: 'The unique identifier of the input',
            type: [
                'String'
            ],
            default: 'uid()'
        },
        {
            name: 'plaintext',
            description: 'Display the input as plaintext, disabling interaction',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'readonly',
            description: 'The readonly state of the input',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'size',
            description: 'The size variant of the input',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md'
        },
        {
            name: 'tabindex',
            description: 'The tabindex of the input',
            type: [
                'Number',
                'String'
            ],
            default: '1'
        },
        {
            name: 'type',
            description: 'The type of the input',
            type: [
                'String'
            ],
            default: 'text'
        }
    ],
    css: {
	    selector: '.input-wrapper',
	    type: 'form',
        defaults: {
            size: 'md',
            color: 'light'
        },
        variables: [
            {
                name: 'background',
                description: 'The background of the input component',
                type: 'color',
                variants: {
                    light: 'color(\'white\')',
                    dark: 'color(\'dark\')'
                }
            },
            {
                name: 'background--disabled',
                description: 'The background of the input component when disabled',
                type: 'color',
                variants: {
                    light: 'color(\'light-25\')',
                    dark: 'color(\'dark-40\')'
                }
            },
            {
                name: 'border-color',
                description: 'The border color of the input component',
                type: 'color',
                variants: {
                    light: 'color(\'light-55\')',
                    dark: 'color(\'dark-45\')'
                }
            },
            {
                name: 'border-color--hover',
                description: 'The border color of the input component when hovered',
                type: 'color',
                variants: {
                    light: 'color(\'light-60\')',
                    dark: 'color(\'dark-40\')'
                }
            },
            {
                name: 'border-color--focus',
                description: 'The border color of the input component when focused',
                type: 'color',
                variants: {
                    light: 'color(\'primary\')',
                    dark: 'color(\'primary\')'
                }
            },
            {
                name: 'border-style',
                description: 'The border style of the input component',
                value: 'var(--border-style)'
            },
            {
                name: 'border-top-width',
                description: 'The border top width of the input component',
                value: 'var(--border-top-width)'
            },
            {
                name: 'border-right-width',
                description: 'The border right width of the input component',
                value: 'var(--border-right-width)'
            },
            {
                name: 'border-bottom-width',
                description: 'The border bottom width of the input component',
                value: 'var(--border-bottom-width)'
            },
            {
                name: 'border-left-width',
                description: 'The border left width of the input component',
                value: 'var(--border-left-width)'
            },
            {
                name: 'border-width',
                description: 'The border width of the input component',
                value: ['var(----border-top-width)', 'var(----border-right-width)', 'var(----border-bottom-width)', 'var(----border-left-width)']
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                description: 'The border top left radius of the input component',
                value: 'var(--border-top-left-radius)'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                description: 'The border top right radius of the input component',
                value: 'var(--border-top-right-radius)'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                description: 'The border bottom right radius of the input component',
                value: 'var(--border-bottom-right-radius)'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                description: 'The border bottom left radius of the input component',
                value: 'var(--border-bottom-left-radius)'
            },
            {
                name: 'border-radius',
                description: 'The border radius of the input component',
                value: ['var(----border-top-left-radius)', 'var(----border-top-right-radius)', 'var(----border-bottom-right-radius)', 'var(----border-bottom-left-radius)']
            },
            {
                name: 'box-shadow-offset-x',
                description: 'The box shadow horizontal offset of the input component',
                value: 'var(--box-shadow-offset-x)'
            },
            {
                name: 'box-shadow-offset-y',
                description: 'The box shadow vertical offset of the input component',
                value: 'var(--box-shadow-offset-y)'
            },
            {
                name: 'box-shadow-blur-radius',
                description: 'The box shadow blur radius of the input component',
                value: 'var(--box-shadow-blur-radius)'
            },
            {
                name: 'box-shadow-spread-radius',
                description: 'The box shadow spread radius of the input component',
                value: 'var(--box-shadow-spread-radius)'
            },
            {
                name: 'box-shadow-color',
                description: 'The box shadow spread radius of the input component',
                value: 'var(--box-shadow-color)'
            },
            {
                name: 'box-shadow',
                description: 'The box shadow of the input component',
                value: ['var(----box-shadow-offset-x)', 'var(----box-shadow-offset-y)', 'var(----box-shadow-blur-radius)', 'var(----box-shadow-spread-radius)', 'var(----box-shadow-color)']
            },
            {
                name: 'color',
                description: 'The color of the input component',
                type: 'color',
                variants: {
                    light: 'contrast-color($color-white)',
                    dark: 'contrast-color($color-dark)'
                }
            },
            {
                name: 'color--disabled',
                description: 'The color of the input component when disabled',
                type: 'color',
                variants: {
                    light: 'color(\'light-75\')',
                    dark: 'color(\'gray-35\')'
                }
            },
            {
                name: 'font-size',
                description: 'The font size of the input component',
                type: 'size',
                value: 'font-size()'
            },
            {
                name: 'line-height',
                description: 'The line height of the input component',
                value: 'var(--line-height)'
            },
            {
                name: 'padding-top',
                type: 'size',
                description: 'The padding top of the input component',
                value: 'calc(var(--padding-top) / 2)'
            },
            {
                name: 'padding-right',
                type: 'size',
                description: 'The padding right of the input component',
                value: 'var(--padding-right)'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                description: 'The padding bottom of the input component',
                value: 'calc(var(--padding-bottom) / 2)'
            },
            {
                name: 'padding-left',
                type: 'size',
                description: 'The padding left of the input component',
                value: 'var(--padding-left)'
            },
            {
                name: 'padding',
                description: 'The padding of the input component',
                value: ['var(----padding-top)', 'var(----padding-right)', 'var(----padding-bottom)', 'var(----padding-left)']
            },
            {
                name: 'clear--background',
                description: 'The background of the input component clear button',
                type: 'color',
                variants: {
                    light: 'transparent',
                    dark: 'transparent'
                }
            },
            {
                name: 'clear--background--hover',
                description: 'The background of the input component clear button',
                type: 'color',
                variants: {
                    light: 'color(\'light-30\')',
                    dark: 'color(\'dark-35\')'
                }
            },
            {
                name: 'clear--background--active',
                description: 'The background of the input component clear button',
                type: 'color',
                variants: {
                    light: 'color(\'light-40\')',
                    dark: 'color(\'dark-30\')'
                }
            },
            {
                name: 'clear--color',
                description: 'The color of the input component clear button',
                type: 'color',
                variants: {
                    light: 'color(\'light-70\')',
                    dark: 'color(\'dark-30\')'
                }
            },
            {
                name: 'clear--size',
                description: 'The size of the input component clear button',
                value: '1.2rem'
            },
            {
                name: 'placeholder--color',
                description: 'The color of the input component placeholder',
                type: 'color',
                variants: {
                    light: 'color(\'light-60\')',
                    dark: 'color(\'dark-25\')'
                }
            },
            {
                name: 'prefix--border-width',
                description: 'The border width of the input component prefix',
                value: 'var(----border-right-width)'
            },
            {
                name: 'suffix--border-width',
                description: 'The border width of the input component suffix',
                value: 'var(----border-left-width)'
            },
            {
                name: 'prefix-suffix--border-style',
                description: 'The border style of the input component prefix and suffix',
                value: 'var(--border-style)'
            },
            {
                name: 'prefix-suffix--color',
                description: 'The color of the input component prefix and suffix',
                type: 'color',
                variants: {
                    light: 'color(\'light-70\')',
                    dark: 'color(\'dark-25\')'
                }
            },
            {
                name: 'prefix-suffix--padding-right',
                description: 'The padding right of the input component prefix and suffix',
                value: 'var(----padding-right)'
            },
            {
                name: 'prefix-suffix--padding-left',
                description: 'The padding left of the input component prefix and suffix',
                value: 'var(----padding-left)'
            },
            {
                name: 'prepend-append--background',
                description: 'The background of the input component prepend and append',
                type: 'color',
                variants: {
                    light: 'color(\'light\')',
                    dark: 'color(\'dark\')'
                }
            },
        ]
    }
};
