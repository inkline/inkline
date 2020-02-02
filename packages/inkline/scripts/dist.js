/**
 * Inkline
 */
const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

const DIST_PATH = path.resolve(__dirname, '..', 'dist');

/**
 * Remove file found at {entry}
 *
 * @param entry
 */
const rm = (entry) => {
    console.log(`Removing ${path.basename(entry)}.`);

    try {
        fs.unlinkSync(entry);
    } catch(err) {
        console.error(err)
    }
};

/**
 * Move file from {entry.from} to {entry.to}
 *
 * @param entry
 */
const mv = (entry) => {
    console.log(`Renaming ${path.basename(entry.from)} to ${path.basename(entry.to)}.`);

    try {
        fs.renameSync(entry.from, entry.to)
    } catch(err) {
        console.error(err)
    }
};

/**
 * Replace {entry.search} with {entry.replace} in {entry.file}
 *
 * @param entry
 */
const sed = (entry) => {
    console.log(`Replacing ${entry.search} with ${entry.replace} in ${path.basename(entry.file)}.`);

    try {
        const data = fs.readFileSync(entry.file, { encoding: 'utf8' });
        const result = data.replace(entry.search, entry.replace);

        fs.writeFileSync(entry.file, result, { encoding: 'utf8' })
    } catch(err) {
        console.error(err)
    }
};

// rm ./dist/demo.html
// rm ./dist/Inkline.common.js
// rm ./dist/Inkline.common.js.map
// rm ./dist/Inkline.umd.min.js
// rm ./dist/Inkline.umd.min.js.map
//
[
    path.resolve(DIST_PATH, 'demo.html'),
    path.resolve(DIST_PATH, 'Inkline.common.js'),
    path.resolve(DIST_PATH, 'Inkline.common.js.map'),
    path.resolve(DIST_PATH, 'Inkline.umd.min.js'),
    path.resolve(DIST_PATH, 'Inkline.umd.min.js.map'),
].forEach(rm);

// mv ./dist/Inkline.umd.js dist/inkline.js
// mv ./dist/Inkline.umd.js.map dist/inkline.js.map
// mv ./dist/Inkline.css ./dist/inkline.css
//
[
    { from: path.resolve(DIST_PATH, 'Inkline.umd.js'), to: path.resolve(DIST_PATH, 'inkline.js') },
    { from: path.resolve(DIST_PATH, 'Inkline.umd.js.map'), to: path.resolve(DIST_PATH, 'inkline.js.map') },
    { from: path.resolve(DIST_PATH, 'Inkline.css'), to: path.resolve(DIST_PATH, 'inkline.css') }
].forEach(mv);

// sed -i '' 's/Inkline.umd.js.map/inkline.js.map/g' './dist/inkline.js'
// sed -i '' 's/Inkline.umd.js/inkline.js/g' './dist/inkline.js.map'
//
[
    { search: /Inkline\.umd\.js\.map/g, replace: 'inkline.js.map', file: path.resolve(DIST_PATH, 'inkline.js') },
    { search: /Inkline\.umd\.js/g, replace: 'inkline.js', file: path.resolve(DIST_PATH, 'inkline.js.map') },
].forEach(sed);

/**
 * Save and exit
 */
try {
    execSync('git add ./dist/');
    execSync('git commit -m "Generated dist folder."');
} catch (e) {
    console.log('Bundled files are the same. Nothing to commit.'); // eslint-disable-line no-console
}

/**
 * Copy README.md for publishing
 */
try {
    console.log('Copying README.md.'); // eslint-disable-line no-console

    fs.copyFileSync(path.resolve(__dirname, '..', '..', '..', 'README.md'), path.resolve(__dirname, '..', 'README.md'));
} catch (err) {
    console.error(err);
}

console.log("Ready to publish!");

process.exit();
