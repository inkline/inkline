import {
    groupClassifier,
    ignoreKeyClassifier,
    entityVariantsClassifier,
    primitiveVariantsClassifier
} from '../../classifiers';
import type { Classifier } from '../../types';

export const defaultClassifiers: Classifier[] = [
    entityVariantsClassifier,
    primitiveVariantsClassifier,
    ignoreKeyClassifier,
    groupClassifier
];
