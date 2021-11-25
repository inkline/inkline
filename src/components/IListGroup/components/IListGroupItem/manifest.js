export const manifest = {
    slots: [
        {
            description: 'Slot for default list group item content',
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
            description: 'The active state of the list group item'
        },
        {
            name: 'disabled',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The disabled state of the list group item'
        },
        {
            name: 'tag',
            type: [
                'String'
            ],
            default: 'div',
            description: 'Set the HTML tag to be used for rendering the list group item'
        },
        {
            name: 'tabindex',
            type: [
                'Number',
                'String'
            ],
            default: '1',
            description: 'The tabindex of the list group item'
        }
    ],
    events: [],
    css: {
        variables: [],
        variants: []
    }
};

export default manifest;
