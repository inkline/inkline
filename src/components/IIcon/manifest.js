export const manifest = {
    name: 'icon',
    props: [
        {
            name: 'name',
            type: [
                'String'
            ],
            default: '',
            description: 'The icon to be displayed'
        },
        {
            name: 'size',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md',
            description: 'The size variant of the icon'
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
                value: '1rem',
                description: 'The size of the icon component'
            }
        ],
        variants: [
            {
                name: 'sm',
                type: 'variant',
                description: 'Variables for the sm size variant',
                variables: [
                    {
                        name: 'size',
                        type: '',
                        value: 'calc(#{1rem} * #{size-multiplier(\'sm\')})',
                        description: 'The size of the icon component, for the sm size variant'
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
                        value: 'calc(#{1rem} * #{size-multiplier(\'md\')})',
                        description: 'The size of the icon component, for the md size variant'
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
                        value: 'calc(#{1rem} * #{size-multiplier(\'lg\')})',
                        description: 'The size of the icon component, for the lg size variant'
                    }
                ]
            }
        ]
    },
    slots: [],
    events: []
};

export default manifest;
