export const manifest = {
    name: 'box-shadow',
    css: {
        variables: [
            {
                name: 'box-shadow-offset-x',
                value: '0',
                description: 'The box-shadow-offset-x part of the design system box-shadow'
            },
            {
                name: 'box-shadow-offset-y',
                value: '0.5rem',
                description: 'The box-shadow-offset-y part of the design system box-shadow'
            },
            {
                name: 'box-shadow-blur-radius',
                value: '1rem',
                description: 'The box-shadow-blur-radius part of the design system box-shadow'
            },
            {
                name: 'box-shadow-spread-radius',
                value: '-0.75rem',
                description: 'The box-shadow-spread-radius part of the design system box-shadow'
            },
            {
                name: 'box-shadow-color',
                value: 'rgba(0, 0, 0, 0.15)',
                description: 'The box-shadow-color part of the design system box-shadow'
            },
            {
                name: 'box-shadow-color',
                value: 'var(--box-shadow-offset-x) var(--box-shadow-offset-y) var(--box-shadow-blur-radius) var(--box-shadow-spread-radius) var(--box-shadow-color)',
                modifiers: ['composed'],
                description: 'The composed box-shadow of the design system'
            }
        ]
    }
};

export default manifest;
