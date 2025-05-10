import type { PluginUserOptions } from './types';
import type { FSWatcher } from 'fs';
import { build as buildConfig, exists, getResolvedBuildOptions } from '@inkline/config';
import { Logger } from '@inkline/logger';
import type { ViteDevServer, ResolvedConfig } from 'vite';
import { resolve, sep } from 'path';
import * as chokidar from 'chokidar';
import dependencyTree from 'dependency-tree';
import { BLOCKLISTED_ENVIRONMENTS } from './constants';
import {
    registerUtilityForVariantProperty,
    shouldExtract,
    extractUtilityClasses,
    extractHelperFunctionUtilityClasses,
    extractVariantPropertyUtilityClasses,
    extractCompiledVariantPropertyUtilityClasses
} from '@inkline/core';
import type { DefinitionOptions, UtilityClassEntry } from '@inkline/core';
import { debounce } from '@inkline/utils';

export function createInklineContext(userOptions: PluginUserOptions) {
    let serverWatcher: FSWatcher | null = null;
    let initialized = false;

    const { configPath, configDir, configFile, configBasename, configExtname, outputDir, context } =
        getResolvedBuildOptions(userOptions);
    const tsConfigPath = resolve(configDir, 'tsconfig.json');

    const definitionOptions: DefinitionOptions = {
        context
    };

    /**
     * Initialize the Inkline context.
     */
    function initialize(config: ResolvedConfig) {
        if (initialized) {
            return;
        }
        initialized = true;

        const isBlockListedCommand = process.argv
            .map((arg) => arg.split(sep).pop() ?? '')
            .some((arg) => BLOCKLISTED_ENVIRONMENTS.find((command) => arg.includes(command)));
        if (isBlockListedCommand) {
            return;
        }

        const isDevMode = config.command !== 'build' && !process.argv.includes('build');
        if (isDevMode) {
            void watch();
        } else {
            void build();
        }
    }

    /**
     * Build the config file and generate output files.
     */
    async function build() {
        console.log('build', {
            userOptions,
            context
        });

        await buildConfig({
            configFile: configPath,
            outputDir,
            context
        });

        if (!userOptions.silent) {
            Logger.success(`${configBasename}${configExtname} built successfully.`);
        }

        initialized = true;
    }

    /**
     * Called when the config file changes.
     */
    function onConfigChange() {
        if (!userOptions.silent) {
            Logger.info(`${configFile} changed, rebuilding...`);
        }

        void build();
    }

    /**
     * Watch the config file for changes.
     */
    async function watch(onChange = onConfigChange) {
        if (!userOptions.silent) {
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
    function setupServer(server: ViteDevServer) {
        if (serverWatcher === server.watcher) {
            return;
        }
        serverWatcher = server.watcher;

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
