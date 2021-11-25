export const manifest = {
    slots: [
        {
            description: 'Slot for default tab content',
            name: 'default'
        }
    ],
    props: [
        {
            name: 'title',
            type: [
                'String'
            ],
            default: '',
            description: 'The title of the tab'
        },
        {
            name: 'name',
            type: [
                'String'
            ],
            default: 'uid()',
            description: 'The name of the tab, used as an identifier'
        }
    ],
    events: [],
    css: {
        variables: [],
        variants: []
    }
};

export default manifest;
