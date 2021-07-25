module.exports = {
    name: 'popover',
    slots: [
        {
            name: 'default',
            description: 'Slot for tooltip trigger',
            type: []
        },
        {
            name: 'header',
            description: 'Slot for tooltip header content',
            type: []
        },
        {
            name: 'body',
            description: 'Slot for tooltip body content',
            type: []
        },
        {
            name: 'footer',
            description: 'Slot for tooltip footer content',
            type: []
        }
    ],
    events: [
        {
            name: 'update:modelValue',
            description: 'Event emitted for setting the modelValue',
            type: []
        }
    ],
    props: [
        {
            name: 'color',
            description: 'The color variant of the popover',
            type: [
                'light',
                'dark'
            ],
            default: 'light'
        },
        {
            name: 'disabled',
            description: 'The disabled state of the popover',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'modelValue',
            description: 'Used to manually control the visibility of the popover',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'arrow',
            description: 'Displays an arrow on the popover pointing to the trigger element',
            type: [
                'Boolean'
            ],
            default: 'true'
        },
        {
            name: 'placement',
            description: 'The placement of the popover',
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
            default: 'false'
        },
        {
            name: 'trigger',
            description: 'The events used to trigger the popover',
            type: [
                'hover',
                'focus',
                'click',
                'manual'
            ],
            default: '[click]'
        },
        {
            name: 'offset',
            description: 'The offset of the popover relative to the trigger element',
            type: [
                'Number'
            ],
            default: '6'
        },
        {
            name: 'popperOptions',
            description: 'Used to override the popper.js options used for creating the popover',
            type: [
                'Object'
            ],
            default: '{}'
        },
        {
            name: 'size',
            description: 'The size variant of the popover',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md'
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
                description: 'The background of the popover component',
                type: 'color',
                variants: {
                    light: 'color(\'white\')',
                    dark: 'color(\'dark\')'
                }
            },
            {
                name: 'border-color',
                description: 'The border-color of the popover component',
                type: 'color',
                variants: {
                    light: 'color(\'light\')',
                    dark: 'color(\'dark-60\')'
                }
            },
            {
                name: 'border-style',
                description: 'The border style of the popover component',
                value: 'var(--border-style)'
            },
            {
                name: 'border-top-width',
                description: 'The border top width of the popover component',
                value: 'var(--border-top-width)'
            },
            {
                name: 'border-right-width',
                description: 'The border right width of the popover component',
                value: 'var(--border-right-width)'
            },
            {
                name: 'border-bottom-width',
                description: 'The border bottom width of the popover component',
                value: 'var(--border-bottom-width)'
            },
            {
                name: 'border-left-width',
                description: 'The border left width of the popover component',
                value: 'var(--border-left-width)'
            },
            {
                name: 'border-width',
                description: 'The border width of the popover component',
                value: ['var(----border-top-width)', 'var(----border-right-width)', 'var(----border-bottom-width)', 'var(----border-left-width)']
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                description: 'The border top left radius of the popover component',
                value: 'var(--border-top-left-radius)'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                description: 'The border top right radius of the popover component',
                value: 'var(--border-top-right-radius)'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                description: 'The border bottom right radius of the popover component',
                value: 'var(--border-bottom-right-radius)'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                description: 'The border bottom left radius of the popover component',
                value: 'var(--border-bottom-left-radius)'
            },
            {
                name: 'border-radius',
                description: 'The border radius of the popover component',
                value: ['var(----border-top-left-radius)', 'var(----border-top-right-radius)', 'var(----border-bottom-right-radius)', 'var(----border-bottom-left-radius)']
            },
            {
                name: 'box-shadow-offset-x',
                description: 'The box shadow horizontal offset of the popover component',
                value: 'var(--box-shadow-offset-x)'
            },
            {
                name: 'box-shadow-offset-y',
                description: 'The box shadow vertical offset of the popover component',
                value: 'var(--box-shadow-offset-y)'
            },
            {
                name: 'box-shadow-blur-radius',
                description: 'The box shadow blur radius of the popover component',
                value: 'var(--box-shadow-blur-radius)'
            },
            {
                name: 'box-shadow-spread-radius',
                description: 'The box shadow spread radius of the popover component',
                value: 'var(--box-shadow-spread-radius)'
            },
            {
                name: 'box-shadow-color',
                description: 'The box shadow spread radius of the popover component',
                value: 'var(--box-shadow-color)'
            },
            {
                name: 'box-shadow',
                description: 'The box shadow of the popover component',
                value: ['var(----box-shadow-offset-x)', 'var(----box-shadow-offset-y)', 'var(----box-shadow-blur-radius)', 'var(----box-shadow-spread-radius)', 'var(----box-shadow-color)']
            },
            {
                name: 'color',
                description: 'The color of the popover component item',
                type: 'color',
                variants: {
                    light: 'contrast-color($color-white)',
                    dark: 'contrast-color($color-dark)'
                }
            },
            {
                name: 'font-size',
                description: 'The font size of the popover component',
                type: 'size',
                value: 'font-size()'
            },
            {
                name: 'font-weight',
                description: 'The font weight of the popover component',
                value: 'font-weight(\'normal\')'
            },
            {
                name: 'line-height',
                description: 'The line height of the popover component',
                value: 'var(--line-height)'
            },

            {
                name: 'margin-top',
                type: 'size',
                description: 'The margin top of the popover component',
                value: 'calc(var(--margin-top) / 2)'
            },
            {
                name: 'margin-right',
                type: 'size',
                description: 'The margin right of the popover component',
                value: 'calc(var(--margin-right) / 2)'
            },
            {
                name: 'margin-bottom',
                type: 'size',
                description: 'The margin bottom of the popover component',
                value: 'calc(var(--margin-bottom) / 2)'
            },
            {
                name: 'margin-left',
                type: 'size',
                description: 'The margin left of the popover component',
                value: 'calc(var(--margin-left) / 2)'
            },
            {
                name: 'margin',
                description: 'The margin of the popover component',
                value: ['var(----margin-top)', 'var(----margin-right)', 'var(----margin-bottom)', 'var(----margin-left)']
            },
            {
                name: 'padding-top',
                type: 'size',
                description: 'The padding top of the popover component',
                value: 'calc(var(--padding-top) * 3 / 4)'
            },
            {
                name: 'padding-right',
                type: 'size',
                description: 'The padding right of the popover component',
                value: 'var(--padding-right)'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                description: 'The padding bottom of the popover component',
                value: 'calc(var(--padding-bottom) * 3 / 4)'
            },
            {
                name: 'padding-left',
                type: 'size',
                description: 'The padding left of the popover component',
                value: 'var(--padding-left)'
            },
            {
                name: 'padding',
                description: 'The padding of the popover component',
                value: ['var(----padding-top)', 'var(----padding-right)', 'var(----padding-bottom)', 'var(----padding-left)']
            },
            {
                name: 'max-width',
                description: 'The maximum width of the popover component',
                value: '90vw'
            },
            {
                name: 'width',
                description: 'The width of the popover component',
                value: '280px'
            },
            {
                name: 'z-index',
                description: 'The z-index of the popover component',
                value: '2000'
            },
            {
                name: 'header--background',
                description: 'The background of the popover component header',
                type: 'color',
                variants: {
                    light: 'color(\'gray-05\')',
                    dark: 'color(\'dark-55\')'
                }
            },
            {
                name: 'header--border-color',
                description: 'The border color of the popover component header',
                value: 'var(----border-color)'
            },
            {
                name: 'header--border-style',
                description: 'The border style of the popover component header',
                value: 'var(----border-style)'
            },
            {
                name: 'header--border-top-width',
                description: 'The border top width of the popover component header',
                value: 'var(----border-top-width)'
            },
            {
                name: 'header--border-right-width',
                description: 'The border right width of the popover component header',
                value: 'var(----border-right-width)'
            },
            {
                name: 'header--border-bottom-width',
                description: 'The border bottom width of the popover component header',
                value: 'var(----border-bottom-width)'
            },
            {
                name: 'header--border-left-width',
                description: 'The border left width of the popover component header',
                value: 'var(----border-left-width)'
            },
            {
                name: 'header--border-width',
                description: 'The border width of the popover component header',
                value: ['var(----header--border-top-width)', 'var(----header--border-right-width)', 'var(----header--border-bottom-width)', 'var(----header--border-left-width)']
            },
            {
                name: 'header--color',
                description: 'The color of the popover component header',
                value: 'var(----color)'
            },
            {
                name: 'header--padding-top',
                description: 'The padding top of the popover component header',
                value: 'var(----padding-top)'
            },
            {
                name: 'header--padding-right',
                description: 'The padding right of the popover component header',
                value: 'var(----padding-right)'
            },
            {
                name: 'header--padding-bottom',
                type: 'size',
                description: 'The padding bottom of the popover component header',
                value: 'var(----padding-bottom)'
            },
            {
                name: 'header--padding-left',
                type: 'size',
                description: 'The padding left of the popover component header',
                value: 'var(----padding-left)'
            },
            {
                name: 'header--padding',
                description: 'The padding of the popover component header',
                value: ['var(----header--padding-top)', 'var(----header--padding-right)', 'var(----header--padding-bottom)', 'var(----header--padding-left)']
            },
            {
                name: 'body--background',
                description: 'The background of the popover component body',
                value: 'var(----background)'
            },
            {
                name: 'body--border-color',
                description: 'The border color of the popover component body',
                value: 'var(----border-color)'
            },
            {
                name: 'body--border-style',
                description: 'The border style of the popover component body',
                value: 'var(----border-style)'
            },
            {
                name: 'body--border-top-width',
                description: 'The border top width of the popover component body',
                value: 'var(----border-top-width)'
            },
            {
                name: 'body--border-right-width',
                description: 'The border right width of the popover component body',
                value: 'var(----border-right-width)'
            },
            {
                name: 'body--border-bottom-width',
                description: 'The border bottom width of the popover component body',
                value: 'var(----border-bottom-width)'
            },
            {
                name: 'body--border-left-width',
                description: 'The border left width of the popover component body',
                value: 'var(----border-left-width)'
            },
            {
                name: 'body--border-width',
                description: 'The border width of the popover component body',
                value: ['var(----body--border-top-width)', 'var(----body--border-right-width)', 'var(----body--border-bottom-width)', 'var(----body--border-left-width)']
            },
            {
                name: 'body--color',
                description: 'The color of the popover component body',
                value: 'var(----color)'
            },
            {
                name: 'body--padding-top',
                description: 'The padding top of the popover component body',
                value: 'var(----padding-top)'
            },
            {
                name: 'body--padding-right',
                description: 'The padding right of the popover component body',
                value: 'var(----padding-right)'
            },
            {
                name: 'body--padding-bottom',
                type: 'size',
                description: 'The padding bottom of the popover component body',
                value: 'var(----padding-bottom)'
            },
            {
                name: 'body--padding-left',
                type: 'size',
                description: 'The padding left of the popover component body',
                value: 'var(----padding-left)'
            },
            {
                name: 'body--padding',
                description: 'The padding of the popover component body',
                value: ['var(----body--padding-top)', 'var(----body--padding-right)', 'var(----body--padding-bottom)', 'var(----body--padding-left)']
            },
            {
                name: 'footer--background',
                description: 'The background of the popover component footer',
                type: 'color',
                variants: {
                    light: 'color(\'gray-05\')',
                    dark: 'color(\'dark-55\')'
                }
            },
            {
                name: 'footer--border-color',
                description: 'The border color of the popover component footer',
                value: 'var(----border-color)'
            },
            {
                name: 'footer--border-style',
                description: 'The border style of the popover component footer',
                value: 'var(----border-style)'
            },
            {
                name: 'footer--border-top-width',
                description: 'The border top width of the popover component footer',
                value: 'var(----border-top-width)'
            },
            {
                name: 'footer--border-right-width',
                description: 'The border right width of the popover component footer',
                value: 'var(----border-right-width)'
            },
            {
                name: 'footer--border-bottom-width',
                description: 'The border bottom width of the popover component footer',
                value: 'var(----border-bottom-width)'
            },
            {
                name: 'footer--border-left-width',
                description: 'The border left width of the popover component footer',
                value: 'var(----border-left-width)'
            },
            {
                name: 'footer--border-width',
                description: 'The border width of the popover component footer',
                value: ['var(----footer--border-top-width)', 'var(----footer--border-right-width)', 'var(----footer--border-bottom-width)', 'var(----footer--border-left-width)']
            },
            {
                name: 'footer--color',
                description: 'The color of the popover component footer',
                value: 'var(----color)'
            },
            {
                name: 'footer--padding-top',
                description: 'The padding top of the popover component footer',
                value: 'var(----padding-top)'
            },
            {
                name: 'footer--padding-right',
                description: 'The padding right of the popover component footer',
                value: 'var(----padding-right)'
            },
            {
                name: 'footer--padding-bottom',
                type: 'size',
                description: 'The padding bottom of the popover component footer',
                value: 'var(----padding-bottom)'
            },
            {
                name: 'footer--padding-left',
                type: 'size',
                description: 'The padding left of the popover component footer',
                value: 'var(----padding-left)'
            },
            {
                name: 'footer--padding',
                description: 'The padding of the popover component footer',
                value: ['var(----footer--padding-top)', 'var(----footer--padding-right)', 'var(----footer--padding-bottom)', 'var(----footer--padding-left)']
            },
        ]
    }
};
