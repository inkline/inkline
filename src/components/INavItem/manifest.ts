export const manifest = {
    slots: [
        {
            description: 'Slot for default nav item content',
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
            description: 'The active state of the nav item'
        },
        {
            name: 'disabled',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The disabled state of the nav item'
        },
        {
            name: 'stopPropagation',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Used to close the nearest navbar or sidebar by propagating the onClick event'
        },
        {
            name: 'tag',
            type: [
                'String'
            ],
            default: 'div',
            description: 'Set the HTML tag to be used for rendering the nav item'
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
