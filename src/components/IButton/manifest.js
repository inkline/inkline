export const manifest = {
    name: 'button',
    slots: [
        {
            description: 'Slot for default button content',
            name: 'default'
        },
        {
            description: 'Slot for button loading state',
            name: 'loading'
        }
    ],
    props: [
        {
            name: 'active',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The active state of the button'
        },
        {
            name: 'block',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the button as a block, spanning the full container width'
        },
        {
            name: 'circle',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the button as a circle'
        },
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
                'danger',
                'facebook',
                'google',
                'twitter',
                'github'
            ],
            default: 'light',
            description: 'The color variant of the button'
        },
        {
            name: 'disabled',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The disabled state of the button'
        },
        {
            name: 'link',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the button as a link'
        },
        {
            name: 'loading',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The loading state of the button'
        },
        {
            name: 'outline',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the button as an outline button'
        },
        {
            name: 'tag',
            type: [
                'String'
            ],
            default: 'button',
            description: 'Set the HTML tag to be used for rendering the button'
        },
        {
            name: 'tabindex',
            type: [
                'Number',
                'String'
            ],
            default: '1',
            description: 'The tabindex of the button'
        },
        {
            name: 'size',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md',
            description: 'The size variant of the button'
        }
    ],
    css: {
        selector: '.button',
        defaults: {
            size: 'md',
            color: 'light'
        },
        variables: [
            {
                name: 'background',
                type: 'color',
                value: 'color(\'light\')',
                description: 'The background of the button component'
            },
            {
                name: 'background--hover',
                type: 'color',
                value: 'color(\'light-55\')',
                description: 'The background of the button component when hovered or focused'
            },
            {
                name: 'background--active',
                type: 'color',
                value: 'color(\'light-60\')',
                description: 'The background of the button component when active'
            },
            {
                name: 'border-top-color',
                type: 'color',
                value: 'color(\'light-55\')',
                description: 'The border top color of the button component'
            },
            {
                name: 'border-right-color',
                type: 'color',
                value: 'color(\'light-55\')',
                description: 'The border right color of the button component'
            },
            {
                name: 'border-bottom-color',
                type: 'color',
                value: 'color(\'light-55\')',
                description: 'The border bottom color of the button component'
            },
            {
                name: 'border-left-color',
                type: 'color',
                value: 'color(\'light-55\')',
                description: 'The border left color of the button component'
            },
            {
                name: 'border-color',
                type: '',
                value: 'var(----border-top-color) var(----border-right-color) var(----border-bottom-color) var(----border-left-color)',
                description: 'The border color of the button component'
            },
            {
                name: 'border-color--hover',
                type: '',
                value: 'var(----border-top-color) var(----border-right-color) var(----border-bottom-color) var(----border-left-color)',
                description: 'The border color of the button component when hovered or focused'
            },
            {
                name: 'border-style',
                type: '',
                value: 'var(--border-style)',
                description: 'The border style of the button component'
            },
            {
                name: 'border-top-width',
                type: '',
                value: 'var(--border-top-width)',
                description: 'The border top width of the button component'
            },
            {
                name: 'border-right-width',
                type: '',
                value: 'var(--border-right-width)',
                description: 'The border right width of the button component'
            },
            {
                name: 'border-bottom-width',
                type: '',
                value: 'var(--border-bottom-width)',
                description: 'The border bottom width of the button component'
            },
            {
                name: 'border-left-width',
                type: '',
                value: 'var(--border-left-width)',
                description: 'The border left width of the button component'
            },
            {
                name: 'border-width',
                type: '',
                value: 'var(----border-top-width) var(----border-right-width) var(----border-bottom-width) var(----border-left-width)',
                description: 'The border width of the button component'
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                value: 'var(--border-top-left-radius)',
                description: 'The border top left radius of the button component'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                value: 'var(--border-top-right-radius)',
                description: 'The border top right radius of the button component'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                value: 'var(--border-bottom-right-radius)',
                description: 'The border bottom right radius of the button component'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                value: 'var(--border-bottom-left-radius)',
                description: 'The border bottom left radius of the button component'
            },
            {
                name: 'border-radius',
                type: '',
                value: 'var(----border-top-left-radius) var(----border-top-right-radius) var(----border-bottom-right-radius) var(----border-bottom-left-radius)',
                description: 'The border radius of the button component'
            },
            {
                name: 'box-shadow-offset-x',
                type: '',
                value: 'var(--box-shadow-offset-x)',
                description: 'The box shadow horizontal offset of the button component'
            },
            {
                name: 'box-shadow-offset-y',
                type: '',
                value: 'var(--box-shadow-offset-y)',
                description: 'The box shadow vertical offset of the button component'
            },
            {
                name: 'box-shadow-blur-radius',
                type: '',
                value: 'var(--box-shadow-blur-radius)',
                description: 'The box shadow blur radius of the button component'
            },
            {
                name: 'box-shadow-spread-radius',
                type: '',
                value: 'var(--box-shadow-spread-radius)',
                description: 'The box shadow spread radius of the button component'
            },
            {
                name: 'box-shadow-color',
                type: '',
                value: 'var(--box-shadow-color)',
                description: 'The box shadow spread radius of the button component'
            },
            {
                name: 'box-shadow',
                type: '',
                value: 'var(----box-shadow-offset-x) var(----box-shadow-offset-y) var(----box-shadow-blur-radius) var(----box-shadow-spread-radius) var(----box-shadow-color)',
                description: 'The box shadow of the button component'
            },
            {
                name: 'color',
                type: 'color',
                value: 'contrast-color($color-light)',
                description: 'The color of the button component'
            },
            {
                name: 'font-size',
                type: 'size',
                value: 'font-size()',
                description: 'The font size of the button component'
            },
            {
                name: 'font-weight',
                type: '',
                value: 'font-weight(\'normal\')',
                description: 'The font weight of the button component'
            },
            {
                name: 'line-height',
                type: '',
                value: 'var(--line-height)',
                description: 'The line height of the button component'
            },
            {
                name: 'padding-top',
                type: 'size',
                value: 'calc(var(--padding-top) / 2)',
                description: 'The padding top of the button component'
            },
            {
                name: 'padding-right',
                type: 'size',
                value: 'var(--padding-right)',
                description: 'The padding right of the button component'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                value: 'calc(var(--padding-bottom) / 2)',
                description: 'The padding bottom of the button component'
            },
            {
                name: 'padding-left',
                type: 'size',
                value: 'var(--padding-left)',
                description: 'The padding left of the button component'
            },
            {
                name: 'padding',
                type: '',
                value: 'var(----padding-top) var(----padding-right) var(----padding-bottom) var(----padding-left)',
                description: 'The padding of the button component'
            },
            {
                name: 'block--margin',
                type: '',
                value: 'spacing()',
                description: 'The margin of the button component when block'
            },
            {
                name: 'circle--size',
                type: 'size',
                value: '42px',
                description: 'The size of the button component circle variant'
            },
            {
                name: 'link--color',
                type: 'color',
                value: 'color(\'light\')',
                description: 'The color of the button component link variant'
            },
            {
                name: 'link--color--active',
                type: 'color',
                value: 'color(\'light-55\')',
                description: 'The color of the button component link variant when active'
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
                        description: 'The background of the button component, for the primary color variant'
                    },
                    {
                        name: 'background--hover',
                        type: '',
                        value: 'color(\'primary-55\')',
                        description: 'The background of the button component when hovered or focused, for the primary color variant'
                    },
                    {
                        name: 'background--active',
                        type: '',
                        value: 'color(\'primary-60\')',
                        description: 'The background of the button component when active, for the primary color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'primary-55\')',
                        description: 'The border top color of the button component, for the primary color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'primary-55\')',
                        description: 'The border right color of the button component, for the primary color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'primary-55\')',
                        description: 'The border bottom color of the button component, for the primary color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'primary-55\')',
                        description: 'The border left color of the button component, for the primary color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-primary)',
                        description: 'The color of the button component, for the primary color variant'
                    },
                    {
                        name: 'link--color',
                        type: '',
                        value: 'color(\'primary\')',
                        description: 'The color of the button component link variant, for the primary color variant'
                    },
                    {
                        name: 'link--color--active',
                        type: '',
                        value: 'color(\'primary-55\')',
                        description: 'The color of the button component link variant when active, for the primary color variant'
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
                        description: 'The background of the button component, for the secondary color variant'
                    },
                    {
                        name: 'background--hover',
                        type: '',
                        value: 'color(\'secondary-55\')',
                        description: 'The background of the button component when hovered or focused, for the secondary color variant'
                    },
                    {
                        name: 'background--active',
                        type: '',
                        value: 'color(\'secondary-60\')',
                        description: 'The background of the button component when active, for the secondary color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'secondary-55\')',
                        description: 'The border top color of the button component, for the secondary color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'secondary-55\')',
                        description: 'The border right color of the button component, for the secondary color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'secondary-55\')',
                        description: 'The border bottom color of the button component, for the secondary color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'secondary-55\')',
                        description: 'The border left color of the button component, for the secondary color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-secondary)',
                        description: 'The color of the button component, for the secondary color variant'
                    },
                    {
                        name: 'link--color',
                        type: '',
                        value: 'color(\'secondary\')',
                        description: 'The color of the button component link variant, for the secondary color variant'
                    },
                    {
                        name: 'link--color--active',
                        type: '',
                        value: 'color(\'secondary-55\')',
                        description: 'The color of the button component link variant when active, for the secondary color variant'
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
                        description: 'The background of the button component, for the light color variant'
                    },
                    {
                        name: 'background--hover',
                        type: '',
                        value: 'color(\'light-55\')',
                        description: 'The background of the button component when hovered or focused, for the light color variant'
                    },
                    {
                        name: 'background--active',
                        type: '',
                        value: 'color(\'light-60\')',
                        description: 'The background of the button component when active, for the light color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'light-55\')',
                        description: 'The border top color of the button component, for the light color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'light-55\')',
                        description: 'The border right color of the button component, for the light color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'light-55\')',
                        description: 'The border bottom color of the button component, for the light color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'light-55\')',
                        description: 'The border left color of the button component, for the light color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-light)',
                        description: 'The color of the button component, for the light color variant'
                    },
                    {
                        name: 'link--color',
                        type: '',
                        value: 'color(\'light\')',
                        description: 'The color of the button component link variant, for the light color variant'
                    },
                    {
                        name: 'link--color--active',
                        type: '',
                        value: 'color(\'light-55\')',
                        description: 'The color of the button component link variant when active, for the light color variant'
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
                        description: 'The background of the button component, for the dark color variant'
                    },
                    {
                        name: 'background--hover',
                        type: '',
                        value: 'color(\'dark-45\')',
                        description: 'The background of the button component when hovered or focused, for the dark color variant'
                    },
                    {
                        name: 'background--active',
                        type: '',
                        value: 'color(\'dark-40\')',
                        description: 'The background of the button component when active, for the dark color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'dark-45\')',
                        description: 'The border top color of the button component, for the dark color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'dark-45\')',
                        description: 'The border right color of the button component, for the dark color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'dark-45\')',
                        description: 'The border bottom color of the button component, for the dark color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'dark-45\')',
                        description: 'The border left color of the button component, for the dark color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-dark)',
                        description: 'The color of the button component, for the dark color variant'
                    },
                    {
                        name: 'link--color',
                        type: '',
                        value: 'color(\'dark\')',
                        description: 'The color of the button component link variant, for the dark color variant'
                    },
                    {
                        name: 'link--color--active',
                        type: '',
                        value: 'color(\'dark-45\')',
                        description: 'The color of the button component link variant when active, for the dark color variant'
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
                        description: 'The background of the button component, for the info color variant'
                    },
                    {
                        name: 'background--hover',
                        type: '',
                        value: 'color(\'info-55\')',
                        description: 'The background of the button component when hovered or focused, for the info color variant'
                    },
                    {
                        name: 'background--active',
                        type: '',
                        value: 'color(\'info-60\')',
                        description: 'The background of the button component when active, for the info color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'info-55\')',
                        description: 'The border top color of the button component, for the info color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'info-55\')',
                        description: 'The border right color of the button component, for the info color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'info-55\')',
                        description: 'The border bottom color of the button component, for the info color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'info-55\')',
                        description: 'The border left color of the button component, for the info color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-info)',
                        description: 'The color of the button component, for the info color variant'
                    },
                    {
                        name: 'link--color',
                        type: '',
                        value: 'color(\'info\')',
                        description: 'The color of the button component link variant, for the info color variant'
                    },
                    {
                        name: 'link--color--active',
                        type: '',
                        value: 'color(\'info-55\')',
                        description: 'The color of the button component link variant when active, for the info color variant'
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
                        description: 'The background of the button component, for the success color variant'
                    },
                    {
                        name: 'background--hover',
                        type: '',
                        value: 'color(\'success-55\')',
                        description: 'The background of the button component when hovered or focused, for the success color variant'
                    },
                    {
                        name: 'background--active',
                        type: '',
                        value: 'color(\'success-60\')',
                        description: 'The background of the button component when active, for the success color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'success-55\')',
                        description: 'The border top color of the button component, for the success color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'success-55\')',
                        description: 'The border right color of the button component, for the success color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'success-55\')',
                        description: 'The border bottom color of the button component, for the success color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'success-55\')',
                        description: 'The border left color of the button component, for the success color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-success)',
                        description: 'The color of the button component, for the success color variant'
                    },
                    {
                        name: 'link--color',
                        type: '',
                        value: 'color(\'success\')',
                        description: 'The color of the button component link variant, for the success color variant'
                    },
                    {
                        name: 'link--color--active',
                        type: '',
                        value: 'color(\'success-55\')',
                        description: 'The color of the button component link variant when active, for the success color variant'
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
                        description: 'The background of the button component, for the warning color variant'
                    },
                    {
                        name: 'background--hover',
                        type: '',
                        value: 'color(\'warning-55\')',
                        description: 'The background of the button component when hovered or focused, for the warning color variant'
                    },
                    {
                        name: 'background--active',
                        type: '',
                        value: 'color(\'warning-60\')',
                        description: 'The background of the button component when active, for the warning color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'warning-55\')',
                        description: 'The border top color of the button component, for the warning color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'warning-55\')',
                        description: 'The border right color of the button component, for the warning color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'warning-55\')',
                        description: 'The border bottom color of the button component, for the warning color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'warning-55\')',
                        description: 'The border left color of the button component, for the warning color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-warning)',
                        description: 'The color of the button component, for the warning color variant'
                    },
                    {
                        name: 'link--color',
                        type: '',
                        value: 'color(\'warning\')',
                        description: 'The color of the button component link variant, for the warning color variant'
                    },
                    {
                        name: 'link--color--active',
                        type: '',
                        value: 'color(\'warning-55\')',
                        description: 'The color of the button component link variant when active, for the warning color variant'
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
                        description: 'The background of the button component, for the danger color variant'
                    },
                    {
                        name: 'background--hover',
                        type: '',
                        value: 'color(\'danger-55\')',
                        description: 'The background of the button component when hovered or focused, for the danger color variant'
                    },
                    {
                        name: 'background--active',
                        type: '',
                        value: 'color(\'danger-60\')',
                        description: 'The background of the button component when active, for the danger color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'danger-55\')',
                        description: 'The border top color of the button component, for the danger color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'danger-55\')',
                        description: 'The border right color of the button component, for the danger color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'danger-55\')',
                        description: 'The border bottom color of the button component, for the danger color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'danger-55\')',
                        description: 'The border left color of the button component, for the danger color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-danger)',
                        description: 'The color of the button component, for the danger color variant'
                    },
                    {
                        name: 'link--color',
                        type: '',
                        value: 'color(\'danger\')',
                        description: 'The color of the button component link variant, for the danger color variant'
                    },
                    {
                        name: 'link--color--active',
                        type: '',
                        value: 'color(\'danger-55\')',
                        description: 'The color of the button component link variant when active, for the danger color variant'
                    }
                ]
            },
            {
                name: 'facebook',
                type: 'variant',
                description: 'Variables for the facebook color variant',
                variables: [
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'facebook\')',
                        description: 'The background of the button component, for the facebook color variant'
                    },
                    {
                        name: 'background--hover',
                        type: '',
                        value: 'color(\'facebook-55\')',
                        description: 'The background of the button component when hovered or focused, for the facebook color variant'
                    },
                    {
                        name: 'background--active',
                        type: '',
                        value: 'color(\'facebook-60\')',
                        description: 'The background of the button component when active, for the facebook color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'facebook-55\')',
                        description: 'The border top color of the button component, for the facebook color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'facebook-55\')',
                        description: 'The border right color of the button component, for the facebook color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'facebook-55\')',
                        description: 'The border bottom color of the button component, for the facebook color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'facebook-55\')',
                        description: 'The border left color of the button component, for the facebook color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-facebook)',
                        description: 'The color of the button component, for the facebook color variant'
                    },
                    {
                        name: 'link--color',
                        type: '',
                        value: 'color(\'facebook\')',
                        description: 'The color of the button component link variant, for the facebook color variant'
                    },
                    {
                        name: 'link--color--active',
                        type: '',
                        value: 'color(\'facebook-55\')',
                        description: 'The color of the button component link variant when active, for the facebook color variant'
                    }
                ]
            },
            {
                name: 'google',
                type: 'variant',
                description: 'Variables for the google color variant',
                variables: [
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'google\')',
                        description: 'The background of the button component, for the google color variant'
                    },
                    {
                        name: 'background--hover',
                        type: '',
                        value: 'color(\'google-55\')',
                        description: 'The background of the button component when hovered or focused, for the google color variant'
                    },
                    {
                        name: 'background--active',
                        type: '',
                        value: 'color(\'google-60\')',
                        description: 'The background of the button component when active, for the google color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'google-55\')',
                        description: 'The border top color of the button component, for the google color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'google-55\')',
                        description: 'The border right color of the button component, for the google color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'google-55\')',
                        description: 'The border bottom color of the button component, for the google color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'google-55\')',
                        description: 'The border left color of the button component, for the google color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-google)',
                        description: 'The color of the button component, for the google color variant'
                    },
                    {
                        name: 'link--color',
                        type: '',
                        value: 'color(\'google\')',
                        description: 'The color of the button component link variant, for the google color variant'
                    },
                    {
                        name: 'link--color--active',
                        type: '',
                        value: 'color(\'google-55\')',
                        description: 'The color of the button component link variant when active, for the google color variant'
                    }
                ]
            },
            {
                name: 'twitter',
                type: 'variant',
                description: 'Variables for the twitter color variant',
                variables: [
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'twitter\')',
                        description: 'The background of the button component, for the twitter color variant'
                    },
                    {
                        name: 'background--hover',
                        type: '',
                        value: 'color(\'twitter-55\')',
                        description: 'The background of the button component when hovered or focused, for the twitter color variant'
                    },
                    {
                        name: 'background--active',
                        type: '',
                        value: 'color(\'twitter-60\')',
                        description: 'The background of the button component when active, for the twitter color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'twitter-55\')',
                        description: 'The border top color of the button component, for the twitter color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'twitter-55\')',
                        description: 'The border right color of the button component, for the twitter color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'twitter-55\')',
                        description: 'The border bottom color of the button component, for the twitter color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'twitter-55\')',
                        description: 'The border left color of the button component, for the twitter color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-twitter)',
                        description: 'The color of the button component, for the twitter color variant'
                    },
                    {
                        name: 'link--color',
                        type: '',
                        value: 'color(\'twitter\')',
                        description: 'The color of the button component link variant, for the twitter color variant'
                    },
                    {
                        name: 'link--color--active',
                        type: '',
                        value: 'color(\'twitter-55\')',
                        description: 'The color of the button component link variant when active, for the twitter color variant'
                    }
                ]
            },
            {
                name: 'github',
                type: 'variant',
                description: 'Variables for the github color variant',
                variables: [
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'github\')',
                        description: 'The background of the button component, for the github color variant'
                    },
                    {
                        name: 'background--hover',
                        type: '',
                        value: 'color(\'github-55\')',
                        description: 'The background of the button component when hovered or focused, for the github color variant'
                    },
                    {
                        name: 'background--active',
                        type: '',
                        value: 'color(\'github-60\')',
                        description: 'The background of the button component when active, for the github color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'github-55\')',
                        description: 'The border top color of the button component, for the github color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'github-55\')',
                        description: 'The border right color of the button component, for the github color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'github-55\')',
                        description: 'The border bottom color of the button component, for the github color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'github-55\')',
                        description: 'The border left color of the button component, for the github color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-github)',
                        description: 'The color of the button component, for the github color variant'
                    },
                    {
                        name: 'link--color',
                        type: '',
                        value: 'color(\'github\')',
                        description: 'The color of the button component link variant, for the github color variant'
                    },
                    {
                        name: 'link--color--active',
                        type: '',
                        value: 'color(\'github-55\')',
                        description: 'The color of the button component link variant when active, for the github color variant'
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
                        description: 'The border top left radius of the button component, for the sm size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border top right radius of the button component, for the sm size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border bottom right radius of the button component, for the sm size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border bottom left radius of the button component, for the sm size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'sm\')})',
                        description: 'The font size of the button component, for the sm size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{calc(var(--padding-top) / 2)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding top of the button component, for the sm size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding right of the button component, for the sm size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{calc(var(--padding-bottom) / 2)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding bottom of the button component, for the sm size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding left of the button component, for the sm size variant'
                    },
                    {
                        name: 'circle--size',
                        type: '',
                        value: 'calc(#{34px} * #{size-multiplier(\'sm\')})',
                        description: 'The size of the button component circle variant, for the sm size variant'
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
                        description: 'The border top left radius of the button component, for the md size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border top right radius of the button component, for the md size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border bottom right radius of the button component, for the md size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border bottom left radius of the button component, for the md size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'md\')})',
                        description: 'The font size of the button component, for the md size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{calc(var(--padding-top) / 2)} * #{size-multiplier(\'md\')})',
                        description: 'The padding top of the button component, for the md size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'md\')})',
                        description: 'The padding right of the button component, for the md size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{calc(var(--padding-bottom) / 2)} * #{size-multiplier(\'md\')})',
                        description: 'The padding bottom of the button component, for the md size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'md\')})',
                        description: 'The padding left of the button component, for the md size variant'
                    },
                    {
                        name: 'circle--size',
                        type: '',
                        value: 'calc(#{42px} * #{size-multiplier(\'md\')})',
                        description: 'The size of the button component circle variant, for the md size variant'
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
                        description: 'The border top left radius of the button component, for the lg size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border top right radius of the button component, for the lg size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border bottom right radius of the button component, for the lg size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border bottom left radius of the button component, for the lg size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'lg\')})',
                        description: 'The font size of the button component, for the lg size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{calc(var(--padding-top) / 2)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding top of the button component, for the lg size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding right of the button component, for the lg size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{calc(var(--padding-bottom) / 2)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding bottom of the button component, for the lg size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding left of the button component, for the lg size variant'
                    },
                    {
                        name: 'circle--size',
                        type: '',
                        value: 'calc(#{49px} * #{size-multiplier(\'lg\')})',
                        description: 'The size of the button component circle variant, for the lg size variant'
                    }
                ]
            }
        ]
    },
    events: []
};

export default manifest;
