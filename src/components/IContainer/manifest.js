module.exports = {
	name: 'container',
	slots: [
		{
			name: 'default',
			description: 'Slot for default container content',
			type: []
		}
	],
	props: [
		{
			name: 'fluid',
			description: 'Display the container as fluid, always spanning 100% width',
			type: [
				'Boolean'
			],
			default: 'false'
		}
	],
    css: {
        selector: '.column',
        defaults: {
            size: 'xs'
        },
        variables: [
            {
                name: 'width',
                description: 'The width of the container component',
                type: 'size',
                variants: {
                    xs: '100%',
                    sm: 'calc(#{breakpoint(\'sm\')} - #{gutter(\'sm\')})',
                    md: 'calc(#{breakpoint(\'md\')} - #{gutter(\'md\')})',
                    lg: 'calc(#{breakpoint(\'lg\')} - #{gutter(\'lg\')})',
                    xl: 'calc(#{breakpoint(\'xl\')} - #{gutter(\'xl\')})'
                }
            }
        ]
	}
};
