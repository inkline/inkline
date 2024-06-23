import { RawThemeElementDefinition } from '../modules';

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

export type ThemeVariableMetadata = ThemePropertyMetadata<ClassificationType.Variable>;

export type ThemeVariable<T, V = T> = ThemeVariableMetadata & {
    [key: string]: T | V;
};

export type ThemeElementMetadata = ThemePropertyMetadata<ClassificationType.Element>;

export type ThemeElement = ThemeElementMetadata & {
    [key: string]: RawThemeElementDefinition;
};

export type ThemeChildElement<T extends object> =
    ThemePropertyMetadata<ClassificationType.ChildElement> & T;
