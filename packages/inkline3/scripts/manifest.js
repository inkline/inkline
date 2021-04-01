const fs = require('fs');
const path = require('path');
const glob = require('glob');
const jsdoc = require('jsdoc-api');

const categoryByKind = {
    member: 'props',
    slot: 'slots',
    event: 'events'
};

glob(path.resolve(__dirname, '..', 'src', 'components', '**', 'manifest.json'), (error, files) => {
    if (error) {
        console.error(error);
        throw error;
    }

    files.forEach((fileName) => {
        let manifest = require(fileName);

        // Read script.js and update manifest.json
        //
        const source = fs.readFileSync(fileName.replace('manifest.json', 'script.js'));
        const doc = jsdoc.explainSync({ source })
            .filter((x) => !x.undocumented && ['member', 'slot', 'event'].includes(x.kind))
            .map(({ name, description, type, kind, defaultvalue, memberof, tags }) => {
                const category = categoryByKind[kind];

                type = (type || { names: [] }).names;

                return {
                    name,
                    description,
                    type,
                    category,
                    default: defaultvalue,
                    tags
                };
            })
            .reduce((acc, x) => {
                const category = x.category;

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

        fs.writeFileSync(fileName, JSON.stringify(manifest, null, 4) + '\n');
    });
});

