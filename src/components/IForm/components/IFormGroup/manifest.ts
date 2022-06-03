export const manifest = {
    name: 'form-group',
    slots: [
        {
            description: 'Slot for default form group content',
            name: 'default'
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
            description: 'The color variant of the form group'
        },
        {
            name: 'disabled',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The disabled state of the form group'
        },
        {
            name: 'inline',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the form group as inline'
        },
        {
            name: 'name',
            type: [
                'String'
            ],
            default: '',
            description: 'The identifier of the form group'
        },
        {
            name: 'readonly',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The readonly state of the form group'
        },
        {
            name: 'required',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The required state of the form group'
        },
        {
            name: 'size',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md',
            description: 'The size variant of the form group'
        }
    ],
    css: {
        selector: '.form-group',
        variables: [
            {
                name: 'margin-top',
                type: '',
                value: 'var(--margin-top)',
                description: 'The margin top of the form error component'
            }
        ],
        variants: []
    },
    events: []
};

export default manifest;
