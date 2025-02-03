import path from 'path';
import fs from 'fs/promises';
import { parse } from 'comment-parser';
import type {
    ComponentManifest,
    ComponentManifestCss,
    ComponentManifestEvent,
    ComponentManifestProp,
    ComponentManifestSlot
} from '@inkline/types';
import { createJiti } from 'jiti';
import glob from 'fast-glob';

export const jiti = createJiti(import.meta.url);

export async function parseComponent(componentPath: string) {
    const source = await fs.readFile(componentPath, 'utf-8');
    const name = path.basename(componentPath, path.extname(componentPath));

    // Props and Events
    const props: ComponentManifestProp[] = [];
    const events: ComponentManifestEvent[] = [];
    const blocks = parse(source);
    blocks.forEach((block) => {
        if (block.tags.length === 0) {
            return;
        }

        const eventTag = block.tags.find((tag) => tag.tag === 'event');
        const paramTag = block.tags.find((tag) => tag.tag === 'param');

        const description = block.description;

        if (eventTag) {
            events.push({
                name,
                description
            });
        } else if (paramTag) {
            const type = paramTag.type ?? 'any';
            const name = paramTag.name;

            const defaultTag = block.tags.find((tag) => tag.tag === 'default');
            const defaultValue = defaultTag ? defaultTag.name : '';

            props.push({
                name,
                type,
                description,
                default: defaultValue
            });
        }
    });

    // Slots
    const slots: ComponentManifestSlot[] = [];
    const slotRegEx = /<!--\s*@slot\s+([\w-]+)\s+(.+)\s*-->/g;
    slots.push(
        ...Array.from(source.matchAll(slotRegEx), ([_, name, description]) => ({
            name,
            description: description.trim()
        }))
    );

    return {
        name,
        props,
        events,
        slots
    };
}

export async function parseTheme(themePath: string) {
    const css: ComponentManifestCss = {
        namespace: '',
        variables: []
    };

    const context = {
        id: '',
        themes: {
            default: {
                __type: 'theme',
                __name: 'default',
                __keys: {
                    variables: new Set(),
                    selectors: new Set()
                },
                variables: {},
                selectors: []
            }
        },
        files: []
    };

    type ThemeVariable = {
        __name: string;
        __value: unknown;
    };

    type ThemeUseFn = (options: { context: typeof context }) => Record<string, ThemeVariable>;
    type ThemeUseVariantFn = (
        variant: string,
        options: { context: typeof context }
    ) => Record<string, ThemeVariable>;

    type ThemeFile = { ns: string } & Record<string, ThemeUseFn | ThemeUseVariantFn>;

    const theme: ThemeFile = await jiti.import(themePath);
    const themeSource = await fs.readFile(themePath, 'utf-8');

    const namespace = themeSource.match(/const ns = '(.+)';/)?.[1] || '';
    const defaultColor = themeSource.match(/const default\w+Color = '(.+)';/)?.[1] || '';
    const defaultSize = themeSource.match(/const default\w+Size = '(.+)';/)?.[1] || '';

    const themeKeys = Object.keys(theme);
    const themeVariablesFns = themeKeys.filter(
        (key) => key.endsWith('Variables') && !(key.includes('Color') || key.includes('Size'))
    );
    const themeColorVariablesFn = themeKeys.find((key) => key.endsWith('ColorVariables'));
    const themeSizeVariablesFn = themeKeys.find((key) => key.endsWith('SizeVariables'));

    const toCSSVariable = (name: string) => `--${name}`;

    if (themeVariablesFns.length > 0) {
        themeVariablesFns.forEach((themeVariablesFn) => {
            const themeVariables = (theme[themeVariablesFn] as ThemeUseFn)({ context });
            Object.keys(themeVariables).forEach((variableKey) => {
                const themeVariable = themeVariables[variableKey];
                css.variables.push({
                    name: toCSSVariable(themeVariable.__name)
                });
            });
        });
    }

    if (themeColorVariablesFn && theme[themeColorVariablesFn] && defaultColor) {
        const themeColorVariables = (theme[themeColorVariablesFn] as ThemeUseVariantFn)(
            defaultColor,
            { context }
        );
        Object.keys(themeColorVariables).forEach((variableKey) => {
            const themeVariable = themeColorVariables[variableKey];
            if (context.themes.default.__keys.variables.has(themeVariable.__name)) {
                css.variables.push({
                    name: toCSSVariable(
                        themeVariable.__name.replace(`--${defaultColor}`, '--{color}')
                    )
                });
            }
        });
    }

    if (themeSizeVariablesFn && theme[themeSizeVariablesFn] && defaultSize) {
        const themeSizeVariables = (theme[themeSizeVariablesFn] as ThemeUseVariantFn)(defaultSize, {
            context
        });
        Object.keys(themeSizeVariables).forEach((variableKey) => {
            const themeVariable = themeSizeVariables[variableKey];
            if (context.themes.default.__keys.variables.has(themeVariable.__name)) {
                css.variables.push({
                    name: toCSSVariable(
                        themeVariable.__name.replace(`--${defaultSize}`, '--{size}')
                    )
                });
            }
        });
    }

    css.namespace = namespace;

    return { css };
}

export async function generateManifest(componentDir: string) {
    const componentPaths = await glob(path.resolve(componentDir, '**', '*.vue'), {
        ignore: [path.resolve(componentDir, '**', 'examples', '*.vue')]
    });
    const themePaths = await glob(path.resolve(componentDir, '**', 'theme.ts'));

    const paths: Array<{
        componentPath?: string;
        themePath?: string;
    }> = componentPaths.map((componentPath) => ({ componentPath }));

    themePaths.forEach((themePath) => {
        const pathIndex = paths.findIndex(
            ({ componentPath }) =>
                componentPath && path.dirname(componentPath) === path.dirname(themePath)
        );

        if (pathIndex === -1) {
            paths.push({ themePath });
        } else {
            paths[pathIndex].themePath = themePath;
        }
    });

    const manifest: ComponentManifest[] = [];
    for (const { componentPath, themePath } of paths) {
        const componentManifest = {
            ...(componentPath ? await parseComponent(componentPath) : {}),
            ...(themePath ? await parseTheme(themePath) : {})
        };

        if (!componentPath && componentManifest.css?.variables.length === 0) {
            continue;
        }

        manifest.push(componentManifest);
    }

    return manifest;
}
