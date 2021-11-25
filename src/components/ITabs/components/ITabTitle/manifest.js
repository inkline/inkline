export const manifest = {
    slots: [
        {
            description: 'Slot for default tab title content',
            name: 'default'
        }
    ],
    props: [
        {
            name: 'for',
            type: [
                'String'
            ],
            default: '',
            description: 'The name of the referenced tab'
        }
    ],
    events: [],
    css: {
        variables: [],
        variants: []
    }
};

export default manifest;
