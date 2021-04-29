const fs = require('fs');
const path = require('path');
const glob = require('glob');
const svgson = require('svgson');

const package = require(path.resolve(__dirname, '..', 'package.json'));
const toCamelCase = (string) => string.replace(/[-_]([a-z0-9])/g, (match, p) => p.toUpperCase());
const icons = [
    {
        title: 'Bootstrap Icons',
        name: 'bootstrap',
        url: 'https://icons.getbootstrap.com',
        version: package.optionalDependencies['bootstrap-icons'],
        variants: [
            {
                path: 'bootstrap-icons/icons',
                icon: (basename) => `bi-${basename}`
            },
        ]
    },
    {
        title: 'CoreUI Icons',
        name: 'coreui',
        url: 'https://icons.coreui.io',
        version: package.optionalDependencies['@coreui/icons'],
        variants: [
            {
                title: 'CoreUI Brand Icons',
                name: 'brands',
                path: '@coreui/icons/svg/brand',
                icon: (basename) => basename
            },
            {
                title: 'CoreUI Flag Icons',
                name: 'flag',
                path: '@coreui/icons/svg/flag',
                icon: (basename) => basename
            },
            {
                title: 'CoreUI Linear Icons',
                name: 'linear',
                path: '@coreui/icons/svg/free',
                icon: (basename) => basename
            }
        ]
    },
    {
        title: 'CryptoCurrency Icons',
        name: 'cryptocurrency',
        url: 'http://cryptoicons.co',
        version: package.optionalDependencies['cryptocurrency-icons'],
        variants: [
            {
                title: 'CryptoCurrency Black Icons',
                name: 'black',
                path: 'cryptocurrency-icons/svg/black',
                icon: (basename) => `ccb-${basename.replace(/\$/g, '')}`
            },
            {
                title: 'CryptoCurrency Color Icons',
                name: 'color',
                path: 'cryptocurrency-icons/svg/color',
                icon: (basename) => `ccc-${basename.replace(/\$/g, '')}`
            },
            {
                title: 'CryptoCurrency Icon Icons',
                name: 'icon',
                path: 'cryptocurrency-icons/svg/icon',
                icon: (basename) => `cci-${basename.replace(/\$/g, '')}`
            },
            {
                title: 'CryptoCurrency White Icons',
                name: 'white',
                path: 'cryptocurrency-icons/svg/white',
                icon: (basename) => `ccw-${basename.replace(/\$/g, '')}`
            },
        ]
    },
    {
        title: 'FontAwesome Icons',
        name: 'fontawesome',
        url: 'https://fontawesome.com',
        version: package.optionalDependencies['@fortawesome/fontawesome-free'],
        variants: [
            {
                title: 'FontAwesome Brand Icons',
                name: 'brands',
                path: '@fortawesome/fontawesome-free/svgs/brands',
                icon: (basename) => `fab-${basename}`
            },
            {
                title: 'FontAwesome Regular Icons',
                name: 'regular',
                path: '@fortawesome/fontawesome-free/svgs/regular',
                icon: (basename) => `far-${basename}`
            },
            {
                title: 'FontAwesome Solid Icons',
                name: 'solid',
                path: '@fortawesome/fontawesome-free/svgs/solid',
                icon: (basename) => `fas-${basename}`
            }
        ]
    },
    {
        title: 'Flat Color Icons',
        name: 'flat-color',
        url: 'https://icons8.github.io/flat-color-icons/',
        version: package.optionalDependencies['flat-color-icons'],
        variants: [
            {
                path: 'flat-color-icons/svg',
                icon: (basename) => `fc-${basename}`
            }
        ]
    },
    {
        title: 'Flag Icons',
        name: 'flag',
        url: 'https://flagicons.lipis.dev',
        version: package.optionalDependencies['flag-icon-css'],
        variants: [
            {
                title: 'Flag Icons 4x3',
                name: '4x3',
                path: 'flag-icon-css/flags/4x3',
                icon: (basename) => `fi-${basename}`
            },
            {
                title: 'Flag Icons 1x1',
                name: '1x1',
                path: 'flag-icon-css/flags/1x1',
                icon: (basename) => `fis-${basename}`
            }
        ]
    },
    {
        title: 'Heroicons',
        name: 'heroicons',
        url: 'https://heroicons.com',
        version: package.optionalDependencies['heroicons'],
        variants: [
            {
                title: 'Heroicons Solid',
                name: 'solid',
                path: 'heroicons/solid',
                icon: (basename) => `his-${basename}`
            },
            {
                title: 'Heroicons Outline',
                name: 'outline',
                path: 'heroicons/outline',
                icon: (basename) => `hio-${basename}`
            }
        ]
    },
    {
        title: 'Inkline',
        name: 'inkline',
        url: 'https://inkline.io',
        version: package.optionalDependencies['inkline'],
        variants: [
            {
                path: '../src/assets/icons',
                import: '@inkline/inkline/src/assets/icons',
                icon: (basename) => `ink-${basename}`,
            }
        ]
    },
    {
        title: 'Ionicons',
        name: 'ionicons',
        url: 'https://ionicons.com',
        version: package.optionalDependencies['ionicons'],
        variants: [
            {
                path: 'ionicons/dist/svg',
                icon: (basename) => `ion-${basename}`,
            }
        ]
    },
    {
        title: 'Line Awesome',
        name: 'lineawesome',
        url: 'https://icons8.com/line-awesome',
        version: package.optionalDependencies['line-awesome'],
        variants: [
            {
                path: 'line-awesome/svg',
                icon: (basename) => `la-${basename}`,
            }
        ]
    },
    {
        title: 'Material Design Icons',
        name: 'material-design',
        url: 'https://fonts.google.com/icons',
        version: package.optionalDependencies['material-design-icons'],
        variants: [
            {
                path: 'material-design-icons',
                icon: (basename) => `mdi-${basename.replace(/^ic_/, '').replace(/px$/, '')}`,
                pattern: '**/production/*.svg'
            }
        ]
    },
    {
        title: 'Primer Octicons',
        name: 'octicons',
        url: 'https://primer.style/octicons',
        version: package.optionalDependencies['@primer/octicons'],
        variants: [
            {
                path: '@primer/octicons/build/svg',
                icon: (basename) => `oi-${basename}`
            }
        ]
    },
    {
        title: 'Pixelart Icons',
        name: 'pixelart',
        url: 'https://pixelarticons.com',
        version: package.optionalDependencies['pixelarticons'],
        variants: [
            {
                path: 'pixelarticons/svg',
                icon: (basename) => `px-${basename}`
            }
        ]
    },
    {
        title: 'Prime Icons',
        name: 'prime',
        url: 'http://primefaces.org/showcase/icons.xhtml',
        version: package.optionalDependencies['primeicons'],
        variants: [
            {
                path: 'primeicons/raw-svg',
                icon: (basename) => `pi-${basename}`
            }
        ]
    },
    {
        title: 'Remix Icon',
        name: 'remix',
        url: 'https://remixicon.com',
        version: package.optionalDependencies['remixicon'],
        variants: [
            {
                path: 'remixicon/icons',
                icon: (basename) => `ri-${basename}`
            }
        ]
    },
    {
        title: 'Simple Icons',
        name: 'simple',
        url: 'https://simpleicons.org',
        version: package.optionalDependencies['simple-icons'],
        variants: [
            {
                path: 'simple-icons/icons',
                icon: (basename) => `si-${basename}`
            }
        ]
    },
];

