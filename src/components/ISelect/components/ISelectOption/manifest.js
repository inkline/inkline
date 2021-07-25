module.exports = {
    slots: [
        {
            name: 'default',
            description: 'Slot for default select option content',
            type: []
        }
    ],
    props: [
        {
            name: 'active',
            description: 'The active state of the select option',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'disabled',
            description: 'The disabled state of the select option',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'tabindex',
            description: 'The tabindex of the list group item',
            type: [
                'Number',
                'String'
            ],
            default: '1'
        },
        {
            name: 'value',
            description: 'The select option value',
            type: [
                'Object'
            ],
            default: '{}'
        }
    ]
};
