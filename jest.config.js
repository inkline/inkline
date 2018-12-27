module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],
  collectCoverage: true,
  coverageReporters: ["json", "html", "text-lcov"],
  coverageDirectory: "<rootDir>/tests/coverage",
  collectCoverageFrom: [
      '<rootDir>/src/**/*.vue',
      '<rootDir>/src/(constants|directives|factories|helpers|prototypes|validators)/**/*.js',
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^inkline/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  setupFiles: [
    "<rootDir>/tests/unit/jest/setup.js"
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  testURL: 'http://localhost/',
  verbose: true
};
