module.exports = {
	name: 'card',
	slots: [
		{
			name: 'default',
			description: 'Slot for default card content',
			type: []
		},
		{
			name: 'header',
			description: 'Slot for card header content',
			type: []
		},
		{
			name: 'footer',
			description: 'Slot for card footer content',
			type: []
		},
		{
			name: 'image',
			description: 'Slot for card image',
			type: []
		}
	],
	props: [
		{
			name: 'color',
			description: 'The color variant of the card',
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
			description: 'The size variant of the card',
			type: [
				'sm',
				'md',
				'lg'
			],
			default: 'md'
		}
	],
	css: {
	    selector: '.card',
        defaults: {
            size: 'md',
            color: 'light'
        },
        variables: [
            {
                name: 'font-weight',
                description: 'The font weight of the card component',
                value: 'font-weight(\'normal\')'
            },
            {
                name: 'font-size',
                description: 'The font size of the card component',
                type: 'size',
                value: 'font-size()'
            },
            {
                name: 'line-height',
                description: 'The line height of the card component',
                value: 'var(--line-height)'
            },
            {
                name: 'border-style',
                description: 'The border style of the card component',
                value: 'var(--border-style)'
            },
            {
                name: 'border-top-width',
                description: 'The border top width of the card component',
                value: 'var(--border-top-width)'
            },
            {
                name: 'border-right-width',
                description: 'The border right width of the card component',
                value: 'var(--border-right-width)'
            },
            {
                name: 'border-bottom-width',
                description: 'The border bottom width of the card component',
                value: 'var(--border-bottom-width)'
            },
            {
                name: 'border-left-width',
                description: 'The border left width of the card component',
                value: 'var(--border-left-width)'
            },
            {
                name: 'border-width',
                description: 'The border width of the card component',
                value: ['var(----border-top-width)', 'var(----border-right-width)', 'var(----border-bottom-width)', 'var(----border-left-width)']
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                description: 'The border top left radius of the card component',
                value: 'var(--border-top-left-radius)'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                description: 'The border top right radius of the card component',
                value: 'var(--border-top-right-radius)'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                description: 'The border bottom right radius of the card component',
                value: 'var(--border-bottom-right-radius)'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                description: 'The border bottom left radius of the card component',
                value: 'var(--border-bottom-left-radius)'
            },
            {
                name: 'border-radius',
                description: 'The border radius of the card component',
                value: ['var(----border-top-left-radius)', 'var(----border-top-right-radius)', 'var(----border-bottom-right-radius)', 'var(----border-bottom-left-radius)']
            },
            {
                name: 'box-shadow-offset-x',
                description: 'The box shadow horizontal offset of the card component',
                value: 'var(--box-shadow-offset-x)'
            },
            {
                name: 'box-shadow-offset-y',
                description: 'The box shadow vertical offset of the card component',
                value: 'var(--box-shadow-offset-y)'
            },
            {
                name: 'box-shadow-blur-radius',
                description: 'The box shadow blur radius of the card component',
                value: 'var(--box-shadow-blur-radius)'
            },
            {
                name: 'box-shadow-spread-radius',
                description: 'The box shadow spread radius of the card component',
                value: 'var(--box-shadow-spread-radius)'
            },
            {
                name: 'box-shadow-color',
                description: 'The box shadow spread radius of the card component',
                value: 'var(--box-shadow-color)'
            },
            {
                name: 'box-shadow',
                description: 'The box shadow of the card component',
                value: ['var(----box-shadow-offset-x)', 'var(----box-shadow-offset-y)', 'var(----box-shadow-blur-radius)', 'var(----box-shadow-spread-radius)', 'var(----box-shadow-color)']
            },
            {
                name: 'padding-top',
                type: 'size',
                description: 'The padding top of the card component',
                value: 'var(--padding-top)'
            },
            {
                name: 'padding-right',
                type: 'size',
                description: 'The padding right of the card component',
                value: 'var(--padding-right)'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                description: 'The padding bottom of the card component',
                value: 'var(--padding-bottom)'
            },
            {
                name: 'padding-left',
                type: 'size',
                description: 'The padding left of the card component',
                value: 'var(--padding-left)'
            },
            {
                name: 'padding',
                description: 'The padding of the card component',
                value: ['var(----padding-top)', 'var(----padding-right)', 'var(----padding-bottom)', 'var(----padding-left)']
            },
            {
                name: 'color',
                description: 'The color of the card component',
                type: 'color',
                variants: {
                    primary: 'contrast-color($color-primary)',
                    secondary: 'contrast-color($color-secondary)',
                    light: 'contrast-color($color-light)',
                    dark: 'contrast-color($color-dark)',
                    info: 'contrast-color($color-info)',
                    success: 'contrast-color($color-success)',
                    warning: 'contrast-color($color-warning)',
                    danger: 'contrast-color($color-danger)'
                }
            },
            {
                name: 'background',
                description: 'The background of the card component',
                type: 'color',
                variants: {
                    primary: 'color(\'primary\')',
                    secondary: 'color(\'secondary\')',
                    light: 'color(\'white\')',
                    dark: 'color(\'dark\')',
                    info: 'color(\'info\')',
                    success: 'color(\'success\')',
                    warning: 'color(\'warning\')',
                    danger: 'color(\'danger\')'
                }
            },
            {
                name: 'border-color',
                description: 'The border color of the card component',
                type: 'color',
                variants: {
                    primary: 'color(\'primary-60\')',
                    secondary: 'color(\'secondary-60\')',
                    light: 'color(\'light\')',
                    dark: 'color(\'dark-60\')',
                    info: 'color(\'info-60\')',
                    success: 'color(\'success-60\')',
                    warning: 'color(\'warning-60\')',
                    danger: 'color(\'danger-60\')'
                }
            },
            {
                name: 'header--color',
                description: 'The color of the card component header',
                type: 'color',
                variants: {
                    primary: 'contrast-color($color-primary)',
                    secondary: 'contrast-color($color-secondary)',
                    light: 'contrast-color($color-light)',
                    dark: 'contrast-color($color-dark)',
                    info: 'contrast-color($color-info)',
                    success: 'contrast-color($color-success)',
                    warning: 'contrast-color($color-warning)',
                    danger: 'contrast-color($color-danger)'
                }
            },
            {
                name: 'header--background',
                description: 'The background of the card component header',
                type: 'color',
                variants: {
                    primary: 'color(\'primary-55\')',
                    secondary: 'color(\'secondary-55\')',
                    light: 'color(\'white-55\')',
                    dark: 'color(\'dark-55\')',
                    info: 'color(\'info-55\')',
                    success: 'color(\'success-55\')',
                    warning: 'color(\'warning-55\')',
                    danger: 'color(\'danger-55\')'
                }
            },
            {
                name: 'header--border-color',
                description: 'The border color of the card component header',
                type: 'color',
                variants: {
                    primary: 'color(\'primary-60\')',
                    secondary: 'color(\'secondary-60\')',
                    light: 'color(\'light\')',
                    dark: 'color(\'dark-60\')',
                    info: 'color(\'info-60\')',
                    success: 'color(\'success-60\')',
                    warning: 'color(\'warning-60\')',
                    danger: 'color(\'danger-60\')'
                }
            },
            {
                name: 'footer--color',
                description: 'The color of the card component footer',
                type: 'color',
                variants: {
                    primary: 'contrast-color($color-primary)',
                    secondary: 'contrast-color($color-secondary)',
                    light: 'contrast-color($color-light)',
                    dark: 'contrast-color($color-dark)',
                    info: 'contrast-color($color-info)',
                    success: 'contrast-color($color-success)',
                    warning: 'contrast-color($color-warning)',
                    danger: 'contrast-color($color-danger)'
                }
            },
            {
                name: 'footer--background',
                description: 'The background of the card component footer',
                type: 'color',
                variants: {
                    primary: 'color(\'primary-55\')',
                    secondary: 'color(\'secondary-55\')',
                    light: 'color(\'white-55\')',
                    dark: 'color(\'dark-55\')',
                    info: 'color(\'info-55\')',
                    success: 'color(\'success-55\')',
                    warning: 'color(\'warning-55\')',
                    danger: 'color(\'danger-55\')'
                }
            },
            {
                name: 'footer--border-color',
                description: 'The border color of the card component footer',
                type: 'color',
                variants: {
                    primary: 'color(\'primary-60\')',
                    secondary: 'color(\'secondary-60\')',
                    light: 'color(\'light\')',
                    dark: 'color(\'dark-60\')',
                    info: 'color(\'info-60\')',
                    success: 'color(\'success-60\')',
                    warning: 'color(\'warning-60\')',
                    danger: 'color(\'danger-60\')'
                }
            }
        ]
    }
};
