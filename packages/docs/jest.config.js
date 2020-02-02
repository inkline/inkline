module.exports = {
    moduleFileExtensions: ["js", "jsx", "json", "vue"],
    collectCoverage: true,
    coverageReporters: ["json", "html", "lcov"],
    coverageDirectory: "<rootDir>/coverage",
    collectCoverageFrom: [
        // "<rootDir>/components/**/*.vue",
        // "<rootDir>/helpers/**/*.vue",
        // "<rootDir>/layouts/**/*.vue",
        // "<rootDir>/pages/**/*.vue",
        "!<rootDir>/node_modules/**"
    ],
    transform: {
        "^.+\\.vue$": "vue-jest",
        ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
        "^.+\\.jsx?$": "babel-jest"
    },
    moduleNameMapper: {
        '^@helpers/(.*)$': '<rootDir>/helpers/$1',
        '^@components/(.*)$': '<rootDir>/components/$1',
        '^@/(.*)$': '<rootDir>/$1',
        '^~/(.*)$': '<rootDir>/$1',
        '^vue$': 'vue/dist/vue.common.js'
    },
    snapshotSerializers: ["jest-serializer-vue"],
    testMatch: [
        "**/tests/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
    ],
    testURL: "http://localhost/",
    verbose: true,
    transformIgnorePatterns: [
        "node_modules/(?!@inkline/inkline|vue-github-button)"
    ]
};
