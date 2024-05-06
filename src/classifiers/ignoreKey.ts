import { defineClassifier } from '../utils';

export const ignoreKeyClassifier = defineClassifier({
    key: [/^components$/, /^elements$/, /^typography$/],
    classify: (value, meta) => {
        return typeof value === 'object'
            ? {
                  $ignoreKey: true,
                  ...value
              }
            : value;
    }
});
