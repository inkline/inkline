export const manifest = {
    name: 'breadcrumb',
    slots: [
        {
            description: 'Slot for default breadcrumb content',
            name: 'default'
        }
    ],
    props: [
        {
            name: 'ariaLabel',
            type: [
                'String'
            ],
            default: 'Breadcrumbs',
            description: 'The aria-label of the breadcrumbs'
        },
        {
            name: 'color',
            type: [
                'light',
                'dark'
            ],
            default: 'light',
            description: 'The color variant of the breadcrumb'
        },
        {
            name: 'size',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md',
            description: 'The size variant of the breadcrumb'
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
                type: 'color',
                value: 'color(\'gray-90\')',
                description: 'The text color of the breadcrumb component'
            },
            {
                name: 'color--link',
                type: 'color',
                value: 'color(\'primary\')',
                description: 'The link color of the breadcrumb component'
            },
            {
                name: 'color--active',
                type: 'color',
                value: 'color(\'gray-70\')',
                description: 'The text active color of the breadcrumb component'
            },
            {
                name: 'font-size',
                type: 'size',
                value: 'font-size()',
                description: 'The font size of the breadcrumb component'
            },
            {
                name: 'margin-bottom',
                type: '',
                value: 'spacing()',
                description: 'The bottom margin of the breadcrumb component'
            },
            {
                name: 'padding-right',
                type: 'size',
                value: 'var(--padding-right)',
                description: 'The padding right of the breadcrumb component'
            },
            {
                name: 'padding-left',
                type: 'size',
                value: 'var(--padding-left)',
                description: 'The padding left of the breadcrumb component'
            }
        ],
        variants: [
            {
                name: 'light',
                type: 'variant',
                description: 'Variables for the light color variant',
                variables: [
                    {
                        name: 'color',
                        type: '',
                        value: 'color(\'gray-90\')',
                        description: 'The text color of the breadcrumb component, for the light color variant'
                    },
                    {
                        name: 'color--link',
                        type: '',
                        value: 'color(\'primary\')',
                        description: 'The link color of the breadcrumb component, for the light color variant'
                    },
                    {
                        name: 'color--active',
                        type: '',
                        value: 'color(\'gray-70\')',
                        description: 'The text active color of the breadcrumb component, for the light color variant'
                    }
                ]
            },
            {
                name: 'dark',
                type: 'variant',
                description: 'Variables for the dark color variant',
                variables: [
                    {
                        name: 'color',
                        type: '',
                        value: 'color(\'white\')',
                        description: 'The text color of the breadcrumb component, for the dark color variant'
                    },
                    {
                        name: 'color--link',
                        type: '',
                        value: 'color(\'primary\')',
                        description: 'The link color of the breadcrumb component, for the dark color variant'
                    },
                    {
                        name: 'color--active',
                        type: '',
                        value: 'color(\'gray-40\')',
                        description: 'The text active color of the breadcrumb component, for the dark color variant'
                    }
                ]
            },
            {
                name: 'sm',
                type: 'variant',
                description: 'Variables for the sm size variant',
                variables: [
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'sm\')})',
                        description: 'The font size of the breadcrumb component, for the sm size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding right of the breadcrumb component, for the sm size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding left of the breadcrumb component, for the sm size variant'
                    }
                ]
            },
            {
                name: 'md',
                type: 'variant',
                description: 'Variables for the md size variant',
                variables: [
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'md\')})',
                        description: 'The font size of the breadcrumb component, for the md size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'md\')})',
                        description: 'The padding right of the breadcrumb component, for the md size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'md\')})',
                        description: 'The padding left of the breadcrumb component, for the md size variant'
                    }
                ]
            },
            {
                name: 'lg',
                type: 'variant',
                description: 'Variables for the lg size variant',
                variables: [
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'lg\')})',
                        description: 'The font size of the breadcrumb component, for the lg size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding right of the breadcrumb component, for the lg size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding left of the breadcrumb component, for the lg size variant'
                    }
                ]
            }
        ]
    },
    events: []
};

export default manifest;
