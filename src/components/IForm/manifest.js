module.exports = {
    name: 'form',
    slots: [
        {
            name: 'default',
            description: 'Slot for default card content',
            type: []
        }
    ],
    events: [
        {
            name: 'update:modelValue',
            description: 'Event emitted for setting the modelValue schema',
            type: []
        },
        {
            name: 'submit',
            description: 'Event emitted for submitting the form',
            type: []
        }
    ],
    props: [
        {
            name: 'color',
            description: 'The color variant of the form',
            type: [
                'light',
                'dark'
            ],
            default: 'light'
        },
        {
            name: 'disabled',
            description: 'The disabled state of the form',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'inline',
            description: 'Display the form as inline',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'loading',
            description: 'The loading state of the form',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'name',
            description: 'The unique identifier of the form',
            type: [
                'String'
            ],
            default: 'uid()'
        },
        {
            name: 'modelValue',
            description: 'Used to set the form schema',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'readonly',
            description: 'The readonly state of the form',
            type: [
                'Boolean'
            ],
            default: 'false'
        },
        {
            name: 'size',
            description: 'The size variant of the form',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md'
        }
    ],
    css: {
        selector: '.form'
    }
};