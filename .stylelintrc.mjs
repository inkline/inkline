import config from '@grozav/stylelint-config';

export default {
    extends: [
        ...config.extends
    ],
    rules: {
        ...config.rules,
        'declaration-block-no-duplicate-properties': null
    }
}
