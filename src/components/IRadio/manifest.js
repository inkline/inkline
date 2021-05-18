module.exports = {
	name: 'radio',
	slots: [
		{
			name: 'default',
			description: 'Slot for default radio label',
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
			description: 'The color variant of the radio',
			type: [
				'light',
				'dark'
			],
			default: 'light'
		},
		{
			name: 'disabled',
			description: 'The disabled state of the radio',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'indeterminate',
			description: 'The indeterminate state of the radio',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'value',
			description: 'Used to set the radio value when used inside a radio group',
			type: [],
			default: '\'\''
		},
		{
			name: 'modelValue',
			description: 'Used to set the radio value when used by itself',
			type: [],
			default: 'false'
		},
		{
			name: 'name',
			description: 'The unique identifier of the radio',
			type: [
				'String'
			],
			default: 'uid()'
		},
		{
			name: 'native',
			description: 'Displays the native browser radio input indicator',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'readonly',
			description: 'The readonly state of the radio',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'size',
			description: 'The size variant of the radio',
			type: [
				'sm',
				'md',
				'lg'
			],
			default: 'md'
		},
		{
			name: 'tabindex',
			description: 'The tabindex of the radio',
			type: [
				'Number',
				'String'
			],
			default: '1'
		}
	],
	styles: [
		{
			name: 'font-size',
			description: 'The font size of the radio component label',
			type: 'size',
			default: 'font-size()'
		},
		{
			name: 'margin-right',
			description: 'The right margin of the radio component, when displaying multiple inline radioes',
			default: 'spacing()'
		},
		{
			name: 'indicator-border-width',
			description: 'The border width of the radio component indicator',
			default: 'var(--border-width)'
		},
		{
			name: 'indicator-size',
			description: 'The size of the radio component indicator',
			type: 'size',
			default: '1rem'
		},
		{
			name: 'indicator-icon-size',
			description: 'The size of the radio component indicator icon',
			type: 'size',
			default: '8px'
		},
		{
			name: 'indicator-margin-right',
			description: 'The right margin of the radio component indicator',
			default: 'spacing(\'1/2\')'
		},
		{
			name: 'color',
			description: 'The label color of the radio component',
			type: 'color',
			variants: {
				light: 'contrast-color($color-light)',
				dark: 'contrast-color($color-dark)'
			}
		},
		{
			name: 'color-disabled',
			description: 'The label color of the radio component when disabled',
			type: 'color',
			variants: {
				light: 'color(\'light-70\')',
				dark: 'color(\'dark-30\')'
			}
		},
		{
			name: 'indicator-background',
			description: 'The background of the radio component indicator',
			type: 'color',
			variants: {
				light: 'color(\'white\')',
				dark: 'color(\'dark\')'
			}
		},
		{
			name: 'indicator-background-checked',
			description: 'The background of the radio component indicator when checked',
			type: 'color',
			variants: {
				light: 'color(\'primary\')',
				dark: 'color(\'primary\')'
			}
		},
		{
			name: 'indicator-background-disabled',
			description: 'The background of the radio component indicator when disabled',
			type: 'color',
			variants: {
				light: 'color(\'light-25\')',
				dark: 'color(\'dark-25\')'
			}
		},
		{
			name: 'indicator-background-checked-disabled',
			description: 'The background of the radio component indicator when checked and disabled',
			type: 'color',
			variants: {
				light: 'color(\'primary-25\')',
				dark: 'color(\'primary-25\')'
			}
		},
		{
			name: 'indicator-border-color',
			description: 'The border-color of the radio component indicator',
			type: 'color',
			variants: {
				light: 'color(\'light-55\')',
				dark: 'color(\'dark\')'
			}
		},
		{
			name: 'indicator-border-color-checked',
			description: 'The border-color of the radio component indicator when checked',
			type: 'color',
			variants: {
				light: 'color(\'primary-55\')',
				dark: 'color(\'primary-55\')'
			}
		},
		{
			name: 'indicator-border-color-disabled',
			description: 'The border-color of the radio component indicator when disabled',
			type: 'color',
			variants: {
				light: 'color(\'light\')',
				dark: 'color(\'dark\')'
			}
		},
		{
			name: 'indicator-border-color-checked-disabled',
			description: 'The border-color of the radio component indicator when checked and disabled',
			type: 'color',
			variants: {
				light: 'color(\'primary-30\')',
				dark: 'color(\'primary-30\')'
			}
		},
		{
			name: 'indicator-icon-color',
			description: 'The color of the radio component indicator icon',
			type: 'color',
			variants: {
				light: 'color(\'white\')',
				dark: 'color(\'white\')'
			}
		},
		{
			name: 'indicator-icon-color-disabled',
			description: 'The color of the checkbox component indicator icon when disabled',
			type: 'color',
			variants: {
				light: 'color(\'light-25\')',
				dark: 'color(\'dark-25\')'
			}
		}
	]
};
