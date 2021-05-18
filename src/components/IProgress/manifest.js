module.exports = {
	name: 'progress',
	slots: [
		{
			name: 'default',
			description: 'Slot for default progress content',
			type: []
		}
	],
	props: [
		{
			name: 'color',
			description: 'The color variant of the progress component',
			type: [
				'light',
				'dark'
			],
			default: 'light'
		},
		{
			name: 'min',
			description: 'The value to consider as the 0% starting point',
			type: [
				'Number'
			],
			default: '0'
		},
		{
			name: 'max',
			description: 'The value to consider as the 100% ending point',
			type: [
				'Number'
			],
			default: '100'
		},
		{
			name: 'size',
			description: 'The size variant of the progress component',
			type: [
				'sm',
				'md',
				'lg'
			],
			default: 'md'
		}
	],
	styles: [
		{
			name: 'border-radius',
			description: 'The border radius of the progress component',
			type: 'size',
			default: 'border-radius()'
		},
		{
			name: 'height',
			description: 'The height of the progress component',
			type: 'size',
			default: 'spacing(\'3/4\')'
		},
		{
			name: 'background',
			description: 'The background of the progress component',
			type: 'color',
			variants: {
				light: 'color(\'light\')',
				dark: 'color(\'dark\')'
			}
		}
	]
};
