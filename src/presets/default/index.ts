import { defineConfig } from '../../utils';
import { defaultThemes } from './themes';
import { defaultAggregators } from './aggregators';
import { defaultDependencies } from './dependencies';
import { defaultGenerators } from './generators';
import { defaultResolvers } from './resolvers';

export * from './resolvers';
export * from './generators';
export * from './aggregators';
export * from './themes';

export const defaultConfig = defineConfig({
    aggregators: defaultAggregators,
    dependencies: defaultDependencies,
    generators: defaultGenerators,
    resolvers: defaultResolvers,
    themes: defaultThemes
});
