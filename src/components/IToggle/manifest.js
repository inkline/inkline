export const manifest = {
    name: 'toggle',
    slots: [
        {
            description: 'Slot for default checkbox label',
            name: 'default'
        }
    ],
    events: [
        {
            description: 'Event emitted for setting the modelValue',
            name: 'update:modelValue'
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
            description: 'The color variant of the checkbox'
        },
        {
            name: 'disabled',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The disabled state of the checkbox'
        },
        {
            name: 'indeterminate',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The indeterminate state of the checkbox'
        },
        {
            name: 'value',
            type: [],
            default: 'false',
            description: 'Used to set the checkbox value when used inside a checkbox group'
        },
        {
            name: 'modelValue',
            type: [],
            default: 'false',
            description: 'Used to set the checkbox value when used by itself'
        },
        {
            name: 'name',
            type: [
                'String'
            ],
            default: 'uid()',
            description: 'The unique identifier of the checkbox'
        },
        {
            name: 'readonly',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The readonly state of the checkbox'
        },
        {
            name: 'size',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md',
            description: 'The size variant of the checkbox'
        },
        {
            name: 'tabindex',
            type: [
                'Number',
                'String'
            ],
            default: '1',
            description: 'The tabindex of the checkbox'
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
                type: 'color',
                value: 'color(\'light\')',
                description: 'The background of the toggle component'
            },
            {
                name: 'background--checked',
                type: 'color',
                value: 'color(\'primary\')',
                description: 'The background of the toggle component when checked'
            },
            {
                name: 'background--disabled',
                type: 'color',
                value: 'color(\'light-40\')',
                description: 'The background of the toggle component when disabled'
            },
            {
                name: 'background--checked-disabled',
                type: 'color',
                value: 'color(\'primary-25\')',
                description: 'The background of the toggle component when checked and disabled'
            },
            {
                name: 'border-color',
                type: 'color',
                value: 'color(\'light-55\')',
                description: 'The border-color of the toggle component'
            },
            {
                name: 'border-color--checked',
                type: 'color',
                value: 'color(\'primary-55\')',
                description: 'The border-color of the toggle component when checked'
            },
            {
                name: 'border-color--disabled',
                type: 'color',
                value: 'color(\'light\')',
                description: 'The border-color of the toggle component when disabled'
            },
            {
                name: 'border-color--checked-disabled',
                type: 'color',
                value: 'color(\'primary-30\')',
                description: 'The border-color of the toggle component when checked and disabled'
            },
            {
                name: 'border-style',
                type: '',
                value: 'var(--border-style)',
                description: 'The border style of the toggle component'
            },
            {
                name: 'border-top-width',
                type: '',
                value: 'var(--border-top-width)',
                description: 'The border top width of the toggle component'
            },
            {
                name: 'border-right-width',
                type: '',
                value: 'var(--border-right-width)',
                description: 'The border right width of the toggle component'
            },
            {
                name: 'border-bottom-width',
                type: '',
                value: 'var(--border-bottom-width)',
                description: 'The border bottom width of the toggle component'
            },
            {
                name: 'border-left-width',
                type: '',
                value: 'var(--border-left-width)',
                description: 'The border left width of the toggle component'
            },
            {
                name: 'border-width',
                type: '',
                value: 'var(----border-top-width) var(----border-right-width) var(----border-bottom-width) var(----border-left-width)',
                description: 'The border width of the toggle component'
            },
            {
                name: 'border-top-left-radius',
                type: '',
                value: 'var(----height)',
                description: 'The border top left radius of the toggle component'
            },
            {
                name: 'border-top-right-radius',
                type: '',
                value: 'var(----height)',
                description: 'The border top right radius of the toggle component'
            },
            {
                name: 'border-bottom-right-radius',
                type: '',
                value: 'var(----height)',
                description: 'The border bottom right radius of the toggle component'
            },
            {
                name: 'border-bottom-left-radius',
                type: '',
                value: 'var(----height)',
                description: 'The border bottom left radius of the toggle component'
            },
            {
                name: 'border-radius',
                type: '',
                value: 'var(----border-top-left-radius) var(----border-top-right-radius) var(----border-bottom-right-radius) var(----border-bottom-left-radius)',
                description: 'The border radius of the toggle component'
            },
            {
                name: 'box-shadow-offset-x',
                type: '',
                value: 'var(--box-shadow-offset-x)',
                description: 'The box shadow horizontal offset of the toggle component'
            },
            {
                name: 'box-shadow-offset-y',
                type: '',
                value: 'var(--box-shadow-offset-y)',
                description: 'The box shadow vertical offset of the toggle component'
            },
            {
                name: 'box-shadow-blur-radius',
                type: '',
                value: 'var(--box-shadow-blur-radius)',
                description: 'The box shadow blur radius of the toggle component'
            },
            {
                name: 'box-shadow-spread-radius',
                type: '',
                value: 'var(--box-shadow-spread-radius)',
                description: 'The box shadow spread radius of the toggle component'
            },
            {
                name: 'box-shadow-color',
                type: '',
                value: 'var(--box-shadow-color)',
                description: 'The box shadow spread radius of the toggle component'
            },
            {
                name: 'box-shadow',
                type: '',
                value: 'var(----box-shadow-offset-x) var(----box-shadow-offset-y) var(----box-shadow-blur-radius) var(----box-shadow-spread-radius) var(----box-shadow-color)',
                description: 'The box shadow of the toggle component'
            },
            {
                name: 'margin-right',
                type: '',
                value: 'var(--margin-right)',
                description: 'The right margin of the toggle component'
            },
            {
                name: 'margin-top',
                type: '',
                value: 'var(--margin-right)',
                description: 'The right margin of the toggle component'
            },
            {
                name: 'width',
                type: 'size',
                value: '40px',
                description: 'The width of the toggle component'
            },
            {
                name: 'height',
                type: 'size',
                value: '20px',
                description: 'The height of the toggle component'
            },
            {
                name: 'transition-duration',
                type: '',
                value: 'var(--transition-duration)',
                description: 'The transition duration of the toggle component'
            },
            {
                name: 'indicator--background',
                type: 'color',
                value: 'color(\'white\')',
                description: 'The background of the toggle component indicator'
            },
            {
                name: 'indicator--background--checked',
                type: '',
                value: 'var(----indicator--background)',
                description: 'The background of the toggle component indicator when checked'
            },
            {
                name: 'indicator--background--disabled',
                type: 'color',
                value: 'color(\'gray-05\')',
                description: 'The background of the toggle component indicator when disabled'
            },
            {
                name: 'indicator--background--checked-disabled',
                type: 'color',
                value: 'color(\'gray-10\')',
                description: 'The background of the toggle component indicator when checked and disabled'
            },
            {
                name: 'indicator--border-top-left-radius',
                type: 'size',
                value: '50%',
                description: 'The border top left radius of the toggle component indicator'
            },
            {
                name: 'indicator--border-top-right-radius',
                type: 'size',
                value: '50%',
                description: 'The border top right radius of the toggle component indicator'
            },
            {
                name: 'indicator--border-bottom-right-radius',
                type: 'size',
                value: '50%',
                description: 'The border bottom right radius of the toggle component indicator'
            },
            {
                name: 'indicator--border-bottom-left-radius',
                type: 'size',
                value: '50%',
                description: 'The border bottom left radius of the toggle component indicator'
            },
            {
                name: 'indicator--border-radius',
                type: '',
                value: 'var(----indicator--border-top-left-radius) var(----indicator--border-top-right-radius) var(----indicator--border-bottom-right-radius) var(----indicator--border-bottom-left-radius)',
                description: 'The border radius of the toggle component indicator'
            },
            {
                name: 'indicator--width',
                type: 'size',
                value: '16px',
                description: 'The width of the toggle component indicator'
            },
            {
                name: 'indicator--height',
                type: 'size',
                value: '16px',
                description: 'The height of the toggle component indicator'
            },
            {
                name: 'label--color',
                type: 'color',
                value: 'contrast-color($color-light)',
                description: 'The color of the toggle component label'
            },
            {
                name: 'label--color--disabled',
                type: 'color',
                value: 'color(\'light-70\')',
                description: 'The color of the toggle component label when disabled'
            },
            {
                name: 'label--font-size',
                type: 'size',
                value: 'font-size()',
                description: 'The font size of the toggle component label'
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
                        value: 'color(\'light\')',
                        description: 'The background of the toggle component, for the light color variant'
                    },
                    {
                        name: 'background--checked',
                        type: '',
                        value: 'color(\'primary\')',
                        description: 'The background of the toggle component when checked, for the light color variant'
                    },
                    {
                        name: 'background--disabled',
                        type: '',
                        value: 'color(\'light-40\')',
                        description: 'The background of the toggle component when disabled, for the light color variant'
                    },
                    {
                        name: 'background--checked-disabled',
                        type: '',
                        value: 'color(\'primary-25\')',
                        description: 'The background of the toggle component when checked and disabled, for the light color variant'
                    },
                    {
                        name: 'border-color',
                        type: '',
                        value: 'color(\'light-55\')',
                        description: 'The border-color of the toggle component, for the light color variant'
                    },
                    {
                        name: 'border-color--checked',
                        type: '',
                        value: 'color(\'primary-55\')',
                        description: 'The border-color of the toggle component when checked, for the light color variant'
                    },
                    {
                        name: 'border-color--disabled',
                        type: '',
                        value: 'color(\'light\')',
                        description: 'The border-color of the toggle component when disabled, for the light color variant'
                    },
                    {
                        name: 'border-color--checked-disabled',
                        type: '',
                        value: 'color(\'primary-30\')',
                        description: 'The border-color of the toggle component when checked and disabled, for the light color variant'
                    },
                    {
                        name: 'indicator--background',
                        type: '',
                        value: 'color(\'white\')',
                        description: 'The background of the toggle component indicator, for the light color variant'
                    },
                    {
                        name: 'indicator--background--disabled',
                        type: '',
                        value: 'color(\'gray-05\')',
                        description: 'The background of the toggle component indicator when disabled, for the light color variant'
                    },
                    {
                        name: 'indicator--background--checked-disabled',
                        type: '',
                        value: 'color(\'gray-10\')',
                        description: 'The background of the toggle component indicator when checked and disabled, for the light color variant'
                    },
                    {
                        name: 'label--color',
                        type: '',
                        value: 'contrast-color($color-light)',
                        description: 'The color of the toggle component label, for the light color variant'
                    },
                    {
                        name: 'label--color--disabled',
                        type: '',
                        value: 'color(\'light-70\')',
                        description: 'The color of the toggle component label when disabled, for the light color variant'
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
                        description: 'The background of the toggle component, for the dark color variant'
                    },
                    {
                        name: 'background--checked',
                        type: '',
                        value: 'color(\'primary\')',
                        description: 'The background of the toggle component when checked, for the dark color variant'
                    },
                    {
                        name: 'background--disabled',
                        type: '',
                        value: 'color(\'dark-40\')',
                        description: 'The background of the toggle component when disabled, for the dark color variant'
                    },
                    {
                        name: 'background--checked-disabled',
                        type: '',
                        value: 'color(\'primary-75\')',
                        description: 'The background of the toggle component when checked and disabled, for the dark color variant'
                    },
                    {
                        name: 'border-color',
                        type: '',
                        value: 'color(\'dark\')',
                        description: 'The border-color of the toggle component, for the dark color variant'
                    },
                    {
                        name: 'border-color--checked',
                        type: '',
                        value: 'color(\'primary-55\')',
                        description: 'The border-color of the toggle component when checked, for the dark color variant'
                    },
                    {
                        name: 'border-color--disabled',
                        type: '',
                        value: 'color(\'dark\')',
                        description: 'The border-color of the toggle component when disabled, for the dark color variant'
                    },
                    {
                        name: 'border-color--checked-disabled',
                        type: '',
                        value: 'color(\'primary-70\')',
                        description: 'The border-color of the toggle component when checked and disabled, for the dark color variant'
                    },
                    {
                        name: 'indicator--background',
                        type: '',
                        value: 'color(\'white\')',
                        description: 'The background of the toggle component indicator, for the dark color variant'
                    },
                    {
                        name: 'indicator--background--disabled',
                        type: '',
                        value: 'color(\'gray-30\')',
                        description: 'The background of the toggle component indicator when disabled, for the dark color variant'
                    },
                    {
                        name: 'indicator--background--checked-disabled',
                        type: '',
                        value: 'color(\'dark-25\')',
                        description: 'The background of the toggle component indicator when checked and disabled, for the dark color variant'
                    },
                    {
                        name: 'label--color',
                        type: '',
                        value: 'contrast-color($color-dark)',
                        description: 'The color of the toggle component label, for the dark color variant'
                    },
                    {
                        name: 'label--color--disabled',
                        type: '',
                        value: 'color(\'dark-30\')',
                        description: 'The color of the toggle component label when disabled, for the dark color variant'
                    }
                ]
            },
            {
                name: 'sm',
                type: 'variant',
                description: 'Variables for the sm size variant',
                variables: [
                    {
                        name: 'width',
                        type: '',
                        value: 'calc(#{40px} * #{size-multiplier(\'sm\')})',
                        description: 'The width of the toggle component, for the sm size variant'
                    },
                    {
                        name: 'height',
                        type: '',
                        value: 'calc(#{20px} * #{size-multiplier(\'sm\')})',
                        description: 'The height of the toggle component, for the sm size variant'
                    },
                    {
                        name: 'indicator--border-top-left-radius',
                        type: '',
                        value: 'calc(#{50%} * #{size-multiplier(\'sm\')})',
                        description: 'The border top left radius of the toggle component indicator, for the sm size variant'
                    },
                    {
                        name: 'indicator--border-top-right-radius',
                        type: '',
                        value: 'calc(#{50%} * #{size-multiplier(\'sm\')})',
                        description: 'The border top right radius of the toggle component indicator, for the sm size variant'
                    },
                    {
                        name: 'indicator--border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{50%} * #{size-multiplier(\'sm\')})',
                        description: 'The border bottom right radius of the toggle component indicator, for the sm size variant'
                    },
                    {
                        name: 'indicator--border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{50%} * #{size-multiplier(\'sm\')})',
                        description: 'The border bottom left radius of the toggle component indicator, for the sm size variant'
                    },
                    {
                        name: 'indicator--width',
                        type: '',
                        value: 'calc(#{16px} * #{size-multiplier(\'sm\')})',
                        description: 'The width of the toggle component indicator, for the sm size variant'
                    },
                    {
                        name: 'indicator--height',
                        type: '',
                        value: 'calc(#{16px} * #{size-multiplier(\'sm\')})',
                        description: 'The height of the toggle component indicator, for the sm size variant'
                    },
                    {
                        name: 'label--font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'sm\')})',
                        description: 'The font size of the toggle component label, for the sm size variant'
                    }
                ]
            },
            {
                name: 'md',
                type: 'variant',
                description: 'Variables for the md size variant',
                variables: [
                    {
                        name: 'width',
                        type: '',
                        value: 'calc(#{40px} * #{size-multiplier(\'md\')})',
                        description: 'The width of the toggle component, for the md size variant'
                    },
                    {
                        name: 'height',
                        type: '',
                        value: 'calc(#{20px} * #{size-multiplier(\'md\')})',
                        description: 'The height of the toggle component, for the md size variant'
                    },
                    {
                        name: 'indicator--border-top-left-radius',
                        type: '',
                        value: 'calc(#{50%} * #{size-multiplier(\'md\')})',
                        description: 'The border top left radius of the toggle component indicator, for the md size variant'
                    },
                    {
                        name: 'indicator--border-top-right-radius',
                        type: '',
                        value: 'calc(#{50%} * #{size-multiplier(\'md\')})',
                        description: 'The border top right radius of the toggle component indicator, for the md size variant'
                    },
                    {
                        name: 'indicator--border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{50%} * #{size-multiplier(\'md\')})',
                        description: 'The border bottom right radius of the toggle component indicator, for the md size variant'
                    },
                    {
                        name: 'indicator--border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{50%} * #{size-multiplier(\'md\')})',
                        description: 'The border bottom left radius of the toggle component indicator, for the md size variant'
                    },
                    {
                        name: 'indicator--width',
                        type: '',
                        value: 'calc(#{16px} * #{size-multiplier(\'md\')})',
                        description: 'The width of the toggle component indicator, for the md size variant'
                    },
                    {
                        name: 'indicator--height',
                        type: '',
                        value: 'calc(#{16px} * #{size-multiplier(\'md\')})',
                        description: 'The height of the toggle component indicator, for the md size variant'
                    },
                    {
                        name: 'label--font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'md\')})',
                        description: 'The font size of the toggle component label, for the md size variant'
                    }
                ]
            },
            {
                name: 'lg',
                type: 'variant',
                description: 'Variables for the lg size variant',
                variables: [
                    {
                        name: 'width',
                        type: '',
                        value: 'calc(#{40px} * #{size-multiplier(\'lg\')})',
                        description: 'The width of the toggle component, for the lg size variant'
                    },
                    {
                        name: 'height',
                        type: '',
                        value: 'calc(#{20px} * #{size-multiplier(\'lg\')})',
                        description: 'The height of the toggle component, for the lg size variant'
                    },
                    {
                        name: 'indicator--border-top-left-radius',
                        type: '',
                        value: 'calc(#{50%} * #{size-multiplier(\'lg\')})',
                        description: 'The border top left radius of the toggle component indicator, for the lg size variant'
                    },
                    {
                        name: 'indicator--border-top-right-radius',
                        type: '',
                        value: 'calc(#{50%} * #{size-multiplier(\'lg\')})',
                        description: 'The border top right radius of the toggle component indicator, for the lg size variant'
                    },
                    {
                        name: 'indicator--border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{50%} * #{size-multiplier(\'lg\')})',
                        description: 'The border bottom right radius of the toggle component indicator, for the lg size variant'
                    },
                    {
                        name: 'indicator--border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{50%} * #{size-multiplier(\'lg\')})',
                        description: 'The border bottom left radius of the toggle component indicator, for the lg size variant'
                    },
                    {
                        name: 'indicator--width',
                        type: '',
                        value: 'calc(#{16px} * #{size-multiplier(\'lg\')})',
                        description: 'The width of the toggle component indicator, for the lg size variant'
                    },
                    {
                        name: 'indicator--height',
                        type: '',
                        value: 'calc(#{16px} * #{size-multiplier(\'lg\')})',
                        description: 'The height of the toggle component indicator, for the lg size variant'
                    },
                    {
                        name: 'label--font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'lg\')})',
                        description: 'The font size of the toggle component label, for the lg size variant'
                    }
                ]
            }
        ]
    }
};

export default manifest;
