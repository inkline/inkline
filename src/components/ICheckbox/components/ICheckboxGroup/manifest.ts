export const manifest = {
    name: 'checkbox-group',
    slots: [
        {
            description: 'Slot for default checkbox group options',
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
            description: 'The color variant of the checkbox group'
        },
        {
            name: 'disabled',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The disabled state of the checkbox group'
        },
        {
            name: 'inline',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the checkbox group as inline'
        },
        {
            name: 'indeterminate',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The indeterminate state of the checkbox group'
        },
        {
            name: 'modelValue',
            type: [],
            default: '',
            description: 'Used to set the checkbox group value'
        },
        {
            name: 'name',
            type: [
                'String'
            ],
            default: 'uid()',
            description: 'The unique identifier of the checkbox group'
        },
        {
            name: 'readonly',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The readonly state of the checkbox group'
        },
        {
            name: 'size',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md',
            description: 'The size variant of the checkbox group'
        }
    ],
    css: {
        selector: '.checkbox-group',
        variables: [],
        variants: []
    }
};

export default manifest;
