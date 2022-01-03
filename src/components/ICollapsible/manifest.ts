export const manifest = {
    name: 'collapsible',
    events: [
        {
            description: 'Event emitted for setting the modelValue',
            name: 'update:modelValue'
        }
    ],
    slots: [
        {
            description: 'Slot for default collapsible content',
            name: 'default'
        }
    ],
    props: [
        {
            name: 'accordion',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the collapsible as an accordion, keeping a maximum of one open collapsible item'
        },
        {
            name: 'color',
            type: [
                'light',
                'dark',
                'blank'
            ],
            default: 'light',
            description: 'The color variant of the button'
        },
        {
            name: 'size',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md',
            description: 'The size variant of the collapsible'
        },
        {
            name: 'modelValue',
            type: [
                'String[]'
            ],
            default: '',
            description: 'Used to determine which collapsible item is open'
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
                type: 'color',
                value: 'color(\'light\')',
                description: 'The background of the collapsible component'
            },
            {
                name: 'border-top-color',
                type: 'color',
                value: 'color(\'light-60\')',
                description: 'The border top color of the collapsible component'
            },
            {
                name: 'border-right-color',
                type: 'color',
                value: 'color(\'light-60\')',
                description: 'The border right color of the collapsible component'
            },
            {
                name: 'border-bottom-color',
                type: 'color',
                value: 'color(\'light-60\')',
                description: 'The border bottom color of the collapsible component'
            },
            {
                name: 'border-left-color',
                type: 'color',
                value: 'color(\'light-60\')',
                description: 'The border left color of the collapsible component'
            },
            {
                name: 'border-color',
                type: '',
                value: 'var(----border-top-color) var(----border-right-color) var(----border-bottom-color) var(----border-left-color)',
                description: 'The border color of the collapsible component'
            },
            {
                name: 'border-style',
                type: '',
                value: 'var(--border-style)',
                description: 'The border style of the collapsible component'
            },
            {
                name: 'border-top-width',
                type: '',
                value: 'var(--border-top-width)',
                description: 'The border top width of the collapsible component'
            },
            {
                name: 'border-right-width',
                type: '',
                value: 'var(--border-right-width)',
                description: 'The border right width of the collapsible component'
            },
            {
                name: 'border-bottom-width',
                type: '',
                value: 'var(--border-bottom-width)',
                description: 'The border bottom width of the collapsible component'
            },
            {
                name: 'border-left-width',
                type: '',
                value: 'var(--border-left-width)',
                description: 'The border left width of the collapsible component'
            },
            {
                name: 'border-width',
                type: '',
                value: 'var(----border-top-width) var(----border-right-width) var(----border-bottom-width) var(----border-left-width)',
                description: 'The border width of the collapsible component'
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                value: 'var(--border-top-left-radius)',
                description: 'The border top left radius of the collapsible component'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                value: 'var(--border-top-right-radius)',
                description: 'The border top right radius of the collapsible component'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                value: 'var(--border-bottom-right-radius)',
                description: 'The border bottom right radius of the collapsible component'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                value: 'var(--border-bottom-left-radius)',
                description: 'The border bottom left radius of the collapsible component'
            },
            {
                name: 'border-radius',
                type: '',
                value: 'var(----border-top-left-radius) var(----border-top-right-radius) var(----border-bottom-right-radius) var(----border-bottom-left-radius)',
                description: 'The border radius of the collapsible component'
            },
            {
                name: 'box-shadow-offset-x',
                type: '',
                value: 'var(--box-shadow-offset-x)',
                description: 'The box shadow horizontal offset of the collapsible component'
            },
            {
                name: 'box-shadow-offset-y',
                type: '',
                value: 'var(--box-shadow-offset-y)',
                description: 'The box shadow vertical offset of the collapsible component'
            },
            {
                name: 'box-shadow-blur-radius',
                type: '',
                value: 'var(--box-shadow-blur-radius)',
                description: 'The box shadow blur radius of the collapsible component'
            },
            {
                name: 'box-shadow-spread-radius',
                type: '',
                value: 'var(--box-shadow-spread-radius)',
                description: 'The box shadow spread radius of the collapsible component'
            },
            {
                name: 'box-shadow-color',
                type: '',
                value: 'var(--box-shadow-color)',
                description: 'The box shadow spread radius of the collapsible component'
            },
            {
                name: 'box-shadow',
                type: '',
                value: 'var(----box-shadow-offset-x) var(----box-shadow-offset-y) var(----box-shadow-blur-radius) var(----box-shadow-spread-radius) var(----box-shadow-color)',
                description: 'The box shadow of the collapsible component'
            },
            {
                name: 'color',
                type: 'color',
                value: 'contrast-color($color-light)',
                description: 'The color of the collapsible component'
            },
            {
                name: 'font-size',
                type: 'size',
                value: 'font-size()',
                description: 'The font size of the collapsible component'
            },
            {
                name: 'padding-top',
                type: 'size',
                value: 'var(--padding-top)',
                description: 'The padding top of the collapsible component'
            },
            {
                name: 'padding-right',
                type: 'size',
                value: 'var(--padding-right)',
                description: 'The padding right of the collapsible component'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                value: 'var(--padding-bottom)',
                description: 'The padding bottom of the collapsible component'
            },
            {
                name: 'padding-left',
                type: 'size',
                value: 'var(--padding-left)',
                description: 'The padding left of the collapsible component'
            },
            {
                name: 'padding',
                type: '',
                value: 'var(----padding-top) var(----padding-right) var(----padding-bottom) var(----padding-left)',
                description: 'The padding of the collapsible component'
            },
            {
                name: 'header--background',
                type: '',
                value: 'var(----background)',
                description: 'The background of the collapsible component header'
            },
            {
                name: 'header--border-color',
                type: '',
                value: 'var(----border-color)',
                description: 'The border color of the collapsible component header'
            },
            {
                name: 'header--border-style',
                type: '',
                value: 'var(----border-style)',
                description: 'The border style of the collapsible component header'
            },
            {
                name: 'header--border-top-width',
                type: '',
                value: 'var(----border-top-width)',
                description: 'The border top width of the collapsible component header'
            },
            {
                name: 'header--border-right-width',
                type: '',
                value: 'var(----border-right-width)',
                description: 'The border right width of the collapsible component header'
            },
            {
                name: 'header--border-bottom-width',
                type: '',
                value: 'var(----border-bottom-width)',
                description: 'The border bottom width of the collapsible component header'
            },
            {
                name: 'header--border-left-width',
                type: '',
                value: 'var(----border-left-width)',
                description: 'The border left width of the collapsible component header'
            },
            {
                name: 'header--border-width',
                type: '',
                value: 'var(----header--border-top-width) var(----header--border-right-width) var(----header--border-bottom-width) var(----header--border-left-width)',
                description: 'The border width of the collapsible component header'
            },
            {
                name: 'header--color',
                type: '',
                value: 'var(----color)',
                description: 'The color of the collapsible component header'
            },
            {
                name: 'header--padding-top',
                type: 'size',
                value: 'var(----padding-top)',
                description: 'The padding top of the collapsible component header'
            },
            {
                name: 'header--padding-right',
                type: 'size',
                value: 'var(----padding-right)',
                description: 'The padding right of the collapsible component header'
            },
            {
                name: 'header--padding-bottom',
                type: 'size',
                value: 'var(----padding-bottom)',
                description: 'The padding bottom of the collapsible component header'
            },
            {
                name: 'header--padding-left',
                type: 'size',
                value: 'var(----padding-left)',
                description: 'The padding left of the collapsible component header'
            },
            {
                name: 'header--padding',
                type: '',
                value: 'var(----header--padding-top) var(----header--padding-right) var(----header--padding-bottom) var(----header--padding-left)',
                description: 'The padding of the collapsible component header'
            },
            {
                name: 'body--background',
                type: 'color',
                value: 'color(\'white\')',
                description: 'The background of the collapsible component body'
            },
            {
                name: 'body--border-color',
                type: '',
                value: 'var(----border-color)',
                description: 'The border color of the collapsible component body'
            },
            {
                name: 'body--border-style',
                type: '',
                value: 'var(----border-style)',
                description: 'The border style of the collapsible component body'
            },
            {
                name: 'body--border-top-width',
                type: '',
                value: '0',
                description: 'The border top width of the collapsible component body'
            },
            {
                name: 'body--border-right-width',
                type: '',
                value: 'var(----border-right-width)',
                description: 'The border right width of the collapsible component body'
            },
            {
                name: 'body--border-bottom-width',
                type: '',
                value: 'var(----border-bottom-width)',
                description: 'The border bottom width of the collapsible component body'
            },
            {
                name: 'body--border-left-width',
                type: '',
                value: 'var(----border-left-width)',
                description: 'The border left width of the collapsible component body'
            },
            {
                name: 'body--border-width',
                type: '',
                value: 'var(----body--border-top-width) var(----body--border-right-width) var(----body--border-bottom-width) var(----body--border-left-width)',
                description: 'The border width of the collapsible component body'
            },
            {
                name: 'body--color',
                type: '',
                value: 'var(----color)',
                description: 'The color of the collapsible component body'
            },
            {
                name: 'body--padding-top',
                type: 'size',
                value: 'var(----padding-top)',
                description: 'The padding top of the collapsible component body'
            },
            {
                name: 'body--padding-right',
                type: 'size',
                value: 'var(----padding-right)',
                description: 'The padding right of the collapsible component body'
            },
            {
                name: 'body--padding-bottom',
                type: 'size',
                value: 'var(----padding-bottom)',
                description: 'The padding bottom of the collapsible component body'
            },
            {
                name: 'body--padding-left',
                type: 'size',
                value: 'var(----padding-left)',
                description: 'The padding left of the collapsible component body'
            },
            {
                name: 'body--padding',
                type: '',
                value: 'var(----body--padding-top) var(----body--padding-right) var(----body--padding-bottom) var(----body--padding-left)',
                description: 'The padding of the collapsible component body'
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
                        description: 'The background of the collapsible component, for the light color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'light-60\')',
                        description: 'The border top color of the collapsible component, for the light color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'light-60\')',
                        description: 'The border right color of the collapsible component, for the light color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'light-60\')',
                        description: 'The border bottom color of the collapsible component, for the light color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'light-60\')',
                        description: 'The border left color of the collapsible component, for the light color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-light)',
                        description: 'The color of the collapsible component, for the light color variant'
                    },
                    {
                        name: 'body--background',
                        type: '',
                        value: 'color(\'white\')',
                        description: 'The background of the collapsible component body, for the light color variant'
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
                        description: 'The background of the collapsible component, for the dark color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'dark-40\')',
                        description: 'The border top color of the collapsible component, for the dark color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'dark-40\')',
                        description: 'The border right color of the collapsible component, for the dark color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'dark-40\')',
                        description: 'The border bottom color of the collapsible component, for the dark color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'dark-40\')',
                        description: 'The border left color of the collapsible component, for the dark color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-dark)',
                        description: 'The color of the collapsible component, for the dark color variant'
                    },
                    {
                        name: 'body--background',
                        type: '',
                        value: 'color(\'dark-45\')',
                        description: 'The background of the collapsible component body, for the dark color variant'
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
                        description: 'The border top left radius of the collapsible component, for the sm size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border top right radius of the collapsible component, for the sm size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border bottom right radius of the collapsible component, for the sm size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border bottom left radius of the collapsible component, for the sm size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'sm\')})',
                        description: 'The font size of the collapsible component, for the sm size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{var(--padding-top)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding top of the collapsible component, for the sm size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding right of the collapsible component, for the sm size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{var(--padding-bottom)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding bottom of the collapsible component, for the sm size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding left of the collapsible component, for the sm size variant'
                    },
                    {
                        name: 'header--padding-top',
                        type: '',
                        value: 'calc(#{var(----padding-top)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding top of the collapsible component header, for the sm size variant'
                    },
                    {
                        name: 'header--padding-right',
                        type: '',
                        value: 'calc(#{var(----padding-right)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding right of the collapsible component header, for the sm size variant'
                    },
                    {
                        name: 'header--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding bottom of the collapsible component header, for the sm size variant'
                    },
                    {
                        name: 'header--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding left of the collapsible component header, for the sm size variant'
                    },
                    {
                        name: 'body--padding-top',
                        type: '',
                        value: 'calc(#{var(----padding-top)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding top of the collapsible component body, for the sm size variant'
                    },
                    {
                        name: 'body--padding-right',
                        type: '',
                        value: 'calc(#{var(----padding-right)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding right of the collapsible component body, for the sm size variant'
                    },
                    {
                        name: 'body--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding bottom of the collapsible component body, for the sm size variant'
                    },
                    {
                        name: 'body--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding left of the collapsible component body, for the sm size variant'
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
                        description: 'The border top left radius of the collapsible component, for the md size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border top right radius of the collapsible component, for the md size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border bottom right radius of the collapsible component, for the md size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border bottom left radius of the collapsible component, for the md size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'md\')})',
                        description: 'The font size of the collapsible component, for the md size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{var(--padding-top)} * #{size-multiplier(\'md\')})',
                        description: 'The padding top of the collapsible component, for the md size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'md\')})',
                        description: 'The padding right of the collapsible component, for the md size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{var(--padding-bottom)} * #{size-multiplier(\'md\')})',
                        description: 'The padding bottom of the collapsible component, for the md size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'md\')})',
                        description: 'The padding left of the collapsible component, for the md size variant'
                    },
                    {
                        name: 'header--padding-top',
                        type: '',
                        value: 'calc(#{var(----padding-top)} * #{size-multiplier(\'md\')})',
                        description: 'The padding top of the collapsible component header, for the md size variant'
                    },
                    {
                        name: 'header--padding-right',
                        type: '',
                        value: 'calc(#{var(----padding-right)} * #{size-multiplier(\'md\')})',
                        description: 'The padding right of the collapsible component header, for the md size variant'
                    },
                    {
                        name: 'header--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'md\')})',
                        description: 'The padding bottom of the collapsible component header, for the md size variant'
                    },
                    {
                        name: 'header--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'md\')})',
                        description: 'The padding left of the collapsible component header, for the md size variant'
                    },
                    {
                        name: 'body--padding-top',
                        type: '',
                        value: 'calc(#{var(----padding-top)} * #{size-multiplier(\'md\')})',
                        description: 'The padding top of the collapsible component body, for the md size variant'
                    },
                    {
                        name: 'body--padding-right',
                        type: '',
                        value: 'calc(#{var(----padding-right)} * #{size-multiplier(\'md\')})',
                        description: 'The padding right of the collapsible component body, for the md size variant'
                    },
                    {
                        name: 'body--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'md\')})',
                        description: 'The padding bottom of the collapsible component body, for the md size variant'
                    },
                    {
                        name: 'body--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'md\')})',
                        description: 'The padding left of the collapsible component body, for the md size variant'
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
                        description: 'The border top left radius of the collapsible component, for the lg size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border top right radius of the collapsible component, for the lg size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border bottom right radius of the collapsible component, for the lg size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border bottom left radius of the collapsible component, for the lg size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'lg\')})',
                        description: 'The font size of the collapsible component, for the lg size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{var(--padding-top)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding top of the collapsible component, for the lg size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding right of the collapsible component, for the lg size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{var(--padding-bottom)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding bottom of the collapsible component, for the lg size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding left of the collapsible component, for the lg size variant'
                    },
                    {
                        name: 'header--padding-top',
                        type: '',
                        value: 'calc(#{var(----padding-top)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding top of the collapsible component header, for the lg size variant'
                    },
                    {
                        name: 'header--padding-right',
                        type: '',
                        value: 'calc(#{var(----padding-right)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding right of the collapsible component header, for the lg size variant'
                    },
                    {
                        name: 'header--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding bottom of the collapsible component header, for the lg size variant'
                    },
                    {
                        name: 'header--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding left of the collapsible component header, for the lg size variant'
                    },
                    {
                        name: 'body--padding-top',
                        type: '',
                        value: 'calc(#{var(----padding-top)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding top of the collapsible component body, for the lg size variant'
                    },
                    {
                        name: 'body--padding-right',
                        type: '',
                        value: 'calc(#{var(----padding-right)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding right of the collapsible component body, for the lg size variant'
                    },
                    {
                        name: 'body--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding bottom of the collapsible component body, for the lg size variant'
                    },
                    {
                        name: 'body--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding left of the collapsible component body, for the lg size variant'
                    }
                ]
            }
        ]
    }
};

export default manifest;
