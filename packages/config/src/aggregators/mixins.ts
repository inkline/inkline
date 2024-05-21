import { GeneratorType } from '../types';
import { defineAggregator } from '../utils/aggregator';

export const mixinsAggregator = defineAggregator({
    type: GeneratorType.Mixins,
    aggregate: {
        path: (path) => ['mixins', ...path],
        content: (content) => content
    }
});
