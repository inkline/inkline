export const manifest = {
    name: 'button-group',
    slots: [
        {
            description: 'Slot for default button group content',
            name: 'default'
        }
    ],
    props: [
        {
            name: 'vertical',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the button group with vertical orientation'
        },
        {
            name: 'block',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the button group as a block, spanning the full container width'
        },
        {
            name: 'disabled',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The disabled state of the button group'
        }
    ],
    events: [],
    css: {
        variables: [],
        variants: []
    }
};

export default manifest;
