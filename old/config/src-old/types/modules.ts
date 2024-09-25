import { Generator } from './generator';
import { Resolver } from './resolver';
import { BuildChunk, BuildFile } from './build';

export interface ModuleParameters {
    registerResolver: <RawValue, ResolvedValue>(
        resolver: Resolver<RawValue, ResolvedValue>
    ) => void;
    registerGenerator: <ResolvedValue>(generator: Generator<ResolvedValue>) => void;
    registerOutputModifier: (modifier: OutputModifier) => void;
    registerFile: (file: BuildFile) => void;
}

export type Module = (args: ModuleParameters) => void;

/**
 * Module Types
 */

export interface OutputModifierMeta {
    themeName: 'default' | string;
    themeSelector: string;
}

export type OutputModifier = {
    path?: (chunk: BuildChunk, meta: OutputModifierMeta) => BuildChunk['path'] | void;
    content?: (chunk: BuildChunk, meta: OutputModifierMeta) => BuildChunk['content'] | void;
};
