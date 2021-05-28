module.exports = {
	name: 'sidebar',
	slots: [
		{
			name: 'default',
			description: 'Slot for default sidebar content',
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
			description: 'Determines if the sidebar should close when clicking a sidebar item',
			type: [
				'Boolean'
			],
			default: 'true'
		},
		{
			name: 'collapseOnClickOutside',
			description: 'Determines if the sidebar should close when clicking outside, on the overlay',
			type: [
				'Boolean'
			],
			default: 'true'
		},
		{
			name: 'collapsePosition',
			description: 'The collapse position of the sidebar',
			type: [
				'fixed',
				'absolute',
				'relative'
			],
			default: 'absolute'
		},
		{
			name: 'color',
			description: 'The color variant of the sidebar',
			type: [
				'light',
				'dark'
			],
			default: 'light'
		},
		{
			name: 'placement',
			description: 'The placement of the sidebar',
			type: [
				'left',
				'right'
			],
			default: 'left'
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
		}
	],
	css: {
        selector: '.sidebar-wrapper',
        defaults: {
            size: 'md',
            color: 'light'
        },
	    variables: [
            {
                name: 'background',
                description: 'The background of the sidebar component',
                type: 'color',
                variants: {
                    light: 'color(\'light\')',
                    dark: 'color(\'dark\')'
                }
            },
            {
                name: 'border-color',
                description: 'The border color of the sidebar component',
                type: 'color',
                variants: {
                    light: 'color(\'light-60\')',
                    dark: 'color(\'dark-40\')'
                }
            },
            {
                name: 'border-style',
                description: 'The border style of the sidebar component',
                value: 'var(--border-style)'
            },
            {
                name: 'border-top-width',
                description: 'The border top width of the sidebar component',
                value: 'var(--border-top-width)'
            },
            {
                name: 'border-right-width',
                description: 'The border right width of the sidebar component',
                value: 'var(--border-right-width)'
            },
            {
                name: 'border-bottom-width',
                description: 'The border bottom width of the sidebar component',
                value: 'var(--border-bottom-width)'
            },
            {
                name: 'border-left-width',
                description: 'The border left width of the sidebar component',
                value: 'var(--border-left-width)'
            },
            {
                name: 'border-width',
                description: 'The border width of the sidebar component',
                value: ['var(----border-top-width)', 'var(----border-right-width)', 'var(----border-bottom-width)', 'var(----border-left-width)']
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                description: 'The border top left radius of the sidebar component',
                value: 'var(--border-top-left-radius)'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                description: 'The border top right radius of the sidebar component',
                value: 'var(--border-top-right-radius)'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                description: 'The border bottom right radius of the sidebar component',
                value: 'var(--border-bottom-right-radius)'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                description: 'The border bottom left radius of the sidebar component',
                value: 'var(--border-bottom-left-radius)'
            },
            {
                name: 'border-radius',
                description: 'The border radius of the sidebar component',
                value: ['var(----border-top-left-radius)', 'var(----border-top-right-radius)', 'var(----border-bottom-right-radius)', 'var(----border-bottom-left-radius)']
            },
            {
                name: 'box-shadow-offset-x',
                description: 'The box shadow horizontal offset of the sidebar component',
                value: 'var(--box-shadow-offset-x)'
            },
            {
                name: 'box-shadow-offset-y',
                description: 'The box shadow vertical offset of the sidebar component',
                value: 'var(--box-shadow-offset-y)'
            },
            {
                name: 'box-shadow-blur-radius',
                description: 'The box shadow blur radius of the sidebar component',
                value: 'var(--box-shadow-blur-radius)'
            },
            {
                name: 'box-shadow-spread-radius',
                description: 'The box shadow spread radius of the sidebar component',
                value: 'var(--box-shadow-spread-radius)'
            },
            {
                name: 'box-shadow-color',
                description: 'The box shadow spread radius of the sidebar component',
                value: 'var(--box-shadow-color)'
            },
            {
                name: 'box-shadow',
                description: 'The box shadow of the sidebar component',
                value: ['var(----box-shadow-offset-x)', 'var(----box-shadow-offset-y)', 'var(----box-shadow-blur-radius)', 'var(----box-shadow-spread-radius)', 'var(----box-shadow-color)']
            },
            {
                name: 'color',
                description: 'The color of the sidebar component',
                type: 'color',
                variants: {
                    light: 'contrast-color($color-light)',
                    dark: 'contrast-color($color-dark)'
                }
            },
            {
                name: 'font-size',
                description: 'The font size of the sidebar component',
                type: 'size',
                value: 'font-size()'
            },
            {
                name: 'padding-top',
                type: 'size',
                description: 'The padding top of the sidebar component',
                value: 'var(--padding-top)'
            },
            {
                name: 'padding-right',
                type: 'size',
                description: 'The padding right of the sidebar component',
                value: 'var(--padding-right)'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                description: 'The padding bottom of the sidebar component',
                value: 'var(--padding-bottom)'
            },
            {
                name: 'padding-left',
                type: 'size',
                description: 'The padding left of the sidebar component',
                value: 'var(--padding-left)'
            },
            {
                name: 'padding',
                description: 'The padding of the sidebar component',
                value: ['var(----padding-top)', 'var(----padding-right)', 'var(----padding-bottom)', 'var(----padding-left)']
            },
            {
                name: 'width',
                description: 'The width of the sidebar component',
                type: 'size',
                value: '14rem'
            },
            {
                name: 'z-index',
                description: 'The z-index of the sidebar component',
                value: 'z-index(\'fixed\')'
            },
            {
                name: 'item--color',
                description: 'The color of the sidebar component item',
                type: 'color',
                variants: {
                    light: 'contrast-color($color-light)',
                    dark: 'contrast-color($color-dark)'
                }
            },
            {
                name: 'item--color--hover',
                description: 'The color of the sidebar component item when hovered',
                type: 'color',
                variants: {
                    light: 'contrast-color($color-light)',
                    dark: 'contrast-color($color-dark)'
                }
            },
            {
                name: 'item--background',
                description: 'The background of the sidebar component item',
                type: 'color',
                variants: {
                    light: 'color(\'light\')',
                    dark: 'color(\'dark\')'
                }
            },
            {
                name: 'item--background--hover',
                description: 'The background of the sidebar component item when hovered or focused',
                type: 'color',
                variants: {
                    light: 'color(\'light-55\')',
                    dark: 'color(\'dark-45\')'
                }
            },
            {
                name: 'item--border-top-left-radius',
                description: 'The border top left radius of the sidebar component item',
                value: 'var(----border-top-left-radius)'
            },
            {
                name: 'item--border-top-right-radius',
                description: 'The border top right radius of the sidebar component item',
                value: 'var(----border-top-right-radius)'
            },
            {
                name: 'item--border-bottom-right-radius',
                description: 'The border bottom right radius of the sidebar component item',
                value: 'var(----border-bottom-right-radius)'
            },
            {
                name: 'item--border-bottom-left-radius',
                description: 'The border bottom left radius of the sidebar component item',
                value: 'var(----border-bottom-left-radius)'
            },
            {
                name: 'item--border-radius',
                description: 'The border radius of the sidebar component item',
                value: ['var(----item--border-top-left-radius)', 'var(----item--border-top-right-radius)', 'var(----item--border-bottom-right-radius)', 'var(----item--border-bottom-left-radius)']
            },
            {
                name: 'item--padding-top',
                type: 'size',
                description: 'The padding top of the sidebar component item',
                value: 'calc(var(--padding-top) / 2)'
            },
            {
                name: 'item--padding-right',
                type: 'size',
                description: 'The padding right of the sidebar component item',
                value: 'var(--padding-right)'
            },
            {
                name: 'item--padding-bottom',
                type: 'size',
                description: 'The padding bottom of the sidebar component item',
                value: 'calc(var(--padding-bottom) / 2)'
            },
            {
                name: 'item--padding-left',
                type: 'size',
                description: 'The padding left of the sidebar component item',
                value: 'var(--padding-left)'
            },
            {
                name: 'item--padding',
                description: 'The padding of the sidebar component item',
                value: ['var(----item--padding-top)', 'var(----item--padding-right)', 'var(----item--padding-bottom)', 'var(----item--padding-left)']
            },
            {
                name: 'overlay--background',
                description: 'The background of the sidebar component overlay',
                value: 'rgba(0, 0, 0, 0.5)'
            }
        ]
    }
};
