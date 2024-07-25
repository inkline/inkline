import { RawThemeElementDefinition, ResolvedThemeElementDefinition } from '../modules';

export enum ClassificationType {
    Element = 'element',
    ChildElement = 'child-element',
    Group = 'group',
    Variable = 'variable',
    Unknown = 'unknown'
}

export type ThemePropertyMetadata<T extends ClassificationType> = {
    __type: T;
    __name?: string;
    __consume?: boolean;
    __selector?: string;
};

export type ThemeGroup<T extends object> = ThemePropertyMetadata<ClassificationType.Group> & T;

export type MaybeThemeGroup<T extends object> = ThemeGroup<T> | T;

export type ThemeVariableMetadata = ThemePropertyMetadata<ClassificationType.Variable>;

export type ThemeVariableValue<T, V = T> = {
    [key: string]: T | V;
};

export type ThemeVariable<T, V = T> = ThemeVariableMetadata & ThemeVariableValue<T, V>;

export type MaybeThemeVariable<T, V = T> = ThemeVariable<T, V> | ThemeVariableValue<T, V> | T;

export type ThemeElementMetadata = ThemePropertyMetadata<ClassificationType.Element>;

export type RawThemeElement = ThemeElementMetadata & {
    [key: string]: RawThemeElementDefinition;
};

export type ResolvedThemeElement = ThemeElementMetadata & {
    [key: string]: ResolvedThemeElementDefinition;
};

export type ThemeChildElement<T extends object> =
    ThemePropertyMetadata<ClassificationType.ChildElement> & T;
