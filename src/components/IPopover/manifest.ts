export const manifest = {
    name: 'popover',
    slots: [
        {
            description: 'Slot for tooltip trigger',
            name: 'default'
        },
        {
            description: 'Slot for tooltip header content',
            name: 'header'
        },
        {
            description: 'Slot for tooltip body content',
            name: 'body'
        },
        {
            description: 'Slot for tooltip footer content',
            name: 'footer'
        }
    ],
    events: [
        {
            description: 'Event emitted when clicking outside the popover elements',
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
            description: 'The color variant of the popover'
        },
        {
            name: 'disabled',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The disabled state of the popover'
        },
        {
            name: 'modelValue',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Used to manually control the visibility of the popover'
        },
        {
            name: 'name',
            type: [
                'String'
            ],
            default: 'uid()',
            description: 'The identifier of the popover'
        },
        {
            name: 'arrow',
            type: [
                'Boolean'
            ],
            default: 'true',
            description: 'Displays an arrow on the popover pointing to the trigger element'
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
            description: 'The placement of the popover'
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
            description: 'The events used to trigger the popover'
        },
        {
            name: 'offset',
            type: [
                'Number'
            ],
            default: '6',
            description: 'The offset of the popover relative to the trigger element'
        },
        {
            name: 'popperOptions',
            type: [
                'Object'
            ],
            default: '',
            description: 'Used to override the popper.js options used for creating the popover'
        },
        {
            name: 'size',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md',
            description: 'The size variant of the popover'
        }
    ],
    css: {
        selector: '.popover-wrapper',
        defaults: {
            size: 'md',
            color: 'light'
        },
        variables: [
            {
                name: 'background',
                type: 'color',
                value: 'color(\'white\')',
                description: 'The background of the popover component'
            },
            {
                name: 'border-top-color',
                type: 'color',
                value: 'color(\'light\')',
                description: 'The border top color of the popover component'
            },
            {
                name: 'border-right-color',
                type: 'color',
                value: 'color(\'light\')',
                description: 'The border right color of the popover component'
            },
            {
                name: 'border-bottom-color',
                type: 'color',
                value: 'color(\'light\')',
                description: 'The border bottom color of the popover component'
            },
            {
                name: 'border-left-color',
                type: 'color',
                value: 'color(\'light\')',
                description: 'The border left color of the popover component'
            },
            {
                name: 'border-color',
                type: '',
                value: 'var(----border-top-color) var(----border-right-color) var(----border-bottom-color) var(----border-left-color)',
                description: 'The border color of the popover component'
            },
            {
                name: 'border-style',
                type: '',
                value: 'var(--border-style)',
                description: 'The border style of the popover component'
            },
            {
                name: 'border-top-width',
                type: '',
                value: 'var(--border-top-width)',
                description: 'The border top width of the popover component'
            },
            {
                name: 'border-right-width',
                type: '',
                value: 'var(--border-right-width)',
                description: 'The border right width of the popover component'
            },
            {
                name: 'border-bottom-width',
                type: '',
                value: 'var(--border-bottom-width)',
                description: 'The border bottom width of the popover component'
            },
            {
                name: 'border-left-width',
                type: '',
                value: 'var(--border-left-width)',
                description: 'The border left width of the popover component'
            },
            {
                name: 'border-width',
                type: '',
                value: 'var(----border-top-width) var(----border-right-width) var(----border-bottom-width) var(----border-left-width)',
                description: 'The border width of the popover component'
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                value: 'var(--border-top-left-radius)',
                description: 'The border top left radius of the popover component'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                value: 'var(--border-top-right-radius)',
                description: 'The border top right radius of the popover component'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                value: 'var(--border-bottom-right-radius)',
                description: 'The border bottom right radius of the popover component'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                value: 'var(--border-bottom-left-radius)',
                description: 'The border bottom left radius of the popover component'
            },
            {
                name: 'border-radius',
                type: '',
                value: 'var(----border-top-left-radius) var(----border-top-right-radius) var(----border-bottom-right-radius) var(----border-bottom-left-radius)',
                description: 'The border radius of the popover component'
            },
            {
                name: 'box-shadow-offset-x',
                type: '',
                value: 'var(--box-shadow-offset-x)',
                description: 'The box shadow horizontal offset of the popover component'
            },
            {
                name: 'box-shadow-offset-y',
                type: '',
                value: 'var(--box-shadow-offset-y)',
                description: 'The box shadow vertical offset of the popover component'
            },
            {
                name: 'box-shadow-blur-radius',
                type: '',
                value: 'var(--box-shadow-blur-radius)',
                description: 'The box shadow blur radius of the popover component'
            },
            {
                name: 'box-shadow-spread-radius',
                type: '',
                value: 'var(--box-shadow-spread-radius)',
                description: 'The box shadow spread radius of the popover component'
            },
            {
                name: 'box-shadow-color',
                type: '',
                value: 'var(--box-shadow-color)',
                description: 'The box shadow spread radius of the popover component'
            },
            {
                name: 'box-shadow',
                type: '',
                value: 'var(----box-shadow-offset-x) var(----box-shadow-offset-y) var(----box-shadow-blur-radius) var(----box-shadow-spread-radius) var(----box-shadow-color)',
                description: 'The box shadow of the popover component'
            },
            {
                name: 'color',
                type: 'color',
                value: 'contrast-color($color-white)',
                description: 'The color of the popover component item'
            },
            {
                name: 'font-size',
                type: 'size',
                value: 'font-size()',
                description: 'The font size of the popover component'
            },
            {
                name: 'font-weight',
                type: '',
                value: 'font-weight(\'normal\')',
                description: 'The font weight of the popover component'
            },
            {
                name: 'line-height',
                type: '',
                value: 'var(--line-height)',
                description: 'The line height of the popover component'
            },
            {
                name: 'margin-top',
                type: 'size',
                value: 'calc(var(--margin-top) / 2)',
                description: 'The margin top of the popover component'
            },
            {
                name: 'margin-right',
                type: 'size',
                value: 'calc(var(--margin-right) / 2)',
                description: 'The margin right of the popover component'
            },
            {
                name: 'margin-bottom',
                type: 'size',
                value: 'calc(var(--margin-bottom) / 2)',
                description: 'The margin bottom of the popover component'
            },
            {
                name: 'margin-left',
                type: 'size',
                value: 'calc(var(--margin-left) / 2)',
                description: 'The margin left of the popover component'
            },
            {
                name: 'margin',
                type: '',
                value: 'var(----margin-top) var(----margin-right) var(----margin-bottom) var(----margin-left)',
                description: 'The margin of the popover component'
            },
            {
                name: 'padding-top',
                type: 'size',
                value: 'calc(var(--padding-top) * 3 / 4)',
                description: 'The padding top of the popover component'
            },
            {
                name: 'padding-right',
                type: 'size',
                value: 'var(--padding-right)',
                description: 'The padding right of the popover component'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                value: 'calc(var(--padding-bottom) * 3 / 4)',
                description: 'The padding bottom of the popover component'
            },
            {
                name: 'padding-left',
                type: 'size',
                value: 'var(--padding-left)',
                description: 'The padding left of the popover component'
            },
            {
                name: 'padding',
                type: '',
                value: 'var(----padding-top) var(----padding-right) var(----padding-bottom) var(----padding-left)',
                description: 'The padding of the popover component'
            },
            {
                name: 'max-width',
                type: '',
                value: '90vw',
                description: 'The maximum width of the popover component'
            },
            {
                name: 'width',
                type: '',
                value: '280px',
                description: 'The width of the popover component'
            },
            {
                name: 'z-index',
                type: '',
                value: '2000',
                description: 'The z-index of the popover component'
            },
            {
                name: 'header--background',
                type: 'color',
                value: 'color(\'gray-05\')',
                description: 'The background of the popover component header'
            },
            {
                name: 'header--border-color',
                type: '',
                value: 'var(----border-color)',
                description: 'The border color of the popover component header'
            },
            {
                name: 'header--border-style',
                type: '',
                value: 'var(----border-style)',
                description: 'The border style of the popover component header'
            },
            {
                name: 'header--border-top-width',
                type: '',
                value: 'var(----border-top-width)',
                description: 'The border top width of the popover component header'
            },
            {
                name: 'header--border-right-width',
                type: '',
                value: 'var(----border-right-width)',
                description: 'The border right width of the popover component header'
            },
            {
                name: 'header--border-bottom-width',
                type: '',
                value: 'var(----border-bottom-width)',
                description: 'The border bottom width of the popover component header'
            },
            {
                name: 'header--border-left-width',
                type: '',
                value: 'var(----border-left-width)',
                description: 'The border left width of the popover component header'
            },
            {
                name: 'header--border-width',
                type: '',
                value: 'var(----header--border-top-width) var(----header--border-right-width) var(----header--border-bottom-width) var(----header--border-left-width)',
                description: 'The border width of the popover component header'
            },
            {
                name: 'header--color',
                type: '',
                value: 'var(----color)',
                description: 'The color of the popover component header'
            },
            {
                name: 'header--padding-top',
                type: '',
                value: 'var(----padding-top)',
                description: 'The padding top of the popover component header'
            },
            {
                name: 'header--padding-right',
                type: '',
                value: 'var(----padding-right)',
                description: 'The padding right of the popover component header'
            },
            {
                name: 'header--padding-bottom',
                type: 'size',
                value: 'var(----padding-bottom)',
                description: 'The padding bottom of the popover component header'
            },
            {
                name: 'header--padding-left',
                type: 'size',
                value: 'var(----padding-left)',
                description: 'The padding left of the popover component header'
            },
            {
                name: 'header--padding',
                type: '',
                value: 'var(----header--padding-top) var(----header--padding-right) var(----header--padding-bottom) var(----header--padding-left)',
                description: 'The padding of the popover component header'
            },
            {
                name: 'body--background',
                type: '',
                value: 'var(----background)',
                description: 'The background of the popover component body'
            },
            {
                name: 'body--border-color',
                type: '',
                value: 'var(----border-color)',
                description: 'The border color of the popover component body'
            },
            {
                name: 'body--border-style',
                type: '',
                value: 'var(----border-style)',
                description: 'The border style of the popover component body'
            },
            {
                name: 'body--border-top-width',
                type: '',
                value: 'var(----border-top-width)',
                description: 'The border top width of the popover component body'
            },
            {
                name: 'body--border-right-width',
                type: '',
                value: 'var(----border-right-width)',
                description: 'The border right width of the popover component body'
            },
            {
                name: 'body--border-bottom-width',
                type: '',
                value: 'var(----border-bottom-width)',
                description: 'The border bottom width of the popover component body'
            },
            {
                name: 'body--border-left-width',
                type: '',
                value: 'var(----border-left-width)',
                description: 'The border left width of the popover component body'
            },
            {
                name: 'body--border-width',
                type: '',
                value: 'var(----body--border-top-width) var(----body--border-right-width) var(----body--border-bottom-width) var(----body--border-left-width)',
                description: 'The border width of the popover component body'
            },
            {
                name: 'body--color',
                type: '',
                value: 'var(----color)',
                description: 'The color of the popover component body'
            },
            {
                name: 'body--padding-top',
                type: '',
                value: 'var(----padding-top)',
                description: 'The padding top of the popover component body'
            },
            {
                name: 'body--padding-right',
                type: '',
                value: 'var(----padding-right)',
                description: 'The padding right of the popover component body'
            },
            {
                name: 'body--padding-bottom',
                type: 'size',
                value: 'var(----padding-bottom)',
                description: 'The padding bottom of the popover component body'
            },
            {
                name: 'body--padding-left',
                type: 'size',
                value: 'var(----padding-left)',
                description: 'The padding left of the popover component body'
            },
            {
                name: 'body--padding',
                type: '',
                value: 'var(----body--padding-top) var(----body--padding-right) var(----body--padding-bottom) var(----body--padding-left)',
                description: 'The padding of the popover component body'
            },
            {
                name: 'footer--background',
                type: 'color',
                value: 'color(\'gray-05\')',
                description: 'The background of the popover component footer'
            },
            {
                name: 'footer--border-color',
                type: '',
                value: 'var(----border-color)',
                description: 'The border color of the popover component footer'
            },
            {
                name: 'footer--border-style',
                type: '',
                value: 'var(----border-style)',
                description: 'The border style of the popover component footer'
            },
            {
                name: 'footer--border-top-width',
                type: '',
                value: 'var(----border-top-width)',
                description: 'The border top width of the popover component footer'
            },
            {
                name: 'footer--border-right-width',
                type: '',
                value: 'var(----border-right-width)',
                description: 'The border right width of the popover component footer'
            },
            {
                name: 'footer--border-bottom-width',
                type: '',
                value: 'var(----border-bottom-width)',
                description: 'The border bottom width of the popover component footer'
            },
            {
                name: 'footer--border-left-width',
                type: '',
                value: 'var(----border-left-width)',
                description: 'The border left width of the popover component footer'
            },
            {
                name: 'footer--border-width',
                type: '',
                value: 'var(----footer--border-top-width) var(----footer--border-right-width) var(----footer--border-bottom-width) var(----footer--border-left-width)',
                description: 'The border width of the popover component footer'
            },
            {
                name: 'footer--color',
                type: '',
                value: 'var(----color)',
                description: 'The color of the popover component footer'
            },
            {
                name: 'footer--padding-top',
                type: '',
                value: 'var(----padding-top)',
                description: 'The padding top of the popover component footer'
            },
            {
                name: 'footer--padding-right',
                type: '',
                value: 'var(----padding-right)',
                description: 'The padding right of the popover component footer'
            },
            {
                name: 'footer--padding-bottom',
                type: 'size',
                value: 'var(----padding-bottom)',
                description: 'The padding bottom of the popover component footer'
            },
            {
                name: 'footer--padding-left',
                type: 'size',
                value: 'var(----padding-left)',
                description: 'The padding left of the popover component footer'
            },
            {
                name: 'footer--padding',
                type: '',
                value: 'var(----footer--padding-top) var(----footer--padding-right) var(----footer--padding-bottom) var(----footer--padding-left)',
                description: 'The padding of the popover component footer'
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
                        description: 'The background of the popover component, for the light color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'light\')',
                        description: 'The border top color of the popover component, for the light color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'light\')',
                        description: 'The border right color of the popover component, for the light color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'light\')',
                        description: 'The border bottom color of the popover component, for the light color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'light\')',
                        description: 'The border left color of the popover component, for the light color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-white)',
                        description: 'The color of the popover component item, for the light color variant'
                    },
                    {
                        name: 'header--background',
                        type: '',
                        value: 'color(\'gray-05\')',
                        description: 'The background of the popover component header, for the light color variant'
                    },
                    {
                        name: 'footer--background',
                        type: '',
                        value: 'color(\'gray-05\')',
                        description: 'The background of the popover component footer, for the light color variant'
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
                        description: 'The background of the popover component, for the dark color variant'
                    },
                    {
                        name: 'border-top-color',
                        type: '',
                        value: 'color(\'dark-60\')',
                        description: 'The border top color of the popover component, for the dark color variant'
                    },
                    {
                        name: 'border-right-color',
                        type: '',
                        value: 'color(\'dark-60\')',
                        description: 'The border right color of the popover component, for the dark color variant'
                    },
                    {
                        name: 'border-bottom-color',
                        type: '',
                        value: 'color(\'dark-60\')',
                        description: 'The border bottom color of the popover component, for the dark color variant'
                    },
                    {
                        name: 'border-left-color',
                        type: '',
                        value: 'color(\'dark-60\')',
                        description: 'The border left color of the popover component, for the dark color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-dark)',
                        description: 'The color of the popover component item, for the dark color variant'
                    },
                    {
                        name: 'header--background',
                        type: '',
                        value: 'color(\'dark-55\')',
                        description: 'The background of the popover component header, for the dark color variant'
                    },
                    {
                        name: 'footer--background',
                        type: '',
                        value: 'color(\'dark-55\')',
                        description: 'The background of the popover component footer, for the dark color variant'
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
                        description: 'The border top left radius of the popover component, for the sm size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border top right radius of the popover component, for the sm size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border bottom right radius of the popover component, for the sm size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'sm\')})',
                        description: 'The border bottom left radius of the popover component, for the sm size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'sm\')})',
                        description: 'The font size of the popover component, for the sm size variant'
                    },
                    {
                        name: 'margin-top',
                        type: '',
                        value: 'calc(#{calc(var(--margin-top) / 2)} * #{size-multiplier(\'sm\')})',
                        description: 'The margin top of the popover component, for the sm size variant'
                    },
                    {
                        name: 'margin-right',
                        type: '',
                        value: 'calc(#{calc(var(--margin-right) / 2)} * #{size-multiplier(\'sm\')})',
                        description: 'The margin right of the popover component, for the sm size variant'
                    },
                    {
                        name: 'margin-bottom',
                        type: '',
                        value: 'calc(#{calc(var(--margin-bottom) / 2)} * #{size-multiplier(\'sm\')})',
                        description: 'The margin bottom of the popover component, for the sm size variant'
                    },
                    {
                        name: 'margin-left',
                        type: '',
                        value: 'calc(#{calc(var(--margin-left) / 2)} * #{size-multiplier(\'sm\')})',
                        description: 'The margin left of the popover component, for the sm size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{calc(var(--padding-top) * 3 / 4)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding top of the popover component, for the sm size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding right of the popover component, for the sm size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{calc(var(--padding-bottom) * 3 / 4)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding bottom of the popover component, for the sm size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding left of the popover component, for the sm size variant'
                    },
                    {
                        name: 'header--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding bottom of the popover component header, for the sm size variant'
                    },
                    {
                        name: 'header--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding left of the popover component header, for the sm size variant'
                    },
                    {
                        name: 'body--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding bottom of the popover component body, for the sm size variant'
                    },
                    {
                        name: 'body--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding left of the popover component body, for the sm size variant'
                    },
                    {
                        name: 'footer--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding bottom of the popover component footer, for the sm size variant'
                    },
                    {
                        name: 'footer--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding left of the popover component footer, for the sm size variant'
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
                        description: 'The border top left radius of the popover component, for the md size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border top right radius of the popover component, for the md size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border bottom right radius of the popover component, for the md size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'md\')})',
                        description: 'The border bottom left radius of the popover component, for the md size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'md\')})',
                        description: 'The font size of the popover component, for the md size variant'
                    },
                    {
                        name: 'margin-top',
                        type: '',
                        value: 'calc(#{calc(var(--margin-top) / 2)} * #{size-multiplier(\'md\')})',
                        description: 'The margin top of the popover component, for the md size variant'
                    },
                    {
                        name: 'margin-right',
                        type: '',
                        value: 'calc(#{calc(var(--margin-right) / 2)} * #{size-multiplier(\'md\')})',
                        description: 'The margin right of the popover component, for the md size variant'
                    },
                    {
                        name: 'margin-bottom',
                        type: '',
                        value: 'calc(#{calc(var(--margin-bottom) / 2)} * #{size-multiplier(\'md\')})',
                        description: 'The margin bottom of the popover component, for the md size variant'
                    },
                    {
                        name: 'margin-left',
                        type: '',
                        value: 'calc(#{calc(var(--margin-left) / 2)} * #{size-multiplier(\'md\')})',
                        description: 'The margin left of the popover component, for the md size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{calc(var(--padding-top) * 3 / 4)} * #{size-multiplier(\'md\')})',
                        description: 'The padding top of the popover component, for the md size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'md\')})',
                        description: 'The padding right of the popover component, for the md size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{calc(var(--padding-bottom) * 3 / 4)} * #{size-multiplier(\'md\')})',
                        description: 'The padding bottom of the popover component, for the md size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'md\')})',
                        description: 'The padding left of the popover component, for the md size variant'
                    },
                    {
                        name: 'header--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'md\')})',
                        description: 'The padding bottom of the popover component header, for the md size variant'
                    },
                    {
                        name: 'header--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'md\')})',
                        description: 'The padding left of the popover component header, for the md size variant'
                    },
                    {
                        name: 'body--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'md\')})',
                        description: 'The padding bottom of the popover component body, for the md size variant'
                    },
                    {
                        name: 'body--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'md\')})',
                        description: 'The padding left of the popover component body, for the md size variant'
                    },
                    {
                        name: 'footer--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'md\')})',
                        description: 'The padding bottom of the popover component footer, for the md size variant'
                    },
                    {
                        name: 'footer--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'md\')})',
                        description: 'The padding left of the popover component footer, for the md size variant'
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
                        description: 'The border top left radius of the popover component, for the lg size variant'
                    },
                    {
                        name: 'border-top-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-top-right-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border top right radius of the popover component, for the lg size variant'
                    },
                    {
                        name: 'border-bottom-right-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-right-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border bottom right radius of the popover component, for the lg size variant'
                    },
                    {
                        name: 'border-bottom-left-radius',
                        type: '',
                        value: 'calc(#{var(--border-bottom-left-radius)} * #{size-multiplier(\'lg\')})',
                        description: 'The border bottom left radius of the popover component, for the lg size variant'
                    },
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'lg\')})',
                        description: 'The font size of the popover component, for the lg size variant'
                    },
                    {
                        name: 'margin-top',
                        type: '',
                        value: 'calc(#{calc(var(--margin-top) / 2)} * #{size-multiplier(\'lg\')})',
                        description: 'The margin top of the popover component, for the lg size variant'
                    },
                    {
                        name: 'margin-right',
                        type: '',
                        value: 'calc(#{calc(var(--margin-right) / 2)} * #{size-multiplier(\'lg\')})',
                        description: 'The margin right of the popover component, for the lg size variant'
                    },
                    {
                        name: 'margin-bottom',
                        type: '',
                        value: 'calc(#{calc(var(--margin-bottom) / 2)} * #{size-multiplier(\'lg\')})',
                        description: 'The margin bottom of the popover component, for the lg size variant'
                    },
                    {
                        name: 'margin-left',
                        type: '',
                        value: 'calc(#{calc(var(--margin-left) / 2)} * #{size-multiplier(\'lg\')})',
                        description: 'The margin left of the popover component, for the lg size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{calc(var(--padding-top) * 3 / 4)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding top of the popover component, for the lg size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding right of the popover component, for the lg size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{calc(var(--padding-bottom) * 3 / 4)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding bottom of the popover component, for the lg size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding left of the popover component, for the lg size variant'
                    },
                    {
                        name: 'header--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding bottom of the popover component header, for the lg size variant'
                    },
                    {
                        name: 'header--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding left of the popover component header, for the lg size variant'
                    },
                    {
                        name: 'body--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding bottom of the popover component body, for the lg size variant'
                    },
                    {
                        name: 'body--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding left of the popover component body, for the lg size variant'
                    },
                    {
                        name: 'footer--padding-bottom',
                        type: '',
                        value: 'calc(#{var(----padding-bottom)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding bottom of the popover component footer, for the lg size variant'
                    },
                    {
                        name: 'footer--padding-left',
                        type: '',
                        value: 'calc(#{var(----padding-left)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding left of the popover component footer, for the lg size variant'
                    }
                ]
            }
        ]
    }
};

export default manifest;
