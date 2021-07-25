module.exports = {
    name: 'breadcrumb',
    slots: [
        {
            name: 'default',
            description: 'Slot for default breadcrumb content',
            type: []
        }
    ],
    props: [
        {
            name: 'color',
            description: 'The color variant of the breadcrumb',
            type: [
                'light',
                'dark'
            ],
            default: 'light'
        },
        {
            name: 'size',
            description: 'The size variant of the breadcrumb',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md'
        }
    ],
    css: {
	    selector: '.breadcrumb',
        defaults: {
            size: 'md',
            color: 'light'
        },
        variables: [
            {
                name: 'color',
                description: 'The text color of the breadcrumb component',
                type: 'color',
                variants: {
                    light: 'color(\'primary\')',
                    dark: 'color(\'primary\')'
                }
            },
            {
                name: 'color--default',
                description: 'The text default color of the breadcrumb component',
                type: 'color',
                variants: {
                    light: 'color(\'gray-90\')',
                    dark: 'color(\'white\')'
                }
            },
            {
                name: 'color--active',
                description: 'The text active color of the breadcrumb component',
                type: 'color',
                variants: {
                    light: 'color(\'gray-70\')',
                    dark: 'color(\'gray-40\')'
                }
            },
            {
                name: 'font-size',
                description: 'The font size of the breadcrumb component',
                type: 'size',
                value: 'font-size()'
            },
            {
                name: 'margin-bottom',
                description: 'The bottom margin of the breadcrumb component',
                value: 'spacing()'
            },
            {
                name: 'padding-right',
                type: 'size',
                description: 'The padding right of the breadcrumb component',
                value: 'var(--padding-right)'
            },
            {
                name: 'padding-left',
                type: 'size',
                description: 'The padding left of the breadcrumb component',
                value: 'var(--padding-left)'
            }
        ]
    }
};
