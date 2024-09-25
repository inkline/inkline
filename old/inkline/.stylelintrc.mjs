import config from '@inkline/stylelint-config';

export default {
    extends: [
        ...config.extends
    ],
    rules: {
        ...config.rules,
    }
}
