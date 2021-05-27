module.exports = {
	name: 'header',
	slots: [
		{
			name: 'default',
			description: 'Slot for default header content',
			type: []
		}
	],
	props: [
		{
			name: 'color',
			description: 'The color variant of the header',
			type: [
				'primary',
				'light',
				'dark'
			],
			default: 'light'
		},
		{
			name: 'cover',
			description: 'Display the header background as cover, always covering the whole header width',
			type: [
				'Boolean'
			],
			default: 'true'
		},
		{
			name: 'fluid',
			description: 'Display the inner content container as fluid, covering 100% of the header width',
			type: [
				'Boolean'
			],
			default: 'false'
		},
		{
			name: 'fullscreen',
			description: 'Display the header as fullscreen, covering 100% screen height and 100% screen width',
			type: [
				'Boolean'
			],
			default: 'true'
		},
		{
			name: 'size',
			description: 'The size variant of the header',
			type: [
				'sm',
				'md',
				'lg'
			],
			default: 'md'
		}
	],
	css: {
	    selector: '.header',
        defaults: {
            size: 'md',
            color: 'light'
        },
        variables: [
            {
                name: 'background',
                description: 'The background of the header component',
                type: 'color',
                variants: {
                    primary: 'color(\'primary\')',
                    light: 'color(\'light\')',
                    dark: 'color(\'dark\')'
                }
            },
            {
                name: 'color',
                description: 'The color of the header component',
                type: 'color',
                variants: {
                    primary: 'contrast-color($color-primary)',
                    light: 'contrast-color($color-light)',
                    dark: 'contrast-color($color-dark)'
                }
            },
            {
                name: 'padding-top',
                type: 'size',
                description: 'The padding top of the header component',
                value: '10rem'
            },
            {
                name: 'padding-right',
                type: 'size',
                description: 'The padding right of the header component',
                value: '0'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                description: 'The padding bottom of the header component',
                value: '10rem'
            },
            {
                name: 'padding-left',
                type: 'size',
                description: 'The padding left of the header component',
                value: '0'
            },
            {
                name: 'padding',
                description: 'The padding of the header component',
                value: ['var(----padding-top)', 'var(----padding-right)', 'var(----padding-bottom)', 'var(----padding-left)']
            }
        ]
    }
};
