module.exports = {
    slots: [
        {
            name: 'default',
            description: 'Slot for default tab title content',
            type: []
        }
    ],
    props: [
        {
            name: 'for',
            description: 'The name of the referenced tab',
            type: [
                'String'
            ],
            default: '{"type":"","default":""}'
        }
    ]
};
