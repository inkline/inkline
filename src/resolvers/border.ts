import {
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    createFieldWithOptionalVariantsResolveFn
} from '../utils';
import { Border, RawTheme, RawThemeBorder, ResolvedTheme, ResolvedThemeBorder } from '../types';

export function assignBorder(borderString: string): Border {
    const [width, style, color] = borderString.split(/\s+/);
    return { width, style, color };
}

export const resolveBorder = defineResolverValueFn<RawThemeBorder, ResolvedThemeBorder>(
    (border) => {
        let top: Border, right: Border, bottom: Border, left: Border;

        if (typeof border === 'string') {
            const parsedBorder = assignBorder(border);
            [top, right, bottom, left] = [parsedBorder, parsedBorder, parsedBorder, parsedBorder];
        } else if ('width' in border || 'style' in border || 'color' in border) {
            [top, right, bottom, left] = [border, border, border, border] as Border[];
        } else {
            top = typeof border.top === 'string' ? assignBorder(border.top) : border.top;
            right = typeof border.right === 'string' ? assignBorder(border.right) : border.right;
            bottom =
                typeof border.bottom === 'string' ? assignBorder(border.bottom) : border.bottom;
            left = typeof border.left === 'string' ? assignBorder(border.left) : border.left;
        }

        return { top, right, bottom, left };
    }
);

export const resolveBorderVariant = defineResolverVariantFn<RawThemeBorder, ResolvedThemeBorder>(
    resolveBorder
);

export const borderResolver = defineResolver<RawTheme['border'], ResolvedTheme['border']>({
    key: 'border',
    resolve: createFieldWithOptionalVariantsResolveFn(resolveBorder, resolveBorderVariant)
});
