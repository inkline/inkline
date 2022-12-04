const glob = require('glob');
const path = require('path');
const fs = require('fs');

/**
 * Concatenate .html, .scss and .js files with same name into .vue SFC files
 */
glob.sync('src/stories/**/*.vue').forEach((file) => {
    const fileName = path.basename(file, '.vue');
    const dirName = path.dirname(file);
    const vueFile = path.join(dirName, fileName + '.vue');
    const htmlFile = path.join(dirName, fileName + '.html');
    const scssFile = path.join(dirName, fileName + '.scss');
    const jsFile = path.join(dirName, fileName + '.js');

    const html = fs.existsSync(htmlFile) ? fs.readFileSync(htmlFile, 'utf8') : '';
    const scss = fs.existsSync(scssFile) ? fs.readFileSync(scssFile, 'utf8') : '';
    const js = fs.existsSync(jsFile) ? fs.readFileSync(jsFile, 'utf8') : '';

    const indentLines = (str) =>
        str
            .split('\n')
            .map((line) => `    ` + line)
            .join('\n');

    const vue = `${
        js
            ? `<script>
${indentLines(js)}
</script>`
            : ''
    }

${
    html
        ? `<template>
${indentLines(html)}
</template>`
        : ''
}

${
    scss
        ? `<style lang="scss">
${indentLines(scss)}
</style>`
        : ''
}
`;

    if (html || js || scss) {
        fs.writeFileSync(vueFile, vue);
    }
});
