import type { PartialDeep } from 'type-fest';
import type { Resolver } from './resolver';
import type { Generator } from './generator';
import type { RawTheme, ResolvedTheme } from './theme';
import type { Aggregator } from './aggregator';
import type { BuildOptions } from './build';
import type { Dependency } from './dependency';
import type { Classifier } from './classifier';

export interface BaseConfiguration<ThemeType> {
    aggregators: Aggregator[];
    classifiers: Classifier[];
    resolvers: Resolver<any, any>[];
    generators: Generator<any>[];
    dependencies: Dependency[];
    themes: Record<string, ThemeType>;
    buildOptions?: BuildOptions;
    [key: string]: any;
}

export type RawConfiguration = BaseConfiguration<PartialDeep<RawTheme>>;

export type ResolvedConfiguration = BaseConfiguration<ResolvedTheme>;
