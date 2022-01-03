export const manifest = {
    name: 'header',
    slots: [
        {
            description: 'Slot for default header content',
            name: 'default'
        }
    ],
    props: [
        {
            name: 'color',
            type: [
                'primary',
                'light',
                'dark'
            ],
            default: 'light',
            description: 'The color variant of the header'
        },
        {
            name: 'cover',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the header background as cover, always covering the whole header width or height'
        },
        {
            name: 'fluid',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the inner content container as fluid, covering 100% of the header width'
        },
        {
            name: 'fullscreen',
            type: [
                'Boolean'
            ],
            default: 'true',
            description: 'Display the header as fullscreen, covering 100% screen height and 100% screen width'
        },
        {
            name: 'size',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md',
            description: 'The size variant of the header'
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
                type: 'color',
                value: 'color(\'light\')',
                description: 'The background of the header component'
            },
            {
                name: 'color',
                type: 'color',
                value: 'contrast-color($color-light)',
                description: 'The color of the header component'
            },
            {
                name: 'padding-top',
                type: 'size',
                value: '10rem',
                description: 'The padding top of the header component'
            },
            {
                name: 'padding-right',
                type: 'size',
                value: '0',
                description: 'The padding right of the header component'
            },
            {
                name: 'padding-bottom',
                type: 'size',
                value: '10rem',
                description: 'The padding bottom of the header component'
            },
            {
                name: 'padding-left',
                type: 'size',
                value: '0',
                description: 'The padding left of the header component'
            },
            {
                name: 'padding',
                type: '',
                value: 'var(----padding-top) var(----padding-right) var(----padding-bottom) var(----padding-left)',
                description: 'The padding of the header component'
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
                        description: 'The background of the header component, for the primary color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-primary)',
                        description: 'The color of the header component, for the primary color variant'
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
                        value: 'color(\'light\')',
                        description: 'The background of the header component, for the light color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-light)',
                        description: 'The color of the header component, for the light color variant'
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
                        description: 'The background of the header component, for the dark color variant'
                    },
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-dark)',
                        description: 'The color of the header component, for the dark color variant'
                    }
                ]
            },
            {
                name: 'sm',
                type: 'variant',
                description: 'Variables for the sm size variant',
                variables: [
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{10rem} * #{size-multiplier(\'sm\')})',
                        description: 'The padding top of the header component, for the sm size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{0} * #{size-multiplier(\'sm\')})',
                        description: 'The padding right of the header component, for the sm size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{10rem} * #{size-multiplier(\'sm\')})',
                        description: 'The padding bottom of the header component, for the sm size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{0} * #{size-multiplier(\'sm\')})',
                        description: 'The padding left of the header component, for the sm size variant'
                    }
                ]
            },
            {
                name: 'md',
                type: 'variant',
                description: 'Variables for the md size variant',
                variables: [
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{10rem} * #{size-multiplier(\'md\')})',
                        description: 'The padding top of the header component, for the md size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{0} * #{size-multiplier(\'md\')})',
                        description: 'The padding right of the header component, for the md size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{10rem} * #{size-multiplier(\'md\')})',
                        description: 'The padding bottom of the header component, for the md size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{0} * #{size-multiplier(\'md\')})',
                        description: 'The padding left of the header component, for the md size variant'
                    }
                ]
            },
            {
                name: 'lg',
                type: 'variant',
                description: 'Variables for the lg size variant',
                variables: [
                    {
                        name: 'padding-top',
                        type: '',
                        value: 'calc(#{10rem} * #{size-multiplier(\'lg\')})',
                        description: 'The padding top of the header component, for the lg size variant'
                    },
                    {
                        name: 'padding-right',
                        type: '',
                        value: 'calc(#{0} * #{size-multiplier(\'lg\')})',
                        description: 'The padding right of the header component, for the lg size variant'
                    },
                    {
                        name: 'padding-bottom',
                        type: '',
                        value: 'calc(#{10rem} * #{size-multiplier(\'lg\')})',
                        description: 'The padding bottom of the header component, for the lg size variant'
                    },
                    {
                        name: 'padding-left',
                        type: '',
                        value: 'calc(#{0} * #{size-multiplier(\'lg\')})',
                        description: 'The padding left of the header component, for the lg size variant'
                    }
                ]
            }
        ]
    },
    events: []
};

export default manifest;
