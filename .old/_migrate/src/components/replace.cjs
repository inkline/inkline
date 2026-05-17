const fs = require('fs');
const glob = require('fast-glob');

const dirs = glob.sync('**/*.vue', {
    cwd: __dirname,
});

console.log(dirs);

dirs.forEach((dir) => {
    console.log(dir);
    fs.rename(`${__dirname}/${dir}`, `${__dirname}/${dir.replace('I', '')}`, (err) => {});
});
