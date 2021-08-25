module.exports = {
    moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
    collectCoverage: true,
    coverageReporters: ['json', 'html', 'lcov'],
    coverageDirectory: '<rootDir>/coverage',
    collectCoverageFrom: [
        '<rootDir>/src/**/*.vue',
        '<rootDir>/src/(constants|directives|factories|helpers|prototypes|validators)/**/*.js',
        '!<rootDir>/node_modules/**'
    ],
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.jsx?$': 'babel-jest'
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@inkline/inkline/(.*)$': '<rootDir>/$1'
    },
    snapshotSerializers: ['jest-serializer-vue'],
    setupFiles: ['<rootDir>/tests/jest/setup.js'],
    testMatch: [
        '**/tests/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
    ],
    testURL: 'http://localhost/',
    verbose: true
};
