export const manifest = {
    name: 'tooltip',
    slots: [
        {
            description: 'Slot for tooltip trigger',
            name: 'default'
        },
        {
            description: 'Slot for tooltip body content',
            name: 'body'
        }
    ],
    events: [
        {
            description: 'Event emitted when clicking outside the tooltip elements',
            name: 'click-outside'
        },
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
            description: 'The color variant of the tooltip'
        },
        {
            name: 'disabled',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The disabled state of the tooltip'
        },
        {
            name: 'modelValue',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Used to manually control the visibility of the tooltip'
        },
        {
            name: 'name',
            type: [
                'String'
            ],
            default: 'uid()',
            description: 'The identifier of the tooltip'
        },
        {
            name: 'arrow',
            type: [
                'Boolean'
            ],
            default: 'true',
            description: 'Displays an arrow on the tooltip pointing to the trigger element'
        },
        {
            name: 'placement',
            type: [
                'top',
                'top-start',
                'top-end',
                'bottom',
                'bottom-start',
                'bottom-end',
                'left',
                'left-start',
                'left-end',
                'right',
                'right-start',
                'right-end'
            ],
            default: 'false',
            description: 'The placement of the tooltip'
        },
        {
            name: 'trigger',
            type: [
                'hover',
                'focus',
                'click',
                'manual'
            ],
            default: 'hover, focus',
            description: 'The events used to trigger the tooltip'
        },
        {
            name: 'offset',
            type: [
                'Number'
            ],
            default: '6',
            description: 'The offset of the tooltip relative to the trigger element'
        },
        {
            name: 'popperOptions',
            type: [
                'Object'
            ],
            default: '',
            description: 'Used to override the popper.js options used for creating the tooltip'
        },
        {
            name: 'size',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md',
            description: 'The size variant of the tooltip'
        }
    ],
    css: {
        selector: '.tooltip-wrapper',
        defaults: {
            size: 'md',
            color: 'light'
        },
        variables: [
            {
                name: 'background',
                type: 'color',
                value: 'color(\'white\')',
                description: 'The background of the tooltip component'
            },
            {
                name: 'border-top-color',
                type: 'color',
                value: 'color(\'light\')',
                description: 'The border top color of the tooltip component'
            },
            {
                name: 'border-right-color',
                type: 'color',
                value: 'color(\'light\')',
                description: 'The border right color of the tooltip component'
            },
            {
                name: 'border-bottom-color',
                type: 'color',
                value: 'color(\'light\')',
                description: 'The border bottom color of the tooltip component'
            },
            {
                name: 'border-left-color',
                type: 'color',
                value: 'color(\'light\')',
                description: 'The border left color of the tooltip component'
            },
            {
                name: 'border-color',
                type: '',
                value: 'var(----border-top-color) var(----border-right-color) var(----border-bottom-color) var(----border-left-color)',
                description: 'The border color of the tooltip component'
            },
            {
                name: 'border-style',
                type: '',
                value: 'var(--border-style)',
                description: 'The border style of the tooltip component'
            },
            {
                name: 'border-top-width',
                type: '',
                value: 'var(--border-top-width)',
                description: 'The border top width of the tooltip component'
            },
            {
                name: 'border-right-width',
                type: '',
                value: 'var(--border-right-width)',
                description: 'The border right width of the tooltip component'
            },
            {
                name: 'border-bottom-width',
                type: '',
                value: 'var(--border-bottom-width)',
                description: 'The border bottom width of the tooltip component'
            },
            {
                name: 'border-left-width',
                type: '',
                value: 'var(--border-left-width)',
                description: 'The border left width of the tooltip component'
            },
            {
                name: 'border-width',
                type: '',
                value: 'var(----border-top-width) var(----border-right-width) var(----border-bottom-width) var(----border-left-width)',
                description: 'The border width of the tooltip component'
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                value: 'var(--border-top-left-radius)',
                description: 'The border top left radius of the tooltip component'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                value: 'var(--border-top-right-radius)',
                description: 'The border top right radius of the tooltip component'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                value: 'var(--border-bottom-right-radius)',
                description: 'The border bottom right radius of the tooltip component'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                value: 'var(--border-bottom-left-radius)',
                description: 'The border bottom left radius of the tooltip component'
            },
            {
                name: 'border-radius',
                type: '',
                value: 'var(----border-top-left-radius) var(----border-top-right-radius) var(----border-bottom-right-radius) var(----border-bottom-left-radius)',
                description: 'The border radius of the tooltip component'
            },
            {
                name: 'box-shadow-offset-x',
                type: '',
                value: 'var(--box-shadow-offset-x)',
                description: 'The box shadow horizontal offset of the tooltip component'
            },
            {
                name: 'box-shadow-offset-y',
                type: '',
                value: 'var(--box-shadow-offset-y)',
                description: 'The box shadow vertical offset of the tooltip component'
            },
            {
                name: 'box-shadow-blur-radius',
                type: '',
                value: 'var(--box-shadow-blur-radius)',
                description: 'The box shadow blur radius of the tooltip component'
            },
            {
                name: 'box-shadow-spread-radius',
                type: '',
                value: 'var(--box-shadow-spread-radius)',
                description: 'The box shadow spread radius of the tooltip component'
            },
            {
                name: 'box-shadow-color',
                type: '',
                value: 'var(--box-shadow-color)',
                description: 'The box shadow spread radius of the tooltip component'
            },
            {
                name: 'box-shadow',
                type: '',
                value: 'var(----box-shadow-offset-x) var(----box-shadow-offset-y) var(----box-shadow-blur-radius) var(----box-shadow-spread-radius) var(----box-shadow-color)',
                description: 'The box shadow of the tooltip component'
            },
            {
                name: 'color',
                type: 'color',
                value: 'contrast-color($color-white)',
                description: 'The color of the tooltip component item'
            },
            {
                name: 'font-size',
                type: 'size',
                value: 'font-size()',
                description: 'The font size of the tooltip component'
            },
            {
                name: 'font-weight',
                type: '',
                value: 'font-weight(\'normal\')',
                description: 'The font weight of the tooltip component'
            },
            {
                name: 'line-height',
                type: '',
                value: 'var(--line-height)',
                description: 'The line height of the tooltip component'
            },
            {
                name: 'margin-top',
                type: 'size',
                value: 'calc(var(--margin-top) / 2)',
                description: 'The margin top of the tooltip component'
            },
            {
                name: 'margin-right',
                type: 'size',
                value: 'calc(var(--margin-right) / 2)',
                description: 'The margin right of the tooltip component'
            },
            {
                name: 'margin-bottom',
                type: 'size',
                value: 'calc(var(--margin-bottom) / 2)',
                description: 'The margin bottom of the tooltip component'
            },
            {
                name: 'margin-left',
                type: 'size',
                value: 'calc(var(--margin-left) / 2)',
                description: 'The margin left of the tooltip component'
            },
            {
                name: 'margin',
                type: '',
                value: 'var(----margin-top) var(----margin-right) var(----margin-bottom) var(----margin-left)',
                description: 'The margin of the tooltip component'
            },
            {
                name: 'padding-top',
                type: 'size',
                value: 'calc(var(--padding-top) * 3 / 4)',
                description: 'The padding top of the tooltip component'
            },
            {
                name: 'padding-right',
                type: 'size',
                value: 'var(--padding-right)',
                description: 'The padding right of the tooltip component'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                value: 'calc(var(--padding-bottom) * 3 / 4)',
                description: 'The padding bottom of the tooltip component'
            },
            {
                name: 'padding-left',
                type: 'size',
                value: 'var(--padding-left)',
                description: 'The padding left of the tooltip component'
            },
            {
                name: 'padding',
                type: '',
                value: 'var(----padding-top) var(----padding-right) var(----padding-bottom) var(----padding-left)',
                description: 'The padding of the tooltip component'
            },
            {
                name: 'width',
                type: '',
                value: '280px',
                description: 'The width of the tooltip component'
            },
            {
                name: 'z-index',
                type: '',
                value: '2000',
                description: 'The z-index of the tooltip component'
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
                        description: 'The background of the tooltip component, for the light color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'light\')',
                        description: 'The border top color of the tooltip component, for the light color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'light\')',
                        description: 'The border right color of the tooltip component, for the light color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'light\')',
                        description: 'The border bottom color of the tooltip component, for the light color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'light\')',
                        description: 'The border left color of the tooltip component, for the light color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-white)',
                        description: 'The color of the tooltip component item, for the light color variant'
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
                        description: 'The background of the tooltip component, for the dark color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'dark-60\')',
                        description: 'The border top color of the tooltip component, for the dark color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'dark-60\')',
                        description: 'The border right color of the tooltip component, for the dark color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'dark-60\')',
                        description: 'The border bottom color of the tooltip component, for the dark color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'dark-60\')',
                        description: 'The border left color of the tooltip component, for the dark color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-dark)',
                        description: 'The color of the tooltip component item, for the dark color variant'
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
                        description: 'The border top left radius of the tooltip component, for the sm size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border top right radius of the tooltip component, for the sm size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border bottom right radius of the tooltip component, for the sm size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border bottom left radius of the tooltip component, for the sm size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'sm\')})',
                        description: 'The font size of the tooltip component, for the sm size variant'
                    },
                    {
                        name: 'margin-top',
                        type: '',
                        value: 'calc(#{calc(var(--margin-top) / 2)} * #{size-multiplier(\'sm\')})',
                        description: 'The margin top of the tooltip component, for the sm size variant'
                    },
                    {
                        name: 'margin-right',
                        type: '',
                        value: 'calc(#{calc(var(--margin-right) / 2)} * #{size-multiplier(\'sm\')})',
                        description: 'The margin right of the tooltip component, for the sm size variant'
                    },
                    {
                        name: 'margin-bottom',
                        type: '',
                        value: 'calc(#{calc(var(--margin-bottom) / 2)} * #{size-multiplier(\'sm\')})',
                        description: 'The margin bottom of the tooltip component, for the sm size variant'
                    },
                    {
                        name: 'margin-left',
                        type: '',
                        value: 'calc(#{calc(var(--margin-left) / 2)} * #{size-multiplier(\'sm\')})',
                        description: 'The margin left of the tooltip component, for the sm size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{calc(var(--padding-top) * 3 / 4)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding top of the tooltip component, for the sm size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding right of the tooltip component, for the sm size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{calc(var(--padding-bottom) * 3 / 4)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding bottom of the tooltip component, for the sm size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding left of the tooltip component, for the sm size variant'
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
                        description: 'The border top left radius of the tooltip component, for the md size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border top right radius of the tooltip component, for the md size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border bottom right radius of the tooltip component, for the md size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border bottom left radius of the tooltip component, for the md size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'md\')})',
                        description: 'The font size of the tooltip component, for the md size variant'
                    },
                    {
                        name: 'margin-top',
                        type: '',
                        value: 'calc(#{calc(var(--margin-top) / 2)} * #{size-multiplier(\'md\')})',
                        description: 'The margin top of the tooltip component, for the md size variant'
                    },
                    {
                        name: 'margin-right',
                        type: '',
                        value: 'calc(#{calc(var(--margin-right) / 2)} * #{size-multiplier(\'md\')})',
                        description: 'The margin right of the tooltip component, for the md size variant'
                    },
                    {
                        name: 'margin-bottom',
                        type: '',
                        value: 'calc(#{calc(var(--margin-bottom) / 2)} * #{size-multiplier(\'md\')})',
                        description: 'The margin bottom of the tooltip component, for the md size variant'
                    },
                    {
                        name: 'margin-left',
                        type: '',
                        value: 'calc(#{calc(var(--margin-left) / 2)} * #{size-multiplier(\'md\')})',
                        description: 'The margin left of the tooltip component, for the md size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{calc(var(--padding-top) * 3 / 4)} * #{size-multiplier(\'md\')})',
                        description: 'The padding top of the tooltip component, for the md size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'md\')})',
                        description: 'The padding right of the tooltip component, for the md size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{calc(var(--padding-bottom) * 3 / 4)} * #{size-multiplier(\'md\')})',
                        description: 'The padding bottom of the tooltip component, for the md size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'md\')})',
                        description: 'The padding left of the tooltip component, for the md size variant'
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
                        description: 'The border top left radius of the tooltip component, for the lg size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border top right radius of the tooltip component, for the lg size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border bottom right radius of the tooltip component, for the lg size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border bottom left radius of the tooltip component, for the lg size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'lg\')})',
                        description: 'The font size of the tooltip component, for the lg size variant'
                    },
                    {
                        name: 'margin-top',
                        type: '',
                        value: 'calc(#{calc(var(--margin-top) / 2)} * #{size-multiplier(\'lg\')})',
                        description: 'The margin top of the tooltip component, for the lg size variant'
                    },
                    {
                        name: 'margin-right',
                        type: '',
                        value: 'calc(#{calc(var(--margin-right) / 2)} * #{size-multiplier(\'lg\')})',
                        description: 'The margin right of the tooltip component, for the lg size variant'
                    },
                    {
                        name: 'margin-bottom',
                        type: '',
                        value: 'calc(#{calc(var(--margin-bottom) / 2)} * #{size-multiplier(\'lg\')})',
                        description: 'The margin bottom of the tooltip component, for the lg size variant'
                    },
                    {
                        name: 'margin-left',
                        type: '',
                        value: 'calc(#{calc(var(--margin-left) / 2)} * #{size-multiplier(\'lg\')})',
                        description: 'The margin left of the tooltip component, for the lg size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{calc(var(--padding-top) * 3 / 4)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding top of the tooltip component, for the lg size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding right of the tooltip component, for the lg size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{calc(var(--padding-bottom) * 3 / 4)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding bottom of the tooltip component, for the lg size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding left of the tooltip component, for the lg size variant'
                    }
                ]
            }
        ]
    }
};

export default manifest;
