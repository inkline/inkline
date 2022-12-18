export const manifest = {
    name: 'collapsible-item',
    slots: [
        {
            description: 'Slot for default collapsible item content',
            name: 'default'
        },
        {
            description: 'Slot for collapsible item header content',
            name: 'header'
        }
    ],
    props: [
        {
            name: 'name',
            type: [
                'String'
            ],
            default: 'uid()',
            description: 'The unique identifier of the collapsible item, used for determining if the item is open or not'
        },
        {
            name: 'title',
            type: [
                'String'
            ],
            default: '',
            description: 'The title of the collapsible item'
        }
    ],
    css: {
        selector: '.collapsible-item',
        variables: [],
        variants: []
    },
    events: []
};

export default manifest;
