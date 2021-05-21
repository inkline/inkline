module.exports = {
	name: 'modal',
	events: [
		{
			name: 'update:modelValue',
			description: 'Event emitted for setting the modelValue',
			type: []
		},
		{
			name: 'update:modelValue',
			description: 'Event emitted for setting the modelValue',
			type: []
		}
	],
	slots: [
		{
			name: 'default',
			description: 'Slot for modal body content',
			type: []
		},
		{
			name: 'header',
			description: 'Slot for modal header content',
			type: []
		},
		{
			name: 'footer',
			description: 'Slot for modal footer content',
			type: []
		}
	],
	props: [
		{
			name: 'closeOnPressEscape',
			description: 'Determines if the modal should close when pressing escape',
			type: [
				'Boolean'
			],
			default: 'true'
		},
		{
			name: 'color',
			description: 'The color variant of the modal',
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
			name: 'disabled',
			description: 'The disabled state of the modal',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'hideOnClickOutside',
			description: 'Determines if the modal should close when clicking the overlay',
			type: [
				'Boolean'
			],
			default: 'true'
		},
		{
			name: 'id',
			description: 'The identifier of the modal',
			type: [
				'String'
			],
			default: 'uid()'
		},
		{
			name: 'showClose',
			description: 'Determines if the close icon should be visible in the modal header',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'size',
			description: 'The size variant of the modal',
			type: [
				'sm',
				'md',
				'lg'
			],
			default: 'md'
		},
		{
			name: 'modelValue',
			description: 'Used to determine if modal is visible or not',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'transition',
			description: 'The modal opening and closing animation',
			type: [
				'fade-in-transition',
				'fade-in-linear-transition',
				'zoom-in-top-transition',
				'zoom-in-bottom-transition',
				'zoom-in-center-transition',
				'zoom-in-left-transition',
				'zoom-in-right-transition'
			],
			default: 'zoom-in-center-transition'
		}
	],
	css: {
	    selector: '.modal-overlay',
        defaults: {
            size: 'md',
            color: 'light'
        },
	    variables: [
            {
                name: 'font-weight',
                description: 'The font weight of the modal component',
                value: 'font-weight(\'normal\')'
            },
            {
                name: 'font-size',
                description: 'The font size of the modal component',
                type: 'size',
                value: 'font-size()'
            },
            {
                name: 'line-height',
                description: 'The line height of the modal component',
                value: 'var(--line-height)'
            },

            {
                name: 'border-top-width',
                description: 'The border top width of the modal component',
                value: 'var(--border-top-width)'
            },
            {
                name: 'border-right-width',
                description: 'The border right width of the modal component',
                value: 'var(--border-right-width)'
            },
            {
                name: 'border-bottom-width',
                description: 'The border bottom width of the modal component',
                value: 'var(--border-bottom-width)'
            },
            {
                name: 'border-left-width',
                description: 'The border left width of the modal component',
                value: 'var(--border-left-width)'
            },
            {
                name: 'border-width',
                description: 'The border width of the modal component',
                value: ['var(----border-top-width)', 'var(----border-right-width)', 'var(----border-bottom-width)', 'var(----border-left-width)']
            },
            {
                name: 'border-top-left-radius',
                type: 'size',
                description: 'The border top left radius of the modal component',
                value: 'var(--border-top-left-radius)'
            },
            {
                name: 'border-top-right-radius',
                type: 'size',
                description: 'The border top right radius of the modal component',
                value: 'var(--border-top-right-radius)'
            },
            {
                name: 'border-bottom-right-radius',
                type: 'size',
                description: 'The border bottom right radius of the modal component',
                value: 'var(--border-bottom-right-radius)'
            },
            {
                name: 'border-bottom-left-radius',
                type: 'size',
                description: 'The border bottom left radius of the modal component',
                value: 'var(--border-bottom-left-radius)'
            },
            {
                name: 'border-radius',
                description: 'The border radius of the modal component',
                value: ['var(----border-top-left-radius)', 'var(----border-top-right-radius)', 'var(----border-bottom-right-radius)', 'var(----border-bottom-left-radius)']
            },
            {
                name: 'padding-top',
                type: 'size',
                description: 'The padding top of the modal component',
                value: 'var(--padding-top)'
            },
            {
                name: 'padding-right',
                type: 'size',
                description: 'The padding right of the modal component',
                value: 'var(--padding-right)'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                description: 'The padding bottom of the modal component',
                value: 'var(--padding-bottom)'
            },
            {
                name: 'padding-left',
                type: 'size',
                description: 'The padding left of the modal component',
                value: 'var(--padding-left)'
            },
            {
                name: 'padding',
                description: 'The padding of the modal component',
                value: ['var(----padding-top)', 'var(----padding-right)', 'var(----padding-bottom)', 'var(----padding-left)']
            },
            {
                name: 'margin-top',
                type: 'size',
                description: 'The margin top of the modal component',
                value: 'var(--margin-top)'
            },
            {
                name: 'margin-right',
                type: 'size',
                description: 'The margin right of the modal component',
                value: 'var(--margin-right)'
            },
            {
                name: 'margin-bottom',
                type: 'size',
                description: 'The margin bottom of the modal component',
                value: 'var(--margin-bottom)'
            },
            {
                name: 'margin-left',
                type: 'size',
                description: 'The margin left of the modal component',
                value: 'var(--margin-left)'
            },
            {
                name: 'margin',
                description: 'The margin of the modal component',
                value: ['var(----margin-top)', 'var(----margin-right)', 'var(----margin-bottom)', 'var(----margin-left)']
            },
            {
                name: 'width',
                description: 'The width of the modal component',
                type: 'size',
                value: '480px'
            },
            {
                name: 'color',
                description: 'The color of the modal component',
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
                description: 'The background of the modal component',
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
                description: 'The border color of the modal component',
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
                description: 'The color of the modal component header',
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
                description: 'The background of the modal component header',
                type: 'color',
                variants: {
                    primary: 'color(\'primary-55\')',
                    secondary: 'color(\'secondary-55\')',
                    light: 'color(\'light-25\')',
                    dark: 'color(\'dark-55\')',
                    info: 'color(\'info-55\')',
                    success: 'color(\'success-55\')',
                    warning: 'color(\'warning-55\')',
                    danger: 'color(\'danger-55\')'
                }
            },
            {
                name: 'header--border-color',
                description: 'The border color of the modal component header',
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
                description: 'The color of the modal component footer',
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
                description: 'The background of the modal component footer',
                type: 'color',
                variants: {
                    primary: 'color(\'primary-55\')',
                    secondary: 'color(\'secondary-55\')',
                    light: 'color(\'light-25\')',
                    dark: 'color(\'dark-55\')',
                    info: 'color(\'info-55\')',
                    success: 'color(\'success-55\')',
                    warning: 'color(\'warning-55\')',
                    danger: 'color(\'danger-55\')'
                }
            },
            {
                name: 'footer--border-color',
                description: 'The border color of the modal component footer',
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
                name: 'overlay--background',
                description: 'The background of the modal component overlay',
                value: 'rgba(0, 0, 0, 0.75)'
            },
        ]
    }
};
