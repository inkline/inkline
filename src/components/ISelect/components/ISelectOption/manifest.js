export const manifest = {
    slots: [
        {
            description: 'Slot for default select option content',
            name: 'default'
        }
    ],
    props: [
        {
            name: 'active',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The active state of the select option'
        },
        {
            name: 'disabled',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The disabled state of the select option'
        },
        {
            name: 'label',
            type: [
                'String'
            ],
            default: '\'\'',
            description: 'The label of the select option'
        },
        {
            name: 'tabindex',
            type: [
                'Number',
                'String'
            ],
            default: '1',
            description: 'The tabindex of the list group item'
        },
        {
            name: 'value',
            type: [
                'Object',
                'String',
                'Number'
            ],
            default: '',
            description: 'The select option value'
        }
    ],
    events: [],
    css: {
        variables: [],
        variants: []
    }
};

export default manifest;
