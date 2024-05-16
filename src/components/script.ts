import glob from 'fast-glob';
import * as fs from 'fs';
import prettier from 'prettier';

const componentCssFiles = glob.sync('src/components/**/_component.scss');

(async () => {
    for (const cssFilePath of componentCssFiles) {
        console.log(cssFilePath);

        const cssFileContents = fs.readFileSync(cssFilePath, 'utf-8');

        let modifiedContents = cssFileContents
            .trim()
            .split('\n')
            .filter((line) => !line.startsWith('@layer components {'));
        if (cssFileContents.includes('@layer components')) {
            const bracketIdx = modifiedContents.findIndex((line) => line === '}');
            modifiedContents.splice(bracketIdx, 1);
        }
        modifiedContents = modifiedContents.join('\n');

        const result = await prettier.format(modifiedContents, {
            parser: 'scss'
        });

        fs.writeFileSync(cssFilePath, result);
    }
})();
