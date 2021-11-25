export const manifest = {
    name: 'loader',
    slots: [
        {
            description: 'Slot for default loader content',
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
            description: 'The color variant of the loader'
        },
        {
            name: 'size',
            type: [
                'sm',
                'md',
                'lg',
                'auto'
            ],
            default: 'md',
            description: 'The size variant of the loader'
        }
    ],
    css: {
        selector: '.loader',
        defaults: {
            size: 'md',
            color: 'primary'
        },
        variables: [
            {
                name: 'animation-duration',
                type: '',
                value: '1.2s',
                description: 'The animation duration of the loader component'
            },
            {
                name: 'size',
                type: 'size',
                value: '64px',
                description: 'The size of the loader component'
            },
            {
                name: 'background',
                type: 'color',
                value: 'color(\'primary\')',
                description: 'The background of the loader component'
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
                        description: 'The background of the loader component, for the primary color variant'
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
                        description: 'The background of the loader component, for the light color variant'
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
                        description: 'The background of the loader component, for the dark color variant'
                    }
                ]
            },
            {
                name: 'sm',
                type: 'variant',
                description: 'Variables for the sm size variant',
                variables: [
                    {
                        name: 'size',
                        type: '',
                        value: 'calc(#{64px} * #{size-multiplier(\'sm\')})',
                        description: 'The size of the loader component, for the sm size variant'
                    }
                ]
            },
            {
                name: 'md',
                type: 'variant',
                description: 'Variables for the md size variant',
                variables: [
                    {
                        name: 'size',
                        type: '',
                        value: 'calc(#{64px} * #{size-multiplier(\'md\')})',
                        description: 'The size of the loader component, for the md size variant'
                    }
                ]
            },
            {
                name: 'lg',
                type: 'variant',
                description: 'Variables for the lg size variant',
                variables: [
                    {
                        name: 'size',
                        type: '',
                        value: 'calc(#{64px} * #{size-multiplier(\'lg\')})',
                        description: 'The size of the loader component, for the lg size variant'
                    }
                ]
            }
        ]
    },
    events: []
};

export default manifest;
