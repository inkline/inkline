module.exports = {
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'vue'],
    collectCoverage: true,
    coverageReporters: ['json', 'html', 'lcov'],
    coverageDirectory: '<rootDir>/coverage',
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest'
    },
    transformIgnorePatterns: [
        'node_modules/?!(@inkline/icons)'
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@inkline/inkline/(.*)$': '<rootDir>/src/$1'
    },
    snapshotSerializers: ['jest-serializer-vue'],
    setupFilesAfterEnv: ['<rootDir>/jest/setup.ts'],
    testMatch: [
        '**/*.spec.(js|jsx|ts|tsx)'
    ],
    testURL: 'http://localhost/',
    verbose: true
};
