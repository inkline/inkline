module.exports = {
	name: 'alert',
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
			description: 'Slot for default alert content',
			type: []
		},
		{
			name: 'icon',
			description: 'Slot for alert icon',
			type: []
		},
		{
			name: 'dismiss',
			description: 'Slot for alert dismiss button',
			type: []
		}
	],
	props: [
		{
			name: 'size',
			description: 'The size variant of the alert',
			type: [
				'sm',
				'md',
				'lg'
			],
			default: 'md'
		},
		{
			name: 'color',
			description: 'The color variant of the alert',
			type: [
				'info',
				'success',
				'warning',
				'danger'
			],
			default: 'info'
		},
		{
			name: 'modelValue',
			description: 'Used to show or hide a dismissible alert',
			type: [
				'Boolean'
			],
			default: 'true'
		},
		{
			name: 'dismissible',
			description: 'Shows a dismiss icon on the alert',
			type: [
				'Boolean'
			],
			default: 'false'
		}
	],
    css: {
        selector: '.alert',
        defaults: {
            size: 'md',
            color: 'info'
        },
        variables: [
            {
                name: 'font-weight',
                description: 'The font weight of the alert component',
                value: 'font-weight(\'normal\')'
            },
            {
                name: 'line-height',
                description: 'The line height of the alert component',
                value: 'var(--line-height)'
            },
            {
                name: 'border-style',
                description: 'The border style of the alert component',
                value: 'var(--border-style)'
            },
            {
                name: 'border-top-width',
                description: 'The border top width of the alert component',
                value: 'var(--border-top-width)'
            },
            {
                name: 'border-right-width',
                description: 'The border right width of the alert component',
                value: 'var(--border-right-width)'
            },
            {
                name: 'border-bottom-width',
                description: 'The border bottom width of the alert component',
                value: 'var(--border-bottom-width)'
            },
            {
                name: 'border-left-width',
                description: 'The border left width of the alert component',
                value: 'var(--border-left-width)'
            },
            {
                name: 'border-width',
                description: 'The border width of the alert component',
                value: ['var(----border-top-width)', 'var(----border-right-width)', 'var(----border-bottom-width)', 'var(----border-left-width)']
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                description: 'The border top left radius of the alert component',
                value: 'var(--border-top-left-radius)'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                description: 'The border top right radius of the alert component',
                value: 'var(--border-top-right-radius)'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                description: 'The border bottom right radius of the alert component',
                value: 'var(--border-bottom-right-radius)'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                description: 'The border bottom left radius of the alert component',
                value: 'var(--border-bottom-left-radius)'
            },
            {
                name: 'border-radius',
                description: 'The border radius of the alert component',
                value: ['var(----border-top-left-radius)', 'var(----border-top-right-radius)', 'var(----border-bottom-right-radius)', 'var(----border-bottom-left-radius)']
            },
            {
                name: 'box-shadow-offset-x',
                description: 'The box shadow horizontal offset of the alert component',
                value: 'var(--box-shadow-offset-x)'
            },
            {
                name: 'box-shadow-offset-y',
                description: 'The box shadow vertical offset of the alert component',
                value: 'var(--box-shadow-offset-y)'
            },
            {
                name: 'box-shadow-blur-radius',
                description: 'The box shadow blur radius of the alert component',
                value: 'var(--box-shadow-blur-radius)'
            },
            {
                name: 'box-shadow-spread-radius',
                description: 'The box shadow spread radius of the alert component',
                value: 'var(--box-shadow-spread-radius)'
            },
            {
                name: 'box-shadow-color',
                description: 'The box shadow spread radius of the alert component',
                value: 'var(--box-shadow-color)'
            },
            {
                name: 'box-shadow',
                description: 'The box shadow of the alert component',
                value: ['var(----box-shadow-offset-x)', 'var(----box-shadow-offset-y)', 'var(----box-shadow-blur-radius)', 'var(----box-shadow-spread-radius)', 'var(----box-shadow-color)']
            },
            {
                name: 'dismiss--padding',
                description: 'The padding of the alert component dismiss icon',
                value: 'calc(var(----padding-top) / 2)'
            },
            {
                name: 'dismiss--margin',
                description: 'The margin of the alert component dismiss icon',
                value: 'var(----padding-right)'
            },
            {
                name: 'font-size',
                type: 'size',
                description: 'The font size of the alert component',
                value: 'font-size()'
            },
            {
                name: 'padding-top',
                type: 'size',
                description: 'The padding top of the alert component',
                value: 'var(--padding-top)'
            },
            {
                name: 'padding-right',
                type: 'size',
                description: 'The padding right of the alert component',
                value: 'var(--padding-right)'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                description: 'The padding bottom of the alert component',
                value: 'var(--padding-bottom)'
            },
            {
                name: 'padding-left',
                type: 'size',
                description: 'The padding left of the alert component',
                value: 'var(--padding-left)'
            },
            {
                name: 'padding',
                description: 'The padding of the alert component',
                value: ['var(----padding-top)', 'var(----padding-right)', 'var(----padding-bottom)', 'var(----padding-left)']
            },
            {
                name: 'background',
                description: 'The background of the alert component',
                type: 'color',
                variants: {
                    info: 'color(\'info\')',
                    success: 'color(\'success\')',
                    warning: 'color(\'warning\')',
                    danger: 'color(\'danger\')'
                }
            },
            {
                name: 'border-color',
                description: 'The border color of the alert component',
                type: 'color',
                variants: {
                    info: 'color(\'info-60\')',
                    success: 'color(\'success-60\')',
                    warning: 'color(\'warning-60\')',
                    danger: 'color(\'danger-60\')'
                }
            },
            {
                name: 'color',
                description: 'The text color of the alert component',
                type: 'color',
                variants: {
                    info: 'contrast-color($color-info)',
                    success: 'contrast-color($color-success)',
                    warning: 'contrast-color($color-warning)',
                    danger: 'contrast-color($color-danger)'
                }
            },
            {
                name: 'link--color',
                description: 'The link color of the alert component',
                value: 'var(----color)'
            },
            {
                name: 'code--color',
                description: 'The code color of the alert component',
                value: 'var(----color)'
            },
            {
                name: 'code--background',
                description: 'The code background of the alert component',
                type: 'color',
                variants: {
                    info: 'color(\'info-60\')',
                    success: 'color(\'success-60\')',
                    warning: 'color(\'warning-60\')',
                    danger: 'color(\'danger-60\')'
                }
            }
        ]
    }
};
