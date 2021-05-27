module.exports = {
	name: 'dropdown',
	slots: [
		{
			name: 'default',
			description: 'Slot for dropdown trigger',
			type: []
		},
		{
			name: 'header',
			description: 'Slot for dropdown header content',
			type: []
		},
		{
			name: 'body',
			description: 'Slot for dropdown body content',
			type: []
		},
		{
			name: 'footer',
			description: 'Slot for dropdown footer content',
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
			name: 'animationDuration',
			description: 'The duration of the hide and show animation',
			type: [
				'Number'
			],
			default: '300'
		},
		{
			name: 'color',
			description: 'The color variant of the dropdown',
			type: [
				'light',
				'dark'
			],
			default: 'light'
		},
		{
			name: 'disabled',
			description: 'The disabled state of the dropdown',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'hideOnItemClick',
			description: 'Used to hide the dropdown when clicking or selecting a dropdown item',
			type: [
				'Boolean'
			],
			default: 'false'
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
			description: 'The keydown events bound to the dropdown item elements',
			type: [
				'Array.<string>'
			],
			default: '[up, down, enter, space, tab, esc]'
		},
		{
			name: 'modelValue',
			description: 'Used to manually control the visibility of the dropdown',
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
			name: 'trigger',
			description: 'The events used to trigger the dropdown',
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
			description: 'The offset of the dropdown relative to the trigger element',
			type: [
				'Number'
			],
			default: '6'
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
			name: 'size',
			description: 'The size variant of the dropdown',
			type: [
				'sm',
				'md',
				'lg'
			],
			default: 'md'
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
                description: 'The background of the dropdown component',
                type: 'color',
                variants: {
                    light: 'color(\'white\')',
                    dark: 'color(\'dark\')'
                }
            },
            {
                name: 'background--active',
                description: 'The background of the dropdown component when active',
                type: 'color',
                variants: {
                    light: 'color(\'light-25\')',
                    dark: 'color(\'dark-45\')'
                }
            },
            {
                name: 'background--disabled',
                description: 'The background of the dropdown component when disabled',
                type: 'color',
                variants: {
                    light: 'transparent',
                    dark: 'transparent'
                }
            },
            {
                name: 'background--hover',
                description: 'The background of the dropdown component when hovered or focused',
                type: 'color',
                variants: {
                    light: 'color(\'light-25\')',
                    dark: 'color(\'dark-45\')'
                }
            },
            {
                name: 'border-color',
                description: 'The border-color of the dropdown component',
                type: 'color',
                variants: {
                    light: 'color(\'light\')',
                    dark: 'color(\'dark-60\')'
                }
            },
            {
                name: 'border-style',
                description: 'The border style of the dropdown component',
                value: 'var(--border-style)'
            },
            {
                name: 'border-top-width',
                description: 'The border top width of the dropdown component',
                value: 'var(--border-top-width)'
            },
            {
                name: 'border-right-width',
                description: 'The border right width of the dropdown component',
                value: 'var(--border-right-width)'
            },
            {
                name: 'border-bottom-width',
                description: 'The border bottom width of the dropdown component',
                value: 'var(--border-bottom-width)'
            },
            {
                name: 'border-left-width',
                description: 'The border left width of the dropdown component',
                value: 'var(--border-left-width)'
            },
            {
                name: 'border-width',
                description: 'The border width of the dropdown component',
                value: ['var(----border-top-width)', 'var(----border-right-width)', 'var(----border-bottom-width)', 'var(----border-left-width)']
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                description: 'The border top left radius of the dropdown component',
                value: 'var(--border-top-left-radius)'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                description: 'The border top right radius of the dropdown component',
                value: 'var(--border-top-right-radius)'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                description: 'The border bottom right radius of the dropdown component',
                value: 'var(--border-bottom-right-radius)'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                description: 'The border bottom left radius of the dropdown component',
                value: 'var(--border-bottom-left-radius)'
            },
            {
                name: 'border-radius',
                description: 'The border radius of the dropdown component',
                value: ['var(----border-top-left-radius)', 'var(----border-top-right-radius)', 'var(----border-bottom-right-radius)', 'var(----border-bottom-left-radius)']
            },
            {
                name: 'box-shadow-offset-x',
                description: 'The box shadow horizontal offset of the dropdown component',
                value: 'var(--box-shadow-offset-x)'
            },
            {
                name: 'box-shadow-offset-y',
                description: 'The box shadow vertical offset of the dropdown component',
                value: 'var(--box-shadow-offset-y)'
            },
            {
                name: 'box-shadow-blur-radius',
                description: 'The box shadow blur radius of the dropdown component',
                value: 'var(--box-shadow-blur-radius)'
            },
            {
                name: 'box-shadow-spread-radius',
                description: 'The box shadow spread radius of the dropdown component',
                value: 'var(--box-shadow-spread-radius)'
            },
            {
                name: 'box-shadow-color',
                description: 'The box shadow spread radius of the dropdown component',
                value: 'var(--box-shadow-color)'
            },
            {
                name: 'box-shadow',
                description: 'The box shadow of the dropdown component',
                value: ['var(----box-shadow-offset-x)', 'var(----box-shadow-offset-y)', 'var(----box-shadow-blur-radius)', 'var(----box-shadow-spread-radius)', 'var(----box-shadow-color)']
            },

            {
                name: 'color',
                description: 'The color of the dropdown component item',
                type: 'color',
                variants: {
                    light: 'contrast-color($color-white)',
                    dark: 'contrast-color($color-dark)'
                }
            },
            {
                name: 'color--active',
                description: 'The color of the dropdown component item when active',
                type: 'color',
                variants: {
                    light: 'var(--dropdown-color-variant-light-color)',
                    dark: 'var(--dropdown-color-variant-dark-color)'
                }
            },
            {
                name: 'color--disabled',
                description: 'The color of the dropdown component item when disabled',
                type: 'color',
                variants: {
                    light: 'color(\'light-65\')',
                    dark: 'color(\'dark-25\')'
                }
            },
            {
                name: 'color--hover',
                description: 'The color of the dropdown component item when hovered or focused',
                type: 'color',
                variants: {
                    light: 'var(--dropdown-color-variant-light-color)',
                    dark: 'var(--dropdown-color-variant-dark-color)'
                }
            },
            {
                name: 'font-weight',
                description: 'The font weight of the dropdown component',
                value: 'font-weight(\'normal\')'
            },
            {
                name: 'font-size',
                description: 'The font size of the dropdown component',
                type: 'size',
                value: 'font-size()'
            },
            {
                name: 'line-height',
                description: 'The line height of the dropdown component',
                value: 'var(--line-height)'
            },
            {
                name: 'min-width',
                description: 'The minimum width of the dropdown component',
                value: '240px'
            },
            {
                name: 'max-width',
                description: 'The maximum width of the dropdown component',
                value: '90vw'
            },
            {
                name: 'padding-top',
                type: 'size',
                description: 'The padding top of the dropdown component items',
                value: 'var(--padding-top)'
            },
            {
                name: 'padding-right',
                type: 'size',
                description: 'The padding right of the dropdown component items',
                value: 'var(--padding-right)'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                description: 'The padding bottom of the dropdown component items',
                value: 'var(--padding-bottom)'
            },
            {
                name: 'padding-left',
                type: 'size',
                description: 'The padding left of the dropdown component items',
                value: 'var(--padding-left)'
            },
            {
                name: 'padding',
                description: 'The padding of the dropdown component items',
                value: ['var(----padding-top)', 'var(----padding-right)', 'var(----padding-bottom)', 'var(----padding-left)']
            },
            {
                name: 'z-index',
                description: 'The z-index of the dropdown component',
                value: '2000'
            },
            {
                name: 'divider--margin-top',
                description: 'The margin top of the dropdown component divider',
                value: 'calc(var(--margin-top) / 2)'
            },
            {
                name: 'divider--margin-bottom',
                description: 'The margin bottom of the dropdown component divider',
                value: 'calc(var(--margin-bottom) / 2)'
            },
            {
                name: 'item--padding-top',
                type: 'size',
                description: 'The padding top of the dropdown component item',
                value: 'calc(var(----padding-top) / 2)'
            },
            {
                name: 'item--padding-right',
                type: 'size',
                description: 'The padding right of the dropdown component item',
                value: 'var(----padding-right)'
            },
            {
                name: 'item--padding-bottom',
                type: 'size',
                description: 'The padding bottom of the dropdown component item',
                value: 'calc(var(----padding-bottom) / 2)'
            },
            {
                name: 'item--padding-left',
                type: 'size',
                description: 'The padding left of the dropdown component item',
                value: 'var(----padding-left)'
            },
            {
                name: 'item--padding',
                description: 'The padding of the dropdown component item',
                value: ['var(----item--padding-top)', 'var(----item--padding-right)', 'var(----item--padding-bottom)', 'var(----item--padding-left)']
            },
            {
                name: 'header--background',
                description: 'The background of the dropdown component header',
                type: 'color',
                variants: {
                    light: 'color(\'gray-05\')',
                    dark: 'color(\'dark-55\')'
                }
            },
            {
                name: 'header--padding-top',
                type: 'size',
                description: 'The padding top of the dropdown component header',
                value: 'var(----padding-top)'
            },
            {
                name: 'header--padding-right',
                type: 'size',
                description: 'The padding right of the dropdown component header',
                value: 'var(----padding-right)'
            },
            {
                name: 'header--padding-bottom',
                type: 'size',
                description: 'The padding bottom of the dropdown component header',
                value: 'var(----padding-bottom)'
            },
            {
                name: 'header--padding-left',
                type: 'size',
                description: 'The padding left of the dropdown component header',
                value: 'var(----padding-left)'
            },
            {
                name: 'header--padding',
                description: 'The padding of the dropdown component header',
                value: ['var(----header--padding-top)', 'var(----header--padding-right)', 'var(----header--padding-bottom)', 'var(----header--padding-left)']
            },
            {
                name: 'body--padding-top',
                type: 'size',
                description: 'The padding top of the dropdown component body',
                value: 'var(----padding-top)'
            },
            {
                name: 'body--padding-right',
                type: 'size',
                description: 'The padding right of the dropdown component body',
                value: '0'
            },
            {
                name: 'body--padding-bottom',
                type: 'size',
                description: 'The padding bottom of the dropdown component body',
                value: 'var(----padding-bottom)'
            },
            {
                name: 'body--padding-left',
                type: 'size',
                description: 'The padding left of the dropdown component body',
                value: '0'
            },
            {
                name: 'body--padding',
                description: 'The padding of the dropdown component body',
                value: ['var(----body--padding-top)', 'var(----body--padding-right)', 'var(----body--padding-bottom)', 'var(----body--padding-left)']
            },
            {
                name: 'footer--background',
                description: 'The background of the dropdown component footer',
                type: 'color',
                variants: {
                    light: 'color(\'gray-05\')',
                    dark: 'color(\'dark-55\')'
                }
            },
            {
                name: 'footer--padding-top',
                type: 'size',
                description: 'The padding top of the dropdown component footer',
                value: 'var(----padding-top)'
            },
            {
                name: 'footer--padding-right',
                type: 'size',
                description: 'The padding right of the dropdown component footer',
                value: 'var(----padding-right)'
            },
            {
                name: 'footer--padding-bottom',
                type: 'size',
                description: 'The padding bottom of the dropdown component footer',
                value: 'var(----padding-bottom)'
            },
            {
                name: 'footer--padding-left',
                type: 'size',
                description: 'The padding left of the dropdown component footer',
                value: 'var(----padding-left)'
            },
            {
                name: 'footer--padding',
                description: 'The padding of the dropdown component footer',
                value: ['var(----footer--padding-top)', 'var(----footer--padding-right)', 'var(----footer--padding-bottom)', 'var(----footer--padding-left)']
            }
        ]
    }
};
