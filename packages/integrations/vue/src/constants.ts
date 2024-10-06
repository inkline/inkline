import type { InjectionKey, Ref } from 'vue';
import type { InklineOptions } from './types';

/**
 * Symbols
 */

export const InklineOptionsKey = Symbol('InklineOptions') as InjectionKey<Ref<InklineOptions>>;
