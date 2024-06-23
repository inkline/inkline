import type { ResolvedTheme } from './theme';
import { ClassificationType } from './classifier';
import { BuildFile } from './build';

export enum GeneratorOutput {
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
    type?: ClassificationType;
    key?: string | string[] | RegExp | RegExp[];
    ignore?: string | string[] | RegExp | RegExp[];
    output: GeneratorOutput;
    priority?: GeneratorPriority;
    sideEffects?: boolean;
    generate: (value: Resolved, meta: GeneratorMeta) => string[];
}

export type GenerateValueFn<ResolvedValue> = (
    value: ResolvedValue,
    meta: GeneratorMeta
) => string[];

export type GenericValueType = Record<string, unknown> | string | boolean | number | undefined;
