export const packageJsonExtension = {
    dependencies: {
        'inkline': '^5.0.0'
    },
    devDependencies: {
        '@inkline/plugin': '^2.0.0',
        '@inkline/loader': '^2.0.0',
    }
};

export const packageJsonDevelopmentExtension = {
    dependencies: {
        'inkline': 'workspace:*'
    },
    devDependencies: {
        '@inkline/plugin': 'workspace:*',
        '@inkline/loader': 'workspace:*',
    }
};
