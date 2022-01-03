export const manifest = {
    name: 'core',
    css: {
        variables: [
            {
                name: 'body--background--light',
                value: 'var(--color--white)',
                description: 'The body background color for the light color mode'
            },
            {
                name: 'body--color--light',
                value: 'var(--color--gray-80)',
                description: 'The body background color for the light color mode'
            },
            {
                name: 'body--background--dark',
                value: 'var(--color--gray-90)',
                description: 'The body background color for the dark color mode'
            },
            {
                name: 'body--color--dark',
                value: 'var(--color--gray-10)',
                description: 'The body background color for the dark color mode'
            },
            {
                name: 'body--background',
                value: 'var(--body--background--light)',
                description: 'The body background color. Changes based on selected color mode.'
            },
            {
                name: 'body--color',
                value: 'var(--body--color--light)',
                description: 'The body background color. Changes based on selected color mode.'
            }
        ]
    }
};

export default manifest;
