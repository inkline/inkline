import {
    BorderProperty,
    BorderRadiusProperty,
    AnimationProperty,
    Calc,
    Color,
    Reference,
    Selector,
    SidesProperty,
    Theme,
    Variable,
    TransitionProperty,
    BoxShadowProperty,
    HSLAColorProperty
} from './types';
import { TokenType } from './types';

/**
 * Tokens
 */

export function isToken<T>(value: unknown, type: TokenType): value is T {
    return (
        typeof value === 'object' && value !== null && '__type' in value && value.__type === type
    );
}

export function isVariable(value: unknown): value is Variable {
    return isToken(value, TokenType.Variable);
}

export function isRef(value: unknown): value is Reference {
    return isToken(value, TokenType.Reference);
}

export function isCalc(value: unknown): value is Calc {
    return isToken(value, TokenType.Calc);
}

export function isColor(value: unknown): value is Color {
    return isToken(value, TokenType.HSLAColor);
}

export function isSelector(value: unknown): value is Selector {
    return isToken(value, TokenType.Selector);
}

export function isTheme(value: unknown): value is Theme {
    return isToken(value, TokenType.Theme);
}

/**
 * Generic
 */

export function isNumberOrNumberString(value: unknown): value is number | string {
    return (
        (typeof value === 'string' && /^[0-9]+(\.[0-9]+)?$/.test(value)) ||
        typeof value === 'number'
    );
}

export function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Properties
 */

export function isAnimationProperty(property: unknown): property is AnimationProperty {
    return (
        isObject(property) &&
        ('name' in property ||
            'duration' in property ||
            'iterationCount' in property ||
            'direction' in property)
    );
}

export function isBorderProperty(property: unknown): property is BorderProperty {
    return (
        isObject(property) && ('color' in property || 'style' in property || 'width' in property)
    );
}

export function isBoxShadowProperty(property: unknown): property is BoxShadowProperty {
    return (
        isObject(property) &&
        ('offsetX' in property ||
            'offsetY' in property ||
            'blurRadius' in property ||
            'spreadRadius' in property ||
            'color' in property)
    );
}

export function isCornersProperty(property: unknown): property is BorderRadiusProperty {
    return (
        isObject(property) &&
        ('topLeft' in property ||
            'topRight' in property ||
            'bottomRight' in property ||
            'bottomLeft' in property)
    );
}

export function isHSLAColorProperty(property: unknown): property is HSLAColorProperty {
    return (
        isObject(property) &&
        ('h' in property || 's' in property || 'l' in property || 'a' in property)
    );
}

export function isSidesProperty<T>(property: unknown): property is SidesProperty<T> {
    return (
        isObject(property) &&
        ('top' in property || 'right' in property || 'bottom' in property || 'left' in property)
    );
}

export function isTransitionProperty(property: unknown): property is TransitionProperty {
    return (
        isObject(property) &&
        ('duration' in property || 'property' in property || 'timingFunction' in property)
    );
}
