module.exports = {
    slots: [
        {
            name: 'default',
            description: 'Slot for default list group item content',
            type: []
        }
    ],
    props: [
        {
            name: 'active',
            description: 'The active state of the list group item',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'disabled',
            description: 'The disabled state of the list group item',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'tag',
            description: 'Set the HTML tag to be used for rendering the list group item',
            type: [
                'String'
            ],
            default: 'div'
        },
        {
            name: 'tabindex',
            description: 'The tabindex of the list group item',
            type: [
                'Number',
                'String'
            ],
            default: '1'
        }
    ]
};
