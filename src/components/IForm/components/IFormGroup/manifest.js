module.exports = {
	slots: [
		{
			name: 'default',
			description: 'Slot for default form group content',
			type: []
		}
	],
	props: [
		{
			name: 'color',
			description: 'The color variant of the form group',
			type: [
				'light',
				'dark'
			],
			default: 'light'
		},
		{
			name: 'disabled',
			description: 'The disabled state of the form group',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'inline',
			description: 'Display the form group as inline',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'name',
			description: 'The identifier of the form group',
			type: [
				'String'
			],
			default: '{"type":"","default":""}'
		},
		{
			name: 'readonly',
			description: 'The readonly state of the form group',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'size',
			description: 'The size variant of the form group',
			type: [
				'sm',
				'md',
				'lg'
			],
			default: 'md'
		}
	]
};
