const path = require('path');
const fs = require('fs');
const packageJSON = require('../package.json');

const bowerFile = path.resolve(__dirname, '..', 'bower.json');

fs.readFile(bowerFile, 'utf8', (err, data) => {
    if (err) { return console.log(err); }

    const result = data.replace(/"version": ".+"/g, `"version": "${packageJSON.version}"`);

    fs.writeFile(bowerFile, result, 'utf8', (err) => {
        if (err) { return console.log(err); }
    });
});
