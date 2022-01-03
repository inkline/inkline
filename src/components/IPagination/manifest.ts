export const manifest = {
    name: 'pagination',
    slots: [
        {
            description: 'Slot for previous button content',
            name: 'previous'
        },
        {
            description: 'Slot for next button content',
            name: 'next'
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
            name: 'ariaLabel',
            type: [
                'String'
            ],
            default: 'Pagination',
            description: 'The aria-label of the pagination'
        },
        {
            name: 'color',
            type: [
                'light',
                'dark'
            ],
            default: 'light',
            description: 'The color variant of the pagination'
        },
        {
            name: 'itemsPerPage',
            type: [
                'Number'
            ],
            default: '20',
            description: 'The number of items per page to be displayed'
        },
        {
            name: 'itemsTotal',
            type: [
                'Number'
            ],
            default: '0',
            description: 'The total number of items'
        },
        {
            name: 'limit',
            type: [
                'Number',
                'Object'
            ],
            default: '',
            description: 'The maximum number of pagination buttons to show on each breakpoint'
        },
        {
            name: 'quickLink',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the quick link buttons'
        },
        {
            name: 'modelValue',
            type: [
                'Number'
            ],
            default: '1',
            description: 'Used to determine the current page'
        },
        {
            name: 'size',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md',
            description: 'The size variant of the pagination'
        }
    ],
    css: {
        selector: '.pagination',
        defaults: {
            size: 'md',
            color: 'light'
        },
        variables: [
            {
                name: 'background',
                type: 'color',
                value: 'color(\'light\')',
                description: 'The background of the pagination component item'
            },
            {
                name: 'background--hover',
                type: 'color',
                value: 'color(\'light-55\')',
                description: 'The background of the pagination component item when hovered or focused'
            },
            {
                name: 'background--active',
                type: 'color',
                value: 'color(\'primary\')',
                description: 'The background of the pagination component item when active'
            },
            {
                name: 'border-top-color',
                type: 'color',
                value: 'color(\'light-55\')',
                description: 'The border top color of the pagination component item'
            },
            {
                name: 'border-right-color',
                type: 'color',
                value: 'color(\'light-55\')',
                description: 'The border right color of the pagination component item'
            },
            {
                name: 'border-bottom-color',
                type: 'color',
                value: 'color(\'light-55\')',
                description: 'The border bottom color of the pagination component item'
            },
            {
                name: 'border-left-color',
                type: 'color',
                value: 'color(\'light-55\')',
                description: 'The border left color of the pagination component item'
            },
            {
                name: 'border-color',
                type: '',
                value: 'var(----border-top-color) var(----border-right-color) var(----border-bottom-color) var(----border-left-color)',
                description: 'The border color of the pagination component item'
            },
            {
                name: 'border-color--active',
                type: 'color',
                value: 'color(\'primary-55\')',
                description: 'The border color of the pagination component item when active'
            },
            {
                name: 'border-style',
                type: '',
                value: 'var(--border-style)',
                description: 'The border style of the pagination component'
            },
            {
                name: 'border-top-width',
                type: '',
                value: 'var(--border-top-width)',
                description: 'The border top width of the pagination component'
            },
            {
                name: 'border-right-width',
                type: '',
                value: 'var(--border-right-width)',
                description: 'The border right width of the pagination component'
            },
            {
                name: 'border-bottom-width',
                type: '',
                value: 'var(--border-bottom-width)',
                description: 'The border bottom width of the pagination component'
            },
            {
                name: 'border-left-width',
                type: '',
                value: 'var(--border-left-width)',
                description: 'The border left width of the pagination component'
            },
            {
                name: 'border-width',
                type: '',
                value: 'var(----border-top-width) var(----border-right-width) var(----border-bottom-width) var(----border-left-width)',
                description: 'The border width of the pagination component'
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                value: 'var(--border-top-left-radius)',
                description: 'The border top left radius of the pagination component'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                value: 'var(--border-top-right-radius)',
                description: 'The border top right radius of the pagination component'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                value: 'var(--border-bottom-right-radius)',
                description: 'The border bottom right radius of the pagination component'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                value: 'var(--border-bottom-left-radius)',
                description: 'The border bottom left radius of the pagination component'
            },
            {
                name: 'border-radius',
                type: '',
                value: 'var(----border-top-left-radius) var(----border-top-right-radius) var(----border-bottom-right-radius) var(----border-bottom-left-radius)',
                description: 'The border radius of the pagination component'
            },
            {
                name: 'box-shadow-offset-x',
                type: '',
                value: 'var(--box-shadow-offset-x)',
                description: 'The box shadow horizontal offset of the pagination component'
            },
            {
                name: 'box-shadow-offset-y',
                type: '',
                value: 'var(--box-shadow-offset-y)',
                description: 'The box shadow vertical offset of the pagination component'
            },
            {
                name: 'box-shadow-blur-radius',
                type: '',
                value: 'var(--box-shadow-blur-radius)',
                description: 'The box shadow blur radius of the pagination component'
            },
            {
                name: 'box-shadow-spread-radius',
                type: '',
                value: 'var(--box-shadow-spread-radius)',
                description: 'The box shadow spread radius of the pagination component'
            },
            {
                name: 'box-shadow-color',
                type: '',
                value: 'var(--box-shadow-color)',
                description: 'The box shadow spread radius of the pagination component'
            },
            {
                name: 'box-shadow',
                type: '',
                value: 'var(----box-shadow-offset-x) var(----box-shadow-offset-y) var(----box-shadow-blur-radius) var(----box-shadow-spread-radius) var(----box-shadow-color)',
                description: 'The box shadow of the pagination component'
            },
            {
                name: 'color',
                type: 'color',
                value: 'contrast-color($color-light)',
                description: 'The border color of the pagination component item when active'
            },
            {
                name: 'color--active',
                type: 'color',
                value: 'contrast-color($color-primary)',
                description: 'The border color of the pagination component item when active'
            },
            {
                name: 'font-size',
                type: 'size',
                value: 'font-size()',
                description: 'The font size of the pagination component'
            },
            {
                name: 'margin-top',
                type: '',
                value: '0',
                description: 'The margin top of the pagination component'
            },
            {
                name: 'margin-right',
                type: 'size',
                value: 'calc(var(--margin-right) / 4)',
                description: 'The margin right of the pagination component'
            },
            {
                name: 'margin-bottom',
                type: '',
                value: '0',
                description: 'The margin bottom of the pagination component'
            },
            {
                name: 'margin-left',
                type: 'size',
                value: 'calc(var(--margin-left) / 4)',
                description: 'The margin left of the pagination component'
            },
            {
                name: 'margin',
                type: '',
                value: 'var(----margin-top) var(----margin-right) var(----margin-bottom) var(----margin-left)',
                description: 'The margin of the pagination component'
            },
            {
                name: 'min-width',
                type: 'size',
                value: '40px',
                description: 'The minimum width of the pagination component items'
            },
            {
                name: 'opacity--disabled',
                type: '',
                value: '0.85',
                description: 'The opacity of the pagination component when disabled'
            },
            {
                name: 'padding-top',
                type: '',
                value: 'calc(var(--padding-top) / 2)',
                description: 'The padding top of the pagination component'
            },
            {
                name: 'padding-right',
                type: 'size',
                value: 'calc(var(--padding-right) / 2)',
                description: 'The padding right of the pagination component'
            },
            {
                name: 'padding-bottom',
                type: '',
                value: 'calc(var(--padding-bottom) / 2)',
                description: 'The padding bottom of the pagination component'
            },
            {
                name: 'padding-left',
                type: 'size',
                value: 'calc(var(--padding-left) / 2)',
                description: 'The padding left of the pagination component'
            },
            {
                name: 'padding',
                type: '',
                value: 'var(----padding-top) var(----padding-right) var(----padding-bottom) var(----padding-left)',
                description: 'The padding of the pagination component'
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
                        description: 'The background of the pagination component item, for the light color variant'
                    },
                    {
                        name: 'background--hover',
                        type: '',
                        value: 'color(\'light-55\')',
                        description: 'The background of the pagination component item when hovered or focused, for the light color variant'
                    },
                    {
                        name: 'background--active',
                        type: '',
                        value: 'color(\'primary\')',
                        description: 'The background of the pagination component item when active, for the light color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'light-55\')',
                        description: 'The border top color of the pagination component item, for the light color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'light-55\')',
                        description: 'The border right color of the pagination component item, for the light color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'light-55\')',
                        description: 'The border bottom color of the pagination component item, for the light color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'light-55\')',
                        description: 'The border left color of the pagination component item, for the light color variant'
                    },
                    {
                        name: 'border-color--active',
                        type: '',
                        value: 'color(\'primary-55\')',
                        description: 'The border color of the pagination component item when active, for the light color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-light)',
                        description: 'The border color of the pagination component item when active, for the light color variant'
                    },
                    {
                        name: 'color--active',
                        type: '',
                        value: 'contrast-color($color-primary)',
                        description: 'The border color of the pagination component item when active, for the light color variant'
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
                        description: 'The background of the pagination component item, for the dark color variant'
                    },
                    {
                        name: 'background--hover',
                        type: '',
                        value: 'color(\'dark-45\')',
                        description: 'The background of the pagination component item when hovered or focused, for the dark color variant'
                    },
                    {
                        name: 'background--active',
                        type: '',
                        value: 'color(\'primary\')',
                        description: 'The background of the pagination component item when active, for the dark color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'dark-45\')',
                        description: 'The border top color of the pagination component item, for the dark color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'dark-45\')',
                        description: 'The border right color of the pagination component item, for the dark color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'dark-45\')',
                        description: 'The border bottom color of the pagination component item, for the dark color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'dark-45\')',
                        description: 'The border left color of the pagination component item, for the dark color variant'
                    },
                    {
                        name: 'border-color--active',
                        type: '',
                        value: 'color(\'primary-55\')',
                        description: 'The border color of the pagination component item when active, for the dark color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-dark)',
                        description: 'The border color of the pagination component item when active, for the dark color variant'
                    },
                    {
                        name: 'color--active',
                        type: '',
                        value: 'contrast-color($color-primary)',
                        description: 'The border color of the pagination component item when active, for the dark color variant'
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
                        description: 'The border top left radius of the pagination component, for the sm size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border top right radius of the pagination component, for the sm size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border bottom right radius of the pagination component, for the sm size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border bottom left radius of the pagination component, for the sm size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'sm\')})',
                        description: 'The font size of the pagination component, for the sm size variant'
                    },
                    {
                        name: 'margin-right',
                        type: '',
                        value: 'calc(#{calc(var(--margin-right) / 4)} * #{size-multiplier(\'sm\')})',
                        description: 'The margin right of the pagination component, for the sm size variant'
                    },
                    {
                        name: 'margin-left',
                        type: '',
                        value: 'calc(#{calc(var(--margin-left) / 4)} * #{size-multiplier(\'sm\')})',
                        description: 'The margin left of the pagination component, for the sm size variant'
                    },
                    {
                        name: 'min-width',
                        type: '',
                        value: 'calc(#{40px} * #{size-multiplier(\'sm\')})',
                        description: 'The minimum width of the pagination component items, for the sm size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{calc(var(--padding-right) / 2)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding right of the pagination component, for the sm size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{calc(var(--padding-left) / 2)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding left of the pagination component, for the sm size variant'
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
                        description: 'The border top left radius of the pagination component, for the md size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border top right radius of the pagination component, for the md size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border bottom right radius of the pagination component, for the md size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border bottom left radius of the pagination component, for the md size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'md\')})',
                        description: 'The font size of the pagination component, for the md size variant'
                    },
                    {
                        name: 'margin-right',
                        type: '',
                        value: 'calc(#{calc(var(--margin-right) / 4)} * #{size-multiplier(\'md\')})',
                        description: 'The margin right of the pagination component, for the md size variant'
                    },
                    {
                        name: 'margin-left',
                        type: '',
                        value: 'calc(#{calc(var(--margin-left) / 4)} * #{size-multiplier(\'md\')})',
                        description: 'The margin left of the pagination component, for the md size variant'
                    },
                    {
                        name: 'min-width',
                        type: '',
                        value: 'calc(#{40px} * #{size-multiplier(\'md\')})',
                        description: 'The minimum width of the pagination component items, for the md size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{calc(var(--padding-right) / 2)} * #{size-multiplier(\'md\')})',
                        description: 'The padding right of the pagination component, for the md size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{calc(var(--padding-left) / 2)} * #{size-multiplier(\'md\')})',
                        description: 'The padding left of the pagination component, for the md size variant'
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
                        description: 'The border top left radius of the pagination component, for the lg size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border top right radius of the pagination component, for the lg size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border bottom right radius of the pagination component, for the lg size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border bottom left radius of the pagination component, for the lg size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'lg\')})',
                        description: 'The font size of the pagination component, for the lg size variant'
                    },
                    {
                        name: 'margin-right',
                        type: '',
                        value: 'calc(#{calc(var(--margin-right) / 4)} * #{size-multiplier(\'lg\')})',
                        description: 'The margin right of the pagination component, for the lg size variant'
                    },
                    {
                        name: 'margin-left',
                        type: '',
                        value: 'calc(#{calc(var(--margin-left) / 4)} * #{size-multiplier(\'lg\')})',
                        description: 'The margin left of the pagination component, for the lg size variant'
                    },
                    {
                        name: 'min-width',
                        type: '',
                        value: 'calc(#{40px} * #{size-multiplier(\'lg\')})',
                        description: 'The minimum width of the pagination component items, for the lg size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{calc(var(--padding-right) / 2)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding right of the pagination component, for the lg size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{calc(var(--padding-left) / 2)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding left of the pagination component, for the lg size variant'
                    }
                ]
            }
        ]
    }
};

export default manifest;
