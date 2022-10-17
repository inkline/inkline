export interface BuildOptions {
    configFile?: string;
    outputDir?: string;
    extName?: `.${string}`;
    themeSelector?: string;
}

export interface ResolvedBuildOptions extends Required<BuildOptions> {
    configDir: string;
}
