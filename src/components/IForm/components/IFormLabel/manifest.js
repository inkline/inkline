module.exports = {
    name: 'form-label',
	slots: [
		{
			name: 'default',
			description: 'Slot for default form label content',
			type: []
		}
	],
	props: [
		{
			name: 'for',
			description: 'The id of the target input to be focused by the form label. If left empty, clicking the form label will focus the next sibling input',
			type: [
				'String'
			],
			default: '{"type":"","default":""}'
		},
		{
			name: 'placement',
			description: 'The placement of the form label',
			type: [
				'left',
				'right'
			],
			default: 'left'
		},
		{
			name: 'size',
			description: 'The size variant of the form label',
			type: [
				'sm',
				'md',
				'lg'
			],
			default: 'md'
		}
	],
    css: {
        selector: '.form-label',
        variables: [
            {
                name: 'font-size',
                description: 'The font size of the form label component',
                type: 'size',
                value: 'font-size()'
            },
            {
                name: 'margin-top',
                description: 'The margin top of the form label component',
                value: '0'
            },
            {
                name: 'margin-right',
                description: 'The margin right of the form label component',
                value: '0'
            },
            {
                name: 'margin-bottom',
                description: 'The margin bottom of the form label component',
                value: 'calc(var(--margin-bottom) / 4)'
            },
            {
                name: 'margin-left',
                description: 'The margin left of the form label component',
                value: '0'
            },
            {
                name: 'margin',
                description: 'The margin of the form label component',
                value: ['var(----margin-top)', 'var(----margin-right)', 'var(----margin-bottom)', 'var(----margin-left)']
            },
        ]
    }
};
