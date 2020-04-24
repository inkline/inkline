const glob = require('glob');
const path = require('path');
const fs = require('fs');
const child_process = require('child_process');

const folders = glob.sync('*')

folders.forEach((folder) => {
    if (folder.indexOf('.spec.js') === -1) { return }

    child_process.execSync(`git mv ${folder} I${folder}`)

    // fs.renameSync(folder, folder.replace(/^I/, ''))
});
