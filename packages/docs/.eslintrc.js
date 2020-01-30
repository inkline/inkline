module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/base'
  ],
  rules: {
    'indent': ['warn', 4],
    'no-console': 'off'
  }
};
