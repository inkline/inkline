import { TokenType, Variant, VariantOptions } from '../types';
import { nanoid } from 'nanoid';
import { addVariantToTheme } from '../themes';
import {utility} from "./utility";

/**
 * Creates a variant token.
 *
 * This token is used to define a variant rule.
 */
export function variant(name: string, value: Variant['__value'], options: VariantOptions): Variant {
    const instance: Variant = {
        __id: nanoid(),
        __type: TokenType.Variant,
        __name: name,
        __value: value
    };

    addVariantToTheme(instance, options);
    addVariantUtilities(instance, options);

    return instance;
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
export function addVariantUtilities(
    instance: Variant,
    options: VariantOptions
): void {
    console.log(instance, options);
    // const state = instance.__name.includes(':') ? instance.__name.split(':')[0] : 'default';
    //
    // Object.entries(instance.__value).forEach(([key, value]) => {
    //     utility(`${key}:${value}`)
    //
    // });
}
