import fs from 'fs';
import path from 'path';
import glob from 'glob';
import {
    parseBlocks,
    parseSassOptions,
    Manifest,
    mapBlocksToEvents,
    mapBlocksToProps,
    mapBlocksToVariables,
    mapSourceToSlots,
    parseCssVariables,
    mapVariantsToVariables
} from './manifest/index';

const manifestFileName = 'manifest.ts';

function stringifyObject(obj: any) {
    return JSON.stringify(obj, null, 4);
}

function readSyncIfExists(filePath: string) {
    return fs.existsSync(filePath) ? fs.readFileSync(filePath).toString() : '';
}

glob(
    path.resolve(__dirname, '..', 'src', 'components', '**', manifestFileName),
    async (error, files) => {
        if (error) {
            console.error(error);
            throw error;
        }

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

                console.log(`- Generating manifest for ${componentName}`);

                const componentBlocks = parseBlocks(componentSource);
                const props = mapBlocksToProps(componentBlocks);
                const events = mapBlocksToEvents(componentBlocks);
                const slots = mapSourceToSlots(componentSource);

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
                        selector: '',
                        variables: []
                        // selector: cssSelector,
                        // variables: cssVariables
                    }
                };

                const objectString = stringifyObject(manifest);

                fs.writeFileSync(
                    manifestFilePath,
                    `export const manifest = ${objectString};\n\nexport default manifest;\n`
                );
            } catch (error) {
                console.error(`Error occured for ${manifestFilePath}`);
                console.error(error);
            }
        });
    }
);
