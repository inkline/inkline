/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import {Manifest, ManifestCSSVariable, ManifestEntry, ManifestProp} from './types';
import { Block, Spec } from 'comment-parser';

const stringifyObject = require('stringify-object');
const { parse: parseJs } = require('comment-parser');
const { parse: praseSass } = require('sassdoc');

const manifestFileName = 'manifest.js';

// Map slot blocks to manifest slots entries
const getSlots = (blocks: Block[]): ManifestEntry[] => blocks
    .filter(({ tags }) => tags.find(({ tag, name }) => tag === 'kind' && name === 'slot'))
    .map(({ description, tags }) => {
        const { name } = tags.find(({ tag }) => tag === 'name') as Spec;

        return {
            description,
            name
        };
    });

const getEvents = (blocks: Block[]): ManifestEntry[] => blocks
    .filter(({ tags = [] }) => tags.find(({ tag }) => tag === 'event'))
    .map(({ description, tags }) => {
        const { name } = tags.find(({ tag }) => tag === 'event') as Spec;

        return {
            description,
            name
        };
    });

const getProps = (blocks: Block[]): ManifestProp[] => blocks
    .filter(({ tags }) => !tags.find(({ tag }) => tag === 'kind' || tag === 'event'))
    .map(({ description, tags }) => {
        const { name } = tags.find(({ tag }) => tag === 'name') as Spec;
        const { name: defaultValue } = tags.find(({ tag }) => tag === 'default') as Spec;
        const typeTag = tags.find(({ tag }) => tag === 'type') as Spec;
        const type = `${typeTag.name}${typeTag.description}`.split(/ *\| */);

        return {
            name,
            type,
            default: defaultValue,
            description
        };
    });

const getVariables = (blocks: Array<{ description: string; group: string; parameter: any }>): ManifestCSSVariable[] => blocks
    .map((block) => {
        // console.log(block);
        const parts = block.description.trim()
            .split('\n')
            .map((part) => part.trim());
        const description = parts.filter((part) => !part.startsWith('@')).join('\n');
        const tags = parts.filter((part) => part.startsWith('@')).map((part) => {
            const tagParts = part.match(/@(\w+) (.+)/);

            return {
                tag: tagParts![1].replace('@', ''),
                name: tagParts![2]
            };
        });

        const { name } = tags.find(({ tag }) => tag === 'name') as Spec;
        const { name: type } = tags.find(({ tag }) => tag === 'type') as Spec;

        return {
            name,
            type,
            description
        };
    });

glob(path.resolve(__dirname, '..', 'src', 'components', 'IAlert', manifestFileName), (error, files) => {
    if (error) {
        console.error(error);
        throw error;
    }

    files.forEach(async (manifestFilePath) => {
        const scriptFilePath = manifestFilePath.replace(manifestFileName, 'script.ts');
        const sassFilePath = manifestFilePath.replace(manifestFileName, '');
        const componentName = manifestFilePath
            .replace(`${path.resolve(__dirname, '..', 'src', 'components')}/`, '')
            .replace('/manifest.js', '');

        console.log(`- Generating manifest for ${componentName}`);

        const manifest: Manifest = require(manifestFilePath);

        // Read script.js and update manifest.json
        //
        // const source = fs.readFileSync(scriptFilePath).toString();
        // const jsBlocks: Block[] = parseJs(source);
        //
        // const sassBlocks = await praseSass(sassFilePath);
        //
        // const slots = getSlots(jsBlocks);
        // const events = getEvents(jsBlocks);
        // const props = getProps(jsBlocks);
        // const variables = getVariables(sassBlocks);
        //
        // manifest.slots = slots;
        // manifest.events = events;
        // manifest.props = props;
        // manifest.css.variables = variables;

        const objectString = stringifyObject(manifest);

        console.log(parseJs(`////
/// This is a test
/// @param test
////
`, {
            markers: {
                start: '////',
                nostart: '// ',
                delim: '///',
                end: '////'
            }
        }));

        // console.log(objectString);
        // @TODO Backwards compatibility with manifest-sass
        // fs.writeFileSync(manifestFilePath, `export const manifest = ${objectString};\n\nexport default manifest;\n`);
    });
});
