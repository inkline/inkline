const fs = require('fs');
const path = require('path');
const glob = require('glob');
const jsdoc = require('jsdoc-api');

const categoryByKind = {
    member: 'props',
    slot: 'slots',
    event: 'events'
};

glob(path.resolve(__dirname, '..', 'src', 'components', '**', 'script.js'), (error, files) => {
    if (error) {
        console.error(error);
        throw error;
    }

    files.forEach((fileName) => {
        const source = fs.readFileSync(fileName);
        const target = fileName.replace('script.js', 'manifest.json');
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
                    defaultvalue,
                    tags
                };
            })
            .reduce((acc, x) => {
                acc[x.category] = acc[x.category] || [];
                acc[x.category].push(x);

                return acc;
            }, {});

        fs.writeFileSync(target, JSON.stringify(doc, null, 4));
    });
});

