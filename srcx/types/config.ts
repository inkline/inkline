import { Resolver } from './resolver';
import { Generator } from './generator';
import { ResolvedTheme, Theme } from './theme';
import { PartialDeep } from 'type-fest';
import { BuildOptions } from './build';

export interface BaseConfiguration<ThemeType> {
    resolvers: Resolver<any, any>[];
    generators: Generator<any>[];
    theme: Record<string, ThemeType>;
    [key: string]: any;
}

export type Configuration = BaseConfiguration<PartialDeep<Theme>>;

export type ResolvedConfiguration = BaseConfiguration<ResolvedTheme> & {
    buildOptions: BuildOptions;
};
