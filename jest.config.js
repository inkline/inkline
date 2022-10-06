module.exports = {
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'vue'],
    collectCoverage: true,
    coverageReporters: ['json', 'html', 'lcov'],
    coverageDirectory: '<rootDir>/coverage',
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.c?m?jsx?$': 'babel-jest',
        '^.+\\.c?m?tsx?$': 'ts-jest'
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@inkline/inkline/(.*)$': '<rootDir>/src/$1'
    },
    snapshotSerializers: ['jest-serializer-vue'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jsdom',
    testMatch: ['**/*.spec.(js|jsx|ts|tsx)'],
    testPathIgnorePatterns: ['/node_modules/', '/lib/', '/package/'],
    testURL: 'http://localhost/',
    verbose: true
};
