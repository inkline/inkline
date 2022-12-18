export const manifest = {
    name: 'dropdown-item',
    slots: [
        {
            description: 'Slot for default dropdown item content',
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
            description: 'The active state of the dropdown item'
        },
        {
            name: 'disabled',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The disabled state of the dropdown item'
        },
        {
            name: 'plaintext',
            type: [
                'String'
            ],
            default: 'div',
            description: 'Display the dropdown item as plaintext'
        },
        {
            name: 'tag',
            type: [
                'String'
            ],
            default: 'div',
            description: 'Set the HTML tag to be used for rendering the dropdown item'
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
    css: {
        selector: '.dropdown-item',
        variables: [],
        variants: []
    },
    events: []
};

export default manifest;
