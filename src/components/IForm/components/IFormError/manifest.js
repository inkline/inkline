module.exports = {
    name: 'form-error',
    slots: [
        {
            name: 'default',
            description: 'Slot for default form error content',
            type: []
        }
    ],
    css: {
        selector: '.form-error',
        variables: [
            {
                name: 'font-size',
                description: 'The font size of the form error component',
                value: 'font-size(\'sm\')'
            },
            {
                name: 'margin-top',
                description: 'The margin top of the form error component',
                value: 'calc(var(--margin-top) / 4)'
            },
            {
                name: 'margin-right',
                description: 'The margin right of the form error component',
                value: '0'
            },
            {
                name: 'margin-bottom',
                description: 'The margin bottom of the form error component',
                value: '0'
            },
            {
                name: 'margin-left',
                description: 'The margin left of the form error component',
                value: '0'
            },
            {
                name: 'margin',
                description: 'The margin of the form error component',
                value: ['var(----margin-top)', 'var(----margin-right)', 'var(----margin-bottom)', 'var(----margin-left)']
            },
            {
                name: 'color',
                description: 'The color of the form error component',
                value: 'color(\'danger\')'
            }
        ]
    }
};
