export const packageJsonExtension = {
    dependencies: {
        '@inkline/inkline': '^5.0.0'
    },
    devDependencies: {
        '@inkline/plugin': '^2.0.0',
        '@inkline/config': '^2.0.0',
        sass: '^1.77.1'
    }
};

export const packageJsonDevelopmentExtension = {
    dependencies: {
        '@inkline/inkline': 'workspace:^'
    },
    devDependencies: {
        '@inkline/plugin': 'workspace:^',
        '@inkline/config': 'workspace:^',
        sass: '^1.77.1'
    }
};
