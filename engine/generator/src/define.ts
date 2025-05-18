import type { Generator } from './types';

export function defineGenerator<T>(generator: Generator<T>): Generator<T> {
    return generator;
}
