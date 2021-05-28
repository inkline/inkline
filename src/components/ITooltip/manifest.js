module.exports = {
	name: 'tooltip',
	slots: [
		{
			name: 'default',
			description: 'Slot for tooltip trigger',
			type: []
		},
		{
			name: 'body',
			description: 'Slot for tooltip body content',
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
			description: 'The color variant of the tooltip',
			type: [
				'light',
				'dark'
			],
			default: 'light'
		},
		{
			name: 'disabled',
			description: 'The disabled state of the tooltip',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'modelValue',
			description: 'Used to manually control the visibility of the tooltip',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'arrow',
			description: 'Displays an arrow on the tooltip pointing to the trigger element',
			type: [
				'Boolean'
			],
			default: 'true'
		},
		{
			name: 'placement',
			description: 'The placement of the tooltip',
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
			description: 'The events used to trigger the tooltip',
			type: [
				'hover',
				'focus',
				'click',
				'manual'
			],
			default: '[hover, focus]'
		},
		{
			name: 'offset',
			description: 'The offset of the tooltip relative to the trigger element',
			type: [
				'Number'
			],
			default: '6'
		},
		{
			name: 'popperOptions',
			description: 'Used to override the popper.js options used for creating the tooltip',
			type: [
				'Object'
			],
			default: '{}'
		},
		{
			name: 'size',
			description: 'The size variant of the tooltip',
			type: [
				'sm',
				'md',
				'lg'
			],
			default: 'md'
		}
	],
	css: {
        selector: '.tooltip-wrapper',
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
            },{
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
                name: 'width',
                description: 'The width of the popover component',
                value: '280px'
            },
            {
                name: 'z-index',
                description: 'The z-index of the popover component',
                value: '2000'
            },
        ]
    }
};
