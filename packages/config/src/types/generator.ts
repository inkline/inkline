import type { ResolvedTheme } from './theme';

export enum GeneratorType {
    CssVariables = 'css-variables',
    Mixins = 'mixins',
    Default = 'default'
}

export enum GeneratorPriority {
    Highest = 0,
    High = 1,
    Medium = 2,
    Low = 3,
    Lowest = 4
}

export interface GeneratorMeta {
    path: string[];
    theme: ResolvedTheme;
    themeName: 'default' | string;
    generators: Generator<any>[];
}

export interface Generator<Resolved> {
    key: string | string[] | RegExp | RegExp[];
    ignore?: string | string[] | RegExp | RegExp[];
    type: GeneratorType;
    priority?: GeneratorPriority;
    sideEffects?: boolean;
    generate: (value: Resolved, meta: GeneratorMeta) => string[];
}

export type GenerateValueFn<ResolvedValue> = (
    value: ResolvedValue,
    meta: GeneratorMeta
) => string[];

export interface GeneratorChunk {
    path: string[];
    type: GeneratorType;
    priority: GeneratorPriority;
    content: string[];
}
