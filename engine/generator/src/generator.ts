import { defineGenerator } from '@inkline/core';
import type { OutputFile, GeneratorOptions } from '@inkline/core';
import { applyConfigurationFiles } from './imports';
import {
    createNormalizeCSS,
    createTailwindCSSTheme,
    createTailwindCSSUtilities
} from './integrations';
import { consume, consumeVariants } from './consume';

const defaultGeneratorOptions: GeneratorOptions = {
    addons: ['layers', 'normalizecss'],
    layers: ['theme', 'base', 'components', 'utilities'],
    typescript: true,
    variants: true
};

export const generator = defineGenerator<Partial<GeneratorOptions> | undefined>(
    (context, userOptions) => {
        const options: GeneratorOptions = {
            ...defaultGeneratorOptions,
            ...userOptions
        };
        const outputFiles: OutputFile[] = [];
        const indexFileLines: string[] = [];

        const layersEnabled = options?.addons?.includes('layers');
        const tailwindCssEnabled = options?.addons?.includes('tailwindcss');
        const tailwindCssOptions = options?.tailwindcss;
        const normalizeCssEnabled = options?.addons?.includes('normalizecss');

        if (layersEnabled || tailwindCssEnabled) {
            indexFileLines.push(`@layer ${options?.layers?.join(', ')};`);
        }

        if (normalizeCssEnabled) {
            outputFiles.push({
                path: 'normalize.css',
                content: createNormalizeCSS()
            });
            indexFileLines.push(`@import "./normalize.css"${layersEnabled ? ' layer(base)' : ''};`);
        }

        if (tailwindCssEnabled) {
            outputFiles.push({
                path: 'tailwind/theme.css',
                content: createTailwindCSSTheme(context, tailwindCssOptions)
            });
            outputFiles.push({
                path: 'tailwind/utilities.css',
                content: createTailwindCSSUtilities()
            });

            indexFileLines.push('@import "./tailwind/theme.css" layer(theme);');
            indexFileLines.push('@import "./tailwind/utilities.css" layer(utilities);');
        }

        indexFileLines.push(
            ...Object.values(context.themes).map(
                (theme) => `@import "./${theme.__name}/index.css";`
            )
        );

        const themeFiles: OutputFile[] = Object.values(context.themes).flatMap((theme) => {
            const { variables, variants, selectors, utilities, ...common } = theme;
            const themeOutputFiles: OutputFile[] = [];
            const themeIndexFileLines: string[] = [];

            if (Object.keys(variables).length) {
                themeIndexFileLines.push(
                    `@import "./variables.css"${layersEnabled ? ' layer(theme)' : ''};`
                );
                themeOutputFiles.push({
                    path: `${theme.__name}/variables.css`,
                    content: consume({ variables, ...common })
                });
            }

            if (Object.keys(selectors).length) {
                themeIndexFileLines.push(
                    `@import "./selectors.css"${layersEnabled ? ' layer(components)' : ''};`
                );
                themeOutputFiles.push({
                    path: `${theme.__name}/selectors.css`,
                    content: consume({ selectors, ...common })
                });
            }

            if (Object.keys(utilities).length) {
                themeIndexFileLines.push(
                    `@import "./utilities.css"${layersEnabled ? ' layer(utilities)' : ''};`
                );
                themeOutputFiles.push({
                    path: `${theme.__name}/utilities.css`,
                    content: consume({ utilities, ...common })
                });
            }

            themeOutputFiles.push({
                path: `${theme.__name}/index.css`,
                content: themeIndexFileLines.join('\n')
            });

            return themeOutputFiles;
        });

        if (options.variants && context.themes.default) {
            outputFiles.push({
                path: `variants.${options.typescript ? 'ts' : 'js'}`,
                content: consumeVariants(context.themes.default.variants, {
                    typescript: options.typescript,
                    tailwindcss: tailwindCssEnabled
                })
            });

            outputFiles.push({
                path: `index.${options.typescript ? 'ts' : 'js'}`,
                content: "export * from './variants';\n"
            });
        }

        const indexFile: OutputFile = {
            path: 'index.css',
            content: indexFileLines.join('\n')
        };

        outputFiles.push(...themeFiles, indexFile);

        applyConfigurationFiles(outputFiles, context.files);

        return outputFiles;
    }
);
