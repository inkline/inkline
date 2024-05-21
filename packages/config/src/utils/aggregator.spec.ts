import { defineAggregator } from './aggregator';
import { GeneratorType } from '../types';

describe('defineAggregator', () => {
    it('should return the same aggregator definition that was passed', () => {
        const aggregateFn = vi.fn();
        const aggregator = {
            type: GeneratorType.Default,
            aggregate: {
                content: aggregateFn,
                path: aggregateFn
            }
        };
        const result = defineAggregator(aggregator);
        expect(result).toBe(aggregator);
    });
});
