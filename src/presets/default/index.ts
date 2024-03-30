import { defineConfig } from '../../utils';
import { defaultThemes } from './themes';
import { defaultResolvers } from './resolvers';
import { defaultGenerators } from './generators';
import { defaultAggregators } from './aggregators';

export * from './resolvers';
export * from './generators';
export * from './aggregators';
export * from './themes';

export const defaultConfig = defineConfig({
    resolvers: defaultResolvers,
    generators: defaultGenerators,
    aggregators: defaultAggregators,
    themes: defaultThemes
});
