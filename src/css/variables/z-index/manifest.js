export const manifest = {
    name: 'z-index',
    css: {
        variables: [
            {
                name: 'z-index--dropdown',
                value: '1000',
                description: 'The z-index value for overlaid dropdown elements'
            },
            {
                name: 'z-index--sticky',
                value: '1020',
                description: 'The z-index value for overlaid sticky elements'
            },
            {
                name: 'z-index--fixed',
                value: '1030',
                description: 'The z-index value for overlaid fixed elements'
            },
            {
                name: 'z-index--modal-backdrop',
                value: '1040',
                description: 'The z-index value for modal backdrop elements'
            },
            {
                name: 'z-index--modal',
                value: '1050',
                description: 'The z-index value for modal elements'
            },
            {
                name: 'z-index--popover',
                value: '1060',
                description: 'The z-index value for popover elements'
            },
            {
                name: 'z-index--tooltip',
                value: '1070',
                description: 'The z-index value for tooltip elements'
            }
        ]
    }
};

export default manifest;
