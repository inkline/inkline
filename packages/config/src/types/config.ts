import type { PartialDeep } from 'type-fest';
import type { RawTheme, ResolvedTheme } from './theme';
import type { BuildFile, BuildOptions } from './build';
import { Module, OutputModifier } from './modules';
import { Generator } from './generator';
import { Resolver } from './resolver';

export interface BaseUserConfiguration<ThemeType> {
    modules?: Module[];
    themes?: Record<string, ThemeType>;
    buildOptions?: BuildOptions;
    [key: string]: any;
}

export type UserConfiguration<ThemeType = RawTheme> = BaseUserConfiguration<PartialDeep<ThemeType>>;

export interface BaseResolvedConfiguration<ThemeType> extends BaseUserConfiguration<ThemeType> {
    resolvers: Resolver<any, any>[];
    generators: Generator<any>[];
    outputModifiers: OutputModifier[];
    files: BuildFile[];
}

export type ResolvedConfiguration<ThemeType = ResolvedTheme> = BaseResolvedConfiguration<ThemeType>;
