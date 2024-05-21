import { defineConfig } from '../../utils';
import { defaultThemes } from './themes';
import { defaultAggregators } from './aggregators';
import { defaultClassifiers } from './classifiers';
import { defaultDependencies } from './dependencies';
import { defaultGenerators } from './generators';
import { defaultResolvers } from './resolvers';

export * from './classifiers';
export * from './resolvers';
export * from './generators';
export * from './aggregators';
export * from './themes';

export const defaultConfig = defineConfig({
    aggregators: defaultAggregators,
    classifiers: defaultClassifiers,
    dependencies: defaultDependencies,
    generators: defaultGenerators,
    resolvers: defaultResolvers,
    themes: defaultThemes
});
