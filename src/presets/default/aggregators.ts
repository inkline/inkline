import { Aggregator } from '../../types';
import { cssVariablesAggregator, defaultAggregator, mixinsAggregator } from '../../aggregators';

export const defaultAggregators: Aggregator[] = [
    defaultAggregator,
    mixinsAggregator,
    cssVariablesAggregator
];
