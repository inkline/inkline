/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import {
    parseBlocks,
    parseSassOptions,
    ContextBlock,
    Manifest,
    mapBlocksToEvents,
    mapBlocksToProps,
    mapBlocksToSlots,
    mapBlocksToVariables,
    mapBlocksToVariants
} from './manifest/index';

const stringifyObject = require('stringify-object');
const manifestFileName = 'manifest.js';

glob(path.resolve(__dirname, '..', 'src', 'components', '**', manifestFileName), (error, files) => {
    if (error) {
        console.error(error);
        throw error;
    }

    files.forEach(async (manifestFilePath) => {
        try {
            const scriptFilePath = manifestFilePath.replace(manifestFileName, 'script.ts');
            const sassVariablesFilePath = manifestFilePath.replace(
                manifestFileName,
                path.join('css', '_variables.scss')
            );
            const sassColorsFilePath = manifestFilePath.replace(
                manifestFileName,
                path.join('css', '_colors.scss')
            );
            const sassSizesFilePath = manifestFilePath.replace(
                manifestFileName,
                path.join('css', '_sizes.scss')
            );
            const componentName = manifestFilePath
                .replace(`${path.resolve(__dirname, '..', 'src', 'components')}/`, '')
                .replace('/manifest.js', '');

            console.log(`- Generating manifest for ${componentName}`);

            const manifest: Manifest = require(manifestFilePath).manifest;

            // Read script.js and update manifest.json

            const jsBlocks: ContextBlock[] = parseBlocks(scriptFilePath);
            const sassVariablesBlocks: ContextBlock[] = parseBlocks(
                sassVariablesFilePath,
                parseSassOptions
            );
            const sassColorsBlocks: ContextBlock[] = parseBlocks(
                sassColorsFilePath,
                parseSassOptions
            );
            const sassSizesBlocks: ContextBlock[] = parseBlocks(
                sassSizesFilePath,
                parseSassOptions
            );

            const slots = mapBlocksToSlots(jsBlocks);
            const events = mapBlocksToEvents(jsBlocks);
            const props = mapBlocksToProps(jsBlocks);
            const variables = mapBlocksToVariables(sassVariablesBlocks);
            const colorVariants = mapBlocksToVariants(sassColorsBlocks);
            const sizeVariants = mapBlocksToVariants(sassSizesBlocks);

            manifest.slots = slots;
            manifest.events = events;
            manifest.props = props;

            manifest.css = manifest.css || {};
            manifest.css.variables = variables;
            manifest.css.variants = [...colorVariants, ...sizeVariants];

            const objectString = stringifyObject(manifest, { indent: '    ' });

            // @TODO Backwards compatibility with manifest-sass
            fs.writeFileSync(
                manifestFilePath,
                `export const manifest = ${objectString};\n\nexport default manifest;\n`
            );
        } catch (error) {
            console.error(`Error occured for ${manifestFilePath}`);
            console.error(error);
        }
    });
});
