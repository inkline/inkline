export const manifest = {
    name: 'dropdown',
    slots: [
        {
            description: 'Slot for dropdown trigger',
            name: 'default'
        },
        {
            description: 'Slot for dropdown header content',
            name: 'header'
        },
        {
            description: 'Slot for dropdown body content',
            name: 'body'
        },
        {
            description: 'Slot for dropdown footer content',
            name: 'footer'
        }
    ],
    events: [
        {
            description: 'Event emitted when clicking outside the dropdown elements',
            name: 'click-outside'
        },
        {
            description: 'Event emitted for setting the modelValue',
            name: 'update:modelValue'
        }
    ],
    props: [
        {
            name: 'animationDuration',
            type: [
                'Number'
            ],
            default: '300',
            description: 'The duration of the hide and show animation'
        },
        {
            name: 'color',
            type: [
                'light',
                'dark'
            ],
            default: 'light',
            description: 'The color variant of the dropdown'
        },
        {
            name: 'disabled',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The disabled state of the dropdown'
        },
        {
            name: 'hideOnItemClick',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Used to hide the dropdown when clicking or selecting a dropdown item'
        },
        {
            name: 'keydownTrigger',
            type: [
                'string[]'
            ],
            default: 'up, down, enter, space, tab, esc',
            description: 'The keydown events bound to the trigger element'
        },
        {
            name: 'keydownItem',
            type: [
                'string[]'
            ],
            default: 'up, down, enter, space, tab, esc',
            description: 'The keydown events bound to the dropdown item elements'
        },
        {
            name: 'modelValue',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Used to manually control the visibility of the dropdown'
        },
        {
            name: 'arrow',
            type: [
                'Boolean'
            ],
            default: 'true',
            description: 'Displays an arrow on the dropdown pointing to the trigger element'
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
            description: 'The placement of the dropdown'
        },
        {
            name: 'trigger',
            type: [
                'hover',
                'focus',
                'click',
                'manual'
            ],
            default: 'click',
            description: 'The events used to trigger the dropdown'
        },
        {
            name: 'offset',
            type: [
                'Number'
            ],
            default: '6',
            description: 'The offset of the dropdown relative to the trigger element'
        },
        {
            name: 'popperOptions',
            type: [
                'Object'
            ],
            default: '',
            description: 'Used to override the popper.js options used for creating the dropdown'
        },
        {
            name: 'size',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md',
            description: 'The size variant of the dropdown'
        }
    ],
    css: {
        selector: '.dropdown',
        defaults: {
            size: 'md',
            color: 'light'
        },
        variables: [
            {
                name: 'background',
                type: 'color',
                value: 'color(\'white\')',
                description: 'The background of the dropdown component'
            },
            {
                name: 'background--active',
                type: 'color',
                value: 'color(\'light-25\')',
                description: 'The background of the dropdown component when active'
            },
            {
                name: 'background--disabled',
                type: 'color',
                value: 'transparent',
                description: 'The background of the dropdown component when disabled'
            },
            {
                name: 'background--hover',
                type: 'color',
                value: 'color(\'light-25\')',
                description: 'The background of the dropdown component when hovered or focused'
            },
            {
                name: 'border-top-color',
                type: 'color',
                value: 'color(\'light\')',
                description: 'The border top color of the dropdown component'
            },
            {
                name: 'border-right-color',
                type: 'color',
                value: 'color(\'light\')',
                description: 'The border right color of the dropdown component'
            },
            {
                name: 'border-bottom-color',
                type: 'color',
                value: 'color(\'light\')',
                description: 'The border bottom color of the dropdown component'
            },
            {
                name: 'border-left-color',
                type: 'color',
                value: 'color(\'light\')',
                description: 'The border left color of the dropdown component'
            },
            {
                name: 'border-color',
                type: '',
                value: 'var(----border-top-color) var(----border-right-color) var(----border-bottom-color) var(----border-left-color)',
                description: 'The border color of the dropdown component'
            },
            {
                name: 'border-style',
                type: '',
                value: 'var(--border-style)',
                description: 'The border style of the dropdown component'
            },
            {
                name: 'border-top-width',
                type: '',
                value: 'var(--border-top-width)',
                description: 'The border top width of the dropdown component'
            },
            {
                name: 'border-right-width',
                type: '',
                value: 'var(--border-right-width)',
                description: 'The border right width of the dropdown component'
            },
            {
                name: 'border-bottom-width',
                type: '',
                value: 'var(--border-bottom-width)',
                description: 'The border bottom width of the dropdown component'
            },
            {
                name: 'border-left-width',
                type: '',
                value: 'var(--border-left-width)',
                description: 'The border left width of the dropdown component'
            },
            {
                name: 'border-width',
                type: '',
                value: 'var(----border-top-width) var(----border-right-width) var(----border-bottom-width) var(----border-left-width)',
                description: 'The border width of the dropdown component'
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                value: 'var(--border-top-left-radius)',
                description: 'The border top left radius of the dropdown component'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                value: 'var(--border-top-right-radius)',
                description: 'The border top right radius of the dropdown component'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                value: 'var(--border-bottom-right-radius)',
                description: 'The border bottom right radius of the dropdown component'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                value: 'var(--border-bottom-left-radius)',
                description: 'The border bottom left radius of the dropdown component'
            },
            {
                name: 'border-radius',
                type: '',
                value: 'var(----border-top-left-radius) var(----border-top-right-radius) var(----border-bottom-right-radius) var(----border-bottom-left-radius)',
                description: 'The border radius of the dropdown component'
            },
            {
                name: 'box-shadow-offset-x',
                type: '',
                value: 'var(--box-shadow-offset-x)',
                description: 'The box shadow horizontal offset of the dropdown component'
            },
            {
                name: 'box-shadow-offset-y',
                type: '',
                value: 'var(--box-shadow-offset-y)',
                description: 'The box shadow vertical offset of the dropdown component'
            },
            {
                name: 'box-shadow-blur-radius',
                type: '',
                value: 'var(--box-shadow-blur-radius)',
                description: 'The box shadow blur radius of the dropdown component'
            },
            {
                name: 'box-shadow-spread-radius',
                type: '',
                value: 'var(--box-shadow-spread-radius)',
                description: 'The box shadow spread radius of the dropdown component'
            },
            {
                name: 'box-shadow-color',
                type: '',
                value: 'var(--box-shadow-color)',
                description: 'The box shadow spread radius of the dropdown component'
            },
            {
                name: 'box-shadow',
                type: '',
                value: 'var(----box-shadow-offset-x) var(----box-shadow-offset-y) var(----box-shadow-blur-radius) var(----box-shadow-spread-radius) var(----box-shadow-color)',
                description: 'The box shadow of the dropdown component'
            },
            {
                name: 'color',
                type: 'color',
                value: 'contrast-color($color-white)',
                description: 'The color of the dropdown component item'
            },
            {
                name: 'color--active',
                type: 'color',
                value: 'var(--dropdown-color-variant-light-color)',
                description: 'The color of the dropdown component item when active'
            },
            {
                name: 'color--disabled',
                type: 'color',
                value: 'color(\'light-65\')',
                description: 'The color of the dropdown component item when disabled'
            },
            {
                name: 'color--hover',
                type: 'color',
                value: 'var(--dropdown-color-variant-light-color)',
                description: 'The color of the dropdown component item when hovered or focused'
            },
            {
                name: 'font-weight',
                type: '',
                value: 'font-weight(\'normal\')',
                description: 'The font weight of the dropdown component'
            },
            {
                name: 'font-size',
                type: 'size',
                value: 'font-size()',
                description: 'The font size of the dropdown component'
            },
            {
                name: 'line-height',
                type: '',
                value: 'var(--line-height)',
                description: 'The line height of the dropdown component'
            },
            {
                name: 'min-width',
                type: '',
                value: '240px',
                description: 'The minimum width of the dropdown component'
            },
            {
                name: 'max-width',
                type: '',
                value: '90vw',
                description: 'The maximum width of the dropdown component'
            },
            {
                name: 'padding-top',
                type: 'size',
                value: 'var(--padding-top)',
                description: 'The padding top of the dropdown component items'
            },
            {
                name: 'padding-right',
                type: 'size',
                value: 'var(--padding-right)',
                description: 'The padding right of the dropdown component items'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                value: 'var(--padding-bottom)',
                description: 'The padding bottom of the dropdown component items'
            },
            {
                name: 'padding-left',
                type: 'size',
                value: 'var(--padding-left)',
                description: 'The padding left of the dropdown component items'
            },
            {
                name: 'padding',
                type: '',
                value: 'var(----padding-top) var(----padding-right) var(----padding-bottom) var(----padding-left)',
                description: 'The padding of the dropdown component items'
            },
            {
                name: 'z-index',
                type: '',
                value: '2000',
                description: 'The z-index of the dropdown component'
            },
            {
                name: 'divider--margin-top',
                type: '',
                value: 'calc(var(--margin-top) / 2)',
                description: 'The margin top of the dropdown component divider'
            },
            {
                name: 'divider--margin-bottom',
                type: '',
                value: 'calc(var(--margin-bottom) / 2)',
                description: 'The margin bottom of the dropdown component divider'
            },
            {
                name: 'item--padding-top',
                type: 'size',
                value: 'calc(var(----padding-top) / 2)',
                description: 'The padding top of the dropdown component item'
            },
            {
                name: 'item--padding-right',
                type: 'size',
                value: 'var(----padding-right)',
                description: 'The padding right of the dropdown component item'
            },
            {
                name: 'item--padding-bottom',
                type: 'size',
                value: 'calc(var(----padding-bottom) / 2)',
                description: 'The padding bottom of the dropdown component item'
            },
            {
                name: 'item--padding-left',
                type: 'size',
                value: 'var(----padding-left)',
                description: 'The padding left of the dropdown component item'
            },
            {
                name: 'item--padding',
                type: '',
                value: 'var(----item--padding-top) var(----item--padding-right) var(----item--padding-bottom) var(----item--padding-left)',
                description: 'The padding of the dropdown component item'
            },
            {
                name: 'header--background',
                type: 'color',
                value: 'color(\'gray-05\')',
                description: 'The background of the dropdown component header'
            },
            {
                name: 'header--padding-top',
                type: 'size',
                value: 'var(----padding-top)',
                description: 'The padding top of the dropdown component header'
            },
            {
                name: 'header--padding-right',
                type: 'size',
                value: 'var(----padding-right)',
                description: 'The padding right of the dropdown component header'
            },
            {
                name: 'header--padding-bottom',
                type: 'size',
                value: 'var(----padding-bottom)',
                description: 'The padding bottom of the dropdown component header'
            },
            {
                name: 'header--padding-left',
                type: 'size',
                value: 'var(----padding-left)',
                description: 'The padding left of the dropdown component header'
            },
            {
                name: 'header--padding',
                type: '',
                value: 'var(----header--padding-top) var(----header--padding-right) var(----header--padding-bottom) var(----header--padding-left)',
                description: 'The padding of the dropdown component header'
            },
            {
                name: 'body--padding-top',
                type: 'size',
                value: 'var(----padding-top)',
                description: 'The padding top of the dropdown component body'
            },
            {
                name: 'body--padding-right',
                type: 'size',
                value: '0',
                description: 'The padding right of the dropdown component body'
            },
            {
                name: 'body--padding-bottom',
                type: 'size',
                value: 'var(----padding-bottom)',
                description: 'The padding bottom of the dropdown component body'
            },
            {
                name: 'body--padding-left',
                type: 'size',
                value: '0',
                description: 'The padding left of the dropdown component body'
            },
            {
                name: 'body--padding',
                type: '',
                value: 'var(----body--padding-top) var(----body--padding-right) var(----body--padding-bottom) var(----body--padding-left)',
                description: 'The padding of the dropdown component body'
            },
            {
                name: 'footer--background',
                type: 'color',
                value: 'color(\'gray-05\')',
                description: 'The background of the dropdown component footer'
            },
            {
                name: 'footer--padding-top',
                type: 'size',
                value: 'var(----padding-top)',
                description: 'The padding top of the dropdown component footer'
            },
            {
                name: 'footer--padding-right',
                type: 'size',
                value: 'var(----padding-right)',
                description: 'The padding right of the dropdown component footer'
            },
            {
                name: 'footer--padding-bottom',
                type: 'size',
                value: 'var(----padding-bottom)',
                description: 'The padding bottom of the dropdown component footer'
            },
            {
                name: 'footer--padding-left',
                type: 'size',
                value: 'var(----padding-left)',
                description: 'The padding left of the dropdown component footer'
            },
            {
                name: 'footer--padding',
                type: '',
                value: 'var(----footer--padding-top) var(----footer--padding-right) var(----footer--padding-bottom) var(----footer--padding-left)',
                description: 'The padding of the dropdown component footer'
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
                        description: 'The background of the dropdown component, for the light color variant'
                    },
                    {
                        name: 'background--active',
                        type: '',
                        value: 'color(\'light-25\')',
                        description: 'The background of the dropdown component when active, for the light color variant'
                    },
                    {
                        name: 'background--disabled',
                        type: '',
                        value: 'transparent',
                        description: 'The background of the dropdown component when disabled, for the light color variant'
                    },
                    {
                        name: 'background--hover',
                        type: '',
                        value: 'color(\'light-25\')',
                        description: 'The background of the dropdown component when hovered or focused, for the light color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'light\')',
                        description: 'The border top color of the dropdown component, for the light color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'light\')',
                        description: 'The border right color of the dropdown component, for the light color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'light\')',
                        description: 'The border bottom color of the dropdown component, for the light color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'light\')',
                        description: 'The border left color of the dropdown component, for the light color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-white)',
                        description: 'The color of the dropdown component item, for the light color variant'
                    },
                    {
                        name: 'color--active',
                        type: '',
                        value: 'var(--dropdown-color-variant-light-color)',
                        description: 'The color of the dropdown component item when active, for the light color variant'
                    },
                    {
                        name: 'color--disabled',
                        type: '',
                        value: 'color(\'light-65\')',
                        description: 'The color of the dropdown component item when disabled, for the light color variant'
                    },
                    {
                        name: 'color--hover',
                        type: '',
                        value: 'var(--dropdown-color-variant-light-color)',
                        description: 'The color of the dropdown component item when hovered or focused, for the light color variant'
                    },
                    {
                        name: 'header--background',
                        type: '',
                        value: 'color(\'gray-05\')',
                        description: 'The background of the dropdown component header, for the light color variant'
                    },
                    {
                        name: 'footer--background',
                        type: '',
                        value: 'color(\'gray-05\')',
                        description: 'The background of the dropdown component footer, for the light color variant'
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
                        description: 'The background of the dropdown component, for the dark color variant'
                    },
                    {
                        name: 'background--active',
                        type: '',
                        value: 'color(\'dark-45\')',
                        description: 'The background of the dropdown component when active, for the dark color variant'
                    },
                    {
                        name: 'background--disabled',
                        type: '',
                        value: 'transparent',
                        description: 'The background of the dropdown component when disabled, for the dark color variant'
                    },
                    {
                        name: 'background--hover',
                        type: '',
                        value: 'color(\'dark-45\')',
                        description: 'The background of the dropdown component when hovered or focused, for the dark color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'dark-60\')',
                        description: 'The border top color of the dropdown component, for the dark color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'dark-60\')',
                        description: 'The border right color of the dropdown component, for the dark color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'dark-60\')',
                        description: 'The border bottom color of the dropdown component, for the dark color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'dark-60\')',
                        description: 'The border left color of the dropdown component, for the dark color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-dark)',
                        description: 'The color of the dropdown component item, for the dark color variant'
                    },
                    {
                        name: 'color--active',
                        type: '',
                        value: 'var(--dropdown-color-variant-dark-color)',
                        description: 'The color of the dropdown component item when active, for the dark color variant'
                    },
                    {
                        name: 'color--disabled',
                        type: '',
                        value: 'color(\'dark-25\')',
                        description: 'The color of the dropdown component item when disabled, for the dark color variant'
                    },
                    {
                        name: 'color--hover',
                        type: '',
                        value: 'var(--dropdown-color-variant-dark-color)',
                        description: 'The color of the dropdown component item when hovered or focused, for the dark color variant'
                    },
                    {
                        name: 'header--background',
                        type: '',
                        value: 'color(\'dark-55\')',
                        description: 'The background of the dropdown component header, for the dark color variant'
                    },
                    {
                        name: 'footer--background',
                        type: '',
                        value: 'color(\'dark-55\')',
                        description: 'The background of the dropdown component footer, for the dark color variant'
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
                        description: 'The border top left radius of the dropdown component, for the sm size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border top right radius of the dropdown component, for the sm size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border bottom right radius of the dropdown component, for the sm size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border bottom left radius of the dropdown component, for the sm size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'sm\')})',
                        description: 'The font size of the dropdown component, for the sm size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{var(--padding-top)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding top of the dropdown component items, for the sm size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding right of the dropdown component items, for the sm size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{var(--padding-bottom)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding bottom of the dropdown component items, for the sm size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding left of the dropdown component items, for the sm size variant'
                    },
                    {
                        name: 'item--padding-top',
                        type: '',
                        value: 'calc(#{calc(var(----padding-top) / 2)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding top of the dropdown component item, for the sm size variant'
                    },
                    {
                        name: 'item--padding-right',
                        type: '',
                        value: 'calc(#{var(----padding-right)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding right of the dropdown component item, for the sm size variant'
                    },
                    {
                        name: 'item--padding-bottom',
                        type: '',
                        value: 'calc(#{calc(var(----padding-bottom) / 2)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding bottom of the dropdown component item, for the sm size variant'
                    },
                    {
                        name: 'item--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding left of the dropdown component item, for the sm size variant'
                    },
                    {
                        name: 'header--padding-top',
                        type: '',
                        value: 'calc(#{var(----padding-top)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding top of the dropdown component header, for the sm size variant'
                    },
                    {
                        name: 'header--padding-right',
                        type: '',
                        value: 'calc(#{var(----padding-right)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding right of the dropdown component header, for the sm size variant'
                    },
                    {
                        name: 'header--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding bottom of the dropdown component header, for the sm size variant'
                    },
                    {
                        name: 'header--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding left of the dropdown component header, for the sm size variant'
                    },
                    {
                        name: 'body--padding-top',
                        type: '',
                        value: 'calc(#{var(----padding-top)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding top of the dropdown component body, for the sm size variant'
                    },
                    {
                        name: 'body--padding-right',
                        type: '',
                        value: 'calc(#{0} * #{size-multiplier(\'sm\')})',
                        description: 'The padding right of the dropdown component body, for the sm size variant'
                    },
                    {
                        name: 'body--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding bottom of the dropdown component body, for the sm size variant'
                    },
                    {
                        name: 'body--padding-left',
                        type: '',
                        value: 'calc(#{0} * #{size-multiplier(\'sm\')})',
                        description: 'The padding left of the dropdown component body, for the sm size variant'
                    },
                    {
                        name: 'footer--padding-top',
                        type: '',
                        value: 'calc(#{var(----padding-top)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding top of the dropdown component footer, for the sm size variant'
                    },
                    {
                        name: 'footer--padding-right',
                        type: '',
                        value: 'calc(#{var(----padding-right)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding right of the dropdown component footer, for the sm size variant'
                    },
                    {
                        name: 'footer--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding bottom of the dropdown component footer, for the sm size variant'
                    },
                    {
                        name: 'footer--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding left of the dropdown component footer, for the sm size variant'
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
                        description: 'The border top left radius of the dropdown component, for the md size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border top right radius of the dropdown component, for the md size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border bottom right radius of the dropdown component, for the md size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border bottom left radius of the dropdown component, for the md size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'md\')})',
                        description: 'The font size of the dropdown component, for the md size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{var(--padding-top)} * #{size-multiplier(\'md\')})',
                        description: 'The padding top of the dropdown component items, for the md size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'md\')})',
                        description: 'The padding right of the dropdown component items, for the md size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{var(--padding-bottom)} * #{size-multiplier(\'md\')})',
                        description: 'The padding bottom of the dropdown component items, for the md size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'md\')})',
                        description: 'The padding left of the dropdown component items, for the md size variant'
                    },
                    {
                        name: 'item--padding-top',
                        type: '',
                        value: 'calc(#{calc(var(----padding-top) / 2)} * #{size-multiplier(\'md\')})',
                        description: 'The padding top of the dropdown component item, for the md size variant'
                    },
                    {
                        name: 'item--padding-right',
                        type: '',
                        value: 'calc(#{var(----padding-right)} * #{size-multiplier(\'md\')})',
                        description: 'The padding right of the dropdown component item, for the md size variant'
                    },
                    {
                        name: 'item--padding-bottom',
                        type: '',
                        value: 'calc(#{calc(var(----padding-bottom) / 2)} * #{size-multiplier(\'md\')})',
                        description: 'The padding bottom of the dropdown component item, for the md size variant'
                    },
                    {
                        name: 'item--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'md\')})',
                        description: 'The padding left of the dropdown component item, for the md size variant'
                    },
                    {
                        name: 'header--padding-top',
                        type: '',
                        value: 'calc(#{var(----padding-top)} * #{size-multiplier(\'md\')})',
                        description: 'The padding top of the dropdown component header, for the md size variant'
                    },
                    {
                        name: 'header--padding-right',
                        type: '',
                        value: 'calc(#{var(----padding-right)} * #{size-multiplier(\'md\')})',
                        description: 'The padding right of the dropdown component header, for the md size variant'
                    },
                    {
                        name: 'header--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'md\')})',
                        description: 'The padding bottom of the dropdown component header, for the md size variant'
                    },
                    {
                        name: 'header--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'md\')})',
                        description: 'The padding left of the dropdown component header, for the md size variant'
                    },
                    {
                        name: 'body--padding-top',
                        type: '',
                        value: 'calc(#{var(----padding-top)} * #{size-multiplier(\'md\')})',
                        description: 'The padding top of the dropdown component body, for the md size variant'
                    },
                    {
                        name: 'body--padding-right',
                        type: '',
                        value: 'calc(#{0} * #{size-multiplier(\'md\')})',
                        description: 'The padding right of the dropdown component body, for the md size variant'
                    },
                    {
                        name: 'body--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'md\')})',
                        description: 'The padding bottom of the dropdown component body, for the md size variant'
                    },
                    {
                        name: 'body--padding-left',
                        type: '',
                        value: 'calc(#{0} * #{size-multiplier(\'md\')})',
                        description: 'The padding left of the dropdown component body, for the md size variant'
                    },
                    {
                        name: 'footer--padding-top',
                        type: '',
                        value: 'calc(#{var(----padding-top)} * #{size-multiplier(\'md\')})',
                        description: 'The padding top of the dropdown component footer, for the md size variant'
                    },
                    {
                        name: 'footer--padding-right',
                        type: '',
                        value: 'calc(#{var(----padding-right)} * #{size-multiplier(\'md\')})',
                        description: 'The padding right of the dropdown component footer, for the md size variant'
                    },
                    {
                        name: 'footer--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'md\')})',
                        description: 'The padding bottom of the dropdown component footer, for the md size variant'
                    },
                    {
                        name: 'footer--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'md\')})',
                        description: 'The padding left of the dropdown component footer, for the md size variant'
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
                        description: 'The border top left radius of the dropdown component, for the lg size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border top right radius of the dropdown component, for the lg size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border bottom right radius of the dropdown component, for the lg size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border bottom left radius of the dropdown component, for the lg size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'lg\')})',
                        description: 'The font size of the dropdown component, for the lg size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{var(--padding-top)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding top of the dropdown component items, for the lg size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding right of the dropdown component items, for the lg size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{var(--padding-bottom)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding bottom of the dropdown component items, for the lg size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding left of the dropdown component items, for the lg size variant'
                    },
                    {
                        name: 'item--padding-top',
                        type: '',
                        value: 'calc(#{calc(var(----padding-top) / 2)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding top of the dropdown component item, for the lg size variant'
                    },
                    {
                        name: 'item--padding-right',
                        type: '',
                        value: 'calc(#{var(----padding-right)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding right of the dropdown component item, for the lg size variant'
                    },
                    {
                        name: 'item--padding-bottom',
                        type: '',
                        value: 'calc(#{calc(var(----padding-bottom) / 2)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding bottom of the dropdown component item, for the lg size variant'
                    },
                    {
                        name: 'item--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding left of the dropdown component item, for the lg size variant'
                    },
                    {
                        name: 'header--padding-top',
                        type: '',
                        value: 'calc(#{var(----padding-top)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding top of the dropdown component header, for the lg size variant'
                    },
                    {
                        name: 'header--padding-right',
                        type: '',
                        value: 'calc(#{var(----padding-right)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding right of the dropdown component header, for the lg size variant'
                    },
                    {
                        name: 'header--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding bottom of the dropdown component header, for the lg size variant'
                    },
                    {
                        name: 'header--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding left of the dropdown component header, for the lg size variant'
                    },
                    {
                        name: 'body--padding-top',
                        type: '',
                        value: 'calc(#{var(----padding-top)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding top of the dropdown component body, for the lg size variant'
                    },
                    {
                        name: 'body--padding-right',
                        type: '',
                        value: 'calc(#{0} * #{size-multiplier(\'lg\')})',
                        description: 'The padding right of the dropdown component body, for the lg size variant'
                    },
                    {
                        name: 'body--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding bottom of the dropdown component body, for the lg size variant'
                    },
                    {
                        name: 'body--padding-left',
                        type: '',
                        value: 'calc(#{0} * #{size-multiplier(\'lg\')})',
                        description: 'The padding left of the dropdown component body, for the lg size variant'
                    },
                    {
                        name: 'footer--padding-top',
                        type: '',
                        value: 'calc(#{var(----padding-top)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding top of the dropdown component footer, for the lg size variant'
                    },
                    {
                        name: 'footer--padding-right',
                        type: '',
                        value: 'calc(#{var(----padding-right)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding right of the dropdown component footer, for the lg size variant'
                    },
                    {
                        name: 'footer--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding bottom of the dropdown component footer, for the lg size variant'
                    },
                    {
                        name: 'footer--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding left of the dropdown component footer, for the lg size variant'
                    }
                ]
            }
        ]
    }
};

export default manifest;
