module.exports = {
	name: 'badge',
	slots: [
		{
			name: 'default',
			description: 'Slot for default badge content',
			type: []
		}
	],
	props: [
		{
			name: 'color',
			description: 'The color variant of the badge',
			type: [
				'primary',
				'success',
				'light',
				'dark',
				'info',
				'success',
				'warning',
				'danger'
			],
			default: 'light'
		},
		{
			name: 'size',
			description: 'The size variant of the badge',
			type: [
				'sm',
				'md',
				'lg'
			],
			default: 'md'
		}
	],
	css: {
	    selector: '.badge',
        defaults: {
            size: 'md',
            color: 'light'
        },
        variables: [
            {
                name: 'font-weight',
                description: 'The font weight of the badge component',
                default: 'font-weight(\'bold\')'
            },
            {
                name: 'line-height',
                description: 'The line height of the badge component',
                default: 'var(--line-height)'
            },
            {
                name: 'border-style',
                description: 'The border style of the badge component',
                value: 'var(--border-style)'
            },
            {
                name: 'border-top-width',
                description: 'The border top width of the badge component',
                value: 'var(--border-top-width)'
            },
            {
                name: 'border-right-width',
                description: 'The border right width of the badge component',
                value: 'var(--border-right-width)'
            },
            {
                name: 'border-bottom-width',
                description: 'The border bottom width of the badge component',
                value: 'var(--border-bottom-width)'
            },
            {
                name: 'border-left-width',
                description: 'The border left width of the badge component',
                value: 'var(--border-left-width)'
            },
            {
                name: 'border-width',
                description: 'The border width of the badge component',
                value: ['var(----border-top-width)', 'var(----border-right-width)', 'var(----border-bottom-width)', 'var(----border-left-width)']
            },
            {
                name: 'box-shadow-offset-x',
                description: 'The box shadow horizontal offset of the badge component',
                value: 'var(--box-shadow-offset-x)'
            },
            {
                name: 'box-shadow-offset-y',
                description: 'The box shadow vertical offset of the badge component',
                value: 'var(--box-shadow-offset-y)'
            },
            {
                name: 'box-shadow-blur-radius',
                description: 'The box shadow blur radius of the badge component',
                value: 'var(--box-shadow-blur-radius)'
            },
            {
                name: 'box-shadow-spread-radius',
                description: 'The box shadow spread radius of the badge component',
                value: 'var(--box-shadow-spread-radius)'
            },
            {
                name: 'box-shadow-color',
                description: 'The box shadow spread radius of the badge component',
                value: 'var(--box-shadow-color)'
            },
            {
                name: 'box-shadow',
                description: 'The box shadow of the badge component',
                value: ['var(----box-shadow-offset-x)', 'var(----box-shadow-offset-y)', 'var(----box-shadow-blur-radius)', 'var(----box-shadow-spread-radius)', 'var(----box-shadow-color)']
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                description: 'The border top left radius of the badge component',
                value: 'var(--border-top-left-radius)'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                description: 'The border top right radius of the badge component',
                value: 'var(--border-top-right-radius)'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                description: 'The border bottom right radius of the badge component',
                value: 'var(--border-bottom-right-radius)'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                description: 'The border bottom left radius of the badge component',
                value: 'var(--border-bottom-left-radius)'
            },
            {
                name: 'border-radius',
                description: 'The border radius of the badge component',
                value: ['var(----border-top-left-radius)', 'var(----border-top-right-radius)', 'var(----border-bottom-right-radius)', 'var(----border-bottom-left-radius)']
            },
            {
                name: 'padding-top',
                type: 'size',
                description: 'The padding top of the badge component',
                value: 'calc(var(--padding-top) / 2)'
            },
            {
                name: 'padding-right',
                type: 'size',
                description: 'The padding right of the badge component',
                value: 'calc(var(--padding-right) / 2)'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                description: 'The padding bottom of the badge component',
                value: 'calc(var(--padding-bottom) / 2)'
            },
            {
                name: 'padding-left',
                type: 'size',
                description: 'The padding left of the badge component',
                value: 'calc(var(--padding-left) / 2)'
            },
            {
                name: 'padding',
                description: 'The padding of the badge component',
                value: ['var(----padding-top)', 'var(----padding-right)', 'var(----padding-bottom)', 'var(----padding-left)']
            },
            {
                name: 'font-size',
                description: 'The font size of the badge component',
                type: 'size',
                variants: {
                    sm: '65%',
                    md: '75%',
                    lg: '85%'
                }
            },
            {
                name: 'background',
                description: 'The background of the badge component',
                type: 'color',
                variants: {
                    primary: 'color(\'primary\')',
                    secondary: 'color(\'secondary\')',
                    light: 'color(\'light\')',
                    dark: 'color(\'dark\')',
                    info: 'color(\'info\')',
                    warning: 'color(\'warning\')',
                    danger: 'color(\'danger\')',
                    success: 'color(\'success\')'
                }
            },
            {
                name: 'border-color',
                description: 'The border color of the badge component',
                type: 'color',
                variants: {
                    primary: 'color(\'primary-55\')',
                    secondary: 'color(\'secondary-55\')',
                    light: 'color(\'light-55\')',
                    dark: 'color(\'dark-45\')',
                    info: 'color(\'info-55\')',
                    warning: 'color(\'warning-55\')',
                    danger: 'color(\'danger-55\')',
                    success: 'color(\'success-55\')'
                }
            },
            {
                name: 'color',
                description: 'The color of the badge component',
                type: 'color',
                variants: {
                    primary: 'contrast-color($color-primary)',
                    secondary: 'contrast-color($color-secondary)',
                    light: 'contrast-color($color-light)',
                    dark: 'contrast-color($color-dark)',
                    info: 'contrast-color($color-info)',
                    warning: 'contrast-color($color-warning)',
                    danger: 'contrast-color($color-danger)',
                    success: 'contrast-color($color-success)'
                }
            },
            {
                name: 'link--background--hover',
                description: 'The background of the badge component when parent link is hovered',
                type: 'color',
                variants: {
                    primary: 'color(\'primary-60\')',
                    secondary: 'color(\'secondary-60\')',
                    light: 'color(\'light-60\')',
                    dark: 'color(\'dark-40\')',
                    info: 'color(\'info-60\')',
                    warning: 'color(\'warning-60\')',
                    danger: 'color(\'danger-60\')',
                    success: 'color(\'success-60\')'
                }
            },
            {
                name: 'pill--border-radius',
                description: 'The border radius of the badge component',
                value: '10rem'
            }
        ]
    }
};
