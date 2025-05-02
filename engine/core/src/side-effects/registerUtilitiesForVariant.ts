import { ComponentValue, DefinitionOptions, Variant } from '../types';
import type { VariantState } from '@inkline/types';
import { toKebabCase, toStatefulName, isArray } from '@inkline/utils';
import { propertyToVariableMap } from '@inkline/variants';
import { ref, selector, utility } from '../tokens';
import { defaultUtilityPrefix } from '../constants';
import { addUtilityToTheme } from './themes';

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
        if (
            key === 'extends' ||
            !value ||
            typeof value === 'object' ||
            (typeof value === 'string' && value.startsWith('{{'))
        )
            return;

        const utilityNameWithState = toStatefulName(
            `${toKebabCase(key)}:${value.toString()}`,
            state
        );

        const selectorProperties = propertyToVariableMap[key] ?? key;
        const selectorPropertiesList = isArray(selectorProperties)
            ? selectorProperties
            : [selectorProperties];

        const selectorValue = selectorPropertiesList.reduce<ComponentValue>(
            (acc, selectorProperty) => {
                acc[key] = ref(`${selectorProperty}--${value}`);
                return acc;
            },
            {}
        );

        const utilityInstance = utility(
            utilityNameWithState,
            selector(
                `.${options.utilityPrefix ?? defaultUtilityPrefix}${utilityNameWithState}`,
                selectorValue,
                options
            ),
            options
        );

        if (instance.__name.startsWith('box')) {
            console.log(JSON.stringify(utilityInstance, null, 2));
        }

        addUtilityToTheme(utilityInstance, options);
    });
}
