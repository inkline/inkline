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
