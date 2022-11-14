export const manifest = {
    name: 'form-error',
    slots: [
        {
            description: 'Slot for default form error content',
            name: 'default'
        }
    ],
    css: {
        selector: '.form-error',
        variables: [
            {
                name: 'font-size',
                type: '',
                value: 'font-size(\'sm\')',
                description: 'The font size of the form error component'
            },
            {
                name: 'margin-top',
                type: '',
                value: 'calc(var(--margin-top) / 4)',
                description: 'The margin top of the form error component'
            },
            {
                name: 'margin-right',
                type: '',
                value: '0',
                description: 'The margin right of the form error component'
            },
            {
                name: 'margin-bottom',
                type: '',
                value: '0',
                description: 'The margin bottom of the form error component'
            },
            {
                name: 'margin-left',
                type: '',
                value: '0',
                description: 'The margin left of the form error component'
            },
            {
                name: 'margin',
                type: '',
                value: 'var(----margin-top) var(----margin-right) var(----margin-bottom) var(----margin-left)',
                description: 'The margin of the form error component'
            },
            {
                name: 'color',
                type: '',
                value: 'color(\'danger\')',
                description: 'The color of the form error component'
            }
        ],
        variants: []
    },
    events: [],
    props: [
        {
            name: 'for',
            type: [
                'String'
            ],
            default: '',
            description: 'The schema path of the target input to show the errors for.'
        },
        {
            name: 'visible',
            type: [
                'Array',
                'String'
            ],
            default: '\'touched\', \'dirty\', \'invalid\'',
            description: 'Set the validation statuses for which the form error should be visible.'
        }
    ]
};

export default manifest;
