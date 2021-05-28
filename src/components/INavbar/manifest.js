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
	css: {
	    selector: '.navbar',
        defaults: {
            size: 'md',
            color: 'light'
        },
	    variables: [
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
                name: 'border-color',
                description: 'The border color of the navbar component',
                type: 'color',
                variants: {
                    light: 'color(\'light-60\')',
                    dark: 'color(\'dark-40\')'
                }
            },
            {
                name: 'border-style',
                description: 'The border style of the navbar component',
                value: 'var(--border-style)'
            },
            {
                name: 'border-top-width',
                description: 'The border top width of the navbar component',
                value: 'var(--border-top-width)'
            },
            {
                name: 'border-right-width',
                description: 'The border right width of the navbar component',
                value: 'var(--border-right-width)'
            },
            {
                name: 'border-bottom-width',
                description: 'The border bottom width of the navbar component',
                value: 'var(--border-bottom-width)'
            },
            {
                name: 'border-left-width',
                description: 'The border left width of the navbar component',
                value: 'var(--border-left-width)'
            },
            {
                name: 'border-width',
                description: 'The border width of the navbar component',
                value: ['var(----border-top-width)', 'var(----border-right-width)', 'var(----border-bottom-width)', 'var(----border-left-width)']
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                description: 'The border top left radius of the navbar component',
                value: 'var(--border-top-left-radius)'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                description: 'The border top right radius of the navbar component',
                value: 'var(--border-top-right-radius)'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                description: 'The border bottom right radius of the navbar component',
                value: 'var(--border-bottom-right-radius)'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                description: 'The border bottom left radius of the navbar component',
                value: 'var(--border-bottom-left-radius)'
            },
            {
                name: 'border-radius',
                description: 'The border radius of the navbar component',
                value: ['var(----border-top-left-radius)', 'var(----border-top-right-radius)', 'var(----border-bottom-right-radius)', 'var(----border-bottom-left-radius)']
            },
            {
                name: 'box-shadow-offset-x',
                description: 'The box shadow horizontal offset of the navbar component',
                value: 'var(--box-shadow-offset-x)'
            },
            {
                name: 'box-shadow-offset-y',
                description: 'The box shadow vertical offset of the navbar component',
                value: 'var(--box-shadow-offset-y)'
            },
            {
                name: 'box-shadow-blur-radius',
                description: 'The box shadow blur radius of the navbar component',
                value: 'var(--box-shadow-blur-radius)'
            },
            {
                name: 'box-shadow-spread-radius',
                description: 'The box shadow spread radius of the navbar component',
                value: 'var(--box-shadow-spread-radius)'
            },
            {
                name: 'box-shadow-color',
                description: 'The box shadow spread radius of the navbar component',
                value: 'var(--box-shadow-color)'
            },
            {
                name: 'box-shadow',
                description: 'The box shadow of the navbar component',
                value: ['var(----box-shadow-offset-x)', 'var(----box-shadow-offset-y)', 'var(----box-shadow-blur-radius)', 'var(----box-shadow-spread-radius)', 'var(----box-shadow-color)']
            },
            {
                name: 'font-size',
                description: 'The font size of the navbar component',
                type: 'size',
                value: 'font-size()'
            },
            {
                name: 'padding-top',
                type: 'size',
                description: 'The padding top of the navbar component',
                value: 'var(--padding-top)'
            },
            {
                name: 'padding-right',
                description: 'The padding right of the navbar component',
                value: '0'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                description: 'The padding bottom of the navbar component',
                value: 'var(--padding-bottom)'
            },
            {
                name: 'padding-left',
                description: 'The padding left of the navbar component',
                value: '0'
            },
            {
                name: 'padding',
                description: 'The padding of the navbar component',
                value: ['var(----padding-top)', 'var(----padding-right)', 'var(----padding-bottom)', 'var(----padding-left)']
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
                name: 'item--background',
                description: 'The background of the navbar component item',
                type: 'color',
                variants: {
                    light: 'color(\'light\')',
                    dark: 'color(\'dark\')'
                }
            },
            {
                name: 'item--background--hover',
                description: 'The background of the navbar component item when hovered or focused',
                type: 'color',
                variants: {
                    light: 'color(\'light-55\')',
                    dark: 'color(\'dark-45\')'
                }
            },
            {
                name: 'item--color',
                description: 'The color of the navbar component item',
                value: 'var(----color)'
            },
            {
                name: 'item--color--hover',
                description: 'The color of the navbar component item when hovered',
                value: 'var(----color)'
            },
            {
                name: 'item--padding-top',
                type: 'size',
                description: 'The padding top of the navbar component',
                value: 'calc(var(--padding-top) / 2)'
            },
            {
                name: 'item--padding-right',
                type: 'size',
                description: 'The padding right of the navbar component',
                value: 'var(--padding-right)'
            },
            {
                name: 'item--padding-bottom',
                type: 'size',
                description: 'The padding bottom of the navbar component',
                value: 'calc(var(--padding-bottom) / 2)'
            },
            {
                name: 'item--padding-left',
                type: 'size',
                description: 'The padding left of the navbar component',
                value: 'var(--padding-left)'
            },
            {
                name: 'item--padding',
                description: 'The padding of the navbar component',
                value: ['var(----item--padding-top)', 'var(----item--padding-right)', 'var(----item--padding-bottom)', 'var(----item--padding-left)']
            },
            {
                name: 'collapsed--background',
                description: 'The background of the collapsed navbar component',
                type: 'color',
                variants: {
                    light: 'color(\'light\')',
                    dark: 'color(\'dark\')'
                }
            },
            {
                name: 'collapsed--item--color',
                description: 'The color of the collapsed navbar component item',
                value: 'var(----color)'
            },
            {
                name: 'collapsed--item--color--hover',
                description: 'The color of the collapsed navbar component item when hovered',
                value: 'var(----color)'
            },
            {
                name: 'collapsed--item--background',
                description: 'The background of the collapsed navbar component item',
                value: 'var(----item--background)'
            },
            {
                name: 'collapsed--item--background--hover',
                description: 'The background of the collapsed navbar component item when hovered or focused',
                value: 'var(----item--background--hover)'
            },
            {
                name: 'brand--margin-right',
                description: 'The margin right of the navbar component brand',
                value: 'var(--margin-right)'
            },
        ]
    }
};
