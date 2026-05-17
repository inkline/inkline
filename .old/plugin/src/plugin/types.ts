export interface PluginUserOptions {
    /**
     * Whether to watch for changes and rebuild the config. Determined automatically for Vite.js and Nuxt.js
     */
    watch?: boolean;
    /**
     * The path to the config file
     */
    configFile?: string;
    /**
     * The path to the CSS Variables output directory
     */
    outputDir?: string;
    /**
     * Whether to enable or disable logging
     */
    silent?: boolean;
}
