/* eslint-disable */
const packageJSON = require('./package.json');

Package.describe({
    name: "inkline:validation",
    version: packageJSON.version,
    summary: packageJSON.description,
    git: packageJSON.repository.url,
    documentation: "README.md"
});

Package.onUse(function(api) {
    api.versionsFrom("METEOR@1.0");
    api.addFiles(["dist/validation.js"]);
});
