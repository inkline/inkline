import type { FSWatcher } from 'fs';
import { build as buildConfig, getResolvedBuildOptions } from './build';
import { exists } from './utils';
import { Logger } from '@inkline/logger';
import { resolve } from 'path';
import * as chokidar from 'chokidar';
import dependencyTree from 'dependency-tree';
import {
    shouldExtract,
    registerUtilityForVariantProperty,
    extractUtilityClasses,
    extractHelperFunctionUtilityClasses,
    extractVariantPropertyUtilityClasses,
    extractCompiledVariantPropertyUtilityClasses,
    Options
} from '@inkline/core';
import type { DefinitionOptions, UtilityClassEntry } from '@inkline/core';
import { debounce } from '@inkline/utils';

export function createInklineLoaderContext(userOptions: Options) {
    let serverWatcher: FSWatcher | null = null;
    let initialized = false;
    let silent = false;

    const { configPath, configDir, configFile, configBasename, configExtname, outputDir, context } =
        getResolvedBuildOptions(userOptions);
    const tsConfigPath = resolve(configDir, 'tsconfig.json');

    const definitionOptions: DefinitionOptions = {
        context
    };

    /**
     * Initialize the Inkline context.
     */
    function initialize(options: { watch?: boolean; silent?: boolean } = {}) {
        if (initialized) {
            return;
        }
        initialized = true;
        silent = options.silent ?? false;

        if (options.watch) {
            void watch();
        } else {
            void build();
        }
    }

    /**
     * Build the config file and generate output files.
     */
    async function build() {
        await buildConfig({
            configFile: configPath,
            outputDir,
            context
        });

        if (!silent) {
            Logger.success(`${configBasename}${configExtname} built successfully.`);
        }

        initialized = true;
    }

    /**
     * Called when the config file changes.
     */
    function onConfigChange() {
        if (!silent) {
            Logger.info(`${configFile} changed, rebuilding...`);
        }

        void build();
    }

    /**
     * Watch the config file for changes.
     */
    async function watch(onChange = onConfigChange) {
        if (!silent) {
            Logger.info(`Watching ${configFile} for changes...`);
        }

        const tsConfigExists = await exists(tsConfigPath);

        const watchList = dependencyTree.toList({
            filename: configPath,
            directory: configDir,
            noTypeDefinitions: true,
            filter: (path) => path.indexOf('node_modules') === -1,
            ...(tsConfigExists ? { tsConfig: tsConfigPath } : {})
        });

        const watcher = chokidar.watch(watchList, {
            persistent: true
        });

        watcher.on('change', onChange);

        await build();
    }

    /**
     * Setup watcher for utility classes
     */
    function setupServer(watcher: FSWatcher) {
        if (serverWatcher === watcher) {
            return;
        }
        serverWatcher = watcher;

        serverWatcher.on('unlink', (path) => {
            console.log('unlink', path);
        });

        serverWatcher.on('add', (path) => {
            console.log('add', path);
        });
    }

    const debouncedBuild = debounce(build, 500);

    /**
     * Extract utility classes from the code.
     */
    function transform(code: string) {
        if (!shouldExtract(code)) return;

        const directUtilityClasses = extractUtilityClasses(code);
        const variantUtilityClasses = extractVariantPropertyUtilityClasses(code);
        const compiledVariantUtilityClasses = extractCompiledVariantPropertyUtilityClasses(code);
        const helperFunctionUtilityClasses = extractHelperFunctionUtilityClasses(code);

        const classes = [
            ...directUtilityClasses,
            ...variantUtilityClasses,
            ...compiledVariantUtilityClasses,
            ...helperFunctionUtilityClasses
        ];

        const newClassesAdded = classes.some(registerUtilityClass);
        if (newClassesAdded) {
            void debouncedBuild();
        }
    }

    /**
     * Register utility classes
     */

    const utilityClassesSeen = new Set<string>();

    function registerUtilityClass(entry: UtilityClassEntry) {
        const cacheKey = `_${entry.state}:${entry.name}:${entry.value}`;

        if (utilityClassesSeen.has(cacheKey)) {
            return false;
        }

        utilityClassesSeen.add(cacheKey);

        registerUtilityForVariantProperty(entry, definitionOptions);

        return true;
    }

    return {
        configPath,
        configDir,
        configFile,
        configBasename,
        configExtname,
        outputDir,
        setupServer,
        build,
        watch,
        transform,
        initialize
    };
}
