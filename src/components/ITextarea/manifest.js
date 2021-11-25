export const manifest = {
    slots: [
        {
            description: 'Slot for the textarea prefix content',
            name: 'prefix'
        },
        {
            description: 'Slot for the textarea suffix content',
            name: 'suffix'
        },
        {
            description: 'Slot for the textarea prepend content',
            name: 'prepend'
        },
        {
            description: 'Slot for the textarea append content',
            name: 'append'
        },
        {
            description: 'Slot for the clearable button',
            name: 'clearable'
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
            description: 'The color variant of the textarea'
        },
        {
            name: 'clearable',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the textarea as clearable'
        },
        {
            name: 'disabled',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The disabled state of the textarea'
        },
        {
            name: 'id',
            type: [
                'String'
            ],
            default: '',
            description: 'The id of the internal textarea element'
        },
        {
            name: 'modelValue',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Used to set the field value'
        },
        {
            name: 'name',
            type: [
                'String'
            ],
            default: 'uid()',
            description: 'The unique identifier of the textarea'
        },
        {
            name: 'readonly',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The readonly state of the textarea'
        },
        {
            name: 'size',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md',
            description: 'The size variant of the textarea'
        },
        {
            name: 'tabindex',
            type: [
                'Number',
                'String'
            ],
            default: '1',
            description: 'The tabindex of the textarea'
        }
    ],
    css: {
        variables: [],
        variants: []
    }
};

export default manifest;
