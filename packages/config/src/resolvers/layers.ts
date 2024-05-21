import { defineResolver, defineResolverValueFn } from '../utils';
import type { RawTheme, ResolvedTheme } from '../types';

export const layersResolver = defineResolver<RawTheme['layers'], ResolvedTheme['layers']>({
    key: 'layers',
    resolve: defineResolverValueFn((value) => value)
});
