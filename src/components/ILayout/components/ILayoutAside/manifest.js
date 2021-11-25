export const manifest = {
    name: 'layout-aside',
    slots: [
        {
            description: 'Slot for default layout aside content',
            name: 'default'
        }
    ],
    css: {
        selector: '.layout-aside',
        defaults: {
            size: 'md',
            color: 'light'
        },
        variables: [
            {
                name: 'width',
                type: '',
                value: '320px',
                description: 'The width of the layout aside component'
            }
        ],
        variants: []
    },
    events: [],
    props: []
};

export default manifest;
