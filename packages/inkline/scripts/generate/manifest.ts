import fs from 'fs';
import path from 'path';
import glob from 'fast-glob';
import prettier from 'prettier';
import sass from 'sass';
import type { Manifest, ManifestEntry } from './manifest/index';
import {
    mapDefinedCssVariablesToUsedCssVariables,
    parseDefinedCssVariables,
    parseBlocks,
    mapBlocksToEvents,
    mapBlocksToProps,
    mapSourceToSlots,
    parseCssSelector,
    parseUsedCssVariables
} from './manifest/index';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import prettierConfig from '../../.prettierrc';

const rootDir = path.resolve(__dirname, '..', '..');
const srcDir = path.resolve(rootDir, 'src');
const cssVariablesDir = path.resolve(srcDir, 'css', 'variables');
const componentsCssVariablesDir = path.resolve(cssVariablesDir, 'components');

function stringifyObject(obj: any) {
    return JSON.stringify(obj, null, 4);
}

function readSyncIfExists(filePaths: string | string[]) {
    const firstExistingFilePath = (Array.isArray(filePaths) ? filePaths : [filePaths]).find(
        (filePath) => fs.existsSync(filePath)
    );

    if (!firstExistingFilePath) {
        return '';
    }

    return fs.readFileSync(firstExistingFilePath).toString();
}

const manifestFileName = 'manifest.ts';

const manifestEntries: Array<{
    componentName: string;
    manifestFilePath: string;
    manifest: Manifest;
    map?: {
        component: string;
        props?: { exclude?: string[] };
        events?: { exclude?: string[] };
        slots?: { exclude?: string[] };
    };
}> = [];

(async function () {
    const files = await glob(path.resolve(srcDir, 'components', '**', manifestFileName));

    for (const manifestFilePath of files) {
        try {
            const componentDirPath = path.dirname(manifestFilePath);
            const cssDirPath = path.resolve(componentDirPath, 'css');
            const componentName = path.basename(componentDirPath);

            const mapSource = readSyncIfExists(path.resolve(componentDirPath, `manifest.map.json`));
            const componentSource = readSyncIfExists([
                path.resolve(componentDirPath, `${componentName}.vue`),
                path.resolve(componentDirPath, `${componentName}.ts`)
            ]);
            const componentScssSourceFilePath = path.resolve(cssDirPath, '_component.scss');
            const { css: componentCssSource } = fs.existsSync(componentScssSourceFilePath)
                ? sass.compile(componentScssSourceFilePath)
                : { css: '' };
            const cssSelector = parseCssSelector(componentCssSource);
            const componentVariablesScssFilePath = path.resolve(
                componentsCssVariablesDir,
                `${cssSelector.slice(1)}.scss`
            );
            const { css: componentVariablesCssSource } = fs.existsSync(
                componentVariablesScssFilePath
            )
                ? sass.compile(componentVariablesScssFilePath)
                : { css: '' };

            console.log(`- Generating manifest for ${componentName}`);

            const componentBlocks = parseBlocks(componentSource);
            const props = mapBlocksToProps(componentBlocks);
            const events = mapBlocksToEvents(componentBlocks);
            const slots = mapSourceToSlots(componentSource);
            const usedCssVariables = parseUsedCssVariables(componentCssSource);
            const definedCssVariables = parseDefinedCssVariables(componentVariablesCssSource);
            const cssVariables = mapDefinedCssVariablesToUsedCssVariables(
                definedCssVariables,
                usedCssVariables
            );

            const manifest: Manifest = {
                name: componentName,
                props,
                events,
                slots,
                css: {
                    selector: cssSelector,
                    variables: cssVariables
                }
            };

            manifestEntries.push({
                componentName,
                manifestFilePath,
                manifest,
                map: mapSource ? JSON.parse(mapSource) : undefined
            });
        } catch (error) {
            console.error(`Parse error occured for ${manifestFilePath}`);
            console.error(error);
        }
    }

    // Merge mapped manifest entries
    manifestEntries
        .filter(({ map }) => map)
        .forEach(({ manifest, map }) => {
            const referenceEntry = manifestEntries.find(
                ({ componentName }) => componentName === map?.component
            )!;
            const referenceManifest = referenceEntry.manifest;

            ['props', 'events', 'slots'].forEach((key) => {
                const excluded =
                    (map as Record<string, { exclude?: string[] }>)[key]?.exclude || [];
                (manifest as unknown as Record<string, ManifestEntry[]>)[key] = [
                    ...(manifest as unknown as Record<string, ManifestEntry[]>)[key],
                    ...((referenceManifest as unknown as Record<string, ManifestEntry[]>)[key] ||
                        [])
                ].filter((item, index, self) => {
                    return (
                        !excluded.includes(item.name) &&
                        self.findIndex(({ name }) => name === item.name) === index
                    );
                });
            });

            manifest.css.selector = manifest.css.selector || referenceManifest.css.selector;
            manifest.css.variables = [
                ...manifest.css.variables,
                ...(referenceManifest.css.variables || [])
            ];
        });

    for (const { manifestFilePath, manifest } of manifestEntries) {
        try {
            const objectString = stringifyObject(manifest);
            const exportObjectString = await prettier.format(
                `import type { ComponentManifest } from '@inkline/inkline/types';\n\nexport const manifest: ComponentManifest = ${objectString};\n\nexport default manifest;\n`,
                { parser: 'typescript', ...prettierConfig }
            );

            fs.writeFileSync(manifestFilePath, exportObjectString);
        } catch (error) {
            console.error(`Write error occured for ${manifestFilePath}`);
            console.error(error);
        }
    }
})();
