export const manifest = {
    slots: [
        {
            description: 'Slot for default navbar brand content',
            name: 'default'
        }
    ],
    props: [
        {
            name: 'tag',
            type: [
                'String'
            ],
            default: 'div',
            description: 'Set the HTML tag to be used for rendering the nav item'
        }
    ],
    events: [],
    css: {
        variables: [],
        variants: []
    }
};

export default manifest;
