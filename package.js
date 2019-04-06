Package.describe({
    name: 'inkline:inkline',
    version: "1.10.2",
    summary: "Inkline is a modern UI/UX framework for Vue.js, designed for creating flawless content-rich responsive web applications",
    git: 'https://github.com/inkline/inkline.git',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('METEOR@1.0');
    api.addFiles([
        'dist/inkline.css',
        'dist/inkline.js'
    ]);
});