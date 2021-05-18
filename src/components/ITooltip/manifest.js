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
	styles: [
		{
			name: 'font-weight',
			description: 'The font weight of the tooltip component',
			default: 'font-weight(\'normal\')'
		},
		{
			name: 'line-height',
			description: 'The line height of the tooltip component',
			default: 'var(--line-height)'
		},
		{
			name: 'border-width',
			description: 'The border width of the tooltip component',
			default: 'var(--border-width)'
		},
		{
			name: 'margin',
			description: 'The margin of the tooltip component',
			default: 'spacing(\'1/2\')'
		},
		{
			name: 'z-index',
			description: 'The z-index of the tooltip component',
			default: '2000'
		},
		{
			name: 'border-radius',
			description: 'The border radius of the tooltip component',
			type: 'size',
			default: 'border-radius()'
		},
		{
			name: 'font-size',
			description: 'The font size of the tooltip component',
			type: 'size',
			default: 'font-size()'
		},
		{
			name: 'padding',
			description: 'The padding of the tooltip component items',
			type: 'size',
			default: 'spacing()',
			variants: {
				sm: 'calc(var(--tooltip-padding) * #{size-multiplier(\'sm\')} / 2) calc(var(--tooltip-padding) * #{size-multiplier(\'sm\')})',
				md: 'calc(var(--tooltip-padding) * #{size-multiplier(\'md\')} / 2) calc(var(--tooltip-padding) * #{size-multiplier(\'md\')})',
				lg: 'calc(var(--tooltip-padding) * #{size-multiplier(\'lg\')} / 2) calc(var(--tooltip-padding) * #{size-multiplier(\'lg\')})'
			}
		},
		{
			name: 'color',
			description: 'The color of the tooltip component item',
			type: 'color',
			variants: {
				light: 'contrast-color($color-white)',
				dark: 'contrast-color($color-dark)'
			}
		},
		{
			name: 'background',
			description: 'The background of the tooltip component',
			type: 'color',
			variants: {
				light: 'color(\'white\')',
				dark: 'color(\'dark\')'
			}
		},
		{
			name: 'border-color',
			description: 'The border-color of the tooltip component',
			type: 'color',
			variants: {
				light: 'color(\'light\')',
				dark: 'color(\'dark-60\')'
			}
		}
	]
};
