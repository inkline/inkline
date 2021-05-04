import fs from 'fs';
import path from 'path';
import glob from 'glob';
import chalk from 'chalk';
import { parse as parseSvg } from 'svgson';
import { iconPacks } from './config';
import { toCamelCase } from './helpers';
iconPacks.forEach(async (iconPack) => {
    const hasMultipleVariants = iconPack.variants.length > 1;
    let iconPackFileCount = 0;
    for (const iconPackVariant of iconPack.variants) {
        const iconPackVariantDirPath = path.resolve(__dirname, '..', 'node_modules', iconPackVariant.path);
        const iconPackVariantOutputPath = hasMultipleVariants
            ? path.resolve(__dirname, '..', 'src', 'packs', iconPack.name, `${iconPackVariant.name}`)
            : path.resolve(__dirname, '..', 'src', 'packs', `${iconPack.name}`);
        const iconPackVariantFiles = glob.sync(path.join(iconPackVariantDirPath, iconPackVariant.pattern || '**/*.svg'));
        const iconPackVariantIcons = [];
        for (const iconPath of iconPackVariantFiles) {
            const iconBasename = path.basename(iconPath).replace('.svg', '');
            const iconBasedir = path.dirname(iconPath);
            const iconName = toCamelCase(iconPackVariant.icon(iconBasename, iconBasedir));
            let iconMarkup = fs.readFileSync(iconPath).toString();
            const iconSvgson = await parseSvg(iconMarkup);
            if (iconPackVariant.fill && !iconMarkup.includes('currentColor')) {
                iconSvgson.attributes.fill = 'currentColor';
                iconMarkup = iconMarkup.replace('<svg', '<svg fill="currentColor"');
            }
            const iconJsOutput = JSON.stringify(iconSvgson).replace(/"([^(")"-:]+)":/g, "$1:");
            const iconScssOutput = iconMarkup.replace(/\n/g, '').replace(/> +</g, '><');
            if (!iconPackVariantIcons.find((icon) => icon.name === iconName)) {
                iconPackVariantIcons.push({
                    name: iconName,
                    js: iconJsOutput,
                    scss: iconScssOutput
                });
            }
        }
        const iconPackVariantTsOutput = `/**
 * ${iconPackVariant.title || iconPack.title}
 *
 * @name ${iconPack.name}${iconPackVariant.name ? `/${iconPackVariant.name}` : ''}
 * @url ${iconPack.url}
 * @version ${iconPack.version}
 * @generated
 */

import { Svg } from '${hasMultipleVariants ? '../../' : '../'}types';

${iconPackVariantIcons.map((icon) => `export const ${icon.name}: Svg = ${icon.js};`).join('\n')}
`;
        const iconPackVariantScssOutput = `//
// ${iconPackVariant.title || iconPack.title}
//
// @name ${iconPack.name}${iconPackVariant.name ? `/${iconPackVariant.name}` : ''}
// @url ${iconPack.url}
// @version ${iconPack.version}
// @generated
//

${iconPackVariantIcons.map((icon) => `$${icon.name}: '${icon.scss}' !default;`).join('\n')}
`;
        fs.mkdirSync(path.dirname(`${iconPackVariantOutputPath}.ts`), { recursive: true });
        fs.writeFileSync(`${iconPackVariantOutputPath}.ts`, iconPackVariantTsOutput);
        fs.writeFileSync(`${iconPackVariantOutputPath}.scss`, iconPackVariantScssOutput);
        if (hasMultipleVariants) {
            console.log(`Generated ${chalk.blue.bold(`${iconPack.name}/${iconPackVariant.name}`)} (${iconPackVariantFiles.length} icons)`);
        }
        iconPackFileCount += iconPackVariantFiles.length;
    }
    if (hasMultipleVariants) {
        const iconPackOutputPath = path.resolve(__dirname, '..', 'src', 'packs', iconPack.name, `index`);
        const iconPackTsOutput = `/**
 * ${iconPack.title}
 *
 * @name ${iconPack.name}
 * @url ${iconPack.url}
 * @version ${iconPack.version}
 * @generated
 */

${iconPack.variants.map((variant) => `export * from './${variant.name}';`).join('\n')}
`;
        const iconPackScssOutput = `//
// ${iconPack.title}
//
// @name ${iconPack.name}
// @url ${iconPack.url}
// @version ${iconPack.version}
// @generated
//

${iconPack.variants.map((variant) => `@import '${variant.name}';`).join('\n')}
`;
        fs.writeFileSync(`${iconPackOutputPath}.ts`, iconPackTsOutput);
        fs.writeFileSync(`${iconPackOutputPath}.scss`, iconPackScssOutput);
    }
    console.log(`Generated ${chalk.blue.bold(`${iconPack.name}`)} (${iconPackFileCount} icons)`);
});
const indexOutputPath = path.resolve(__dirname, '..', 'src', 'packs', 'index');
const indexJsOutput = `/**
 * Inkline Icons
 *
 * @generated
 */

${iconPacks.map((iconPack) => `export * from './${iconPack.name}';`).join('\n')}
`;
const indexScssOutput = `//
// Inkline Icons
//
// @generated
//

${iconPacks.map((iconPack) => `@import '${iconPack.name}';`).join('\n')}
`;
fs.writeFileSync(`${indexOutputPath}.ts`, indexJsOutput);
fs.writeFileSync(`${indexOutputPath}.scss`, indexScssOutput);
//# sourceMappingURL=generate.js.map