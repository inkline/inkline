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
	styles: [
		{
			name: 'font-weight',
			description: 'The font weight of the select component',
			default: 'font-weight(\'normal\')'
		},
		{
			name: 'line-height',
			description: 'The line height of the select component',
			default: 'var(--line-height)'
		},
		{
			name: 'border-width',
			description: 'The border width of the select component',
			default: 'var(--border-width)'
		},
		{
			name: 'margin',
			description: 'The margin of the select component',
			default: 'spacing(\'1/2\')'
		},
		{
			name: 'z-index',
			description: 'The z-index of the select component',
			default: '2000'
		},
		{
			name: 'min-width',
			description: 'The minimum width of the select component',
			default: '240px'
		},
		{
			name: 'max-width',
			description: 'The maximum width of the select component',
			default: '90vw'
		},
		{
			name: 'divider-margin',
			description: 'The margin of the select component divider',
			default: 'spacing(\'1/2\')'
		},
		{
			name: 'border-radius',
			description: 'The border radius of the select component',
			type: 'size',
			default: 'border-radius()'
		},
		{
			name: 'font-size',
			description: 'The font size of the select component',
			type: 'size',
			default: 'font-size()'
		},
		{
			name: 'padding',
			description: 'The padding of the select component items',
			type: 'size',
			default: 'spacing()',
			variants: {
				sm: 'calc(var(--select-padding) * #{size-multiplier(\'sm\')} / 2) calc(var(--select-padding) * #{size-multiplier(\'sm\')})',
				md: 'calc(var(--select-padding) * #{size-multiplier(\'md\')} / 2) calc(var(--select-padding) * #{size-multiplier(\'md\')})',
				lg: 'calc(var(--select-padding) * #{size-multiplier(\'lg\')} / 2) calc(var(--select-padding) * #{size-multiplier(\'lg\')})'
			}
		},
		{
			name: 'body-padding',
			description: 'The padding of the select component popover body',
			type: 'size',
			default: 'spacing()',
			variants: {
				sm: 'calc(var(--select-body-padding) * #{size-multiplier(\'sm\')}) 0',
				md: 'calc(var(--select-body-padding) * #{size-multiplier(\'md\')}) 0',
				lg: 'calc(var(--select-body-padding) * #{size-multiplier(\'lg\')}) 0'
			}
		},
		{
			name: 'header-padding',
			description: 'The padding of the select component popover header',
			type: 'size',
			default: 'spacing()',
			variants: {
				sm: 'calc(var(--select-header-padding) * #{size-multiplier(\'sm\')})',
				md: 'calc(var(--select-header-padding) * #{size-multiplier(\'md\')})',
				lg: 'calc(var(--select-header-padding) * #{size-multiplier(\'lg\')})'
			}
		},
		{
			name: 'footer-padding',
			description: 'The padding of the select component popover footer',
			type: 'size',
			default: 'spacing()',
			variants: {
				sm: 'calc(var(--select-footer-padding) * #{size-multiplier(\'sm\')})',
				md: 'calc(var(--select-footer-padding) * #{size-multiplier(\'md\')})',
				lg: 'calc(var(--select-footer-padding) * #{size-multiplier(\'lg\')})'
			}
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
			name: 'color-hover',
			description: 'The color of the select component item when hovered or focused',
			type: 'color',
			variants: {
				light: 'var(--select-color-variant-light-color)',
				dark: 'var(--select-color-variant-dark-color)'
			}
		},
		{
			name: 'color-active',
			description: 'The color of the select component item when active',
			type: 'color',
			variants: {
				light: 'var(--select-color-variant-light-color)',
				dark: 'var(--select-color-variant-dark-color)'
			}
		},
		{
			name: 'color-disabled',
			description: 'The color of the select component item when disabled',
			type: 'color',
			variants: {
				light: 'color(\'light-65\')',
				dark: 'color(\'dark-25\')'
			}
		},
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
			name: 'background-hover',
			description: 'The background of the select component when hovered or focused',
			type: 'color',
			variants: {
				light: 'color(\'light-25\')',
				dark: 'color(\'dark-45\')'
			}
		},
		{
			name: 'background-active',
			description: 'The background of the select component when active',
			type: 'color',
			variants: {
				light: 'color(\'light-25\')',
				dark: 'color(\'dark-45\')'
			}
		},
		{
			name: 'background-disabled',
			description: 'The background of the select component when disabled',
			type: 'color',
			variants: {
				light: 'transparent',
				dark: 'transparent'
			}
		},
		{
			name: 'border-color',
			description: 'The border-color of the select component',
			type: 'color',
			variants: {
				light: 'color(\'light\')',
				dark: 'color(\'dark-60\')'
			}
		},
		{
			name: 'header-background',
			description: 'The background of the select component header',
			type: 'color',
			variants: {
				light: 'color(\'gray-05\')',
				dark: 'color(\'dark-55\')'
			}
		},
		{
			name: 'footer-background',
			description: 'The background of the select component footer',
			type: 'color',
			variants: {
				light: 'color(\'gray-05\')',
				dark: 'color(\'dark-55\')'
			}
		}
	]
};
