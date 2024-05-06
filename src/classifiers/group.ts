import { ClassifierType } from '../types';
import { defineClassifier } from '../utils';

export const groupClassifier = defineClassifier({
    key: [
        /^colors$/,
        /^components$/,
        /^elements$/,
        /^grid$/,
        /^size$/,
        /^typography$/,
        /^typography\.(color|contrastColor)$/,
        /^(components|elements)\.[^.]+\..*/
    ],
    ignore: [
        /^(components|elements)\.[^.]+\.[^.]+\..*(animation|background|border|borderRadius|boxShadow|color|width|height|size|spacing|margin|padding|transition)$/
    ],
    classify: (value, meta) => {
        return typeof value === 'object'
            ? {
                  $type: ClassifierType.Group,
                  ...value
              }
            : value;
    }
});
