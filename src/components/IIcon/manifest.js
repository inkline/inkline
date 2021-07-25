module.exports = {
    name: 'icon',
    props: [
        {
            name: 'exports',
            description: 'The size variant of the icon',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md'
        }
    ],
    css: {
	    selector: '.inkline-icon',
        defaults: {
            size: 'md',
            color: 'light'
        },
        variables: [
            {
                name: 'size',
                type: 'size',
                description: 'The size of the icon component',
                value: '1rem'
            }
        ]
    }
};
