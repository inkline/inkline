import { GeneratorOutput, GeneratorPriority } from './generator';

export interface BuildOptions {
    configFile?: string;
    outputDir?: string;
    extName?: `.${string}`;
    themeSelector?: string;
    manifest?: boolean;
}

export interface ResolvedBuildOptions extends Required<BuildOptions> {
    configDir: string;
    configExtName: `.${'js' | 'ts'}`;
}

export interface IndexFile {
    path: string[];
    import: string[];
}

export interface BuildFile {
    path: string[];
    content: string[];
}

export interface BuildChunk extends BuildFile {
    output: GeneratorOutput;
    priority: GeneratorPriority;
}
