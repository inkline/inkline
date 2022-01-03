export const manifest = {
    name: 'alert',
    events: [
        {
            description: 'Event emitted for setting the modelValue',
            name: 'update:modelValue'
        }
    ],
    slots: [
        {
            description: 'Slot for default alert content',
            name: 'default'
        },
        {
            description: 'Slot for alert icon',
            name: 'icon'
        },
        {
            description: 'Slot for alert dismiss button',
            name: 'dismiss'
        }
    ],
    props: [
        {
            name: 'size',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md',
            description: 'The size variant of the alert'
        },
        {
            name: 'color',
            type: [
                'info',
                'success',
                'warning',
                'danger'
            ],
            default: 'info',
            description: 'The color variant of the alert'
        },
        {
            name: 'modelValue',
            type: [
                'Boolean'
            ],
            default: 'true',
            description: 'Used to show or hide a dismissible alert'
        },
        {
            name: 'dismissible',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Shows a dismiss icon on the alert'
        },
        {
            name: 'dismissAriaLabel',
            type: [
                'String'
            ],
            default: 'Dismiss',
            description: 'The aria-label to use for the dismiss button'
        }
    ],
    css: {
        selector: '.alert',
        defaults: {
            size: 'md',
            color: 'info'
        },
        variables: [
            {
                name: 'background',
                type: 'color',
                value: 'color(\'info\')',
                description: 'The background of the alert component'
            },
            {
                name: 'border-top-color',
                type: 'color',
                value: 'color(\'info-60\')',
                description: 'The border top color of the alert component'
            },
            {
                name: 'border-right-color',
                type: 'color',
                value: 'color(\'info-60\')',
                description: 'The border right color of the alert component'
            },
            {
                name: 'border-bottom-color',
                type: 'color',
                value: 'color(\'info-60\')',
                description: 'The border bottom color of the alert component'
            },
            {
                name: 'border-left-color',
                type: 'color',
                value: 'color(\'info-60\')',
                description: 'The border left color of the alert component'
            },
            {
                name: 'border-color',
                type: '',
                value: 'var(----border-top-color) var(----border-right-color) var(----border-bottom-color) var(----border-left-color)',
                description: 'The border color of the alert component'
            },
            {
                name: 'border-style',
                type: '',
                value: 'var(--border-style)',
                description: 'The border style of the alert component'
            },
            {
                name: 'border-top-width',
                type: '',
                value: 'var(--border-top-width)',
                description: 'The border top width of the alert component'
            },
            {
                name: 'border-right-width',
                type: '',
                value: 'var(--border-right-width)',
                description: 'The border right width of the alert component'
            },
            {
                name: 'border-bottom-width',
                type: '',
                value: 'var(--border-bottom-width)',
                description: 'The border bottom width of the alert component'
            },
            {
                name: 'border-left-width',
                type: '',
                value: 'var(--border-left-width)',
                description: 'The border left width of the alert component'
            },
            {
                name: 'border-width',
                type: '',
                value: 'var(----border-top-width) var(----border-right-width) var(----border-bottom-width) var(----border-left-width)',
                description: 'The border width of the alert component'
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                value: 'var(--border-top-left-radius)',
                description: 'The border top left radius of the alert component'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                value: 'var(--border-top-right-radius)',
                description: 'The border top right radius of the alert component'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                value: 'var(--border-bottom-right-radius)',
                description: 'The border bottom right radius of the alert component'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                value: 'var(--border-bottom-left-radius)',
                description: 'The border bottom left radius of the alert component'
            },
            {
                name: 'border-radius',
                type: '',
                value: 'var(----border-top-left-radius) var(----border-top-right-radius) var(----border-bottom-right-radius) var(----border-bottom-left-radius)',
                description: 'The border radius of the alert component'
            },
            {
                name: 'box-shadow-offset-x',
                type: '',
                value: 'var(--box-shadow-offset-x)',
                description: 'The box shadow horizontal offset of the alert component'
            },
            {
                name: 'box-shadow-offset-y',
                type: '',
                value: 'var(--box-shadow-offset-y)',
                description: 'The box shadow vertical offset of the alert component'
            },
            {
                name: 'box-shadow-blur-radius',
                type: '',
                value: 'var(--box-shadow-blur-radius)',
                description: 'The box shadow blur radius of the alert component'
            },
            {
                name: 'box-shadow-spread-radius',
                type: '',
                value: 'var(--box-shadow-spread-radius)',
                description: 'The box shadow spread radius of the alert component'
            },
            {
                name: 'box-shadow-color',
                type: '',
                value: 'var(--box-shadow-color)',
                description: 'The box shadow spread radius of the alert component'
            },
            {
                name: 'box-shadow',
                type: '',
                value: 'var(----box-shadow-offset-x) var(----box-shadow-offset-y) var(----box-shadow-blur-radius) var(----box-shadow-spread-radius) var(----box-shadow-color)',
                description: 'The box shadow of the alert component'
            },
            {
                name: 'color',
                type: 'color',
                value: 'contrast-color($color-info)',
                description: 'The text color of the alert component'
            },
            {
                name: 'font-size',
                type: 'size',
                value: 'font-size()',
                description: 'The font size of the alert component'
            },
            {
                name: 'font-weight',
                type: '',
                value: 'font-weight(\'normal\')',
                description: 'The font weight of the alert component'
            },
            {
                name: 'line-height',
                type: '',
                value: 'var(--line-height)',
                description: 'The line height of the alert component'
            },
            {
                name: 'padding-top',
                type: 'size',
                value: 'var(--padding-top)',
                description: 'The padding top of the alert component'
            },
            {
                name: 'padding-right',
                type: 'size',
                value: 'var(--padding-right)',
                description: 'The padding right of the alert component'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                value: 'var(--padding-bottom)',
                description: 'The padding bottom of the alert component'
            },
            {
                name: 'padding-left',
                type: 'size',
                value: 'var(--padding-left)',
                description: 'The padding left of the alert component'
            },
            {
                name: 'padding',
                type: '',
                value: 'var(----padding-top) var(----padding-right) var(----padding-bottom) var(----padding-left)',
                description: 'The padding of the alert component'
            },
            {
                name: 'code--color',
                type: '',
                value: 'var(----color)',
                description: 'The code color of the alert component'
            },
            {
                name: 'code--background',
                type: 'color',
                value: 'color(\'info-60\')',
                description: 'The code background of the alert component'
            },
            {
                name: 'dismiss--margin',
                type: '',
                value: 'var(----padding-right)',
                description: 'The margin of the alert component dismiss icon'
            },
            {
                name: 'dismiss--padding',
                type: '',
                value: 'calc(var(----padding-top) / 2)',
                description: 'The padding of the alert component dismiss icon'
            },
            {
                name: 'link--color',
                type: '',
                value: 'var(----color)',
                description: 'The link color of the alert component'
            }
        ],
        variants: [
            {
                name: 'info',
                type: 'variant',
                description: 'Variables for the info color variant',
                variables: [
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'info\')',
                        description: 'The background of the alert component, for the info color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'info-60\')',
                        description: 'The border top color of the alert component, for the info color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'info-60\')',
                        description: 'The border right color of the alert component, for the info color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'info-60\')',
                        description: 'The border bottom color of the alert component, for the info color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'info-60\')',
                        description: 'The border left color of the alert component, for the info color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-info)',
                        description: 'The text color of the alert component, for the info color variant'
                    },
                    {
                        name: 'code--background',
                        type: '',
                        value: 'color(\'info-60\')',
                        description: 'The code background of the alert component, for the info color variant'
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
                        description: 'The background of the alert component, for the success color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'success-60\')',
                        description: 'The border top color of the alert component, for the success color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'success-60\')',
                        description: 'The border right color of the alert component, for the success color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'success-60\')',
                        description: 'The border bottom color of the alert component, for the success color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'success-60\')',
                        description: 'The border left color of the alert component, for the success color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-success)',
                        description: 'The text color of the alert component, for the success color variant'
                    },
                    {
                        name: 'code--background',
                        type: '',
                        value: 'color(\'success-60\')',
                        description: 'The code background of the alert component, for the success color variant'
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
                        description: 'The background of the alert component, for the warning color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'warning-60\')',
                        description: 'The border top color of the alert component, for the warning color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'warning-60\')',
                        description: 'The border right color of the alert component, for the warning color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'warning-60\')',
                        description: 'The border bottom color of the alert component, for the warning color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'warning-60\')',
                        description: 'The border left color of the alert component, for the warning color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-warning)',
                        description: 'The text color of the alert component, for the warning color variant'
                    },
                    {
                        name: 'code--background',
                        type: '',
                        value: 'color(\'warning-60\')',
                        description: 'The code background of the alert component, for the warning color variant'
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
                        description: 'The background of the alert component, for the danger color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'danger-60\')',
                        description: 'The border top color of the alert component, for the danger color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'danger-60\')',
                        description: 'The border right color of the alert component, for the danger color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'danger-60\')',
                        description: 'The border bottom color of the alert component, for the danger color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'danger-60\')',
                        description: 'The border left color of the alert component, for the danger color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-danger)',
                        description: 'The text color of the alert component, for the danger color variant'
                    },
                    {
                        name: 'code--background',
                        type: '',
                        value: 'color(\'danger-60\')',
                        description: 'The code background of the alert component, for the danger color variant'
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
                        description: 'The border top left radius of the alert component, for the sm size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border top right radius of the alert component, for the sm size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border bottom right radius of the alert component, for the sm size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border bottom left radius of the alert component, for the sm size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'sm\')})',
                        description: 'The font size of the alert component, for the sm size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{var(--padding-top)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding top of the alert component, for the sm size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding right of the alert component, for the sm size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{var(--padding-bottom)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding bottom of the alert component, for the sm size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding left of the alert component, for the sm size variant'
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
                        description: 'The border top left radius of the alert component, for the md size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border top right radius of the alert component, for the md size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border bottom right radius of the alert component, for the md size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border bottom left radius of the alert component, for the md size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'md\')})',
                        description: 'The font size of the alert component, for the md size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{var(--padding-top)} * #{size-multiplier(\'md\')})',
                        description: 'The padding top of the alert component, for the md size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'md\')})',
                        description: 'The padding right of the alert component, for the md size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{var(--padding-bottom)} * #{size-multiplier(\'md\')})',
                        description: 'The padding bottom of the alert component, for the md size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'md\')})',
                        description: 'The padding left of the alert component, for the md size variant'
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
                        description: 'The border top left radius of the alert component, for the lg size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border top right radius of the alert component, for the lg size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border bottom right radius of the alert component, for the lg size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border bottom left radius of the alert component, for the lg size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'lg\')})',
                        description: 'The font size of the alert component, for the lg size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{var(--padding-top)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding top of the alert component, for the lg size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding right of the alert component, for the lg size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{var(--padding-bottom)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding bottom of the alert component, for the lg size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding left of the alert component, for the lg size variant'
                    }
                ]
            }
        ]
    }
};

export default manifest;
