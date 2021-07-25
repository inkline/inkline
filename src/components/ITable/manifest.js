module.exports = {
    name: 'table',
    slots: [
        {
            name: 'default',
            description: 'Slot for default table content',
            type: []
        }
    ],
    props: [
        {
            name: 'border',
            description: 'Display the table with borders',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'condensed',
            description: 'Display the table rows as condensed',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'striped',
            description: 'Display the table rows as alternating stripes',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'hover',
            description: 'Set the table rows as hoverable',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'responsive',
            description: 'Set the table to be responsive, enabling horizontal scroll when overflowing the parent container',
            type: [
                'Boolean',
                'xs',
                'sm',
                'md',
                'lg',
                'xl',
                'xxl'
            ],
            default: 'false'
        },
        {
            name: 'nowrap',
            description: 'Display the table rows without wrapping white-space',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'color',
            description: 'The color variant of the table',
            type: [
                'primary',
                'success',
                'light',
                'dark',
                'info',
                'success',
                'warning',
                'danger'
            ],
            default: 'light'
        }
    ],
    css: {
	    selector: '.table-wrapper',
        defaults: {
            size: 'md',
            color: 'light'
        },
	    variables: [
            {
                name: 'background',
                description: 'The background of the table component',
                type: 'color',
                variants: {
                    primary: 'color(\'primary\')',
                    secondary: 'color(\'secondary\')',
                    light: 'color(\'white\')',
                    dark: 'color(\'dark\')',
                    info: 'color(\'info\')',
                    success: 'color(\'success\')',
                    warning: 'color(\'warning\')',
                    danger: 'color(\'danger\')'
                }
            },
            {
                name: 'background--hover',
                description: 'The background of the table component when hovered',
                type: 'color',
                variants: {
                    primary: 'color(\'primary-60\')',
                    secondary: 'color(\'secondary-60\')',
                    light: 'color(\'light-30\')',
                    dark: 'color(\'gray-40\')',
                    info: 'color(\'info-60\')',
                    success: 'color(\'success-60\')',
                    warning: 'color(\'warning-60\')',
                    danger: 'color(\'danger-60\')'
                }
            },
            {
                name: 'background--striped',
                description: 'The background of the table component when striped',
                type: 'color',
                variants: {
                    primary: 'color(\'primary-55\')',
                    secondary: 'color(\'secondary-55\')',
                    light: 'color(\'light-25\')',
                    dark: 'color(\'dark-45\')',
                    info: 'color(\'info-55\')',
                    success: 'color(\'success-55\')',
                    warning: 'color(\'warning-55\')',
                    danger: 'color(\'danger-55\')'
                }
            },
            {
                name: 'border-style',
                description: 'The border style of the table component',
                value: 'var(--border-style)'
            },
            {
                name: 'border-top-width',
                description: 'The border top width of the table component',
                value: 'var(--border-top-width)'
            },
            {
                name: 'border-right-width',
                description: 'The border right width of the table component',
                value: 'var(--border-right-width)'
            },
            {
                name: 'border-bottom-width',
                description: 'The border bottom width of the table component',
                value: 'var(--border-bottom-width)'
            },
            {
                name: 'border-left-width',
                description: 'The border left width of the table component',
                value: 'var(--border-left-width)'
            },
            {
                name: 'border-width',
                description: 'The border width of the table component',
                value: ['var(----border-top-width)', 'var(----border-right-width)', 'var(----border-bottom-width)', 'var(----border-left-width)']
            },
            {
                name: 'border-color',
                description: 'The border color of the table component',
                type: 'color',
                variants: {
                    primary: 'color(\'primary-55\')',
                    secondary: 'color(\'secondary-55\')',
                    light: 'color(\'light-25\')',
                    dark: 'color(\'dark-45\')',
                    info: 'color(\'info-55\')',
                    success: 'color(\'success-55\')',
                    warning: 'color(\'warning-55\')',
                    danger: 'color(\'danger-55\')'
                }
            },
            {
                name: 'color',
                description: 'The color of the table component',
                type: 'color',
                variants: {
                    primary: 'contrast-color($color-primary)',
                    secondary: 'contrast-color($color-secondary)',
                    light: 'contrast-color($color-light)',
                    dark: 'contrast-color($color-dark)',
                    info: 'contrast-color($color-info)',
                    success: 'contrast-color($color-success)',
                    warning: 'contrast-color($color-warning)',
                    danger: 'contrast-color($color-danger)'
                }
            },
            {
                name: 'margin-bottom',
                description: 'The bottom margin of the table component',
                value: 'var(--margin-bottom)'
            },
            {
                name: 'padding-top',
                description: 'The padding top of the table component',
                value: 'calc(var(--padding-top) * 3 / 4)'
            },
            {
                name: 'padding-right',
                description: 'The padding right of the table component',
                value: 'calc(var(--padding-right) * 3 / 4)'
            },
            {
                name: 'padding-bottom',
                description: 'The padding bottom of the table component',
                value: 'calc(var(--padding-bottom) * 3 / 4)'
            },
            {
                name: 'padding-left',
                description: 'The padding left of the table component',
                value: 'calc(var(--padding-left) * 3 / 4)'
            },
            {
                name: 'padding',
                description: 'The padding of the table component',
                value: ['var(----padding-top)', 'var(----padding-right)', 'var(----padding-bottom)', 'var(----padding-left)']
            },
            {
                name: 'padding-top--condensed',
                description: 'The padding top of the table component',
                value: 'calc(var(--padding-top) * 1 / 4)'
            },
            {
                name: 'padding-right--condensed',
                description: 'The padding right of the table component',
                value: 'calc(var(--padding-right) * 1 / 4)'
            },
            {
                name: 'padding-bottom--condensed',
                description: 'The padding bottom of the table component',
                value: 'calc(var(--padding-bottom) * 1 / 4)'
            },
            {
                name: 'padding-left--condensed',
                description: 'The padding left of the table component',
                value: 'calc(var(--padding-left) * 1 / 4)'
            },
            {
                name: 'padding--condensed',
                description: 'The padding of the table component',
                value: ['var(----padding-top)', 'var(----padding-right)', 'var(----padding-bottom)', 'var(----padding-left)']
            }
        ]
    }
};
