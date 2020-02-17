/* eslint-disable */
const packageJSON = require('./package.json');

Package.describe({
    name: "inkline:inkline",
    version: packageJSON.version,
    summary: packageJSON.description,
    git: packageJSON.repository.url,
    documentation: "README.md"
});

Package.onUse(function(api) {
    api.versionsFrom("METEOR@1.0");
    api.addFiles(["dist/inkline.css", "dist/inkline.js"]);
});
