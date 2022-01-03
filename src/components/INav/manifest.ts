export const manifest = {
    name: 'nav',
    slots: [
        {
            description: 'Slot for default nav content',
            name: 'default'
        }
    ],
    props: [
        {
            name: 'color',
            type: [
                'light',
                'dark'
            ],
            default: 'light',
            description: 'The color variant of the nav'
        },
        {
            name: 'size',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md',
            description: 'The size variant of the nav'
        },
        {
            name: 'vertical',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the nav with vertical orientation'
        }
    ],
    styles: [
        {
            name: 'color',
            description: 'The color of the list group component item',
            type: 'color',
            variants: {
                light: 'contrast-color($color-light)',
                dark: 'contrast-color($color-dark)'
            }
        },
        {
            name: 'color-active',
            description: 'The color of the list group component item when active',
            type: 'color',
            variants: {
                light: 'color(\'primary\')',
                dark: 'color(\'primary\')'
            }
        },
        {
            name: 'color-disabled',
            description: 'The color of the list group component item when disabled',
            type: 'color',
            variants: {
                light: 'var(--text-muted)',
                dark: 'var(--text-muted)'
            }
        },
        {
            name: 'font-size',
            description: 'The font size of the modal component',
            type: 'size',
            default: 'font-size()'
        },
        {
            name: 'padding',
            description: 'The padding of the modal component',
            type: 'size',
            default: 'spacing()'
        }
    ],
    events: [],
    css: {
        variables: [
            {
                name: 'font-size',
                type: 'size',
                value: 'font-size()',
                description: 'The font size of the nav component'
            },
            {
                name: 'padding-top',
                type: 'size',
                value: 'var(--padding-top)',
                description: 'The padding top of the nav component'
            },
            {
                name: 'padding-right',
                type: 'size',
                value: 'var(--padding-right)',
                description: 'The padding right of the nav component'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                value: 'var(--padding-bottom)',
                description: 'The padding bottom of the nav component'
            },
            {
                name: 'padding-left',
                type: 'size',
                value: 'var(--padding-left)',
                description: 'The padding left of the nav component'
            },
            {
                name: 'padding',
                type: '',
                value: 'var(----padding-top) var(----padding-right) var(----padding-bottom) var(----padding-left)',
                description: 'The padding of the nav component'
            },
            {
                name: 'color',
                type: 'color',
                value: 'contrast-color($color-light)',
                description: ''
            },
            {
                name: 'color-active',
                type: 'color',
                value: 'color(\'primary\')',
                description: 'The color of the nav component item when active'
            },
            {
                name: 'color-disabled',
                type: 'color',
                value: 'var(--text-muted)',
                description: 'The color of the nav component item when disabled'
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
                        value: 'contrast-color($color-light)',
                        description: 'The color of the nav component item, for the light color variant'
                    },
                    {
                        name: 'color--active',
                        type: '',
                        value: 'contrast-color($color-primary)',
                        description: 'The color of the nav component item when active, for the light color variant'
                    },
                    {
                        name: 'color--disabled',
                        type: '',
                        value: 'var(--text-muted)',
                        description: 'The color of the nav component item when disabled, for the light color variant'
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
                        value: 'contrast-color($color-dark)',
                        description: 'The color of the nav component item, for the dark color variant'
                    },
                    {
                        name: 'color--active',
                        type: '',
                        value: 'contrast-color($color-primary)',
                        description: 'The color of the nav component item when active, for the dark color variant'
                    },
                    {
                        name: 'color--disabled',
                        type: '',
                        value: 'var(--text-muted)',
                        description: 'The color of the nav component item when disabled, for the dark color variant'
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
                        description: 'The font size of the nav component, for the sm size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{var(--padding-top)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding top of the nav component, for the sm size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding right of the nav component, for the sm size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{var(--padding-bottom)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding bottom of the nav component, for the sm size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'sm\')})',
                        description: 'The padding left of the nav component, for the sm size variant'
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
                        description: 'The font size of the nav component, for the md size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{var(--padding-top)} * #{size-multiplier(\'md\')})',
                        description: 'The padding top of the nav component, for the md size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'md\')})',
                        description: 'The padding right of the nav component, for the md size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{var(--padding-bottom)} * #{size-multiplier(\'md\')})',
                        description: 'The padding bottom of the nav component, for the md size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'md\')})',
                        description: 'The padding left of the nav component, for the md size variant'
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
                        description: 'The font size of the nav component, for the lg size variant'
                    },
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{var(--padding-top)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding top of the nav component, for the lg size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{var(--padding-right)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding right of the nav component, for the lg size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{var(--padding-bottom)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding bottom of the nav component, for the lg size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{var(--padding-left)} * #{size-multiplier(\'lg\')})',
                        description: 'The padding left of the nav component, for the lg size variant'
                    }
                ]
            }
        ]
    }
};

export default manifest;
