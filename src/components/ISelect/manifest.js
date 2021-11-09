module.exports = {
    name: 'select',
    slots: [
        {
            name: 'prefix',
            description: 'Slot for the select prefix content',
            type: []
        },
        {
            name: 'suffix',
            description: 'Slot for the select suffix content',
            type: []
        },
        {
            name: 'prepend',
            description: 'Slot for the select prepend content',
            type: []
        },
        {
            name: 'append',
            description: 'Slot for the select append content',
            type: []
        },
        {
            name: 'clearable',
            description: 'Slot for the clearable button',
            type: []
        }
    ],
    events: [
        {
            name: 'update:modelValue',
            description: 'Event emitted for setting the modelValue',
            type: []
        },
        {
            name: 'search',
            description: 'Event emitted when input value changes',
            type: []
        },
        {
            name: 'pagination',
            description: 'Event emitted when the next page needs to be loaded',
            type: []
        }
    ],
    props: [
        {
            name: 'animationDuration',
            description: 'The duration of the hide and show animation',
            type: [
                'Number'
            ],
            default: '300'
        },
        {
            name: 'autocomplete',
            description: 'Enable autocomplete functionality',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'arrow',
            description: 'Displays an arrow on the dropdown pointing to the trigger element',
            type: [
                'Boolean'
            ],
            default: 'true'
        },
        {
            name: 'color',
            description: 'The color variant of the select',
            type: [
                'light',
                'dark'
            ],
            default: 'light'
        },
        {
            name: 'clearable',
            description: 'Display the select as clearable',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'disabled',
            description: 'The disabled state of the select',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'idField',
            description: 'The field to be used for identifying the options',
            type: [
                'String'
            ],
            default: 'id'
        },
        {
            name: 'keydownTrigger',
            description: 'The keydown events bound to the trigger element',
            type: [
                'Array.<string>'
            ],
            default: '[up, down, enter, space, tab, esc]'
        },
        {
            name: 'keydownItem',
            description: 'The keydown events bound to the select option elements',
            type: [
                'Array.<string>'
            ],
            default: '[up, down, enter, space, tab, esc]'
        },
        {
            name: 'label',
            description: 'Used to extract the label from the select option and select value',
            type: [
                'String',
                'function'
            ],
            default: 'label'
        },
        {
            name: 'loading',
            description: 'The loading state of the select',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'modelValue',
            description: 'Used to set the field value',
            type: [
                'Object'
            ],
            default: 'null'
        },
        {
            name: 'minLength',
            description: 'The minimum input length to open the select dropdown at',
            type: [
                'Number'
            ],
            default: '0'
        },
        {
            name: 'name',
            description: 'The unique identifier of the select',
            type: [
                'String'
            ],
            default: 'uid()'
        },
        {
            name: 'options',
            description: 'The options to be displayed in the select component',
            type: [
                'Array'
            ],
            default: '[]'
        },
        {
            name: 'placeholder',
            description: 'The placeholder of the select input',
            type: [
                'String'
            ],
            default: '\'\''
        },
        {
            name: 'offset',
            description: 'The offset of the dropdown relative to the trigger element',
            type: [
                'Number'
            ],
            default: '6'
        },
        {
            name: 'placement',
            description: 'The placement of the dropdown',
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
            name: 'popperOptions',
            description: 'Used to override the popper.js options used for creating the dropdown',
            type: [
                'Object'
            ],
            default: '{}'
        },
        {
            name: 'readonly',
            description: 'The readonly state of the select',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'scrollTolerance',
            description: 'The number of pixels until scroll end before loading the next page',
            type: [
                'Number'
            ],
            default: '160'
        },
        {
            name: 'selectFirstOptionOnEnter',
            description: 'Selects the first option when pressing enter',
            type: [
                'Boolean'
            ],
            default: 'true'
        },
        {
            name: 'size',
            description: 'The size variant of the select',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md'
        },
        {
            name: 'tabindex',
            description: 'The tabindex of the select',
            type: [
                'Number',
                'String'
            ],
            default: '1'
        },
        {
            name: 'type',
            description: 'The type of the select',
            type: [
                'String'
            ],
            default: 'text'
        },
        {
            name: 'total',
            description: 'The total number of options, used for infinite scrolling',
            type: [
                'Number'
            ],
            default: 'undefined'
        }
    ],
    css: {
        selector: '.select-wrapper',
        type: 'form',
        defaults: {
            size: 'md',
            color: 'light'
        },
        variables: [
            {
                name: 'background',
                description: 'The background of the select component',
                type: 'color',
                variants: {
                    light: 'color(\'white\')',
                    dark: 'color(\'dark\')'
                }
            },
            {
                name: 'border-top-color',
                description: 'The border top color of the select component',
                type: 'color',
                variants: {
                    light: 'color(\'light-55\')',
                    dark: 'color(\'dark-45\')'
                }
            },
            {
                name: 'border-right-color',
                description: 'The border right color of the select component',
                type: 'color',
                variants: {
                    light: 'color(\'light-55\')',
                    dark: 'color(\'dark-45\')'
                }
            },
            {
                name: 'border-bottom-color',
                description: 'The border bottom color of the select component',
                type: 'color',
                variants: {
                    light: 'color(\'light-55\')',
                    dark: 'color(\'dark-45\')'
                }
            },
            {
                name: 'border-left-color',
                description: 'The border left color of the select component',
                type: 'color',
                variants: {
                    light: 'color(\'light-55\')',
                    dark: 'color(\'dark-45\')'
                }
            },
            {
                name: 'border-color',
                description: 'The border color of the select component',
                value: ['var(----border-top-color)', 'var(----border-right-color)', 'var(----border-bottom-color)', 'var(----border-left-color)']
            },
            {
                name: 'border-style',
                description: 'The border style of the select component',
                value: 'var(--border-style)'
            },
            {
                name: 'border-top-width',
                description: 'The border top width of the select component',
                value: 'var(--border-top-width)'
            },
            {
                name: 'border-right-width',
                description: 'The border right width of the select component',
                value: 'var(--border-right-width)'
            },
            {
                name: 'border-bottom-width',
                description: 'The border bottom width of the select component',
                value: 'var(--border-bottom-width)'
            },
            {
                name: 'border-left-width',
                description: 'The border left width of the select component',
                value: 'var(--border-left-width)'
            },
            {
                name: 'border-width',
                description: 'The border width of the select component',
                value: ['var(----border-top-width)', 'var(----border-right-width)', 'var(----border-bottom-width)', 'var(----border-left-width)']
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                description: 'The border top left radius of the select component',
                value: 'var(--border-top-left-radius)'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                description: 'The border top right radius of the select component',
                value: 'var(--border-top-right-radius)'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                description: 'The border bottom right radius of the select component',
                value: 'var(--border-bottom-right-radius)'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                description: 'The border bottom left radius of the select component',
                value: 'var(--border-bottom-left-radius)'
            },
            {
                name: 'border-radius',
                description: 'The border radius of the select component',
                value: ['var(----border-top-left-radius)', 'var(----border-top-right-radius)', 'var(----border-bottom-right-radius)', 'var(----border-bottom-left-radius)']
            },
            {
                name: 'box-shadow-offset-x',
                description: 'The box shadow horizontal offset of the select component',
                value: 'var(--box-shadow-offset-x)'
            },
            {
                name: 'box-shadow-offset-y',
                description: 'The box shadow vertical offset of the select component',
                value: 'var(--box-shadow-offset-y)'
            },
            {
                name: 'box-shadow-blur-radius',
                description: 'The box shadow blur radius of the select component',
                value: 'var(--box-shadow-blur-radius)'
            },
            {
                name: 'box-shadow-spread-radius',
                description: 'The box shadow spread radius of the select component',
                value: 'var(--box-shadow-spread-radius)'
            },
            {
                name: 'box-shadow-color',
                description: 'The box shadow spread radius of the select component',
                value: 'var(--box-shadow-color)'
            },
            {
                name: 'box-shadow',
                description: 'The box shadow of the select component',
                value: ['var(----box-shadow-offset-x)', 'var(----box-shadow-offset-y)', 'var(----box-shadow-blur-radius)', 'var(----box-shadow-spread-radius)', 'var(----box-shadow-color)']
            },
            {
                name: 'color',
                description: 'The color of the select component item',
                type: 'color',
                variants: {
                    light: 'contrast-color($color-white)',
                    dark: 'contrast-color($color-dark)'
                }
            },
            {
                name: 'font-size',
                description: 'The font size of the select component',
                type: 'size',
                value: 'font-size()'
            },
            {
                name: 'font-weight',
                description: 'The font weight of the select component',
                value: 'font-weight(\'normal\')'
            },
            {
                name: 'line-height',
                description: 'The line height of the select component',
                value: 'var(--line-height)'
            },
            {
                name: 'margin-top',
                type: 'size',
                description: 'The margin top of the select component',
                value: 'calc(var(--margin-top) / 2)'
            },
            {
                name: 'margin-right',
                type: 'size',
                description: 'The margin right of the select component',
                value: 'calc(var(--margin-right) / 2)'
            },
            {
                name: 'margin-bottom',
                type: 'size',
                description: 'The margin bottom of the select component',
                value: 'calc(var(--margin-bottom) / 2)'
            },
            {
                name: 'margin-left',
                type: 'size',
                description: 'The margin left of the select component',
                value: 'calc(var(--margin-left) / 2)'
            },
            {
                name: 'margin',
                description: 'The margin of the select component',
                value: ['var(----margin-top)', 'var(----margin-right)', 'var(----margin-bottom)', 'var(----margin-left)']
            },
            {
                name: 'padding-top',
                type: 'size',
                description: 'The padding top of the select component',
                value: 'var(--padding-top)'
            },
            {
                name: 'padding-right',
                type: 'size',
                description: 'The padding right of the select component',
                value: 'var(--padding-right)'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                description: 'The padding bottom of the select component',
                value: 'var(--padding-bottom)'
            },
            {
                name: 'padding-left',
                type: 'size',
                description: 'The padding left of the select component',
                value: 'var(--padding-left)'
            },
            {
                name: 'padding',
                description: 'The padding of the select component',
                value: ['var(----padding-top)', 'var(----padding-right)', 'var(----padding-bottom)', 'var(----padding-left)']
            },
            {
                name: 'min-width',
                description: 'The minimum width of the select component',
                value: '240px'
            },
            {
                name: 'max-width',
                description: 'The maximum width of the select component',
                value: '90vw'
            },
            {
                name: 'max-height',
                description: 'The maximum height of the select component body',
                value: '300px'
            },
            {
                name: 'z-index',
                description: 'The z-index of the select component',
                value: '2000'
            },
            {
                name: 'option--background',
                description: 'The background of the select component option',
                value: 'var(----background)'
            },
            {
                name: 'option--background--hover',
                description: 'The background of the select component option when hovered or focused',
                type: 'color',
                variants: {
                    light: 'color(\'light-25\')',
                    dark: 'color(\'dark-45\')'
                }
            },
            {
                name: 'option--background--active',
                description: 'The background of the select component option when active',
                value: 'var(----option-background--active)'
            },
            {
                name: 'option--background--disabled',
                description: 'The background of the select component option when disabled',
                type: 'color',
                variants: {
                    light: 'transparent',
                    dark: 'transparent'
                }
            },
            {
                name: 'option--border-top-left-radius',
                description: 'The border top left radius of the modal component',
                value: '0'
            },
            {
                name: 'option--border-top-right-radius',
                description: 'The border top right radius of the modal component',
                value: '0'
            },
            {
                name: 'option--border-bottom-right-radius',
                description: 'The border bottom right radius of the modal component',
                value: '0'
            },
            {
                name: 'option--border-bottom-left-radius',
                description: 'The border bottom left radius of the modal component',
                value: '0'
            },
            {
                name: 'option--border-radius',
                description: 'The border radius of the modal component',
                value: ['var(----option--border-top-left-radius)', 'var(----option--border-top-right-radius)', 'var(----option--border-bottom-right-radius)', 'var(----option--border-bottom-left-radius)']
            },
            {
                name: 'option--color',
                description: 'The color of the select component option',
                value: 'var(----color)'
            },
            {
                name: 'option--color--hover',
                description: 'The color of the select component option when hovered or focused',
                value: 'var(----option--color)'
            },
            {
                name: 'option--color--active',
                description: 'The color of the select component option when active',
                value: 'var(----option--color)'
            },
            {
                name: 'option--color--disabled',
                description: 'The color of the select component option when disabled',
                type: 'color',
                variants: {
                    light: 'color(\'light-65\')',
                    dark: 'color(\'dark-25\')'
                }
            },
            {
                name: 'option--padding-top',
                description: 'The padding top of the select component option',
                value: 'calc(var(----padding-top) / 2)'
            },
            {
                name: 'option--padding-right',
                description: 'The padding right of the select component option',
                value: 'var(----padding-right)'
            },
            {
                name: 'option--padding-bottom',
                type: 'size',
                description: 'The padding bottom of the select component option',
                value: 'calc(var(----padding-bottom) / 2)'
            },
            {
                name: 'option--padding-left',
                type: 'size',
                description: 'The padding left of the select component option',
                value: 'var(----padding-left)'
            },
            {
                name: 'option--padding',
                description: 'The padding of the select component option',
                value: ['var(----option--padding-top)', 'var(----option--padding-right)', 'var(----option--padding-bottom)', 'var(----option--padding-left)']
            },
            {
                name: 'divider--margin',
                description: 'The margin of the select component divider',
                value: 'spacing(\'1/2\')'
            },
            {
                name: 'header--background',
                description: 'The background of the select component header',
                type: 'color',
                variants: {
                    light: 'color(\'gray-05\')',
                    dark: 'color(\'dark-55\')'
                }
            },
            {
                name: 'header--border-color',
                description: 'The border color of the select component header',
                value: 'var(----border-color)'
            },
            {
                name: 'header--border-style',
                description: 'The border style of the select component header',
                value: 'var(----border-style)'
            },
            {
                name: 'header--border-top-width',
                description: 'The border top width of the select component header',
                value: 'var(----border-top-width)'
            },
            {
                name: 'header--border-right-width',
                description: 'The border right width of the select component header',
                value: 'var(----border-right-width)'
            },
            {
                name: 'header--border-bottom-width',
                description: 'The border bottom width of the select component header',
                value: '0'
            },
            {
                name: 'header--border-left-width',
                description: 'The border left width of the select component header',
                value: 'var(----border-left-width)'
            },
            {
                name: 'header--border-width',
                description: 'The border width of the select component header',
                value: ['var(----header--border-top-width)', 'var(----header--border-right-width)', 'var(----header--border-bottom-width)', 'var(----header--border-left-width)']
            },
            {
                name: 'header--color',
                description: 'The color of the select component header',
                value: 'var(----color)'
            },
            {
                name: 'header--padding-top',
                description: 'The padding top of the select component header',
                value: 'calc(var(----padding-top) * 3 / 4)'
            },
            {
                name: 'header--padding-right',
                description: 'The padding right of the select component header',
                value: 'var(----padding-right)'
            },
            {
                name: 'header--padding-bottom',
                type: 'size',
                description: 'The padding bottom of the select component header',
                value: 'calc(var(----padding-bottom) * 3 / 4)'
            },
            {
                name: 'header--padding-left',
                type: 'size',
                description: 'The padding left of the select component header',
                value: 'var(----padding-left)'
            },
            {
                name: 'header--padding',
                description: 'The padding of the select component header',
                value: ['var(----header--padding-top)', 'var(----header--padding-right)', 'var(----header--padding-bottom)', 'var(----header--padding-left)']
            },
            {
                name: 'body--background',
                description: 'The background of the select component body',
                value: 'var(----background)'
            },
            {
                name: 'body--border-color',
                description: 'The border color of the select component body',
                value: 'var(----border-color)'
            },
            {
                name: 'body--border-style',
                description: 'The border style of the select component body',
                value: 'var(----border-style)'
            },
            {
                name: 'body--border-top-width',
                description: 'The border top width of the select component body',
                value: 'var(----border-top-width)'
            },
            {
                name: 'body--border-right-width',
                description: 'The border right width of the select component body',
                value: 'var(----border-right-width)'
            },
            {
                name: 'body--border-bottom-width',
                description: 'The border bottom width of the select component body',
                value: 'var(----border-bottom-width)'
            },
            {
                name: 'body--border-left-width',
                description: 'The border left width of the select component body',
                value: 'var(----border-left-width)'
            },
            {
                name: 'body--border-width',
                description: 'The border width of the select component body',
                value: ['var(----body--border-top-width)', 'var(----body--border-right-width)', 'var(----body--border-bottom-width)', 'var(----body--border-left-width)']
            },
            {
                name: 'body--color',
                description: 'The color of the select component body',
                value: 'var(----color)'
            },
            {
                name: 'body--padding-top',
                description: 'The padding top of the select component body',
                value: 'var(----padding-top)'
            },
            {
                name: 'body--padding-right',
                description: 'The padding right of the select component body',
                value: '0'
            },
            {
                name: 'body--padding-bottom',
                type: 'size',
                description: 'The padding bottom of the select component body',
                value: 'var(----padding-bottom)'
            },
            {
                name: 'body--padding-left',
                type: 'size',
                description: 'The padding left of the select component body',
                value: '0'
            },
            {
                name: 'body--padding',
                description: 'The padding of the select component body',
                value: ['var(----body--padding-top)', 'var(----body--padding-right)', 'var(----body--padding-bottom)', 'var(----body--padding-left)']
            },
            {
                name: 'footer--background',
                description: 'The background of the select component footer',
                type: 'color',
                variants: {
                    light: 'color(\'gray-05\')',
                    dark: 'color(\'dark-55\')'
                }
            },
            {
                name: 'footer--border-color',
                description: 'The border color of the select component footer',
                value: 'var(----border-color)'
            },
            {
                name: 'footer--border-style',
                description: 'The border style of the select component footer',
                value: 'var(----border-style)'
            },
            {
                name: 'footer--border-top-width',
                description: 'The border top width of the select component footer',
                value: 'var(----border-top-width)'
            },
            {
                name: 'footer--border-right-width',
                description: 'The border right width of the select component footer',
                value: 'var(----border-right-width)'
            },
            {
                name: 'footer--border-bottom-width',
                description: 'The border bottom width of the select component footer',
                value: 'var(----border-bottom-width)'
            },
            {
                name: 'footer--border-left-width',
                description: 'The border left width of the select component footer',
                value: 'var(----border-left-width)'
            },
            {
                name: 'footer--border-width',
                description: 'The border width of the select component footer',
                value: ['var(----footer--border-top-width)', 'var(----footer--border-right-width)', 'var(----footer--border-bottom-width)', 'var(----footer--border-left-width)']
            },
            {
                name: 'footer--color',
                description: 'The color of the select component footer',
                value: 'var(----color)'
            },
            {
                name: 'footer--padding-top',
                description: 'The padding top of the select component footer',
                value: 'calc(var(----padding-top) * 3 / 4)'
            },
            {
                name: 'footer--padding-right',
                description: 'The padding right of the select component footer',
                value: 'var(----padding-right)'
            },
            {
                name: 'footer--padding-bottom',
                type: 'size',
                description: 'The padding bottom of the select component footer',
                value: 'calc(var(----padding-bottom) * 3 / 4)'
            },
            {
                name: 'footer--padding-left',
                type: 'size',
                description: 'The padding left of the select component footer',
                value: 'var(----padding-left)'
            },
            {
                name: 'footer--padding',
                description: 'The padding of the select component footer',
                value: ['var(----footer--padding-top)', 'var(----footer--padding-right)', 'var(----footer--padding-bottom)', 'var(----footer--padding-left)']
            }
        ]
    }
};
