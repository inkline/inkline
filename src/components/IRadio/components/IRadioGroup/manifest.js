export const manifest = {
    slots: [
        {
            description: 'Slot for default radio group options',
            name: 'default'
        }
    ],
    events: [
        {
            description: 'Event emitted for setting the modelValue',
            name: 'update:modelValue'
        }
    ],
    props: [
        {
            name: 'color',
            type: [
                'light',
                'dark'
            ],
            default: 'light',
            description: 'The color variant of the radio group'
        },
        {
            name: 'disabled',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The disabled state of the radio group'
        },
        {
            name: 'inline',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the radio group as inline'
        },
        {
            name: 'modelValue',
            type: [],
            default: '\'\'',
            description: 'Used to set the radio group value'
        },
        {
            name: 'name',
            type: [
                'String'
            ],
            default: 'uid()',
            description: 'The unique identifier of the radio group'
        },
        {
            name: 'readonly',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The readonly state of the radio group'
        },
        {
            name: 'size',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md',
            description: 'The size variant of the radio group'
        }
    ],
    css: {
        variables: [],
        variants: []
    }
};

export default manifest;
