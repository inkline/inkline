Package.describe({
    name: 'inkline:inkline',
    version: "0.0.7",
    summary: "Inkline is a UI/UX framework designed for creating flawless responsive websites, inspired by Apple.",
    git: 'https://github.com/inkline/inkline.git',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('METEOR@1.0');
    api.addFiles([
        'dist/css/inkline.css',
        'dist/js/inkline.js'
    ]);
});
