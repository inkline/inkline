import {
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    createMultipleFieldsWithOptionalVariantsResolveFn,
    matchKey
} from '../utils';
import {
    RawTheme,
    RawThemeComponent,
    ResolvedTheme,
    ResolvedThemeComponent,
    Resolver
} from '../types';
import { boxShadowResolver } from './boxShadow';
import { borderResolver } from './border';
import { borderRadiusResolver } from './borderRadius';
import { colorResolver } from './colors';
import { genericResolver } from './generic';
import { marginResolver, paddingResolver, spacingResolver } from './spacing';
import { transitionResolver } from './transition';
import { typographyFontSizeResolver, typographyFontWeightResolver } from './typography';

/**
 * Components
 */

const componentResolvers: Resolver<any, any>[] = [
    borderResolver,
    borderRadiusResolver,
    boxShadowResolver,
    colorResolver,
    marginResolver,
    paddingResolver,
    { ...colorResolver, key: 'background' },
    {
        ...transitionResolver,
        key: 'transition'
    },
    { ...typographyFontSizeResolver, key: 'fontSize' },
    { ...typographyFontWeightResolver, key: 'fontWeight' }
];

export const resolveComponent = defineResolverValueFn<RawThemeComponent, ResolvedThemeComponent>(
    (component, meta) => {
        const variantName = meta.path[meta.path.length - 1];
        const componentName = meta.path[meta.path.length - 2];

        return Object.entries(component).reduce<ResolvedThemeComponent>(
            (acc, [propertyName, propertyValue]) => {
                const resolver = componentResolvers.find((resolver) =>
                    matchKey(resolver.key, propertyName)
                );
                const resolverPath = [
                    ...meta.path.slice(0, -2),
                    componentName,
                    ...(variantName !== 'default' ? [variantName] : []),
                    propertyName
                ];

                if (resolver) {
                    acc[propertyName] = resolver.resolve(propertyValue, {
                        ...meta,
                        path: resolverPath
                    });
                } else if (typeof propertyValue === 'object') {
                    acc[propertyName] = resolveComponent(propertyValue, {
                        ...meta,
                        path: resolverPath
                    });
                } else {
                    const resolvedValue = genericResolver.resolve(propertyValue, {
                        ...meta,
                        path: resolverPath
                    });

                    acc[propertyName] =
                        resolvedValue &&
                        typeof resolvedValue === 'object' &&
                        'default' in resolvedValue
                            ? resolvedValue.default
                            : resolvedValue;
                }

                return acc;
            },
            {} as ResolvedThemeComponent
        );
    }
);
export const resolveComponentVariant = defineResolverVariantFn<
    RawThemeComponent,
    ResolvedThemeComponent
>(resolveComponent);

export const componentsResolver = defineResolver<
    RawTheme['components'],
    ResolvedTheme['components']
>({
    key: 'components',
    resolve: createMultipleFieldsWithOptionalVariantsResolveFn(
        resolveComponent,
        resolveComponentVariant
    )
});
