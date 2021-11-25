export const manifest = {
    name: 'media',
    slots: [
        {
            description: 'Slot for default media content',
            name: 'default'
        }
    ],
    css: {
        selector: '.media',
        defaults: {
            size: 'md',
            color: 'light'
        },
        variables: [
            {
                name: 'image--margin-right',
                type: '',
                value: 'var(--margin-right)',
                description: 'The margin right of the media component image'
            }
        ],
        variants: []
    },
    events: [],
    props: []
};

export default manifest;
