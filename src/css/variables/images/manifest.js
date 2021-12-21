export const manifest = {
    name: 'images',
    css: {
        variables: [
            {
                name: 'thumbnail--padding',
                value: 'calc(var(--spacing) / 2)',
                description: 'The padding of the image thumbnail variant'
            },
            {
                name: 'thumbnail--background',
                value: 'var(--color--white)',
                description: 'The background of the image thumbnail variant'
            },
            {
                name: 'thumbnail--border-width',
                value: 'var(--border-width)',
                description: 'The border-width of the image thumbnail variant'
            },
            {
                name: 'thumbnail--border-color',
                value: 'var(--color--gray-40)',
                description: 'The border-width of the image thumbnail variant'
            },
            {
                name: 'thumbnail--border-radius',
                value: 'var(--border-radius)',
                description: 'The border-radius of the image thumbnail variant'
            },
            {
                name: 'thumbnail--box-shadow',
                value: '0 1px 2px rgba(var(--color--black), 0.075)',
                description: 'The box-shadow of the image thumbnail variant'
            },
            {
                name: 'thumbnail--transition',
                value: 'all 0.2s ease-in-out',
                description: 'The transition of the image thumbnail variant'
            },
            {
                name: 'polaroid--padding',
                value: 'calc(var(--spacing) * 3)',
                description: 'The padding of the image polaroid variant'
            },
            {
                name: 'figure--caption--font-size',
                value: '90%',
                description: 'The font size of the figure caption'
            },
            {
                name: 'figure--caption--font-size',
                value: 'var(--color--gray-60)',
                description: 'The text color of the figure caption'
            },
            {
                name: 'figure--image--font-size',
                value: 'calc(var(--spacing) / 2)',
                description: 'The font size of the figure image'
            }
        ]
    }
};

export default manifest;
