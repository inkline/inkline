module.exports = {
    name: 'dropdown-item',
	slots: [
		{
			name: 'default',
			description: 'Slot for default dropdown item content',
			type: []
		}
	],
	props: [
		{
			name: 'active',
			description: 'The active state of the dropdown item',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'disabled',
			description: 'The disabled state of the dropdown item',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'plaintext',
			description: 'Display the dropdown item as plaintext',
			type: [
				'String'
			],
			default: 'div'
		},
		{
			name: 'tag',
			description: 'Set the HTML tag to be used for rendering the dropdown item',
			type: [
				'String'
			],
			default: 'div'
		},
		{
			name: 'tabindex',
			description: 'The tabindex of the list group item',
			type: [
				'Number',
				'String'
			],
			default: '1'
		}
	],
    css: {
        selector: '.dropdown-item'
    }
};
