import { createMultipleFieldsWithOptionalVariantsResolveFn, defineResolver } from '../utils';
import { RawTheme, ResolvedTheme } from '../types';
import { resolveComponent, resolveComponentVariant } from './components';

export const elementsResolver = defineResolver<RawTheme['elements'], ResolvedTheme['elements']>({
    key: 'elements',
    resolve: createMultipleFieldsWithOptionalVariantsResolveFn(
        resolveComponent,
        resolveComponentVariant
    )
});
