export const manifest = {
    name: 'form',
    slots: [
        {
            description: 'Slot for default card content',
            name: 'default'
        }
    ],
    events: [
        {
            description: 'Event emitted for setting the modelValue schema',
            name: 'update:modelValue'
        },
        {
            description: 'Event emitted for submitting the form',
            name: 'submit'
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
            description: 'The color variant of the form'
        },
        {
            name: 'disabled',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The disabled state of the form'
        },
        {
            name: 'inline',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the form as inline'
        },
        {
            name: 'loading',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The loading state of the form'
        },
        {
            name: 'name',
            type: [
                'String'
            ],
            default: 'uid()',
            description: 'The unique identifier of the form'
        },
        {
            name: 'modelValue',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Used to set the form schema'
        },
        {
            name: 'readonly',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The readonly state of the form'
        },
        {
            name: 'size',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md',
            description: 'The size variant of the form'
        }
    ],
    css: {
        selector: '.form',
        variables: [],
        variants: []
    }
};

export default manifest;
