import {
    ClassificationType,
    ThemeChildElement,
    ThemeElement,
    ThemeGroup,
    ThemeVariable
} from '../types';
import { RawThemeElementDefinition } from '../modules';

export function isObject<T extends object = Record<string, unknown>>(value: unknown): value is T {
    return typeof value === 'object' && value !== null;
}

export function isTypedObject(
    value: unknown
): value is ThemeVariable<object> | ThemeElement | ThemeGroup<object> | ThemeChildElement<object> {
    return isObject(value) && '__type' in value;
}

export function isConsumableObject<T extends object>(value: T): value is ThemeGroup<T> {
    return isObject(value) && '__consume' in value;
}

export function isThemeVariable(value: unknown): value is ThemeVariable<any> {
    return isTypedObject(value) && value.__type == ClassificationType.Variable;
}

export function isThemeElement(value: unknown): value is ThemeElement {
    return isTypedObject(value) && value.__type == ClassificationType.Element;
}

export function isThemeGroup<T extends object>(value: T): value is ThemeGroup<T> {
    return isTypedObject(value) && value.__type == ClassificationType.Group;
}

export const isThemeElementDefinition = (value: unknown): value is RawThemeElementDefinition =>
    typeof value === 'object' && value !== null && !Array.isArray(value);
