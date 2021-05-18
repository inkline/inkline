module.exports = {
	slots: [
		{
			name: 'default',
			description: 'Slot for default collapsible item content',
			type: []
		},
		{
			name: 'header',
			description: 'Slot for collapsible item header content',
			type: []
		}
	],
	props: [
		{
			name: 'name',
			description: 'The unique identifier of the collapsible item, used for determining if the item is open or not',
			type: [
				'String'
			],
			default: 'uid()'
		},
		{
			name: 'title',
			description: 'The title of the collapsible item',
			type: [
				'String'
			]
		}
	]
};
