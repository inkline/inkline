import fs from 'fs';
import path from 'path';
import glob from 'glob';
import prettier from 'prettier';
import {
    parseBlocks,
    Manifest,
    mapBlocksToEvents,
    mapBlocksToProps,
    mapSourceToSlots,
    parseCssVariables,
    mapVariantsToVariables,
    parseCssSelector,
    ManifestEntry
} from './manifest/index';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import prettierConfig from '../../.prettierrc';

const manifestFileName = 'manifest.ts';

function stringifyObject(obj: any) {
    return JSON.stringify(obj, null, 4);
}

function readSyncIfExists(filePath: string) {
    return fs.existsSync(filePath) ? fs.readFileSync(filePath).toString() : '';
}

glob(
    path.resolve(__dirname, '..', '..', 'src', 'components', '*', manifestFileName),
    async (error, files) => {
        if (error) {
            console.error(error);
            throw error;
        }

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

        files.forEach((manifestFilePath) => {
            try {
                const componentDirPath = path.dirname(manifestFilePath);
                const componentName = path.basename(componentDirPath);
                const componentFilePath = path.resolve(componentDirPath, `${componentName}.vue`);
                const componentSource = readSyncIfExists(componentFilePath);
                const cssDirPath = path.resolve(componentDirPath, 'css');
                const componentCssFilePath = path.resolve(cssDirPath, '_component.scss');
                const componentCssSource = readSyncIfExists(componentCssFilePath);
                const colorsCssFilePath = path.resolve(cssDirPath, '_colors.scss');
                const colorsCssSource = readSyncIfExists(colorsCssFilePath);
                const sizesCssFilePath = path.resolve(cssDirPath, '_sizes.scss');
                const sizesCssSource = readSyncIfExists(sizesCssFilePath);
                const mapFilePath = path.resolve(componentDirPath, `manifest.map.json`);
                const mapSource = readSyncIfExists(mapFilePath);

                console.log(`- Generating manifest for ${componentName}`);

                const componentBlocks = parseBlocks(componentSource);
                const props = mapBlocksToProps(componentBlocks);
                const events = mapBlocksToEvents(componentBlocks);
                const slots = mapSourceToSlots(componentSource);

                const cssSelector = parseCssSelector(componentCssSource);
                const componentCssVariables = parseCssVariables(componentCssSource);
                const colorsCssVariables = parseCssVariables(colorsCssSource);
                const sizesCssVariables = parseCssVariables(sizesCssSource);

                const cssVariables = mapVariantsToVariables(componentCssVariables, [
                    colorsCssVariables,
                    sizesCssVariables
                ]);

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
        });

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
                        ...((referenceManifest as unknown as Record<string, ManifestEntry[]>)[
                            key
                        ] || [])
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

        manifestEntries.forEach(({ manifestFilePath, manifest }) => {
            try {
                const objectString = stringifyObject(manifest);
                const exportObjectString = prettier.format(
                    `import { ComponentManifest } from '@inkline/inkline/types';\n\nexport const manifest: ComponentManifest = ${objectString};\n\nexport default manifest;\n`,
                    { parser: 'typescript', ...prettierConfig }
                );

                fs.writeFileSync(manifestFilePath, exportObjectString);
            } catch (error) {
                console.error(`Write error occured for ${manifestFilePath}`);
                console.error(error);
            }
        });
    }
);
