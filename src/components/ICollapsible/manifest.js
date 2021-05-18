module.exports = {
	name: 'collapsible',
	events: [
		{
			name: 'update:modelValue',
			description: 'Event emitted for setting the modelValue',
			type: []
		}
	],
	slots: [
		{
			name: 'default',
			description: 'Slot for default collapsible content',
			type: []
		}
	],
	props: [
		{
			name: 'accordion',
			description: 'Display the collapsible as an accordion, keeping a maximum of one open collapsible item',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'color',
			description: 'The color variant of the collapsible',
			type: [
				'light',
				'dark',
				'blank'
			],
			default: 'light'
		},
		{
			name: 'size',
			description: 'The size variant of the collapsible',
			type: [
				'sm',
				'md',
				'lg'
			],
			default: 'md'
		},
		{
			name: 'modelValue',
			description: 'Used to determine which collapsible item is open',
			type: [
				'Array.<String>'
			],
			default: '{"type":"","default":""}'
		}
	],
	styles: [
		{
			name: 'font-size',
			description: 'The font size of the collapsible component',
			type: 'size',
			value: 'font-size()'
		},
		{
			name: 'border-radius',
			description: 'The border radius of the collapsible component',
			type: 'size',
			value: 'border-radius()'
		},
        {
            name: 'padding-top',
            type: 'size',
            description: 'The padding top of the collapsible component',
            value: 'calc(var(--padding-top) / 2)'
        },
        {
            name: 'padding-right',
            type: 'size',
            description: 'The padding right of the collapsible component',
            value: 'var(--padding-right)'
        },
        {
            name: 'padding-bottom',
            type: 'size',
            description: 'The padding bottom of the collapsible component',
            value: 'calc(var(--padding-bottom) / 2)'
        },
        {
            name: 'padding-left',
            type: 'size',
            description: 'The padding left of the collapsible component',
            value: 'var(--padding-left)'
        },
        {
            name: 'padding',
            description: 'The padding of the collapsible component',
            value: ['var(----padding-top)', 'var(----padding-right)', 'var(----padding-bottom)', 'var(----padding-left)']
        },
		{
			name: 'color',
			description: 'The color of the collapsible component',
			type: 'color',
			variants: {
				light: 'contrast-color($color-light)',
				dark: 'contrast-color($color-dark)'
			}
		},
		{
			name: 'background',
			description: 'The background of the collapsible component',
			type: 'color',
			variants: {
				light: 'color(\'light\')',
				dark: 'color(\'dark\')'
			}
		},
        {
            name: 'border-style',
            description: 'The border style of the collapsible component',
            value: 'var(--border-style)'
        },
        {
            name: 'border-top-width',
            description: 'The border top width of the collapsible component',
            value: 'var(--border-top-width)'
        },
        {
            name: 'border-right-width',
            description: 'The border right width of the collapsible component',
            value: 'var(--border-right-width)'
        },
        {
            name: 'border-bottom-width',
            description: 'The border bottom width of the collapsible component',
            value: 'var(--border-bottom-width)'
        },
        {
            name: 'border-left-width',
            description: 'The border left width of the collapsible component',
            value: 'var(--border-left-width)'
        },
        {
            name: 'border-width',
            description: 'The border width of the collapsible component',
            value: ['var(----border-top-width)', 'var(----border-right-width)', 'var(----border-bottom-width)', 'var(----border-left-width)']
        },
		{
			name: 'border-color',
			description: 'The border color of the collapsible component',
			type: 'color',
			variants: {
				light: 'color(\'light-55\')',
				dark: 'color(\'dark-45\')'
			}
		},
		{
			name: 'body-background',
			description: 'The background of the collapsible component body',
			type: 'color',
			variants: {
				light: 'color(\'white\')',
				dark: 'color(\'dark-45\')'
			}
		}
	]
};
