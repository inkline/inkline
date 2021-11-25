export const manifest = {
    name: 'badge',
    slots: [
        {
            description: 'Slot for default badge content',
            name: 'default'
        }
    ],
    props: [
        {
            name: 'color',
            type: [
                'primary',
                'success',
                'light',
                'dark',
                'info',
                'success',
                'warning',
                'danger'
            ],
            default: 'light',
            description: 'The color variant of the badge'
        },
        {
            name: 'size',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md',
            description: 'The size variant of the badge'
        }
    ],
    css: {
        selector: '.badge',
        defaults: {
            size: 'md',
            color: 'light'
        },
        variables: [
            {
                name: 'background',
                type: 'color',
                value: 'color(\'light\')',
                description: 'The background of the badge component'
            },
            {
                name: 'border-top-color',
                type: 'color',
                value: 'color(\'light-55\')',
                description: 'The border top color of the badge component'
            },
            {
                name: 'border-right-color',
                type: 'color',
                value: 'color(\'light-55\')',
                description: 'The border right color of the badge component'
            },
            {
                name: 'border-bottom-color',
                type: 'color',
                value: 'color(\'light-55\')',
                description: 'The border bottom color of the badge component'
            },
            {
                name: 'border-left-color',
                type: 'color',
                value: 'color(\'light-55\')',
                description: 'The border left color of the badge component'
            },
            {
                name: 'border-color',
                type: '',
                value: 'var(----border-top-color) var(----border-right-color) var(----border-bottom-color) var(----border-left-color)',
                description: 'The border color of the badge component'
            },
            {
                name: 'border-style',
                type: '',
                value: 'var(--border-style)',
                description: 'The border style of the badge component'
            },
            {
                name: 'border-top-width',
                type: '',
                value: 'var(--border-top-width)',
                description: 'The border top width of the badge component'
            },
            {
                name: 'border-right-width',
                type: '',
                value: 'var(--border-right-width)',
                description: 'The border right width of the badge component'
            },
            {
                name: 'border-bottom-width',
                type: '',
                value: 'var(--border-bottom-width)',
                description: 'The border bottom width of the badge component'
            },
            {
                name: 'border-left-width',
                type: '',
                value: 'var(--border-left-width)',
                description: 'The border left width of the badge component'
            },
            {
                name: 'border-width',
                type: '',
                value: 'var(----border-top-width) var(----border-right-width) var(----border-bottom-width) var(----border-left-width)',
                description: 'The border width of the badge component'
            },
            {
                name: 'box-shadow-offset-x',
                type: '',
                value: 'var(--box-shadow-offset-x)',
                description: 'The box shadow horizontal offset of the badge component'
            },
            {
                name: 'box-shadow-offset-y',
                type: '',
                value: 'var(--box-shadow-offset-y)',
                description: 'The box shadow vertical offset of the badge component'
            },
            {
                name: 'box-shadow-blur-radius',
                type: '',
                value: 'var(--box-shadow-blur-radius)',
                description: 'The box shadow blur radius of the badge component'
            },
            {
                name: 'box-shadow-spread-radius',
                type: '',
                value: 'var(--box-shadow-spread-radius)',
                description: 'The box shadow spread radius of the badge component'
            },
            {
                name: 'box-shadow-color',
                type: '',
                value: 'var(--box-shadow-color)',
                description: 'The box shadow spread radius of the badge component'
            },
            {
                name: 'box-shadow',
                type: '',
                value: 'var(----box-shadow-offset-x) var(----box-shadow-offset-y) var(----box-shadow-blur-radius) var(----box-shadow-spread-radius) var(----box-shadow-color)',
                description: 'The box shadow of the badge component'
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                value: 'var(--border-top-left-radius)',
                description: 'The border top left radius of the badge component'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                value: 'var(--border-top-right-radius)',
                description: 'The border top right radius of the badge component'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                value: 'var(--border-bottom-right-radius)',
                description: 'The border bottom right radius of the badge component'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                value: 'var(--border-bottom-left-radius)',
                description: 'The border bottom left radius of the badge component'
            },
            {
                name: 'border-radius',
                type: '',
                value: 'var(----border-top-left-radius) var(----border-top-right-radius) var(----border-bottom-right-radius) var(----border-bottom-left-radius)',
                description: 'The border radius of the badge component'
            },
            {
                name: 'color',
                type: 'color',
                value: 'contrast-color($color-light)',
                description: 'The color of the badge component'
            },
            {
                name: 'font-size',
                type: 'size',
                value: '75%',
                description: 'The font size of the badge component'
            },
            {
                name: 'font-weight',
                type: '',
                value: 'font-weight(\'bold\')',
                description: 'The font weight of the badge component'
            },
            {
                name: 'line-height',
                type: '',
                value: 'var(--line-height)',
                description: 'The line height of the badge component'
            },
            {
                name: 'padding-top',
                type: 'size',
                value: 'calc(var(--padding-top) / 2)',
                description: 'The padding top of the badge component'
            },
            {
                name: 'padding-right',
                type: 'size',
                value: 'calc(var(--padding-right) / 2)',
                description: 'The padding right of the badge component'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                value: 'calc(var(--padding-bottom) / 2)',
                description: 'The padding bottom of the badge component'
            },
            {
                name: 'padding-left',
                type: 'size',
                value: 'calc(var(--padding-left) / 2)',
                description: 'The padding left of the badge component'
            },
            {
                name: 'padding',
                type: '',
                value: 'var(----padding-top) var(----padding-right) var(----padding-bottom) var(----padding-left)',
                description: 'The padding of the badge component'
            },
            {
                name: 'link--background--hover',
                type: 'color',
                value: 'color(\'light-60\')',
                description: 'The background of the badge component when parent link is hovered'
            },
            {
                name: 'pill--border-radius',
                type: '',
                value: '10rem',
                description: 'The border radius of the badge component'
            }
        ],
        variants: [
            {
                name: 'primary',
                type: 'variant',
                description: 'Variables for the primary color variant',
                variables: [
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'primary\')',
                        description: 'The background of the badge component, for the primary color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'primary-55\')',
                        description: 'The border top color of the badge component, for the primary color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'primary-55\')',
                        description: 'The border right color of the badge component, for the primary color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'primary-55\')',
                        description: 'The border bottom color of the badge component, for the primary color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'primary-55\')',
                        description: 'The border left color of the badge component, for the primary color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-primary)',
                        description: 'The color of the badge component, for the primary color variant'
                    },
                    {
                        name: 'link--background--hover',
                        type: '',
                        value: 'color(\'primary-60\')',
                        description: 'The background of the badge component when parent link is hovered, for the primary color variant'
                    }
                ]
            },
            {
                name: 'secondary',
                type: 'variant',
                description: 'Variables for the secondary color variant',
                variables: [
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'secondary\')',
                        description: 'The background of the badge component, for the secondary color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'secondary-55\')',
                        description: 'The border top color of the badge component, for the secondary color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'secondary-55\')',
                        description: 'The border right color of the badge component, for the secondary color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'secondary-55\')',
                        description: 'The border bottom color of the badge component, for the secondary color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'secondary-55\')',
                        description: 'The border left color of the badge component, for the secondary color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-secondary)',
                        description: 'The color of the badge component, for the secondary color variant'
                    },
                    {
                        name: 'link--background--hover',
                        type: '',
                        value: 'color(\'secondary-60\')',
                        description: 'The background of the badge component when parent link is hovered, for the secondary color variant'
                    }
                ]
            },
            {
                name: 'light',
                type: 'variant',
                description: 'Variables for the light color variant',
                variables: [
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'light\')',
                        description: 'The background of the badge component, for the light color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'light-55\')',
                        description: 'The border top color of the badge component, for the light color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'light-55\')',
                        description: 'The border right color of the badge component, for the light color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'light-55\')',
                        description: 'The border bottom color of the badge component, for the light color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'light-55\')',
                        description: 'The border left color of the badge component, for the light color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-light)',
                        description: 'The color of the badge component, for the light color variant'
                    },
                    {
                        name: 'link--background--hover',
                        type: '',
                        value: 'color(\'light-60\')',
                        description: 'The background of the badge component when parent link is hovered, for the light color variant'
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
                        description: 'The background of the badge component, for the dark color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'dark-45\')',
                        description: 'The border top color of the badge component, for the dark color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'dark-45\')',
                        description: 'The border right color of the badge component, for the dark color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'dark-45\')',
                        description: 'The border bottom color of the badge component, for the dark color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'dark-45\')',
                        description: 'The border left color of the badge component, for the dark color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-dark)',
                        description: 'The color of the badge component, for the dark color variant'
                    },
                    {
                        name: 'link--background--hover',
                        type: '',
                        value: 'color(\'dark-40\')',
                        description: 'The background of the badge component when parent link is hovered, for the dark color variant'
                    }
                ]
            },
            {
                name: 'info',
                type: 'variant',
                description: 'Variables for the info color variant',
                variables: [
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'info\')',
                        description: 'The background of the badge component, for the info color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'info-55\')',
                        description: 'The border top color of the badge component, for the info color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'info-55\')',
                        description: 'The border right color of the badge component, for the info color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'info-55\')',
                        description: 'The border bottom color of the badge component, for the info color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'info-55\')',
                        description: 'The border left color of the badge component, for the info color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-info)',
                        description: 'The color of the badge component, for the info color variant'
                    },
                    {
                        name: 'link--background--hover',
                        type: '',
                        value: 'color(\'info-60\')',
                        description: 'The background of the badge component when parent link is hovered, for the info color variant'
                    }
                ]
            },
            {
                name: 'warning',
                type: 'variant',
                description: 'Variables for the warning color variant',
                variables: [
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'warning\')',
                        description: 'The background of the badge component, for the warning color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'warning-55\')',
                        description: 'The border top color of the badge component, for the warning color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'warning-55\')',
                        description: 'The border right color of the badge component, for the warning color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'warning-55\')',
                        description: 'The border bottom color of the badge component, for the warning color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'warning-55\')',
                        description: 'The border left color of the badge component, for the warning color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-warning)',
                        description: 'The color of the badge component, for the warning color variant'
                    },
                    {
                        name: 'link--background--hover',
                        type: '',
                        value: 'color(\'warning-60\')',
                        description: 'The background of the badge component when parent link is hovered, for the warning color variant'
                    }
                ]
            },
            {
                name: 'danger',
                type: 'variant',
                description: 'Variables for the danger color variant',
                variables: [
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'danger\')',
                        description: 'The background of the badge component, for the danger color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'danger-55\')',
                        description: 'The border top color of the badge component, for the danger color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'danger-55\')',
                        description: 'The border right color of the badge component, for the danger color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'danger-55\')',
                        description: 'The border bottom color of the badge component, for the danger color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'danger-55\')',
                        description: 'The border left color of the badge component, for the danger color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-danger)',
                        description: 'The color of the badge component, for the danger color variant'
                    },
                    {
                        name: 'link--background--hover',
                        type: '',
                        value: 'color(\'danger-60\')',
                        description: 'The background of the badge component when parent link is hovered, for the danger color variant'
                    }
                ]
            },
            {
                name: 'success',
                type: 'variant',
                description: 'Variables for the success color variant',
                variables: [
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'success\')',
                        description: 'The background of the badge component, for the success color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'success-55\')',
                        description: 'The border top color of the badge component, for the success color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'success-55\')',
                        description: 'The border right color of the badge component, for the success color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'success-55\')',
                        description: 'The border bottom color of the badge component, for the success color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'success-55\')',
                        description: 'The border left color of the badge component, for the success color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-success)',
                        description: 'The color of the badge component, for the success color variant'
                    },
                    {
                        name: 'link--background--hover',
                        type: '',
                        value: 'color(\'success-60\')',
                        description: 'The background of the badge component when parent link is hovered, for the success color variant'
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
                        description: 'The border top left radius of the badge component, for the sm size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border top right radius of the badge component, for the sm size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border bottom right radius of the badge component, for the sm size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border bottom left radius of the badge component, for the sm size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{65%} * #{size-multiplier(\'sm\')})',
                        description: 'The font size of the badge component, for the sm size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{calc(var(--padding-top) / 2)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding top of the badge component, for the sm size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{calc(var(--padding-right) / 2)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding right of the badge component, for the sm size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{calc(var(--padding-bottom) / 2)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding bottom of the badge component, for the sm size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{calc(var(--padding-left) / 2)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding left of the badge component, for the sm size variant'
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
                        description: 'The border top left radius of the badge component, for the md size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border top right radius of the badge component, for the md size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border bottom right radius of the badge component, for the md size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border bottom left radius of the badge component, for the md size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{75%} * #{size-multiplier(\'md\')})',
                        description: 'The font size of the badge component, for the md size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{calc(var(--padding-top) / 2)} * #{size-multiplier(\'md\')})',
                        description: 'The padding top of the badge component, for the md size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{calc(var(--padding-right) / 2)} * #{size-multiplier(\'md\')})',
                        description: 'The padding right of the badge component, for the md size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{calc(var(--padding-bottom) / 2)} * #{size-multiplier(\'md\')})',
                        description: 'The padding bottom of the badge component, for the md size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{calc(var(--padding-left) / 2)} * #{size-multiplier(\'md\')})',
                        description: 'The padding left of the badge component, for the md size variant'
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
                        description: 'The border top left radius of the badge component, for the lg size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border top right radius of the badge component, for the lg size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border bottom right radius of the badge component, for the lg size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border bottom left radius of the badge component, for the lg size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{85%} * #{size-multiplier(\'lg\')})',
                        description: 'The font size of the badge component, for the lg size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{calc(var(--padding-top) / 2)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding top of the badge component, for the lg size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{calc(var(--padding-right) / 2)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding right of the badge component, for the lg size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{calc(var(--padding-bottom) / 2)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding bottom of the badge component, for the lg size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{calc(var(--padding-left) / 2)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding left of the badge component, for the lg size variant'
                    }
                ]
            }
        ]
    },
    events: []
};

export default manifest;
