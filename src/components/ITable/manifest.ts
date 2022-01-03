export const manifest = {
    name: 'table',
    slots: [
        {
            description: 'Slot for default table content',
            name: 'default'
        }
    ],
    props: [
        {
            name: 'border',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the table with borders'
        },
        {
            name: 'condensed',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the table rows as condensed'
        },
        {
            name: 'striped',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the table rows as alternating stripes'
        },
        {
            name: 'hover',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Set the table rows as hoverable'
        },
        {
            name: 'responsive',
            type: [
                'Boolean',
                'xs',
                'sm',
                'md',
                'lg',
                'xl',
                'xxl'
            ],
            default: 'false',
            description: 'Set the table to be responsive, enabling horizontal scroll when overflowing the parent container'
        },
        {
            name: 'nowrap',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the table rows without wrapping white-space'
        },
        {
            name: 'color',
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
            default: 'light',
            description: 'The color variant of the table'
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
                type: 'color',
                value: 'color(\'white\')',
                description: 'The background of the table component'
            },
            {
                name: 'background--hover',
                type: 'color',
                value: 'color(\'light-30\')',
                description: 'The background of the table component when hovered'
            },
            {
                name: 'background--striped',
                type: 'color',
                value: 'color(\'light-25\')',
                description: 'The background of the table component when striped'
            },
            {
                name: 'border-style',
                type: '',
                value: 'var(--border-style)',
                description: 'The border style of the table component'
            },
            {
                name: 'border-top-width',
                type: '',
                value: 'var(--border-top-width)',
                description: 'The border top width of the table component'
            },
            {
                name: 'border-right-width',
                type: '',
                value: 'var(--border-right-width)',
                description: 'The border right width of the table component'
            },
            {
                name: 'border-bottom-width',
                type: '',
                value: 'var(--border-bottom-width)',
                description: 'The border bottom width of the table component'
            },
            {
                name: 'border-left-width',
                type: '',
                value: 'var(--border-left-width)',
                description: 'The border left width of the table component'
            },
            {
                name: 'border-width',
                type: '',
                value: 'var(----border-top-width) var(----border-right-width) var(----border-bottom-width) var(----border-left-width)',
                description: 'The border width of the table component'
            },
            {
                name: 'border-color',
                type: 'color',
                value: 'color(\'light-25\')',
                description: 'The border color of the table component'
            },
            {
                name: 'color',
                type: 'color',
                value: 'contrast-color($color-light)',
                description: 'The color of the table component'
            },
            {
                name: 'margin-bottom',
                type: '',
                value: 'var(--margin-bottom)',
                description: 'The bottom margin of the table component'
            },
            {
                name: 'padding-top',
                type: '',
                value: 'calc(var(--padding-top) * 3 / 4)',
                description: 'The padding top of the table component'
            },
            {
                name: 'padding-right',
                type: '',
                value: 'calc(var(--padding-right) * 3 / 4)',
                description: 'The padding right of the table component'
            },
            {
                name: 'padding-bottom',
                type: '',
                value: 'calc(var(--padding-bottom) * 3 / 4)',
                description: 'The padding bottom of the table component'
            },
            {
                name: 'padding-left',
                type: '',
                value: 'calc(var(--padding-left) * 3 / 4)',
                description: 'The padding left of the table component'
            },
            {
                name: 'padding',
                type: '',
                value: 'var(----padding-top) var(----padding-right) var(----padding-bottom) var(----padding-left)',
                description: 'The padding of the table component'
            },
            {
                name: 'padding-top--condensed',
                type: '',
                value: 'calc(var(--padding-top) * 1 / 4)',
                description: 'The padding top of the table component'
            },
            {
                name: 'padding-right--condensed',
                type: '',
                value: 'calc(var(--padding-right) * 1 / 4)',
                description: 'The padding right of the table component'
            },
            {
                name: 'padding-bottom--condensed',
                type: '',
                value: 'calc(var(--padding-bottom) * 1 / 4)',
                description: 'The padding bottom of the table component'
            },
            {
                name: 'padding-left--condensed',
                type: '',
                value: 'calc(var(--padding-left) * 1 / 4)',
                description: 'The padding left of the table component'
            },
            {
                name: 'padding--condensed',
                type: '',
                value: 'var(----padding-top) var(----padding-right) var(----padding-bottom) var(----padding-left)',
                description: 'The padding of the table component'
            }
        ],
        variants: [
            {
                name: 'primary',
                type: 'variant',
                description: 'Variables for the primary color variant',
                variables: [
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'primary\')',
                        description: 'The background of the table component, for the primary color variant'
                    },
                    {
                        name: 'background--hover',
                        type: '',
                        value: 'color(\'primary-60\')',
                        description: 'The background of the table component when hovered, for the primary color variant'
                    },
                    {
                        name: 'background--striped',
                        type: '',
                        value: 'color(\'primary-55\')',
                        description: 'The background of the table component when striped, for the primary color variant'
                    },
                    {
                        name: 'border-color',
                        type: '',
                        value: 'color(\'primary-55\')',
                        description: 'The border color of the table component, for the primary color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-primary)',
                        description: 'The color of the table component, for the primary color variant'
                    }
                ]
            },
            {
                name: 'secondary',
                type: 'variant',
                description: 'Variables for the secondary color variant',
                variables: [
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'secondary\')',
                        description: 'The background of the table component, for the secondary color variant'
                    },
                    {
                        name: 'background--hover',
                        type: '',
                        value: 'color(\'secondary-60\')',
                        description: 'The background of the table component when hovered, for the secondary color variant'
                    },
                    {
                        name: 'background--striped',
                        type: '',
                        value: 'color(\'secondary-55\')',
                        description: 'The background of the table component when striped, for the secondary color variant'
                    },
                    {
                        name: 'border-color',
                        type: '',
                        value: 'color(\'secondary-55\')',
                        description: 'The border color of the table component, for the secondary color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-secondary)',
                        description: 'The color of the table component, for the secondary color variant'
                    }
                ]
            },
            {
                name: 'light',
                type: 'variant',
                description: 'Variables for the light color variant',
                variables: [
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'white\')',
                        description: 'The background of the table component, for the light color variant'
                    },
                    {
                        name: 'background--hover',
                        type: '',
                        value: 'color(\'light-30\')',
                        description: 'The background of the table component when hovered, for the light color variant'
                    },
                    {
                        name: 'background--striped',
                        type: '',
                        value: 'color(\'light-25\')',
                        description: 'The background of the table component when striped, for the light color variant'
                    },
                    {
                        name: 'border-color',
                        type: '',
                        value: 'color(\'light-25\')',
                        description: 'The border color of the table component, for the light color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-light)',
                        description: 'The color of the table component, for the light color variant'
                    }
                ]
            },
            {
                name: 'dark',
                type: 'variant',
                description: 'Variables for the dark color variant',
                variables: [
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'dark\')',
                        description: 'The background of the table component, for the dark color variant'
                    },
                    {
                        name: 'background--hover',
                        type: '',
                        value: 'color(\'gray-40\')',
                        description: 'The background of the table component when hovered, for the dark color variant'
                    },
                    {
                        name: 'background--striped',
                        type: '',
                        value: 'color(\'dark-45\')',
                        description: 'The background of the table component when striped, for the dark color variant'
                    },
                    {
                        name: 'border-color',
                        type: '',
                        value: 'color(\'dark-45\')',
                        description: 'The border color of the table component, for the dark color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-dark)',
                        description: 'The color of the table component, for the dark color variant'
                    }
                ]
            },
            {
                name: 'info',
                type: 'variant',
                description: 'Variables for the info color variant',
                variables: [
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'info\')',
                        description: 'The background of the table component, for the info color variant'
                    },
                    {
                        name: 'background--hover',
                        type: '',
                        value: 'color(\'info-60\')',
                        description: 'The background of the table component when hovered, for the info color variant'
                    },
                    {
                        name: 'background--striped',
                        type: '',
                        value: 'color(\'info-55\')',
                        description: 'The background of the table component when striped, for the info color variant'
                    },
                    {
                        name: 'border-color',
                        type: '',
                        value: 'color(\'info-55\')',
                        description: 'The border color of the table component, for the info color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-info)',
                        description: 'The color of the table component, for the info color variant'
                    }
                ]
            },
            {
                name: 'success',
                type: 'variant',
                description: 'Variables for the success color variant',
                variables: [
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'success\')',
                        description: 'The background of the table component, for the success color variant'
                    },
                    {
                        name: 'background--hover',
                        type: '',
                        value: 'color(\'success-60\')',
                        description: 'The background of the table component when hovered, for the success color variant'
                    },
                    {
                        name: 'background--striped',
                        type: '',
                        value: 'color(\'success-55\')',
                        description: 'The background of the table component when striped, for the success color variant'
                    },
                    {
                        name: 'border-color',
                        type: '',
                        value: 'color(\'success-55\')',
                        description: 'The border color of the table component, for the success color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-success)',
                        description: 'The color of the table component, for the success color variant'
                    }
                ]
            },
            {
                name: 'warning',
                type: 'variant',
                description: 'Variables for the warning color variant',
                variables: [
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'warning\')',
                        description: 'The background of the table component, for the warning color variant'
                    },
                    {
                        name: 'background--hover',
                        type: '',
                        value: 'color(\'warning-60\')',
                        description: 'The background of the table component when hovered, for the warning color variant'
                    },
                    {
                        name: 'background--striped',
                        type: '',
                        value: 'color(\'warning-55\')',
                        description: 'The background of the table component when striped, for the warning color variant'
                    },
                    {
                        name: 'border-color',
                        type: '',
                        value: 'color(\'warning-55\')',
                        description: 'The border color of the table component, for the warning color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-warning)',
                        description: 'The color of the table component, for the warning color variant'
                    }
                ]
            },
            {
                name: 'danger',
                type: 'variant',
                description: 'Variables for the danger color variant',
                variables: [
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'danger\')',
                        description: 'The background of the table component, for the danger color variant'
                    },
                    {
                        name: 'background--hover',
                        type: '',
                        value: 'color(\'danger-60\')',
                        description: 'The background of the table component when hovered, for the danger color variant'
                    },
                    {
                        name: 'background--striped',
                        type: '',
                        value: 'color(\'danger-55\')',
                        description: 'The background of the table component when striped, for the danger color variant'
                    },
                    {
                        name: 'border-color',
                        type: '',
                        value: 'color(\'danger-55\')',
                        description: 'The border color of the table component, for the danger color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-danger)',
                        description: 'The color of the table component, for the danger color variant'
                    }
                ]
            }
        ]
    },
    events: []
};

export default manifest;
