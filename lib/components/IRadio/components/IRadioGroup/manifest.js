module.exports = {
    slots: [
        {
            name: 'default',
            description: 'Slot for default radio group options',
            type: []
        }
    ],
    events: [
        {
            name: 'update:modelValue',
            description: 'Event emitted for setting the modelValue',
            type: []
        }
    ],
    props: [
        {
            name: 'color',
            description: 'The color variant of the radio group',
            type: [
                'light',
                'dark'
            ],
            default: 'light'
        },
        {
            name: 'disabled',
            description: 'The disabled state of the radio group',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'inline',
            description: 'Display the radio group as inline',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'modelValue',
            description: 'Used to set the radio group value',
            type: [],
            default: '\'\''
        },
        {
            name: 'name',
            description: 'The unique identifier of the radio group',
            type: [
                'String'
            ],
            default: 'uid()'
        },
        {
            name: 'readonly',
            description: 'The readonly state of the radio group',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'size',
            description: 'The size variant of the radio group',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md'
        }
    ]
};
