module.exports = {
	name: 'navbar',
	slots: [
		{
			name: 'default',
			description: 'Slot for default navbar content',
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
			name: 'collapseOnItemClick',
			description: 'Determines if the navbar should close when clicking a navbar item',
			type: [
				'Boolean'
			],
			default: 'true'
		},
		{
			name: 'collapseOnClickOutside',
			description: 'Determines if the navbar should close when clicking outside',
			type: [
				'Boolean'
			],
			default: 'true'
		},
		{
			name: 'color',
			description: 'The color variant of the navbar',
			type: [
				'light',
				'dark'
			],
			default: 'light'
		},
		{
			name: 'fluid',
			description: 'Display the inner container as fluid, spanning 100% width',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'size',
			description: 'The size variant of the navbar',
			type: [
				'sm',
				'md',
				'lg'
			],
			default: 'md'
		},
		{
			name: 'menuAnimation',
			description: 'The animation of the hamburger menu component used for collapsing',
			type: [
				'close',
				'arrow-up',
				'arrow-down',
				'arrow-left',
				'arrow-right',
				'plus',
				'minus'
			],
			default: 'close'
		}
	],
	styles: [
		{
			name: 'brand-margin',
			description: 'The margin of the navbar component brand',
			default: 'spacing()'
		},
		{
			name: 'border-radius',
			description: 'The border radius of the navbar component',
			type: 'size',
			default: 'border-radius()'
		},
		{
			name: 'font-size',
			description: 'The font size of the navbar component',
			type: 'size',
			default: 'font-size()'
		},
		{
			name: 'padding',
			description: 'The padding of the navbar component',
			type: 'size',
			default: 'spacing()',
			variants: {
				sm: 'calc(var(--navbar-padding) * #{size-multiplier(\'sm\')}) 0',
				md: 'calc(var(--navbar-padding) * #{size-multiplier(\'md\')}) 0',
				lg: 'calc(var(--navbar-padding) * #{size-multiplier(\'lg\')}) 0'
			}
		},
		{
			name: 'item-padding',
			description: 'The padding of the navbar component item',
			type: 'size',
			default: 'spacing()',
			variants: {
				sm: 'calc(var(--navbar-item-padding) * #{size-multiplier(\'sm\')} / 2) calc(var(--navbar-item-padding) * #{size-multiplier(\'sm\')})',
				md: 'calc(var(--navbar-item-padding) * #{size-multiplier(\'md\')} / 2) calc(var(--navbar-item-padding) * #{size-multiplier(\'md\')})',
				lg: 'calc(var(--navbar-item-padding) * #{size-multiplier(\'lg\')} / 2) calc(var(--navbar-item-padding) * #{size-multiplier(\'lg\')})'
			}
		},
		{
			name: 'color',
			description: 'The color of the navbar component',
			type: 'color',
			variants: {
				light: 'contrast-color($color-light)',
				dark: 'contrast-color($color-dark)'
			}
		},
		{
			name: 'background',
			description: 'The background of the navbar component',
			type: 'color',
			variants: {
				light: 'color(\'light\')',
				dark: 'color(\'dark\')'
			}
		},
		{
			name: 'item-color',
			description: 'The color of the navbar component item',
			type: 'color',
			variants: {
				light: 'contrast-color($color-light)',
				dark: 'contrast-color($color-dark)'
			}
		},
		{
			name: 'item-color-hover',
			description: 'The color of the navbar component item when hovered',
			type: 'color',
			variants: {
				light: 'contrast-color($color-light)',
				dark: 'contrast-color($color-dark)'
			}
		},
		{
			name: 'item-background',
			description: 'The background of the navbar component item',
			type: 'color',
			variants: {
				light: 'color(\'light\')',
				dark: 'color(\'dark\')'
			}
		},
		{
			name: 'item-background-hover',
			description: 'The background of the navbar component item when hovered or focused',
			type: 'color',
			variants: {
				light: 'color(\'light-55\')',
				dark: 'color(\'dark-45\')'
			}
		},
		{
			name: 'collapsed-background',
			description: 'The background of the collapsed navbar component',
			type: 'color',
			variants: {
				light: 'color(\'light\')',
				dark: 'color(\'dark\')'
			}
		},
		{
			name: 'collapsed-item-color',
			description: 'The color of the collapsed navbar component item',
			type: 'color',
			variants: {
				light: 'contrast-color($color-light)',
				dark: 'contrast-color($color-dark)'
			}
		},
		{
			name: 'collapsed-item-color-hover',
			description: 'The color of the collapsed navbar component item when hovered',
			type: 'color',
			variants: {
				light: 'contrast-color($color-light)',
				dark: 'contrast-color($color-dark)'
			}
		},
		{
			name: 'collapsed-item-background',
			description: 'The background of the collapsed navbar component item',
			type: 'color',
			variants: {
				light: 'color(\'light\')',
				dark: 'color(\'dark\')'
			}
		},
		{
			name: 'collapsed-item-background-hover',
			description: 'The background of the collapsed navbar component item when hovered or focused',
			type: 'color',
			variants: {
				light: 'color(\'light-55\')',
				dark: 'color(\'dark-45\')'
			}
		}
	]
};
