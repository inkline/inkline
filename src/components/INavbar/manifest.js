export const manifest = {
    name: 'navbar',
    slots: [
        {
            description: 'Slot for default navbar content',
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
            name: 'collapseOnItemClick',
            type: [
                'Boolean'
            ],
            default: 'true',
            description: 'Determines if the navbar should close when clicking a navbar item'
        },
        {
            name: 'collapseOnClickOutside',
            type: [
                'Boolean'
            ],
            default: 'true',
            description: 'Determines if the navbar should close when clicking outside'
        },
        {
            name: 'color',
            type: [
                'light',
                'dark'
            ],
            default: 'light',
            description: 'The color variant of the navbar'
        },
        {
            name: 'fluid',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the inner container as fluid, spanning 100% width'
        },
        {
            name: 'size',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md',
            description: 'The size variant of the navbar'
        },
        {
            name: 'menuAnimation',
            type: [
                'close',
                'arrow-up',
                'arrow-down',
                'arrow-left',
                'arrow-right',
                'plus',
                'minus'
            ],
            default: 'close',
            description: 'The animation of the hamburger menu component used for collapsing'
        }
    ],
    css: {
        selector: '.navbar',
        defaults: {
            size: 'md',
            color: 'light'
        },
        variables: [
            {
                name: 'background',
                type: 'color',
                value: 'color(\'light\')',
                description: 'The background of the navbar component'
            },
            {
                name: 'border-top-color',
                type: 'color',
                value: 'color(\'light-60\')',
                description: 'The border top color of the navbar component'
            },
            {
                name: 'border-right-color',
                type: 'color',
                value: 'color(\'light-60\')',
                description: 'The border right color of the navbar component'
            },
            {
                name: 'border-bottom-color',
                type: 'color',
                value: 'color(\'light-60\')',
                description: 'The border bottom color of the navbar component'
            },
            {
                name: 'border-left-color',
                type: 'color',
                value: 'color(\'light-60\')',
                description: 'The border left color of the navbar component'
            },
            {
                name: 'border-color',
                type: '',
                value: 'var(----border-top-color) var(----border-right-color) var(----border-bottom-color) var(----border-left-color)',
                description: 'The border color of the navbar component'
            },
            {
                name: 'border-style',
                type: '',
                value: 'var(--border-style)',
                description: 'The border style of the navbar component'
            },
            {
                name: 'border-top-width',
                type: '',
                value: 'var(--border-top-width)',
                description: 'The border top width of the navbar component'
            },
            {
                name: 'border-right-width',
                type: '',
                value: 'var(--border-right-width)',
                description: 'The border right width of the navbar component'
            },
            {
                name: 'border-bottom-width',
                type: '',
                value: 'var(--border-bottom-width)',
                description: 'The border bottom width of the navbar component'
            },
            {
                name: 'border-left-width',
                type: '',
                value: 'var(--border-left-width)',
                description: 'The border left width of the navbar component'
            },
            {
                name: 'border-width',
                type: '',
                value: 'var(----border-top-width) var(----border-right-width) var(----border-bottom-width) var(----border-left-width)',
                description: 'The border width of the navbar component'
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                value: 'var(--border-top-left-radius)',
                description: 'The border top left radius of the navbar component'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                value: 'var(--border-top-right-radius)',
                description: 'The border top right radius of the navbar component'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                value: 'var(--border-bottom-right-radius)',
                description: 'The border bottom right radius of the navbar component'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                value: 'var(--border-bottom-left-radius)',
                description: 'The border bottom left radius of the navbar component'
            },
            {
                name: 'border-radius',
                type: '',
                value: 'var(----border-top-left-radius) var(----border-top-right-radius) var(----border-bottom-right-radius) var(----border-bottom-left-radius)',
                description: 'The border radius of the navbar component'
            },
            {
                name: 'box-shadow-offset-x',
                type: '',
                value: 'var(--box-shadow-offset-x)',
                description: 'The box shadow horizontal offset of the navbar component'
            },
            {
                name: 'box-shadow-offset-y',
                type: '',
                value: 'var(--box-shadow-offset-y)',
                description: 'The box shadow vertical offset of the navbar component'
            },
            {
                name: 'box-shadow-blur-radius',
                type: '',
                value: 'var(--box-shadow-blur-radius)',
                description: 'The box shadow blur radius of the navbar component'
            },
            {
                name: 'box-shadow-spread-radius',
                type: '',
                value: 'var(--box-shadow-spread-radius)',
                description: 'The box shadow spread radius of the navbar component'
            },
            {
                name: 'box-shadow-color',
                type: '',
                value: 'var(--box-shadow-color)',
                description: 'The box shadow spread radius of the navbar component'
            },
            {
                name: 'box-shadow',
                type: '',
                value: 'var(----box-shadow-offset-x) var(----box-shadow-offset-y) var(----box-shadow-blur-radius) var(----box-shadow-spread-radius) var(----box-shadow-color)',
                description: 'The box shadow of the navbar component'
            },
            {
                name: 'font-size',
                type: 'size',
                value: 'font-size()',
                description: 'The font size of the navbar component'
            },
            {
                name: 'padding-top',
                type: 'size',
                value: 'var(--padding-top)',
                description: 'The padding top of the navbar component'
            },
            {
                name: 'padding-right',
                type: '',
                value: '0',
                description: 'The padding right of the navbar component'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                value: 'var(--padding-bottom)',
                description: 'The padding bottom of the navbar component'
            },
            {
                name: 'padding-left',
                type: '',
                value: '0',
                description: 'The padding left of the navbar component'
            },
            {
                name: 'padding',
                type: '',
                value: 'var(----padding-top) var(----padding-right) var(----padding-bottom) var(----padding-left)',
                description: 'The padding of the navbar component'
            },
            {
                name: 'color',
                type: 'color',
                value: 'contrast-color($color-light)',
                description: 'The color of the navbar component'
            },
            {
                name: 'item--background',
                type: 'color',
                value: 'color(\'light\')',
                description: 'The background of the navbar component item'
            },
            {
                name: 'item--background--hover',
                type: 'color',
                value: 'color(\'light-55\')',
                description: 'The background of the navbar component item when hovered or focused'
            },
            {
                name: 'item--color',
                type: '',
                value: 'var(----color)',
                description: 'The color of the navbar component item'
            },
            {
                name: 'item--color--hover',
                type: '',
                value: 'var(----color)',
                description: 'The color of the navbar component item when hovered'
            },
            {
                name: 'item--padding-top',
                type: 'size',
                value: 'calc(var(--padding-top) / 2)',
                description: 'The padding top of the navbar component'
            },
            {
                name: 'item--padding-right',
                type: 'size',
                value: 'var(--padding-right)',
                description: 'The padding right of the navbar component'
            },
            {
                name: 'item--padding-bottom',
                type: 'size',
                value: 'calc(var(--padding-bottom) / 2)',
                description: 'The padding bottom of the navbar component'
            },
            {
                name: 'item--padding-left',
                type: 'size',
                value: 'var(--padding-left)',
                description: 'The padding left of the navbar component'
            },
            {
                name: 'item--padding',
                type: '',
                value: 'var(----item--padding-top) var(----item--padding-right) var(----item--padding-bottom) var(----item--padding-left)',
                description: 'The padding of the navbar component'
            },
            {
                name: 'collapsed--background',
                type: 'color',
                value: 'color(\'light\')',
                description: 'The background of the collapsed navbar component'
            },
            {
                name: 'collapsed--item--color',
                type: '',
                value: 'var(----color)',
                description: 'The color of the collapsed navbar component item'
            },
            {
                name: 'collapsed--item--color--hover',
                type: '',
                value: 'var(----color)',
                description: 'The color of the collapsed navbar component item when hovered'
            },
            {
                name: 'collapsed--item--background',
                type: '',
                value: 'var(----item--background)',
                description: 'The background of the collapsed navbar component item'
            },
            {
                name: 'collapsed--item--background--hover',
                type: '',
                value: 'var(----item--background--hover)',
                description: 'The background of the collapsed navbar component item when hovered or focused'
            },
            {
                name: 'brand--margin-right',
                type: '',
                value: 'var(--margin-right)',
                description: 'The margin right of the navbar component brand'
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
                        description: 'The background of the navbar component, for the light color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'light-60\')',
                        description: 'The border top color of the navbar component, for the light color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'light-60\')',
                        description: 'The border right color of the navbar component, for the light color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'light-60\')',
                        description: 'The border bottom color of the navbar component, for the light color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'light-60\')',
                        description: 'The border left color of the navbar component, for the light color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-light)',
                        description: 'The color of the navbar component, for the light color variant'
                    },
                    {
                        name: 'item--background',
                        type: '',
                        value: 'color(\'light\')',
                        description: 'The background of the navbar component item, for the light color variant'
                    },
                    {
                        name: 'item--background--hover',
                        type: '',
                        value: 'color(\'light-55\')',
                        description: 'The background of the navbar component item when hovered or focused, for the light color variant'
                    },
                    {
                        name: 'collapsed--background',
                        type: '',
                        value: 'color(\'light\')',
                        description: 'The background of the collapsed navbar component, for the light color variant'
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
                        description: 'The background of the navbar component, for the dark color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'dark-40\')',
                        description: 'The border top color of the navbar component, for the dark color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'dark-40\')',
                        description: 'The border right color of the navbar component, for the dark color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'dark-40\')',
                        description: 'The border bottom color of the navbar component, for the dark color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'dark-40\')',
                        description: 'The border left color of the navbar component, for the dark color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-dark)',
                        description: 'The color of the navbar component, for the dark color variant'
                    },
                    {
                        name: 'item--background',
                        type: '',
                        value: 'color(\'dark\')',
                        description: 'The background of the navbar component item, for the dark color variant'
                    },
                    {
                        name: 'item--background--hover',
                        type: '',
                        value: 'color(\'dark-45\')',
                        description: 'The background of the navbar component item when hovered or focused, for the dark color variant'
                    },
                    {
                        name: 'collapsed--background',
                        type: '',
                        value: 'color(\'dark\')',
                        description: 'The background of the collapsed navbar component, for the dark color variant'
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
                        description: 'The border top left radius of the navbar component, for the sm size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border top right radius of the navbar component, for the sm size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border bottom right radius of the navbar component, for the sm size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border bottom left radius of the navbar component, for the sm size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'sm\')})',
                        description: 'The font size of the navbar component, for the sm size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{var(--padding-top)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding top of the navbar component, for the sm size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{var(--padding-bottom)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding bottom of the navbar component, for the sm size variant'
                    },
                    {
                        name: 'item--padding-top',
                        type: '',
                        value: 'calc(#{calc(var(--padding-top) / 2)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding top of the navbar component, for the sm size variant'
                    },
                    {
                        name: 'item--padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding right of the navbar component, for the sm size variant'
                    },
                    {
                        name: 'item--padding-bottom',
                        type: '',
                        value: 'calc(#{calc(var(--padding-bottom) / 2)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding bottom of the navbar component, for the sm size variant'
                    },
                    {
                        name: 'item--padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding left of the navbar component, for the sm size variant'
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
                        description: 'The border top left radius of the navbar component, for the md size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border top right radius of the navbar component, for the md size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border bottom right radius of the navbar component, for the md size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border bottom left radius of the navbar component, for the md size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'md\')})',
                        description: 'The font size of the navbar component, for the md size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{var(--padding-top)} * #{size-multiplier(\'md\')})',
                        description: 'The padding top of the navbar component, for the md size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{var(--padding-bottom)} * #{size-multiplier(\'md\')})',
                        description: 'The padding bottom of the navbar component, for the md size variant'
                    },
                    {
                        name: 'item--padding-top',
                        type: '',
                        value: 'calc(#{calc(var(--padding-top) / 2)} * #{size-multiplier(\'md\')})',
                        description: 'The padding top of the navbar component, for the md size variant'
                    },
                    {
                        name: 'item--padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'md\')})',
                        description: 'The padding right of the navbar component, for the md size variant'
                    },
                    {
                        name: 'item--padding-bottom',
                        type: '',
                        value: 'calc(#{calc(var(--padding-bottom) / 2)} * #{size-multiplier(\'md\')})',
                        description: 'The padding bottom of the navbar component, for the md size variant'
                    },
                    {
                        name: 'item--padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'md\')})',
                        description: 'The padding left of the navbar component, for the md size variant'
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
                        description: 'The border top left radius of the navbar component, for the lg size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border top right radius of the navbar component, for the lg size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border bottom right radius of the navbar component, for the lg size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border bottom left radius of the navbar component, for the lg size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'lg\')})',
                        description: 'The font size of the navbar component, for the lg size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{var(--padding-top)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding top of the navbar component, for the lg size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{var(--padding-bottom)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding bottom of the navbar component, for the lg size variant'
                    },
                    {
                        name: 'item--padding-top',
                        type: '',
                        value: 'calc(#{calc(var(--padding-top) / 2)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding top of the navbar component, for the lg size variant'
                    },
                    {
                        name: 'item--padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding right of the navbar component, for the lg size variant'
                    },
                    {
                        name: 'item--padding-bottom',
                        type: '',
                        value: 'calc(#{calc(var(--padding-bottom) / 2)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding bottom of the navbar component, for the lg size variant'
                    },
                    {
                        name: 'item--padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding left of the navbar component, for the lg size variant'
                    }
                ]
            }
        ]
    }
};

export default manifest;
