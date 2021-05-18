module.exports = {
	slots: [
		{
			name: 'default',
			description: 'Slot for default checkbox group options',
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
			name: 'color',
			description: 'The color variant of the checkbox group',
			type: [
				'light',
				'dark'
			],
			default: 'light'
		},
		{
			name: 'disabled',
			description: 'The disabled state of the checkbox group',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'inline',
			description: 'Display the checkbox group as inline',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'indeterminate',
			description: 'The indeterminate state of the checkbox group',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'modelValue',
			description: 'Used to set the checkbox group value',
			type: [],
			default: '[]'
		},
		{
			name: 'name',
			description: 'The unique identifier of the checkbox group',
			type: [
				'String'
			],
			default: 'uid()'
		},
		{
			name: 'readonly',
			description: 'The readonly state of the checkbox group',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'size',
			description: 'The size variant of the checkbox group',
			type: [
				'sm',
				'md',
				'lg'
			],
			default: 'md'
		}
	]
};
