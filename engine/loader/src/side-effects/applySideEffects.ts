import { Context } from '@inkline/core';
import { registerUtilitiesForVariant, registerUtility } from './registerUtilitiesForVariant';
import { BuildOptions } from '../types';

export function applySideEffects(context: Context, options: BuildOptions) {
    if (options.additionalUtilities) {
        options.additionalUtilities.forEach((utility) => {
            registerUtility(utility, { context });
        });
    }

    Object.keys(context.themes).forEach((theme) => {
        Object.values(context.themes[theme].variants).forEach((instance) => {
            registerUtilitiesForVariant(instance, { context, theme });
        });
    });
}
