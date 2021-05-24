module.exports = {
	name: 'button',
	slots: [
		{
			name: 'default',
			description: 'Slot for default button content',
			type: []
		},
		{
			name: 'loading',
			description: 'Slot for button loading state',
			type: []
		}
	],
	props: [
		{
			name: 'active',
			description: 'The active state of the button',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'block',
			description: 'Display the button as a block, spanning the full container width',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'circle',
			description: 'Display the button as a circle',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'color',
			description: 'The color variant of the button',
			type: [
				'primary',
				'success',
				'light',
				'dark',
				'info',
				'success',
				'warning',
				'danger',
				'facebook',
				'google',
				'twitter',
				'github'
			],
			default: 'light'
		},
		{
			name: 'disabled',
			description: 'The disabled state of the button',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'link',
			description: 'Display the button as a link',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'loading',
			description: 'The loading state of the button',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'outline',
			description: 'Display the button as an outline button',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'tag',
			description: 'Set the HTML tag to be used for rendering the button',
			type: [
				'String'
			],
			default: 'button'
		},
		{
			name: 'tabindex',
			description: 'The tabindex of the button',
			type: [
				'Number',
				'String'
			],
			default: '1'
		},
		{
			name: 'size',
			description: 'The size variant of the button',
			type: [
				'sm',
				'md',
				'lg'
			],
			default: 'md'
		}
	],
	css: {
	    selector: '.button',
        defaults: {
            size: 'md',
            color: 'light'
        },
        variables: [
            {
                name: 'background',
                description: 'The background of the button component',
                type: 'color',
                variants: {
                    primary: 'color(\'primary\')',
                    secondary: 'color(\'secondary\')',
                    light: 'color(\'light\')',
                    dark: 'color(\'dark\')',
                    info: 'color(\'info\')',
                    success: 'color(\'success\')',
                    warning: 'color(\'warning\')',
                    danger: 'color(\'danger\')',
                    facebook: 'color(\'facebook\')',
                    google: 'color(\'google\')',
                    twitter: 'color(\'twitter\')',
                    github: 'color(\'github\')'
                }
            },
            {
                name: 'background--hover',
                description: 'The background of the button component when hovered or focused',
                type: 'color',
                variants: {
                    primary: 'color(\'primary-55\')',
                    secondary: 'color(\'secondary-55\')',
                    light: 'color(\'light-55\')',
                    dark: 'color(\'dark-45\')',
                    info: 'color(\'info-55\')',
                    success: 'color(\'success-55\')',
                    warning: 'color(\'warning-55\')',
                    danger: 'color(\'danger-55\')',
                    facebook: 'color(\'facebook-55\')',
                    google: 'color(\'google-55\')',
                    twitter: 'color(\'twitter-55\')',
                    github: 'color(\'github-55\')'
                }
            },
            {
                name: 'background--active',
                description: 'The background of the button component when active',
                type: 'color',
                variants: {
                    primary: 'color(\'primary-60\')',
                    secondary: 'color(\'secondary-60\')',
                    light: 'color(\'light-60\')',
                    dark: 'color(\'dark-40\')',
                    info: 'color(\'info-60\')',
                    success: 'color(\'success-60\')',
                    warning: 'color(\'warning-60\')',
                    danger: 'color(\'danger-60\')',
                    facebook: 'color(\'facebook-60\')',
                    google: 'color(\'google-60\')',
                    twitter: 'color(\'twitter-60\')',
                    github: 'color(\'github-60\')'
                }
            },
            {
                name: 'border-color',
                description: 'The border color of the button component',
                type: 'color',
                variants: {
                    primary: 'color(\'primary-55\')',
                    secondary: 'color(\'secondary-55\')',
                    light: 'color(\'light-55\')',
                    dark: 'color(\'dark-45\')',
                    info: 'color(\'info-55\')',
                    success: 'color(\'success-55\')',
                    warning: 'color(\'warning-55\')',
                    danger: 'color(\'danger-55\')',
                    facebook: 'color(\'facebook-55\')',
                    google: 'color(\'google-55\')',
                    twitter: 'color(\'twitter-55\')',
                    github: 'color(\'github-55\')'
                }
            },
            {
                name: 'border-color--hover',
                description: 'The border color of the button component when hovered or focused',
                value: 'var(----border-color)'
            },
            {
                name: 'border-style',
                description: 'The border style of the button component',
                value: 'var(--border-style)'
            },
            {
                name: 'border-top-width',
                description: 'The border top width of the button component',
                value: 'var(--border-top-width)'
            },
            {
                name: 'border-right-width',
                description: 'The border right width of the button component',
                value: 'var(--border-right-width)'
            },
            {
                name: 'border-bottom-width',
                description: 'The border bottom width of the button component',
                value: 'var(--border-bottom-width)'
            },
            {
                name: 'border-left-width',
                description: 'The border left width of the button component',
                value: 'var(--border-left-width)'
            },
            {
                name: 'border-width',
                description: 'The border width of the button component',
                value: ['var(----border-top-width)', 'var(----border-right-width)', 'var(----border-bottom-width)', 'var(----border-left-width)']
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                description: 'The border top left radius of the button component',
                value: 'var(--border-top-left-radius)'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                description: 'The border top right radius of the button component',
                value: 'var(--border-top-right-radius)'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                description: 'The border bottom right radius of the button component',
                value: 'var(--border-bottom-right-radius)'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                description: 'The border bottom left radius of the button component',
                value: 'var(--border-bottom-left-radius)'
            },
            {
                name: 'border-radius',
                description: 'The border radius of the button component',
                value: ['var(----border-top-left-radius)', 'var(----border-top-right-radius)', 'var(----border-bottom-right-radius)', 'var(----border-bottom-left-radius)']
            },
            {
                name: 'box-shadow-offset-x',
                description: 'The box shadow horizontal offset of the button component',
                value: 'var(--box-shadow-offset-x)'
            },
            {
                name: 'box-shadow-offset-y',
                description: 'The box shadow vertical offset of the button component',
                value: 'var(--box-shadow-offset-y)'
            },
            {
                name: 'box-shadow-blur-radius',
                description: 'The box shadow blur radius of the button component',
                value: 'var(--box-shadow-blur-radius)'
            },
            {
                name: 'box-shadow-spread-radius',
                description: 'The box shadow spread radius of the button component',
                value: 'var(--box-shadow-spread-radius)'
            },
            {
                name: 'box-shadow-color',
                description: 'The box shadow spread radius of the button component',
                value: 'var(--box-shadow-color)'
            },
            {
                name: 'box-shadow',
                description: 'The box shadow of the button component',
                value: ['var(----box-shadow-offset-x)', 'var(----box-shadow-offset-y)', 'var(----box-shadow-blur-radius)', 'var(----box-shadow-spread-radius)', 'var(----box-shadow-color)']
            },
            {
                name: 'color',
                description: 'The color of the button component',
                type: 'color',
                variants: {
                    primary: 'contrast-color($color-primary)',
                    secondary: 'contrast-color($color-secondary)',
                    light: 'contrast-color($color-light)',
                    dark: 'contrast-color($color-dark)',
                    info: 'contrast-color($color-info)',
                    success: 'contrast-color($color-success)',
                    warning: 'contrast-color($color-warning)',
                    danger: 'contrast-color($color-danger)',
                    facebook: 'contrast-color($color-facebook)',
                    google: 'contrast-color($color-google)',
                    twitter: 'contrast-color($color-twitter)',
                    github: 'contrast-color($color-github)'
                }
            },
            {
                name: 'font-size',
                description: 'The font size of the button component',
                type: 'size',
                value: 'font-size()'
            },
            {
                name: 'font-weight',
                description: 'The font weight of the button component',
                value: 'font-weight(\'normal\')'
            },
            {
                name: 'line-height',
                description: 'The line height of the button component',
                value: 'var(--line-height)'
            },
            {
                name: 'padding-top',
                type: 'size',
                description: 'The padding top of the button component',
                value: 'calc(var(--padding-top) / 2)'
            },
            {
                name: 'padding-right',
                type: 'size',
                description: 'The padding right of the button component',
                value: 'var(--padding-right)'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                description: 'The padding bottom of the button component',
                value: 'calc(var(--padding-bottom) / 2)'
            },
            {
                name: 'padding-left',
                type: 'size',
                description: 'The padding left of the button component',
                value: 'var(--padding-left)'
            },
            {
                name: 'padding',
                description: 'The padding of the button component',
                value: ['var(----padding-top)', 'var(----padding-right)', 'var(----padding-bottom)', 'var(----padding-left)']
            },
            {
                name: 'block--margin',
                description: 'The margin of the button component when block',
                value: 'spacing()'
            },
            {
                name: 'circle--size',
                description: 'The size of the button component circle variant',
                type: 'size',
                variants: {
                    sm: '34px',
                    md: '42px',
                    lg: '49px'
                }
            },
            {
                name: 'link--color',
                description: 'The color of the button component link variant',
                type: 'color',
                variants: {
                    primary: 'color(\'primary\')',
                    secondary: 'color(\'secondary\')',
                    light: 'color(\'light\')',
                    dark: 'color(\'dark\')',
                    info: 'color(\'info\')',
                    success: 'color(\'success\')',
                    warning: 'color(\'warning\')',
                    danger: 'color(\'danger\')',
                    facebook: 'color(\'facebook\')',
                    google: 'color(\'google\')',
                    twitter: 'color(\'twitter\')',
                    github: 'color(\'github\')'
                }
            },
            {
                name: 'link--color--active',
                description: 'The color of the button component link variant when active',
                type: 'color',
                variants: {
                    primary: 'color(\'primary-55\')',
                    secondary: 'color(\'secondary-55\')',
                    light: 'color(\'light-55\')',
                    dark: 'color(\'dark-45\')',
                    info: 'color(\'info-55\')',
                    success: 'color(\'success-55\')',
                    warning: 'color(\'warning-55\')',
                    danger: 'color(\'danger-55\')',
                    facebook: 'color(\'facebook-55\')',
                    google: 'color(\'google-55\')',
                    twitter: 'color(\'twitter-55\')',
                    github: 'color(\'github-55\')'
                }
            },
            {
                name: 'outline--background',
                description: 'The background of the button component outline variant',
                value: 'transparent'
            },
            {
                name: 'outline--background--hover',
                description: 'The background of the button component outline variant when hovered',
                value: 'var(----background)'
            },
            {
                name: 'outline--background--active',
                description: 'The background of the button component outline variant when active',
                value: 'var(----background--active)'
            },
            {
                name: 'outline--border-color',
                description: 'The border color of the button component outline variant',
                value: 'var(----background)'
            },
            {
                name: 'outline--border-color--hover',
                description: 'The border color of the button component outline variant when hovered or focused',
                value: 'var(----border-color--hover)'
            },
            {
                name: 'outline--color',
                description: 'The color of the button component outline variant',
                value: 'var(----background)'
            },
            {
                name: 'outline--color--hover',
                description: 'The color of the button component outline variant when hovered or focused',
                value: 'var(----color)'
            },
            {
                name: 'outline--color--active',
                description: 'The color of the button component outline variant when hovered or focused',
                value: 'var(----outline--color--hover)'
            }
        ]
    }
};
