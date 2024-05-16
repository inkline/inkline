import {
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    createResolveFn
} from '../utils';
import type {
    RawTheme,
    RawThemeBoxShadow,
    ResolvedTheme,
    ResolvedThemeBoxShadow,
    BoxShadow,
    ResolvedThemeValueType,
    RawThemeValueType
} from '../types';

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
            ({ offsetX, offsetY, blurRadius, spreadRadius = '0', color } = boxShadow);
        }

        return { offsetX, offsetY, blurRadius, spreadRadius, color };
    }
);

export const resolveBoxShadowVariant = defineResolverVariantFn<
    RawThemeBoxShadow,
    ResolvedThemeBoxShadow
>(resolveBoxShadow);

export const boxShadowResolver = defineResolver<
    RawThemeValueType<RawTheme['boxShadow']>,
    ResolvedThemeValueType<ResolvedTheme['boxShadow']>
>({
    key: [/^boxShadow\.[^.]+$/, /.*\.boxShadow$/],
    resolve: createResolveFn(resolveBoxShadow, resolveBoxShadowVariant)
});
