import type { DefinitionOptions, UtilityClassEntry, Variant } from '@inkline/core';
import type { VariantState } from '@inkline/types';
import { toKebabCase, toStatefulName, isArray } from '@inkline/utils';
import { propertyToVariableMap } from '@inkline/variants';
import {
    ref,
    selector,
    utility,
    addUtilityToTheme,
    isVariableDefined,
    normalizeCSSSelector,
    defaultUtilityPrefix
} from '@inkline/core';

export function registerUtility(
    { name, value, state }: UtilityClassEntry,
    options: DefinitionOptions
) {
    const utilityNameWithState = toStatefulName(
        `${toKebabCase(name)}${value === 'default' ? '' : `:${value}`}`,
        state
    );

    // if (name.includes('padding')) {
    //     console.log('registerUtility', { name, value, state });
    // }

    const propertyValues = propertyToVariableMap[name] ?? name;
    const propertyValuesList = (isArray(propertyValues) ? propertyValues : [propertyValues]).map(
        (propertyValue) => `${toKebabCase(propertyValue)}${value === 'default' ? '' : `--${value}`}`
    );

    const valueReference: string | undefined = propertyValuesList.find((variableName) =>
        isVariableDefined(variableName, options)
    );

    // if (name.includes('padding')) {
    //     console.log('Registering utility', {
    //         name,
    //         value,
    //         state,
    //         propertyValuesList,
    //         valueReference
    //     });
    // }

    const selectorValue = {
        [name]: valueReference ? ref(toKebabCase(valueReference)) : value
    };

    const utilityInstance = utility(
        utilityNameWithState,
        selector(
            normalizeCSSSelector(
                `.${options.utilityPrefix ?? defaultUtilityPrefix}${utilityNameWithState}`
            ),
            selectorValue,
            options
        ),
        {
            ...options,
            default: true
        }
    );

    addUtilityToTheme(utilityInstance, options);
}

/**
 * When registering a variant, we also need to register related utility selectors.
 *
 * Examples:
 *
 * variant('box', { padding: 'sm', borderStyle: 'solid' }, options);
 *     alias: padding => spacing
 *     => utility('padding:sm', selector('._padding\\:sm', { padding: ref('spacing--sm') }, options), options);
 *     => utility('border:solid', selector('._border\\:solid', { borderStyle: ref('border-style--solid') }, options), options);
 *
 * variant('hover:box', { background: 'primary' }, options);
 *     alias: background => color
 *     => utility('hover:background:primary', selector('._hover\\:background\\:primary', { background: ref('color--primary') }, options), options);
 *
 * variant('square', { width: '42px', height: '42px' }, options);
 *     try: ref('width--42px')
 *     => utility('width:42px', selector('._width\\:42px', { width: '42px' }, options), options);
 *
 * variant('square', { size: '42px' }, options);
 *     try: ref('size--42px')
 *     alias: size => [width, height]
 *     => utility('size:42px', selector('._size\\:42px', { width: '42px', height: '42px' }, options), options);
 */
export function registerUtilitiesForVariant(instance: Variant, options: DefinitionOptions): void {
    const state = (
        instance.__name.includes(':') ? instance.__name.split(':')[0] : 'default'
    ) as VariantState;

    Object.entries(instance.__value).forEach(([key, value]) => {
        // if (key.includes('padding')) {
        //     console.log('registerUtilitiesForVariant', {
        //         key,
        //         value
        //     });
        // }

        const isExtendsProperty = key === 'extends';
        const isInterpolatedValue = typeof value === 'string' && value.startsWith('{{');

        if (!value || typeof value === 'object' || isExtendsProperty || isInterpolatedValue) return;

        registerUtility(
            {
                name: key,
                value: value as string,
                state
            },
            options
        );
    });
}
