module.exports = {
	name: 'media',
	slots: [
		{
			name: 'default',
			description: 'Slot for default media content',
			type: []
		}
	],
	css: {
	    selector: '.media',
        defaults: {
            size: 'md',
            color: 'light'
        },
	    variables: [
            {
                name: 'image--margin-right',
                description: 'The margin right of the media component image',
                value: 'var(--margin-right)'
            }
        ]
    }
};
