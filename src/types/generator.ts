import { ResolvedTheme } from './theme';
import { Plugin } from './plugin';

export type GeneratorLocation = 'default' | 'root' | string;

export enum GeneratorPriority {
    High = 0,
    Medium = 1,
    Low = 2,
}

export interface CodegenGroup {
    name: string;
    lines: string[];
    location: GeneratorLocation;
    priority: GeneratorPriority;
    subgroup?: string;
}

export interface IntermediaryCodegenFile {
    name: string;
    locations: Record<GeneratorLocation, CodegenGroup[]>;
}

export interface CodegenFile {
    name: string;
    contents: string;
}

export interface Generator<ValueType = any> extends Plugin<ResolvedTheme, ValueType, string[]> {
    /**
     * The priority of the generated code. High priority means that other generators depend on this one.
     *
     * @example GeneratorPriority.High
     */
    priority?: GeneratorPriority;

    /**
     * The location of the generated code. Root means that the generated code is placed inside the :root selector.
     *
     * @example GeneratorLocation.Root
     */
    location?: GeneratorLocation;
}
