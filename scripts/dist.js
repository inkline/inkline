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
 * Inkline Validation
 */

// rm ./dist/InklineValidation.common.js
// rm ./dist/InklineValidation.common.js.map
// rm ./dist/InklineValidation.umd.min.js
// rm ./dist/InklineValidation.umd.min.js.map
//
[
    path.resolve(DIST_PATH, 'InklineValidation.common.js'),
    path.resolve(DIST_PATH, 'InklineValidation.common.js.map'),
    path.resolve(DIST_PATH, 'InklineValidation.umd.min.js'),
    path.resolve(DIST_PATH, 'InklineValidation.umd.min.js.map'),
].forEach(rm);

// mv ./dist/InklineValidation.umd.js dist/validation.js
// mv ./dist/InklineValidation.umd.js.map dist/validation.js.map
//
[
    { from: path.resolve(DIST_PATH, 'InklineValidation.umd.js'), to: path.resolve(DIST_PATH, 'validation.js') },
    { from: path.resolve(DIST_PATH, 'InklineValidation.umd.js.map'), to: path.resolve(DIST_PATH, 'validation.js.map') },
].forEach(mv);

// sed -i '' 's/InklineValidation.umd.js.map/validation.js.map/g' './dist/validation.js'
// sed -i '' 's/InklineValidation.umd.js/validation.js/g' './dist/validation.js.map'
//
[
    { search: /InklineValidation\.umd\.js\.map/g, replace: 'validation.js.map', file: path.resolve(DIST_PATH, 'validation.js') },
    { search: /InklineValidation\.umd\.js/g, replace: 'validation.js', file: path.resolve(DIST_PATH, 'validation.js.map') },
].forEach(sed);

/**
 * Save and exit
 */
execSync('git add ./dist/');
execSync('git commit -m "Generated dist folder."');

process.exit();
