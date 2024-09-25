import {
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    createGenericVariantResolveFn,
    createGenericVariantGenerateFn,
    defineGenerator,
    defineModule
} from '../utils';
import { GeneratorOutput } from '../types';

/**
 * Types
 */

export type BoxShadow = {
    offsetX: string | number;
    offsetY: string | number;
    blurRadius: string;
    spreadRadius: string;
    color: string;
};

export type RawThemeBoxShadow = string | BoxShadow;

export type ResolvedThemeBoxShadow = BoxShadow;

/**
 * Resolver
 */

export const resolveBoxShadow = defineResolverValueFn<RawThemeBoxShadow, ResolvedThemeBoxShadow>(
    (boxShadow) => {
        let offsetX: BoxShadow['offsetX'],
            offsetY: BoxShadow['offsetY'],
            blurRadius: BoxShadow['blurRadius'],
            spreadRadius: BoxShadow['spreadRadius'],
            color: BoxShadow['color'];

        if (typeof boxShadow === 'string') {
            const parts = boxShadow.split(/\s+/);

            offsetX = parts[0];
            offsetY = parts[1];
            blurRadius = parts[2];
            spreadRadius = parts.length === 5 ? parts[3] : '0';
            color = parts[parts.length - 1];
        } else {
            ({ offsetX, offsetY, blurRadius, spreadRadius, color } = boxShadow);
        }

        return { offsetX, offsetY, blurRadius, spreadRadius, color };
    }
);

export const resolveBoxShadowVariant = defineResolverVariantFn<
    RawThemeBoxShadow,
    ResolvedThemeBoxShadow
>(resolveBoxShadow);

export const boxShadowResolver = defineResolver<RawThemeBoxShadow, ResolvedThemeBoxShadow>({
    key: [/^boxShadow\.[^.]+$/, /.*\.boxShadow$/],
    resolve: createGenericVariantResolveFn(resolveBoxShadow, resolveBoxShadowVariant)
});

/**
 * Generator
 */

export const generateBoxShadow = createGenericVariantGenerateFn<ResolvedThemeBoxShadow>({
    aggregate: ['offsetX', 'offsetY', 'blurRadius', 'spreadRadius', 'color']
});

export const boxShadowGenerator = defineGenerator({
    key: [/^boxShadow\.[^.]+$/, /.*\.boxShadow$/],
    output: GeneratorOutput.CssVariables,
    generate: generateBoxShadow
});

/**
 * Module
 */

export const boxShadow = defineModule(({ registerGenerator, registerResolver }) => {
    registerResolver(boxShadowResolver);
    registerGenerator(boxShadowGenerator);
});
