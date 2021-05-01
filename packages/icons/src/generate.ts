import fs from 'fs';
import path from 'path';
import glob from 'glob';
import { parse as parseSvg } from 'svgson';
import { iconPacks } from './config';

const toCamelCase = (string: string) => string.replace(/[-_]([a-z0-9])/g, (match, p) => p.toUpperCase());

iconPacks.forEach(async (iconPack) => {
    const hasMultipleVariants = iconPack.variants.length > 1;

    for (const iconPackVariant of iconPack.variants) {
        const variantDirPath = path.resolve(__dirname, '..', 'node_modules', iconPackVariant.path);
        const variantOutputPath = hasMultipleVariants
            ? path.resolve(__dirname, '..', 'src', 'packs', iconPack.name, `${iconPackVariant.name}.ts`)
            : path.resolve(__dirname, '..', 'src', 'packs', `${iconPack.name}.ts`);
        const files = glob.sync(path.join(variantDirPath, iconPackVariant.pattern || '*.svg'));
        const variantIcons: {
            name: string;
            js: string;
            scss: string;
        }[] = [];

        for (const file of files) {
            const basename = path.basename(file).replace('.svg', '');
            const basedir = path.dirname(file);
            const name = toCamelCase(iconPackVariant.icon(basename, basedir));

            const markup = fs.readFileSync(file).toString();
            const svg = await parseSvg(markup);

            const jsOutput = JSON.stringify(svg).replace(/\"([^(\")"-:]+)\":/g,"$1:");
            const scssOutput = markup.replace(/\n/, '');

            if (!variantIcons.find((icon) => icon.name === name)) {
                variantIcons.push({
                    name,
                    js: jsOutput,
                    scss: scssOutput
                });
            }
        }

        const variantOutput = `/**
 * ${iconPackVariant.title || iconPack.title}
 *
 * @name ${iconPack.name}${iconPackVariant.name ? `/${iconPackVariant.name}` : ''}
 * @url ${iconPack.url}
 * @version ${iconPack.version}
 * @generated
 */

import { Svg } from '${hasMultipleVariants ? '../../' : '../'}types';

${variantIcons.map((icon) => `export const ${icon.name}: Svg = ${icon.js};`).join('\n')}
`;

        fs.mkdirSync(path.dirname(variantOutputPath), { recursive: true });
        fs.writeFileSync(variantOutputPath, variantOutput);
    }

    if (hasMultipleVariants) {
        const outputPath = path.resolve(__dirname, '..', 'src', 'packs', iconPack.name, `index.ts`);
        const output = `/**
 * ${iconPack.title}
 *
 * @name ${iconPack.name}
 * @url ${iconPack.url}
 * @version ${iconPack.version}
 * @generated
 */

${iconPack.variants.map((variant) => `export * from './${variant.name}';`).join('\n')}
`;

        fs.writeFileSync(outputPath, output);
    }
});
