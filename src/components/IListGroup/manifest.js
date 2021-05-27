module.exports = {
	name: 'list-group',
	slots: [
		{
			name: 'default',
			description: 'Slot for default list group content',
			type: []
		}
	],
	props: [
		{
			name: 'border',
			description: 'Display the list group border',
			type: [
				'Boolean'
			],
			default: 'true'
		},
		{
			name: 'color',
			description: 'The color variant of the list group',
			type: [
				'light',
				'dark'
			],
			default: 'light'
		},
		{
			name: 'size',
			description: 'The size variant of the list group',
			type: [
				'sm',
				'md',
				'lg'
			],
			default: 'md'
		}
	],
	css: {
	    selector: '.list-group',
        defaults: {
            size: 'md',
            color: 'light'
        },
        variables: [
            {
                name: 'background',
                description: 'The background of the list group component',
                type: 'color',
                variants: {
                    light: 'color(\'white\')',
                    dark: 'color(\'dark\')'
                }
            },
            {
                name: 'background--active',
                description: 'The background of the list group component when active',
                type: 'color',
                variants: {
                    light: 'color(\'primary\')',
                    dark: 'color(\'primary\')'
                }
            },
            {
                name: 'border-color',
                description: 'The border-color of the list group component',
                type: 'color',
                variants: {
                    light: 'color(\'light\')',
                    dark: 'color(\'dark-60\')'
                }
            },
            {
                name: 'border-color--active',
                description: 'The border-color of the list group component',
                type: 'color',
                variants: {
                    light: 'color(\'primary-55\')',
                    dark: 'color(\'primary-55\')'
                }
            },
            {
                name: 'border-style',
                description: 'The border style of the list group component',
                value: 'solid'
            },
            {
                name: 'border-top-width',
                description: 'The border top width of the list group component',
                value: 'var(--border-top-width)'
            },
            {
                name: 'border-right-width',
                description: 'The border right width of the list group component',
                value: 'var(--border-right-width)'
            },
            {
                name: 'border-bottom-width',
                description: 'The border bottom width of the list group component',
                value: 'var(--border-bottom-width)'
            },
            {
                name: 'border-left-width',
                description: 'The border left width of the list group component',
                value: 'var(--border-left-width)'
            },
            {
                name: 'border-width',
                description: 'The border width of the list group component',
                value: ['var(----border-top-width)', 'var(----border-right-width)', 'var(----border-bottom-width)', 'var(----border-left-width)']
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                description: 'The border top left radius of the list group component',
                value: 'var(--border-top-left-radius)'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                description: 'The border top right radius of the list group component',
                value: 'var(--border-top-right-radius)'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                description: 'The border bottom right radius of the list group component',
                value: 'var(--border-bottom-right-radius)'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                description: 'The border bottom left radius of the list group component',
                value: 'var(--border-bottom-left-radius)'
            },
            {
                name: 'border-radius',
                description: 'The border radius of the list group component',
                value: ['var(----border-top-left-radius)', 'var(----border-top-right-radius)', 'var(----border-bottom-right-radius)', 'var(----border-bottom-left-radius)']
            },
            {
                name: 'color',
                description: 'The color of the list group component item',
                type: 'color',
                variants: {
                    light: 'contrast-color($color-light)',
                    dark: 'contrast-color($color-dark)'
                }
            },
            {
                name: 'color--active',
                description: 'The color of the list group component item when active',
                type: 'color',
                variants: {
                    light: 'contrast-color($color-primary)',
                    dark: 'contrast-color($color-primary)'
                }
            },
            {
                name: 'color--disabled',
                description: 'The color of the list group component item when disabled',
                type: 'color',
                variants: {
                    light: 'var(--text-muted)',
                    dark: 'var(--text-muted)'
                }
            },
            {
                name: 'font-size',
                description: 'The font size of the list group component',
                type: 'size',
                value: 'font-size()'
            },
            {
                name: 'padding-top',
                type: 'size',
                description: 'The padding top of the list group component',
                value: 'var(--padding-top)'
            },
            {
                name: 'padding-right',
                type: 'size',
                description: 'The padding right of the list group component',
                value: 'var(--padding-right)'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                description: 'The padding bottom of the list group component',
                value: 'var(--padding-bottom)'
            },
            {
                name: 'padding-left',
                type: 'size',
                description: 'The padding left of the list group component',
                value: 'var(--padding-left)'
            },
            {
                name: 'padding',
                description: 'The padding of the list group component',
                value: ['var(----padding-top)', 'var(----padding-right)', 'var(----padding-bottom)', 'var(----padding-left)']
            }
        ]
    }
};