icons.forEach(async (iconPack) => {
    const hasMultipleVariants = iconPack.variants.length > 1;

    /**
     * Icon Pack Variants
     */

    for (const iconPackVariant of iconPack.variants) {
        const variantDirPath = iconPackVariant.fullPath || path.resolve(__dirname, '..', 'node_modules', iconPackVariant.path);
        const variantOutputPath = hasMultipleVariants
            ? path.resolve(__dirname, '..', 'src', 'icons', iconPack.name, `${iconPackVariant.name}.js`)
            : path.resolve(__dirname, '..', 'src', 'icons', `${iconPack.name}.js`);
        const files = glob.sync(path.join(variantDirPath, iconPackVariant.pattern || '*.svg'));

        const variantIcons = [];
        for (const file of files) {
            const basename = path.basename(file).replace('.svg', '');
            const basedir = path.dirname(file);

            const svg = await svgson.parse(fs.readFileSync(file).toString());
            const content = JSON.stringify(svg).replace(/\"([^(\")"-:]+)\":/g,"$1:");
            const name = toCamelCase(iconPackVariant.icon(basename, basedir));

            variantIcons.push({
                name,
                content
            });
        }

        const variantOutput = `/**
 * ${iconPackVariant.title || iconPack.title}
 *
 * @name ${iconPack.name}${iconPackVariant.name ? `/${iconPackVariant.name}` : ''}
 * @url ${iconPack.url}
 * @version ${iconPack.version || package.version}
 * @generated
 */

${variantIcons.map((icon) => `export const ${icon.name} = ${icon.content};`).join('\n')}
`;

        fs.mkdirSync(path.dirname(variantOutputPath), { recursive: true });
        fs.writeFileSync(variantOutputPath, variantOutput);
    }

    if (hasMultipleVariants) {
        const outputPath = path.resolve(__dirname, '..', 'src', 'icons', iconPack.name, `index.js`);
        const output = `/**
 * ${iconPack.title}
 *
 * @name ${iconPack.name}
 * @url ${iconPack.url}
 * @version ${iconPack.version || package.version}
 * @generated
 */

${iconPack.variants.map((variant) => `export * from './${variant.name}';`).join('\n')}
`;

        fs.writeFileSync(outputPath, output);
    }
});
