export const manifest = {
    name: 'tabs',
    slots: [
        {
            description: 'Slot for default tabs content',
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
            description: 'The color variant of the tabs'
        },
        {
            name: 'modelValue',
            type: [
                'String'
            ],
            default: '',
            description: 'Used to set the currently active tab'
        },
        {
            name: 'size',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md',
            description: 'The size variant of the tabs'
        },
        {
            name: 'stretch',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the tabs header as full width'
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
                type: 'color',
                value: 'color(\'white\')',
                description: 'The background of the tabs component'
            },
            {
                name: 'border-top-color',
                type: 'color',
                value: 'color(\'light\')',
                description: 'The border top color of the tabs component'
            },
            {
                name: 'border-right-color',
                type: 'color',
                value: 'color(\'light\')',
                description: 'The border right color of the tabs component'
            },
            {
                name: 'border-bottom-color',
                type: 'color',
                value: 'color(\'light\')',
                description: 'The border bottom color of the tabs component'
            },
            {
                name: 'border-left-color',
                type: 'color',
                value: 'color(\'light\')',
                description: 'The border left color of the tabs component'
            },
            {
                name: 'border-color',
                type: '',
                value: 'var(----border-top-color) var(----border-right-color) var(----border-bottom-color) var(----border-left-color)',
                description: 'The border color of the tabs component'
            },
            {
                name: 'border-style',
                type: '',
                value: 'var(--border-style)',
                description: 'The border style of the tabs component'
            },
            {
                name: 'border-top-width',
                type: '',
                value: 'var(--border-top-width)',
                description: 'The border top width of the tabs component'
            },
            {
                name: 'border-right-width',
                type: '',
                value: 'var(--border-right-width)',
                description: 'The border right width of the tabs component'
            },
            {
                name: 'border-bottom-width',
                type: '',
                value: 'var(--border-bottom-width)',
                description: 'The border bottom width of the tabs component'
            },
            {
                name: 'border-left-width',
                type: '',
                value: 'var(--border-left-width)',
                description: 'The border left width of the tabs component'
            },
            {
                name: 'border-width',
                type: '',
                value: 'var(----border-top-width) var(----border-right-width) var(----border-bottom-width) var(----border-left-width)',
                description: 'The border width of the tabs component'
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                value: 'var(--border-top-left-radius)',
                description: 'The border top left radius of the tabs component'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                value: 'var(--border-top-right-radius)',
                description: 'The border top right radius of the tabs component'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                value: 'var(--border-bottom-right-radius)',
                description: 'The border bottom right radius of the tabs component'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                value: 'var(--border-bottom-left-radius)',
                description: 'The border bottom left radius of the tabs component'
            },
            {
                name: 'border-radius',
                type: '',
                value: 'var(----border-top-left-radius) var(----border-top-right-radius) var(----border-bottom-right-radius) var(----border-bottom-left-radius)',
                description: 'The border radius of the tabs component'
            },
            {
                name: 'box-shadow-offset-x',
                type: '',
                value: 'var(--box-shadow-offset-x)',
                description: 'The box shadow horizontal offset of the tabs component'
            },
            {
                name: 'box-shadow-offset-y',
                type: '',
                value: 'var(--box-shadow-offset-y)',
                description: 'The box shadow vertical offset of the tabs component'
            },
            {
                name: 'box-shadow-blur-radius',
                type: '',
                value: 'var(--box-shadow-blur-radius)',
                description: 'The box shadow blur radius of the tabs component'
            },
            {
                name: 'box-shadow-spread-radius',
                type: '',
                value: 'var(--box-shadow-spread-radius)',
                description: 'The box shadow spread radius of the tabs component'
            },
            {
                name: 'box-shadow-color',
                type: '',
                value: 'var(--box-shadow-color)',
                description: 'The box shadow spread radius of the tabs component'
            },
            {
                name: 'box-shadow',
                type: '',
                value: 'var(----box-shadow-offset-x) var(----box-shadow-offset-y) var(----box-shadow-blur-radius) var(----box-shadow-spread-radius) var(----box-shadow-color)',
                description: 'The box shadow of the tabs component'
            },
            {
                name: 'color',
                type: 'color',
                value: 'contrast-color($color-white)',
                description: 'The color of the tabs component item'
            },
            {
                name: 'font-size',
                type: 'size',
                value: 'font-size()',
                description: 'The font size of the tabs component'
            },
            {
                name: 'padding-top',
                type: 'size',
                value: 'var(--padding-top)',
                description: 'The padding top of the tabs component'
            },
            {
                name: 'padding-right',
                type: 'size',
                value: 'var(--padding-right)',
                description: 'The padding right of the tabs component'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                value: 'var(--padding-bottom)',
                description: 'The padding bottom of the tabs component'
            },
            {
                name: 'padding-left',
                type: 'size',
                value: 'var(--padding-left)',
                description: 'The padding left of the tabs component'
            },
            {
                name: 'padding',
                type: '',
                value: 'var(----padding-top) var(----padding-right) var(----padding-bottom) var(----padding-left)',
                description: 'The padding of the tabs component'
            },
            {
                name: 'header--background',
                type: 'color',
                value: 'color(\'white\')',
                description: 'The background of the tabs component header'
            },
            {
                name: 'header--background--active',
                type: 'color',
                value: 'color(\'white\')',
                description: 'The background of the tabs component header when active'
            },
            {
                name: 'header--background--hover',
                type: 'color',
                value: 'color(\'gray-05\')',
                description: 'The background of the tabs component header when hovered or focused'
            },
            {
                name: 'header--border-color',
                type: 'color',
                value: 'transparent',
                description: 'The border color of the tabs component header'
            },
            {
                name: 'header--border-color--active',
                type: '',
                value: 'color(\'primary\')',
                description: 'The border color of the tabs component header when active'
            },
            {
                name: 'header--color--active',
                type: '',
                value: 'var(----color)',
                description: 'The color of the tabs component header when active'
            },
            {
                name: 'header--border-style',
                type: '',
                value: 'var(--border-style)',
                description: 'The border style of the tabs component header'
            },
            {
                name: 'header--border-top-width',
                type: '',
                value: '0',
                description: 'The border top width of the tabs component header'
            },
            {
                name: 'header--border-right-width',
                type: '',
                value: '0',
                description: 'The border right width of the tabs component header'
            },
            {
                name: 'header--border-bottom-width',
                type: '',
                value: '2px',
                description: 'The border bottom width of the tabs component header'
            },
            {
                name: 'header--border-left-width',
                type: '',
                value: '0',
                description: 'The border left width of the tabs component header'
            },
            {
                name: 'header--border-width',
                type: '',
                value: 'var(----header--border-top-width) var(----header--border-right-width) var(----header--border-bottom-width) var(----header--border-left-width)',
                description: 'The border width of the tabs component header'
            },
            {
                name: 'header--margin-bottom',
                type: '',
                value: '-1px',
                description: 'The bottom margin of the tabs component header'
            },
            {
                name: 'header--padding-top',
                type: '',
                value: 'var(----padding-top)',
                description: 'The padding top of the tabs component header'
            },
            {
                name: 'header--padding-right',
                type: '',
                value: 'var(----padding-right)',
                description: 'The padding right of the tabs component header'
            },
            {
                name: 'header--padding-bottom',
                type: 'size',
                value: 'var(----padding-bottom)',
                description: 'The padding bottom of the tabs component header'
            },
            {
                name: 'header--padding-left',
                type: 'size',
                value: 'var(----padding-left)',
                description: 'The padding left of the tabs component header'
            },
            {
                name: 'header--padding',
                type: '',
                value: 'var(----header--padding-top) var(----header--padding-right) var(----header--padding-bottom) var(----header--padding-left)',
                description: 'The padding of the tabs component header'
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
                        description: 'The background of the tabs component, for the light color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'light\')',
                        description: 'The border top color of the tabs component, for the light color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'light\')',
                        description: 'The border right color of the tabs component, for the light color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'light\')',
                        description: 'The border bottom color of the tabs component, for the light color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'light\')',
                        description: 'The border left color of the tabs component, for the light color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-white)',
                        description: 'The color of the tabs component item, for the light color variant'
                    },
                    {
                        name: 'header--background',
                        type: '',
                        value: 'color(\'white\')',
                        description: 'The background of the tabs component header, for the light color variant'
                    },
                    {
                        name: 'header--background--active',
                        type: '',
                        value: 'color(\'white\')',
                        description: 'The background of the tabs component header when active, for the light color variant'
                    },
                    {
                        name: 'header--background--hover',
                        type: '',
                        value: 'color(\'gray-05\')',
                        description: 'The background of the tabs component header when hovered or focused, for the light color variant'
                    },
                    {
                        name: 'header--border-color',
                        type: '',
                        value: 'transparent',
                        description: 'The border color of the tabs component header, for the light color variant'
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
                        description: 'The background of the tabs component, for the dark color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'dark-60\')',
                        description: 'The border top color of the tabs component, for the dark color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'dark-60\')',
                        description: 'The border right color of the tabs component, for the dark color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'dark-60\')',
                        description: 'The border bottom color of the tabs component, for the dark color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'dark-60\')',
                        description: 'The border left color of the tabs component, for the dark color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-dark)',
                        description: 'The color of the tabs component item, for the dark color variant'
                    },
                    {
                        name: 'header--background',
                        type: '',
                        value: 'color(\'dark\')',
                        description: 'The background of the tabs component header, for the dark color variant'
                    },
                    {
                        name: 'header--background--active',
                        type: '',
                        value: 'color(\'dark\')',
                        description: 'The background of the tabs component header when active, for the dark color variant'
                    },
                    {
                        name: 'header--background--hover',
                        type: '',
                        value: 'color(\'dark-45\')',
                        description: 'The background of the tabs component header when hovered or focused, for the dark color variant'
                    },
                    {
                        name: 'header--border-color',
                        type: '',
                        value: 'transparent',
                        description: 'The border color of the tabs component header, for the dark color variant'
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
                        description: 'The border top left radius of the tabs component, for the sm size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border top right radius of the tabs component, for the sm size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border bottom right radius of the tabs component, for the sm size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border bottom left radius of the tabs component, for the sm size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'sm\')})',
                        description: 'The font size of the tabs component, for the sm size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{var(--padding-top)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding top of the tabs component, for the sm size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding right of the tabs component, for the sm size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{var(--padding-bottom)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding bottom of the tabs component, for the sm size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding left of the tabs component, for the sm size variant'
                    },
                    {
                        name: 'header--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding bottom of the tabs component header, for the sm size variant'
                    },
                    {
                        name: 'header--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding left of the tabs component header, for the sm size variant'
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
                        description: 'The border top left radius of the tabs component, for the md size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border top right radius of the tabs component, for the md size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border bottom right radius of the tabs component, for the md size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border bottom left radius of the tabs component, for the md size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'md\')})',
                        description: 'The font size of the tabs component, for the md size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{var(--padding-top)} * #{size-multiplier(\'md\')})',
                        description: 'The padding top of the tabs component, for the md size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'md\')})',
                        description: 'The padding right of the tabs component, for the md size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{var(--padding-bottom)} * #{size-multiplier(\'md\')})',
                        description: 'The padding bottom of the tabs component, for the md size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'md\')})',
                        description: 'The padding left of the tabs component, for the md size variant'
                    },
                    {
                        name: 'header--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'md\')})',
                        description: 'The padding bottom of the tabs component header, for the md size variant'
                    },
                    {
                        name: 'header--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'md\')})',
                        description: 'The padding left of the tabs component header, for the md size variant'
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
                        description: 'The border top left radius of the tabs component, for the lg size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border top right radius of the tabs component, for the lg size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border bottom right radius of the tabs component, for the lg size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border bottom left radius of the tabs component, for the lg size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'lg\')})',
                        description: 'The font size of the tabs component, for the lg size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{var(--padding-top)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding top of the tabs component, for the lg size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding right of the tabs component, for the lg size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{var(--padding-bottom)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding bottom of the tabs component, for the lg size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding left of the tabs component, for the lg size variant'
                    },
                    {
                        name: 'header--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding bottom of the tabs component header, for the lg size variant'
                    },
                    {
                        name: 'header--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding left of the tabs component header, for the lg size variant'
                    }
                ]
            }
        ]
    }
};

export default manifest;
