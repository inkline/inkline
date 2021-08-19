/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs';
import path from 'path';
import glob from 'glob';

const jsdoc = require('jsdoc-api');
const stringifyObject = require('stringify-object');

export interface JSDocMetadataBase {
    name: string;
    description: string;
    type: { names: any };
    tags: string[];
}

export interface JSDocMetadata extends JSDocMetadataBase {
    kind: string;
    defaultvalue: any;
    memberof: string;
    undocumented?: boolean;
}

export interface JSDocMetadataProcessed extends JSDocMetadataBase {
    category: string;
    default: string;
    tags: string[]
}


const categoryByKind: {
    [key: string]: string;
} = {
    member: 'props',
    slot: 'slots',
    event: 'events'
};

glob(path.resolve(__dirname, '..', 'src', 'components', '**', 'manifest.js'), (error, files) => {
    if (error) {
        console.error(error);
        throw error;
    }

    files.forEach((fileName) => {
        let manifest = require(fileName);

        // Read script.js and update manifest.json
        //
        const source = fs.readFileSync(fileName.replace('manifest.js', 'script.ts'));
        const doc = (jsdoc.explainSync({ source }) as JSDocMetadata[])
            .filter((x) => !x.undocumented && ['member', 'slot', 'event'].includes(x.kind))
            .map(({ name, description, type: rawType, kind, defaultvalue, tags }): JSDocMetadataProcessed => {
                const category = categoryByKind[kind];
                const type = (rawType || { names: [] }).names;

                return {
                    name,
                    description,
                    type,
                    category,
                    default: defaultvalue,
                    tags
                };
            })
            .reduce((acc: { [key: string]: JSDocMetadataProcessed[] }, x) => {
                const category: string = x.category as string;

                // @ts-ignore
                delete x.category;

                acc[category] = acc[category] || [];
                acc[category].push(x);

                return acc;
            }, {});

        // Update manifest
        //
        manifest = {
            ...manifest,
            ...doc
        };

        const objectString = stringifyObject(manifest, {
            filter: (obj: any, prop: string) => typeof obj[prop] !== 'undefined'
        });

        console.log(objectString);

        // @TODO Backwards compatibility with manifest-sass
        // fs.writeFileSync(fileName, `module.exports = ${objectString};\n`);
    });
});

