import type { RawTheme } from './theme';

export enum ClassifierType {
    PrimitiveVariants = 'primitive-variants',
    EntityVariants = 'entity-variants',
    Group = 'group'
}

export interface ClassifierMeta {
    path: string[];
    theme: RawTheme;
    classifiers: Classifier[];
}

export type Classifier = {
    key: string | string[] | RegExp | RegExp[];
    ignore?: string | string[] | RegExp | RegExp[];
    classify: (value: any, meta: ClassifierMeta) => any;
};
