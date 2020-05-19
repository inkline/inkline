/**
 * Validation
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
// rm ./dist/Validation.common.js
// rm ./dist/Validation.common.js.map
// rm ./dist/Validation.umd.min.js
// rm ./dist/Validation.umd.min.js.map
//
[
    path.resolve(DIST_PATH, 'demo.html'),
    path.resolve(DIST_PATH, 'Validation.common.js'),
    path.resolve(DIST_PATH, 'Validation.common.js.map'),
    path.resolve(DIST_PATH, 'Validation.umd.min.js'),
    path.resolve(DIST_PATH, 'Validation.umd.min.js.map'),
].forEach(rm);

// mv ./dist/Validation.umd.js dist/validation.js
// mv ./dist/Validation.umd.js.map dist/validation.js.map
// mv ./dist/Validation.css ./dist/validation.css
//
[
    { from: path.resolve(DIST_PATH, 'Validation.umd.js'), to: path.resolve(DIST_PATH, 'validation.js') },
    { from: path.resolve(DIST_PATH, 'Validation.umd.js.map'), to: path.resolve(DIST_PATH, 'validation.js.map') },
].forEach(mv);

// sed -i '' 's/Validation.umd.js.map/validation.js.map/g' './dist/validation.js'
// sed -i '' 's/Validation.umd.js/validation.js/g' './dist/validation.js.map'
//
[
    { search: /Validation\.umd\.js\.map/g, replace: 'validation.js.map', file: path.resolve(DIST_PATH, 'validation.js') },
    { search: /Validation\.umd\.js/g, replace: 'validation.js', file: path.resolve(DIST_PATH, 'validation.js.map') },
].forEach(sed);

/**
 * Save and exit
 */
try {
    execSync('git add ./dist/');
    execSync('git commit -m "Generated dist folder."');
    execSync('git push');
} catch (e) {
    console.log('Bundled files are the same. Nothing to commit.'); // eslint-disable-line no-console
}

console.log("Ready to publish!");

process.exit();
