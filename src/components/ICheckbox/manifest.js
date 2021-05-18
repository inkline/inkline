module.exports = {
	name: 'checkbox',
	slots: [
		{
			name: 'default',
			description: 'Slot for default checkbox label',
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
			description: 'The color variant of the checkbox',
			type: [
				'light',
				'dark'
			],
			default: 'light'
		},
		{
			name: 'disabled',
			description: 'The disabled state of the checkbox',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'indeterminate',
			description: 'The indeterminate state of the checkbox',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'value',
			description: 'Used to set the checkbox value when used inside a checkbox group',
			type: [],
			default: 'false'
		},
		{
			name: 'modelValue',
			description: 'Used to set the checkbox value when used by itself',
			type: [],
			default: 'false'
		},
		{
			name: 'name',
			description: 'The unique identifier of the checkbox',
			type: [
				'String'
			],
			default: 'uid()'
		},
		{
			name: 'native',
			description: 'Displays the native browser checkbox input indicator',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'readonly',
			description: 'The readonly state of the checkbox',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'size',
			description: 'The size variant of the checkbox',
			type: [
				'sm',
				'md',
				'lg'
			],
			default: 'md'
		},
		{
			name: 'tabindex',
			description: 'The tabindex of the checkbox',
			type: [
				'Number',
				'String'
			],
			default: '1'
		}
	],
	css: {
	    selector: '.checkbox',
        type: 'form',
        defaults: {
            size: 'md',
            color: 'light'
        },
        variables: [
            {
                name: 'border-style',
                description: 'The border style of the checkbox component indicator',
                value: 'var(--border-style)'
            },
            {
                name: 'border-top-width',
                description: 'The border top width of the checkbox component indicator',
                value: 'var(--border-top-width)'
            },
            {
                name: 'border-right-width',
                description: 'The border right width of the checkbox component indicator',
                value: 'var(--border-right-width)'
            },
            {
                name: 'border-bottom-width',
                description: 'The border bottom width of the checkbox component indicator',
                value: 'var(--border-bottom-width)'
            },
            {
                name: 'border-left-width',
                description: 'The border left width of the checkbox component indicator',
                value: 'var(--border-left-width)'
            },
            {
                name: 'border-width',
                description: 'The border width of the checkbox component indicator',
                value: 'var(--border-width)'
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                description: 'The border top left radius of the checkbox component indicator',
                value: 'var(--border-top-left-radius)'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                description: 'The border top right radius of the checkbox component indicator',
                value: 'var(--border-top-right-radius)'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                description: 'The border bottom right radius of the checkbox component indicator',
                value: 'var(--border-bottom-right-radius)'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                description: 'The border bottom left radius of the checkbox component indicator',
                value: 'var(--border-bottom-left-radius)'
            },
            {
                name: 'border-radius',
                description: 'The border radius of the checkbox component indicator',
                value: ['var(----border-top-left-radius)', 'var(----border-top-right-radius)', 'var(----border-bottom-right-radius)', 'var(----border-bottom-left-radius)']
            },
            {
                name: 'box-shadow-offset-x',
                description: 'The box shadow horizontal offset of the checkbox component indicator',
                value: 'var(--box-shadow-offset-x)'
            },
            {
                name: 'box-shadow-offset-y',
                description: 'The box shadow vertical offset of the checkbox component indicator',
                value: 'var(--box-shadow-offset-y)'
            },
            {
                name: 'box-shadow-blur-radius',
                description: 'The box shadow blur radius of the checkbox component indicator',
                value: 'var(--box-shadow-blur-radius)'
            },
            {
                name: 'box-shadow-spread-radius',
                description: 'The box shadow spread radius of the checkbox component indicator',
                value: 'var(--box-shadow-spread-radius)'
            },
            {
                name: 'box-shadow-color',
                description: 'The box shadow spread radius of the checkbox component indicator',
                value: 'var(--box-shadow-color)'
            },
            {
                name: 'box-shadow',
                description: 'The box shadow of the checkbox component indicator',
                value: ['var(----box-shadow-offset-x)', 'var(----box-shadow-offset-y)', 'var(----box-shadow-blur-radius)', 'var(----box-shadow-spread-radius)', 'var(----box-shadow-color)']
            },
            {
                name: 'margin-right',
                description: 'The right margin of the checkbox component indicator',
                value: 'calc(var(--margin-right) / 2)'
            },
            {
                name: 'size',
                description: 'The size of the checkbox component indicator',
                type: 'size',
                value: '1rem'
            },
            {
                name: 'background',
                description: 'The background of the checkbox component indicator',
                type: 'color',
                variants: {
                    light: 'color(\'white\')',
                    dark: 'color(\'dark\')'
                }
            },
            {
                name: 'background--checked',
                description: 'The background of the checkbox component indicator when checked',
                type: 'color',
                variants: {
                    light: 'color(\'primary\')',
                    dark: 'color(\'primary\')'
                }
            },
            {
                name: 'background--disabled',
                description: 'The background of the checkbox component indicator when disabled',
                type: 'color',
                variants: {
                    light: 'color(\'light-25\')',
                    dark: 'color(\'dark-25\')'
                }
            },
            {
                name: 'background--checked-disabled',
                description: 'The background of the checkbox component indicator when checked and disabled',
                type: 'color',
                variants: {
                    light: 'color(\'primary-25\')',
                    dark: 'color(\'primary-75\')'
                }
            },
            {
                name: 'border-color',
                description: 'The border-color of the checkbox component indicator',
                type: 'color',
                variants: {
                    light: 'color(\'light-55\')',
                    dark: 'color(\'dark\')'
                }
            },
            {
                name: 'border-color--checked',
                description: 'The border-color of the checkbox component indicator when checked',
                type: 'color',
                variants: {
                    light: 'color(\'primary-55\')',
                    dark: 'color(\'primary-55\')'
                }
            },
            {
                name: 'border-color--disabled',
                description: 'The border-color of the checkbox component indicator when disabled',
                type: 'color',
                variants: {
                    light: 'color(\'light\')',
                    dark: 'color(\'dark\')'
                }
            },
            {
                name: 'border-color--checked-disabled',
                description: 'The border-color of the checkbox component indicator when checked and disabled',
                type: 'color',
                variants: {
                    light: 'color(\'primary-30\')',
                    dark: 'color(\'primary-70\')'
                }
            },
            {
                name: 'color',
                description: 'The color of the checkbox component indicator icon',
                type: 'color',
                variants: {
                    light: 'color(\'white\')',
                    dark: 'color(\'white\')'
                }
            },
            {
                name: 'color--disabled',
                description: 'The color of the checkbox component indicator icon when disabled',
                type: 'color',
                variants: {
                    light: 'color(\'light-25\')',
                    dark: 'color(\'dark-25\')'
                }
            },
            {
                name: 'checkmark--size',
                description: 'The size of the checkbox component indicator check mark icon',
                type: 'size',
                value: '8px'
            },
            {
                name: 'label--font-size',
                description: 'The font size of the checkbox component label',
                type: 'size',
                value: 'font-size()'
            },
            {
                name: 'label--color',
                description: 'The label color of the checkbox component label',
                type: 'color',
                variants: {
                    light: 'contrast-color($color-light)',
                    dark: 'contrast-color($color-dark)'
                }
            },
            {
                name: 'label--color--disabled',
                description: 'The label color of the checkbox component when disabled',
                type: 'color',
                variants: {
                    light: 'color(\'light-70\')',
                    dark: 'color(\'dark-30\')'
                }
            },
        ]
    }
};
