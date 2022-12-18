export const manifest = {
    name: 'form-label',
    slots: [
        {
            description: 'Slot for default form label content',
            name: 'default'
        }
    ],
    props: [
        {
            name: 'for',
            type: [
                'String'
            ],
            default: '',
            description: 'The id of the target input to be focused by the form label. If left empty, clicking the form label will focus the next sibling input'
        },
        {
            name: 'placement',
            type: [
                'left',
                'right'
            ],
            default: 'left',
            description: 'The placement of the form label'
        },
        {
            name: 'size',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md',
            description: 'The size variant of the form label'
        }
    ],
    css: {
        selector: '.form-label',
        type: 'form',
        defaults: {
            size: 'md',
            color: 'light'
        },
        variables: [
            {
                name: 'font-size',
                type: 'size',
                value: 'font-size()',
                description: 'The font size of the form label component'
            },
            {
                name: 'margin-top',
                type: '',
                value: '0',
                description: 'The margin top of the form label component'
            },
            {
                name: 'margin-right',
                type: '',
                value: 'var(--margin-right)',
                description: 'The margin right of the form label component'
            },
            {
                name: 'margin-bottom',
                type: '',
                value: 'calc(var(--margin-bottom) / 4)',
                description: 'The margin bottom of the form label component'
            },
            {
                name: 'margin-left',
                type: '',
                value: 'var(--margin-left)',
                description: 'The margin left of the form label component'
            }
        ],
        variants: [
            {
                name: 'sm',
                type: 'variant',
                description: 'Variables for the sm size variant',
                variables: [
                    {
                        name: 'font-size',
                        type: '',
                        value: 'calc(#{font-size()} * #{size-multiplier(\'sm\')})',
                        description: 'The font size of the form label component, for the sm size variant'
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
                        description: 'The font size of the form label component, for the md size variant'
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
                        description: 'The font size of the form label component, for the lg size variant'
                    }
                ]
            }
        ]
    },
    events: []
};

export default manifest;
