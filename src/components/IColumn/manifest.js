export const manifest = {
    name: 'column',
    slots: [
        {
            description: 'Slot for default column content',
            name: 'default'
        }
    ],
    props: [
        {
            name: 'xs',
            type: [
                'Boolean',
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to span for extra-small screen sizes. Setting the prop to true will set the width automatically'
        },
        {
            name: 'sm',
            type: [
                'Boolean',
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to span for small screen sizes. Setting the prop to true will set the width automatically'
        },
        {
            name: 'md',
            type: [
                'Boolean',
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to span for medium screen sizes. Setting the prop to true will set the width automatically'
        },
        {
            name: 'lg',
            type: [
                'Boolean',
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to span for large screen sizes. Setting the prop to true will set the width automatically'
        },
        {
            name: 'xl',
            type: [
                'Boolean',
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to span for extra-large screen sizes. Setting the prop to true will set the width automatically'
        },
        {
            name: 'xxl',
            type: [
                'Boolean',
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to span for extra-extra-large screen sizes. Setting the prop to true will set the width automatically'
        },
        {
            name: 'first',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the column as the first column'
        },
        {
            name: 'first-xs',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the column as the first column on extra-small screens'
        },
        {
            name: 'first-sm',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the column as the first column on small screens'
        },
        {
            name: 'first-md',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the column as the first column on medium screens'
        },
        {
            name: 'first-lg',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the column as the first column on large screens'
        },
        {
            name: 'first-xl',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the column as the first column on extra-large screens'
        },
        {
            name: 'first-xxl',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the column as the first column on extra-extra-large screens'
        },
        {
            name: 'last',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the column as the last column'
        },
        {
            name: 'last-xs',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the column as the last column on extra-small screens'
        },
        {
            name: 'last-sm',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the column as the last column on small screens'
        },
        {
            name: 'last-md',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the column as the last column on medium screens'
        },
        {
            name: 'last-lg',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the column as the last column on large screens'
        },
        {
            name: 'last-xl',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the column as the last column on extra-large screens'
        },
        {
            name: 'last-xxl',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the column as the last column on extra-extra-large screens'
        },
        {
            name: 'offset',
            type: [
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to offset the column by'
        },
        {
            name: 'offset-xs',
            type: [
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to offset the column by on extra-small screens'
        },
        {
            name: 'offset-sm',
            type: [
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to offset the column by on small screens'
        },
        {
            name: 'offset-md',
            type: [
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to offset the column by on medium screens'
        },
        {
            name: 'offset-lg',
            type: [
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to offset the column by on large screens'
        },
        {
            name: 'offset-xl',
            type: [
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to offset the column by on extra-large screens'
        },
        {
            name: 'offset-xxl',
            type: [
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to offset the column by on extra-extra-large screens'
        },
        {
            name: 'push',
            type: [
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to push the column by'
        },
        {
            name: 'push-xs',
            type: [
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to push the column by on extra-small screens'
        },
        {
            name: 'push-sm',
            type: [
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to push the column by on small screens'
        },
        {
            name: 'push-md',
            type: [
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to push the column by on medium screens'
        },
        {
            name: 'push-lg',
            type: [
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to push the column by on large screens'
        },
        {
            name: 'push-xl',
            type: [
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to push the column by on extra-large screens'
        },
        {
            name: 'push-xxl',
            type: [
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to push the column by on extra-extra-large screens'
        },
        {
            name: 'pull',
            type: [
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to pull the column by'
        },
        {
            name: 'pull-xs',
            type: [
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to pull the column by on extra-small screens'
        },
        {
            name: 'pull-sm',
            type: [
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to pull the column by on small screens'
        },
        {
            name: 'pull-md',
            type: [
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to pull the column by on medium screens'
        },
        {
            name: 'pull-lg',
            type: [
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to pull the column by on large screens'
        },
        {
            name: 'pull-xl',
            type: [
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to pull the column by on extra-large screens'
        },
        {
            name: 'pull-xxl',
            type: [
                'String',
                'Number'
            ],
            default: '',
            description: 'The number of columns to pull the column by on extra-extra-large screens'
        }
    ],
    css: {
        selector: '.column',
        variables: [],
        variants: []
    },
    events: []
};

export default manifest;
