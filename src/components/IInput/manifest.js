export const manifest = {
    name: 'input',
    slots: [
        {
            description: 'Slot for the input prefix content',
            name: 'prefix'
        },
        {
            description: 'Slot for the input suffix content',
            name: 'suffix'
        },
        {
            description: 'Slot for the input prepend content',
            name: 'prepend'
        },
        {
            description: 'Slot for the input append content',
            name: 'append'
        },
        {
            description: 'Slot for the clearable button',
            name: 'clearable'
        }
    ],
    events: [
        {
            description: 'Event emitted for setting the modelValue',
            name: 'update:modelValue'
        },
        {
            description: 'Event emitted when clearing the input element',
            name: 'clear'
        }
    ],
    props: [
        {
            name: 'color',
            type: [
                'light',
                'dark'
            ],
            default: 'light',
            description: 'The color variant of the input'
        },
        {
            name: 'clearable',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the input as clearable'
        },
        {
            name: 'disabled',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The disabled state of the input'
        },
        {
            name: 'error',
            type: [
                'Boolean',
                'Array'
            ],
            default: '\'touched\', \'dirty\', \'invalid\'',
            description: 'The error state of the input, computed based on schema by default.'
        },
        {
            name: 'id',
            type: [
                'String'
            ],
            default: '',
            description: 'The id of the internal input element'
        },
        {
            name: 'modelValue',
            type: [
                'String',
                'Number'
            ],
            default: '\'\'',
            description: 'Used to set the field value'
        },
        {
            name: 'name',
            type: [
                'String'
            ],
            default: 'uid()',
            description: 'The unique identifier of the input'
        },
        {
            name: 'plaintext',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the input as plaintext, disabling interaction'
        },
        {
            name: 'readonly',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The readonly state of the input'
        },
        {
            name: 'size',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md',
            description: 'The size variant of the input'
        },
        {
            name: 'tabindex',
            type: [
                'Number',
                'String'
            ],
            default: '1',
            description: 'The tabindex of the input'
        },
        {
            name: 'type',
            type: [
                'String'
            ],
            default: 'text',
            description: 'The type of the input'
        },
        {
            name: 'clearAriaLabel',
            type: [
                'String'
            ],
            default: 'Clear',
            description: 'The aria-label of the clear button'
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
                type: 'color',
                value: 'color(\'white\')',
                description: 'The background of the input component'
            },
            {
                name: 'background--disabled',
                type: 'color',
                value: 'color(\'light-25\')',
                description: 'The background of the input component when disabled'
            },
            {
                name: 'border-color',
                type: 'color',
                value: 'color(\'light-55\')',
                description: 'The border color of the input component'
            },
            {
                name: 'border-color--hover',
                type: 'color',
                value: 'color(\'light-60\')',
                description: 'The border color of the input component when hovered'
            },
            {
                name: 'border-color--focus',
                type: 'color',
                value: 'color(\'primary\')',
                description: 'The border color of the input component when focused'
            },
            {
                name: 'border-style',
                type: '',
                value: 'var(--border-style)',
                description: 'The border style of the input component'
            },
            {
                name: 'border-top-width',
                type: '',
                value: 'var(--border-top-width)',
                description: 'The border top width of the input component'
            },
            {
                name: 'border-right-width',
                type: '',
                value: 'var(--border-right-width)',
                description: 'The border right width of the input component'
            },
            {
                name: 'border-bottom-width',
                type: '',
                value: 'var(--border-bottom-width)',
                description: 'The border bottom width of the input component'
            },
            {
                name: 'border-left-width',
                type: '',
                value: 'var(--border-left-width)',
                description: 'The border left width of the input component'
            },
            {
                name: 'border-width',
                type: '',
                value: 'var(----border-top-width) var(----border-right-width) var(----border-bottom-width) var(----border-left-width)',
                description: 'The border width of the input component'
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                value: 'var(--border-top-left-radius)',
                description: 'The border top left radius of the input component'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                value: 'var(--border-top-right-radius)',
                description: 'The border top right radius of the input component'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                value: 'var(--border-bottom-right-radius)',
                description: 'The border bottom right radius of the input component'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                value: 'var(--border-bottom-left-radius)',
                description: 'The border bottom left radius of the input component'
            },
            {
                name: 'border-radius',
                type: '',
                value: 'var(----border-top-left-radius) var(----border-top-right-radius) var(----border-bottom-right-radius) var(----border-bottom-left-radius)',
                description: 'The border radius of the input component'
            },
            {
                name: 'box-shadow-offset-x',
                type: '',
                value: 'var(--box-shadow-offset-x)',
                description: 'The box shadow horizontal offset of the input component'
            },
            {
                name: 'box-shadow-offset-y',
                type: '',
                value: 'var(--box-shadow-offset-y)',
                description: 'The box shadow vertical offset of the input component'
            },
            {
                name: 'box-shadow-blur-radius',
                type: '',
                value: 'var(--box-shadow-blur-radius)',
                description: 'The box shadow blur radius of the input component'
            },
            {
                name: 'box-shadow-spread-radius',
                type: '',
                value: 'var(--box-shadow-spread-radius)',
                description: 'The box shadow spread radius of the input component'
            },
            {
                name: 'box-shadow-color',
                type: '',
                value: 'var(--box-shadow-color)',
                description: 'The box shadow spread radius of the input component'
            },
            {
                name: 'box-shadow',
                type: '',
                value: 'var(----box-shadow-offset-x) var(----box-shadow-offset-y) var(----box-shadow-blur-radius) var(----box-shadow-spread-radius) var(----box-shadow-color)',
                description: 'The box shadow of the input component'
            },
            {
                name: 'color',
                type: 'color',
                value: 'contrast-color($color-white)',
                description: 'The color of the input component'
            },
            {
                name: 'color--disabled',
                type: 'color',
                value: 'color(\'light-75\')',
                description: 'The color of the input component when disabled'
            },
            {
                name: 'font-size',
                type: 'size',
                value: 'font-size()',
                description: 'The font size of the input component'
            },
            {
                name: 'line-height',
                type: '',
                value: 'var(--line-height)',
                description: 'The line height of the input component'
            },
            {
                name: 'padding-top',
                type: 'size',
                value: 'calc(var(--padding-top) / 2)',
                description: 'The padding top of the input component'
            },
            {
                name: 'padding-right',
                type: 'size',
                value: 'var(--padding-right)',
                description: 'The padding right of the input component'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                value: 'calc(var(--padding-bottom) / 2)',
                description: 'The padding bottom of the input component'
            },
            {
                name: 'padding-left',
                type: 'size',
                value: 'var(--padding-left)',
                description: 'The padding left of the input component'
            },
            {
                name: 'padding',
                type: '',
                value: 'var(----padding-top) var(----padding-right) var(----padding-bottom) var(----padding-left)',
                description: 'The padding of the input component'
            },
            {
                name: 'clear--background',
                type: 'color',
                value: 'transparent',
                description: 'The background of the input component clear button'
            },
            {
                name: 'clear--background--hover',
                type: 'color',
                value: 'color(\'light-30\')',
                description: 'The background of the input component clear button'
            },
            {
                name: 'clear--background--active',
                type: 'color',
                value: 'color(\'light-40\')',
                description: 'The background of the input component clear button'
            },
            {
                name: 'clear--color',
                type: 'color',
                value: 'color(\'light-70\')',
                description: 'The color of the input component clear button'
            },
            {
                name: 'clear--size',
                type: '',
                value: '1.2rem',
                description: 'The size of the input component clear button'
            },
            {
                name: 'placeholder--color',
                type: 'color',
                value: 'color(\'light-60\')',
                description: 'The color of the input component placeholder'
            },
            {
                name: 'prefix--border-width',
                type: '',
                value: 'var(----border-right-width)',
                description: 'The border width of the input component prefix'
            },
            {
                name: 'suffix--border-width',
                type: '',
                value: 'var(----border-left-width)',
                description: 'The border width of the input component suffix'
            },
            {
                name: 'prefix-suffix--border-style',
                type: '',
                value: 'var(--border-style)',
                description: 'The border style of the input component prefix and suffix'
            },
            {
                name: 'prefix-suffix--color',
                type: 'color',
                value: 'color(\'light-70\')',
                description: 'The color of the input component prefix and suffix'
            },
            {
                name: 'prefix-suffix--padding-right',
                type: '',
                value: 'var(----padding-right)',
                description: 'The padding right of the input component prefix and suffix'
            },
            {
                name: 'prefix-suffix--padding-left',
                type: '',
                value: 'var(----padding-left)',
                description: 'The padding left of the input component prefix and suffix'
            },
            {
                name: 'prepend-append--background',
                type: 'color',
                value: 'color(\'light\')',
                description: 'The background of the input component prepend and append'
            }
        ],
        variants: [
            {
                name: 'light',
                type: 'variant',
                description: 'Variables for the light color variant',
                variables: [
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'white\')',
                        description: 'The background of the input component, for the light color variant'
                    },
                    {
                        name: 'background--disabled',
                        type: '',
                        value: 'color(\'light-25\')',
                        description: 'The background of the input component when disabled, for the light color variant'
                    },
                    {
                        name: 'border-color',
                        type: '',
                        value: 'color(\'light-55\')',
                        description: 'The border color of the input component, for the light color variant'
                    },
                    {
                        name: 'border-color--hover',
                        type: '',
                        value: 'color(\'light-60\')',
                        description: 'The border color of the input component when hovered, for the light color variant'
                    },
                    {
                        name: 'border-color--focus',
                        type: '',
                        value: 'color(\'primary\')',
                        description: 'The border color of the input component when focused, for the light color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-white)',
                        description: 'The color of the input component, for the light color variant'
                    },
                    {
                        name: 'color--disabled',
                        type: '',
                        value: 'color(\'light-75\')',
                        description: 'The color of the input component when disabled, for the light color variant'
                    },
                    {
                        name: 'clear--background',
                        type: '',
                        value: 'transparent',
                        description: 'The background of the input component clear button, for the light color variant'
                    },
                    {
                        name: 'clear--background--hover',
                        type: '',
                        value: 'color(\'light-30\')',
                        description: 'The background of the input component clear button, for the light color variant'
                    },
                    {
                        name: 'clear--background--active',
                        type: '',
                        value: 'color(\'light-40\')',
                        description: 'The background of the input component clear button, for the light color variant'
                    },
                    {
                        name: 'clear--color',
                        type: '',
                        value: 'color(\'light-70\')',
                        description: 'The color of the input component clear button, for the light color variant'
                    },
                    {
                        name: 'placeholder--color',
                        type: '',
                        value: 'color(\'light-60\')',
                        description: 'The color of the input component placeholder, for the light color variant'
                    },
                    {
                        name: 'prefix-suffix--color',
                        type: '',
                        value: 'color(\'light-70\')',
                        description: 'The color of the input component prefix and suffix, for the light color variant'
                    },
                    {
                        name: 'prepend-append--background',
                        type: '',
                        value: 'color(\'light\')',
                        description: 'The background of the input component prepend and append, for the light color variant'
                    }
                ]
            },
            {
                name: 'dark',
                type: 'variant',
                description: 'Variables for the dark color variant',
                variables: [
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'dark\')',
                        description: 'The background of the input component, for the dark color variant'
                    },
                    {
                        name: 'background--disabled',
                        type: '',
                        value: 'color(\'dark-40\')',
                        description: 'The background of the input component when disabled, for the dark color variant'
                    },
                    {
                        name: 'border-color',
                        type: '',
                        value: 'color(\'dark-45\')',
                        description: 'The border color of the input component, for the dark color variant'
                    },
                    {
                        name: 'border-color--hover',
                        type: '',
                        value: 'color(\'dark-40\')',
                        description: 'The border color of the input component when hovered, for the dark color variant'
                    },
                    {
                        name: 'border-color--focus',
                        type: '',
                        value: 'color(\'primary\')',
                        description: 'The border color of the input component when focused, for the dark color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-dark)',
                        description: 'The color of the input component, for the dark color variant'
                    },
                    {
                        name: 'color--disabled',
                        type: '',
                        value: 'color(\'gray-35\')',
                        description: 'The color of the input component when disabled, for the dark color variant'
                    },
                    {
                        name: 'clear--background',
                        type: '',
                        value: 'transparent',
                        description: 'The background of the input component clear button, for the dark color variant'
                    },
                    {
                        name: 'clear--background--hover',
                        type: '',
                        value: 'color(\'dark-35\')',
                        description: 'The background of the input component clear button, for the dark color variant'
                    },
                    {
                        name: 'clear--background--active',
                        type: '',
                        value: 'color(\'dark-30\')',
                        description: 'The background of the input component clear button, for the dark color variant'
                    },
                    {
                        name: 'clear--color',
                        type: '',
                        value: 'color(\'dark-30\')',
                        description: 'The color of the input component clear button, for the dark color variant'
                    },
                    {
                        name: 'placeholder--color',
                        type: '',
                        value: 'color(\'dark-25\')',
                        description: 'The color of the input component placeholder, for the dark color variant'
                    },
                    {
                        name: 'prefix-suffix--color',
                        type: '',
                        value: 'color(\'dark-25\')',
                        description: 'The color of the input component prefix and suffix, for the dark color variant'
                    },
                    {
                        name: 'prepend-append--background',
                        type: '',
                        value: 'color(\'dark\')',
                        description: 'The background of the input component prepend and append, for the dark color variant'
                    }
                ]
            },
            {
                name: 'sm',
                type: 'variant',
                description: 'Variables for the sm size variant',
                variables: [
                    {
                        name: 'border-top-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-left-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border top left radius of the input component, for the sm size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border top right radius of the input component, for the sm size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border bottom right radius of the input component, for the sm size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border bottom left radius of the input component, for the sm size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'sm\')})',
                        description: 'The font size of the input component, for the sm size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{calc(var(--padding-top) / 2)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding top of the input component, for the sm size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding right of the input component, for the sm size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{calc(var(--padding-bottom) / 2)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding bottom of the input component, for the sm size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding left of the input component, for the sm size variant'
                    }
                ]
            },
            {
                name: 'md',
                type: 'variant',
                description: 'Variables for the md size variant',
                variables: [
                    {
                        name: 'border-top-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-left-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border top left radius of the input component, for the md size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border top right radius of the input component, for the md size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border bottom right radius of the input component, for the md size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border bottom left radius of the input component, for the md size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'md\')})',
                        description: 'The font size of the input component, for the md size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{calc(var(--padding-top) / 2)} * #{size-multiplier(\'md\')})',
                        description: 'The padding top of the input component, for the md size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'md\')})',
                        description: 'The padding right of the input component, for the md size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{calc(var(--padding-bottom) / 2)} * #{size-multiplier(\'md\')})',
                        description: 'The padding bottom of the input component, for the md size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'md\')})',
                        description: 'The padding left of the input component, for the md size variant'
                    }
                ]
            },
            {
                name: 'lg',
                type: 'variant',
                description: 'Variables for the lg size variant',
                variables: [
                    {
                        name: 'border-top-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-left-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border top left radius of the input component, for the lg size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border top right radius of the input component, for the lg size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border bottom right radius of the input component, for the lg size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border bottom left radius of the input component, for the lg size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'lg\')})',
                        description: 'The font size of the input component, for the lg size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{calc(var(--padding-top) / 2)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding top of the input component, for the lg size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding right of the input component, for the lg size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{calc(var(--padding-bottom) / 2)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding bottom of the input component, for the lg size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding left of the input component, for the lg size variant'
                    }
                ]
            }
        ]
    }
};

export default manifest;
