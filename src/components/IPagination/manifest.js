module.exports = {
	name: 'pagination',
	slots: [
		{
			name: 'previous',
			description: 'Slot for previous button content',
			type: []
		},
		{
			name: 'next',
			description: 'Slot for next button content',
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
			description: 'The color variant of the pagination',
			type: [
				'light',
				'dark'
			],
			default: 'light'
		},
		{
			name: 'itemsPerPage',
			description: 'The number of items per page to be displayed',
			type: [
				'Number'
			],
			default: '20'
		},
		{
			name: 'itemsTotal',
			description: 'The total number of items',
			type: [
				'Number'
			],
			default: '0'
		},
		{
			name: 'limit',
			description: 'The maximum number of pagination buttons to show on each breakpoint',
			type: [
				'Number',
				'Object'
			],
			default: '{\n    xs: 3,\n    sm: 5\n}'
		},
		{
			name: 'quickLink',
			description: 'Display the quick link buttons',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'modelValue',
			description: 'Used to determine the current page',
			type: [
				'Number'
			],
			default: '1'
		},
		{
			name: 'size',
			description: 'The size variant of the pagination',
			type: [
				'sm',
				'md',
				'lg'
			],
			default: 'md'
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
                description: 'The background of the pagination component item',
                type: 'color',
                variants: {
                    light: 'color(\'light\')',
                    dark: 'color(\'dark\')'
                }
            },
            {
                name: 'background--hover',
                description: 'The background of the pagination component item when hovered or focused',
                type: 'color',
                variants: {
                    light: 'color(\'light-55\')',
                    dark: 'color(\'dark-45\')'
                }
            },
            {
                name: 'background--active',
                description: 'The background of the pagination component item when active',
                type: 'color',
                variants: {
                    light: 'color(\'primary\')',
                    dark: 'color(\'primary\')'
                }
            },
            {
                name: 'border-color',
                description: 'The border color of the pagination component item',
                type: 'color',
                variants: {
                    light: 'color(\'light-55\')',
                    dark: 'color(\'dark-45\')'
                }
            },
            {
                name: 'border-color--active',
                description: 'The border color of the pagination component item when active',
                type: 'color',
                variants: {
                    light: 'color(\'primary-55\')',
                    dark: 'color(\'primary-55\')'
                }
            },
            {
                name: 'border-style',
                description: 'The border style of the pagination component',
                value: 'var(--border-style)'
            },
            {
                name: 'border-top-width',
                description: 'The border top width of the pagination component',
                value: 'var(--border-top-width)'
            },
            {
                name: 'border-right-width',
                description: 'The border right width of the pagination component',
                value: 'var(--border-right-width)'
            },
            {
                name: 'border-bottom-width',
                description: 'The border bottom width of the pagination component',
                value: 'var(--border-bottom-width)'
            },
            {
                name: 'border-left-width',
                description: 'The border left width of the pagination component',
                value: 'var(--border-left-width)'
            },
            {
                name: 'border-width',
                description: 'The border width of the pagination component',
                value: ['var(----border-top-width)', 'var(----border-right-width)', 'var(----border-bottom-width)', 'var(----border-left-width)']
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                description: 'The border top left radius of the pagination component',
                value: 'var(--border-top-left-radius)'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                description: 'The border top right radius of the pagination component',
                value: 'var(--border-top-right-radius)'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                description: 'The border bottom right radius of the pagination component',
                value: 'var(--border-bottom-right-radius)'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                description: 'The border bottom left radius of the pagination component',
                value: 'var(--border-bottom-left-radius)'
            },
            {
                name: 'border-radius',
                description: 'The border radius of the pagination component',
                value: ['var(----border-top-left-radius)', 'var(----border-top-right-radius)', 'var(----border-bottom-right-radius)', 'var(----border-bottom-left-radius)']
            },
            {
                name: 'box-shadow-offset-x',
                description: 'The box shadow horizontal offset of the pagination component',
                value: 'var(--box-shadow-offset-x)'
            },
            {
                name: 'box-shadow-offset-y',
                description: 'The box shadow vertical offset of the pagination component',
                value: 'var(--box-shadow-offset-y)'
            },
            {
                name: 'box-shadow-blur-radius',
                description: 'The box shadow blur radius of the pagination component',
                value: 'var(--box-shadow-blur-radius)'
            },
            {
                name: 'box-shadow-spread-radius',
                description: 'The box shadow spread radius of the pagination component',
                value: 'var(--box-shadow-spread-radius)'
            },
            {
                name: 'box-shadow-color',
                description: 'The box shadow spread radius of the pagination component',
                value: 'var(--box-shadow-color)'
            },
            {
                name: 'box-shadow',
                description: 'The box shadow of the pagination component',
                value: ['var(----box-shadow-offset-x)', 'var(----box-shadow-offset-y)', 'var(----box-shadow-blur-radius)', 'var(----box-shadow-spread-radius)', 'var(----box-shadow-color)']
            },
            {
                name: 'color',
                description: 'The border color of the pagination component item when active',
                type: 'color',
                variants: {
                    light: 'contrast-color($color-light)',
                    dark: 'contrast-color($color-dark)'
                }
            },
            {
                name: 'color--active',
                description: 'The border color of the pagination component item when active',
                type: 'color',
                variants: {
                    light: 'contrast-color($color-primary)',
                    dark: 'contrast-color($color-primary)'
                }
            },
            {
                name: 'font-size',
                description: 'The font size of the pagination component',
                type: 'size',
                value: 'font-size()'
            },
            {
                name: 'margin-top',
                description: 'The margin top of the pagination component',
                value: '0'
            },
            {
                name: 'margin-right',
                type: 'size',
                description: 'The margin right of the pagination component',
                value: 'calc(var(--margin-right) / 4)'
            },
            {
                name: 'margin-bottom',
                description: 'The margin bottom of the pagination component',
                value: '0'
            },
            {
                name: 'margin-left',
                type: 'size',
                description: 'The margin left of the pagination component',
                value: 'calc(var(--margin-left) / 4)'
            },
            {
                name: 'margin',
                description: 'The margin of the pagination component',
                value: ['var(----margin-top)', 'var(----margin-right)', 'var(----margin-bottom)', 'var(----margin-left)']
            },
            {
                name: 'min-width',
                description: 'The minimum width of the pagination component items',
                type: 'size',
                value: '40px'
            },
            {
                name: 'opacity--disabled',
                description: 'The opacity of the pagination component when disabled',
                value: '0.85'
            },
            {
                name: 'padding-top',
                description: 'The padding top of the pagination component',
                value: 'calc(var(--padding-top) / 2)'
            },
            {
                name: 'padding-right',
                type: 'size',
                description: 'The padding right of the pagination component',
                value: 'calc(var(--padding-right) / 2)'
            },
            {
                name: 'padding-bottom',
                description: 'The padding bottom of the pagination component',
                value: 'calc(var(--padding-bottom) / 2)'
            },
            {
                name: 'padding-left',
                type: 'size',
                description: 'The padding left of the pagination component',
                value: 'calc(var(--padding-left) / 2)'
            },
            {
                name: 'padding',
                description: 'The padding of the pagination component',
                value: ['var(----padding-top)', 'var(----padding-right)', 'var(----padding-bottom)', 'var(----padding-left)']
            }
        ]
    }
};
