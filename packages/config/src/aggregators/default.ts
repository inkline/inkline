import { GeneratorType } from '../types';
import { defineAggregator } from '../utils/aggregator';

export const defaultAggregator = defineAggregator({
    type: GeneratorType.Default,
    aggregate: {
        path: (path) => path,
        content: (content) => content
    }
});
