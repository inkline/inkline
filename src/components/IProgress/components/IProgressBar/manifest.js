module.exports = {
	name: 'progress-bar',
	slots: [
		{
			name: 'default',
			description: 'Slot for default progress bar content',
			type: []
		}
	],
	props: [
		{
			name: 'color',
			description: 'The color variant of the progress bar',
			type: [
				'light',
				'dark',
				'primary',
				'secondary',
				'info',
				'success',
				'warning',
				'danger'
			],
			default: 'primary'
		},
		{
			name: 'value',
			description: 'The value of the progress bar',
			type: [
				'Number'
			],
			default: '0'
		}
	],
	styles: [
		{
			name: 'color',
			description: 'The color of the progress-bar component',
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
			description: 'The background of the progress-bar component',
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
		}
	]
};
