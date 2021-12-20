export const manifest = {
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
            description: 'The color variant of the input'
        },
        {
            name: 'clearable',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the input as clearable'
        },
        {
            name: 'disabled',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The disabled state of the input'
        },
        {
            name: 'id',
            type: [
                'String'
            ],
            default: '',
            description: 'The id of the internal input element'
        },
        {
            name: 'modelValue',
            type: [
                'String',
                'Number'
            ],
            default: '',
            description: 'Used to set the field value'
        },
        {
            name: 'name',
            type: [
                'String'
            ],
            default: 'uid()',
            description: 'The unique identifier of the input'
        },
        {
            name: 'readonly',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The readonly state of the input'
        },
        {
            name: 'size',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md',
            description: 'The size variant of the input'
        },
        {
            name: 'tabindex',
            type: [
                'Number',
                'String'
            ],
            default: '0',
            description: 'The tabindex of the input'
        },
        {
            name: 'min',
            type: [
                'Number'
            ],
            default: '-Infinity',
            description: 'The minimum allowed input value'
        },
        {
            name: 'max',
            type: [
                'Number'
            ],
            default: '+Infinity',
            description: 'The maximum allowed input value'
        },
        {
            name: 'precision',
            type: [
                'Number'
            ],
            default: '0',
            description: 'The precision of the input value, for floating point numbers'
        },
        {
            name: 'step',
            type: [
                'Number'
            ],
            default: '1',
            description: 'The increment step to increase or decrease the value by'
        }
    ],
    slots: [],
    css: {
        variables: [],
        variants: []
    }
};

export default manifest;
