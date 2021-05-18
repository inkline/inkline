module.exports = {
	slots: [
		{
			name: 'default',
			description: 'Slot for default layout content',
			type: []
		}
	],
	props: [
		{
			name: 'vertical',
			description: 'Display the layout on a vertical orientation',
			type: [
				'Boolean'
			],
			default: 'false'
		}
	]
};
