module.exports = {
    name: 'layout-aside',
    slots: [
        {
            name: 'default',
            description: 'Slot for default layout aside content',
            type: []
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
                description: 'The width of the layout aside component',
                value: '320px'
            }
        ]
    }
};
