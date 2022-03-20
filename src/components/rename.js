const glob = require('glob');
const shell = require("shelljs");

glob('**/script.ts', (err, files) => {
    files.forEach((file) => {
        shell.mv(file, file.replace('script.ts', 'index.tsx'));
    });
});
