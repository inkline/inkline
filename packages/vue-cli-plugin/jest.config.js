module.exports = {
    moduleFileExtensions: ["js", "jsx", "json", "vue"],
    collectCoverage: false,
    transform: {
        "^.+\\.vue$": "vue-jest",
        ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
        "^.+\\.jsx?$": "babel-jest"
    },
    transformIgnorePatterns: [
        "node_modules/(?!@inkline/inkline)"
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^~/(.*)$': '<rootDir>/$1',
        '^vue$': 'vue/dist/vue.common.js'
    },
    snapshotSerializers: ["jest-serializer-vue"],
    testMatch: [
        "**/tests/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
    ],
    setupFilesAfterEnv: [
        "./tests/jest/setup.js"
    ],
    testURL: "http://localhost/",
    verbose: true
};
