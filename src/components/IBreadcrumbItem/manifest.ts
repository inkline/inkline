export const manifest = {
    name: 'breadcrumb-item',
    slots: [
        {
            description: 'Slot for default breadcrumb item content',
            name: 'default'
        }
    ],
    props: [
        {
            name: 'tag',
            type: [
                'String'
            ],
            default: 'a',
            description: 'Set the HTML tag to be used for rendering the breadcrumb item'
        },
        {
            name: 'active',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The active state of the breadcrumb item'
        },
        {
            name: 'disabled',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'The disabled state of the breadcrumb item'
        },
        {
            name: 'tabindex',
            type: [
                'Number',
                'String'
            ],
            default: '1',
            description: 'The tabindex of the breadcrumb item'
        }
    ],
    css: {
        selector: '.breadcrumb-item',
        defaults: {
            size: 'md',
            color: 'info'
        },
        variables: [],
        variants: []
    },
    events: []
};

export default manifest;
