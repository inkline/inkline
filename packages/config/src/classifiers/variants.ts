import { ClassifierType } from '../types';
import { defineClassifier } from '../utils';

export const primitiveVariantsClassifier = defineClassifier({
    key: [
        /^[^.]+$/,
        /^colors\.[^.]+$/,
        /^grid\.[^.]+$/,
        /^size\.[^.]+$/,
        /^typography\.[^.]+$/,
        /^typography\.(color|contrastColor)\.[^.]+$/
    ],
    ignore: [
        /^colors$/,
        /^components$/,
        /^elements$/,
        /^grid$/,
        /^grid\.columns$/,
        /^layers$/,
        /^size$/,
        /^typography$/,
        /^typography\.(color|contrastColor)$/
    ],
    classify: (value, meta) => {
        if (typeof value === 'object' && 'default' in value) {
            return {
                $type: ClassifierType.PrimitiveVariants,
                ...value
            };
        }

        return {
            $type: ClassifierType.PrimitiveVariants,
            default: value
        };
    }
});

export const entityVariantsClassifier = defineClassifier({
    key: [/^components\.[^.]+$/, /^elements\.[^.]+$/],
    classify: (value, meta) => {
        if (typeof value === 'object' && 'default' in value) {
            return {
                $type: ClassifierType.EntityVariants,
                ...value
            };
        }

        return {
            $type: ClassifierType.EntityVariants,
            default: value
        };
    }
});
