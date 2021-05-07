import { versions } from './version';

interface IconPack {
    title: string;
    name: string;
    url: string;
    version: string;
    license: {
        title: string;
        url: string;
    };
    variants: {
        title?: string;
        name?: string;
        prefix: string;
        pattern?: string;
        import?: string;
        path: string;
        icon: (basename: string, basedir?: string) => string; // Outputs icon kebab-case name
        fill: boolean; // Adds `fill: currentColor` to the svg
    }[]
}

export const iconPacks: IconPack[] = [
    {
        title: 'Bootstrap Icons',
        name: 'bootstrap',
        url: 'https://icons.getbootstrap.com',
        version: versions['bootstrap-icons'],
        license: {
            title: 'MIT',
            url: 'https://github.com/twbs/icons/blob/main/LICENSE.md'
        },
        variants: [
            {
                prefix: 'bi',
                path: 'bootstrap-icons/icons',
                fill: true,
                icon: (basename: string) => `bi-${basename}`
            },
        ]
    },
    {
        title: 'CoreUI Icons',
        name: 'coreui',
        url: 'https://icons.coreui.io',
        version: versions['@coreui/icons'],
        license: {
            title: 'CC BY 4.0',
            url: 'https://github.com/coreui/coreui-icons/blob/master/LICENSE'
        },
        variants: [
            {
                title: 'CoreUI Brand Icons',
                name: 'brands',
                prefix: 'cib',
                path: '@coreui/icons/svg/brand',
                fill: true,
                icon: (basename: string) => basename
            },
            {
                title: 'CoreUI Flag Icons',
                name: 'flag',
                prefix: 'cif',
                path: '@coreui/icons/svg/flag',
                fill: false,
                icon: (basename: string) => basename
            },
            {
                title: 'CoreUI Linear Icons',
                name: 'linear',
                prefix: 'cil',
                path: '@coreui/icons/svg/free',
                fill: true,
                icon: (basename: string) => basename
            }
        ]
    },
    {
        title: 'CryptoCurrency Icons',
        name: 'cryptocurrency',
        url: 'http://cryptoicons.co',
        version: versions['cryptocurrency-icons'],
        license: {
            title: 'CC0 1.0 Universal',
            url: 'https://github.com/coreui/coreui-icons/blob/master/LICENSE'
        },
        variants: [
            {
                title: 'CryptoCurrency Regular Icons',
                name: 'regular',
                prefix: 'cc',
                path: 'cryptocurrency-icons/svg/black',
                fill: true,
                icon: (basename: string) => `cc-${basename.replace(/\$/g, '')}`
            },
            {
                title: 'CryptoCurrency Color Icons',
                name: 'color',
                prefix: 'ccc',
                path: 'cryptocurrency-icons/svg/color',
                fill: false,
                icon: (basename: string) => `ccc-${basename.replace(/\$/g, '')}`
            },
            {
                title: 'CryptoCurrency Icon Icons',
                name: 'icon',
                prefix: 'cci',
                path: 'cryptocurrency-icons/svg/icon',
                fill: false,
                icon: (basename: string) => `cci-${basename.replace(/\$/g, '')}`
            }
        ]
    },
    {
        title: 'FontAwesome Icons',
        name: 'fontawesome',
        url: 'https://fontawesome.com',
        version: versions['@fortawesome/fontawesome-free'],
        license: {
            title: 'CC BY 4.0',
            url: 'https://github.com/FortAwesome/Font-Awesome/blob/master/LICENSE.txt'
        },
        variants: [
            {
                title: 'FontAwesome Brand Icons',
                name: 'brands',
                prefix: 'fab',
                path: '@fortawesome/fontawesome-free/svgs/brands',
                fill: true,
                icon: (basename: string) => `fab-${basename}`
            },
            {
                title: 'FontAwesome Regular Icons',
                name: 'regular',
                prefix: 'far',
                path: '@fortawesome/fontawesome-free/svgs/regular',
                fill: true,
                icon: (basename: string) => `far-${basename}`
            },
            {
                title: 'FontAwesome Solid Icons',
                name: 'solid',
                prefix: 'fas',
                path: '@fortawesome/fontawesome-free/svgs/solid',
                fill: true,
                icon: (basename: string) => `fas-${basename}`
            }
        ]
    },
    {
        title: 'Flat Color Icons',
        name: 'flat-color',
        url: 'https://icons8.github.io/flat-color-icons/',
        version: versions['flat-color-icons'],
        license: {
            title: 'MIT / Good Boy',
            url: 'https://github.com/icons8/flat-color-icons/blob/master/LICENSE.md'
        },
        variants: [
            {
                prefix: 'fc',
                path: 'flat-color-icons/svg',
                fill: false,
                icon: (basename: string) => `fc-${basename}`
            }
        ]
    },
    {
        title: 'Flag Icons',
        name: 'flag',
        url: 'https://flagicons.lipis.dev',
        version: versions['flag-icon-css'],
        license: {
            title: 'MIT',
            url: 'https://github.com/lipis/flag-icon-css/blob/master/LICENSE'
        },
        variants: [
            {
                title: 'Flag Icons 4x3',
                name: '4x3',
                prefix: 'fi',
                path: 'flag-icon-css/flags/4x3',
                fill: false,
                icon: (basename: string) => `fi-${basename}`
            },
            {
                title: 'Flag Icons 1x1',
                name: '1x1',
                prefix: 'fis',
                path: 'flag-icon-css/flags/1x1',
                fill: false,
                icon: (basename: string) => `fis-${basename}`
            }
        ]
    },
    {
        title: 'Heroicons',
        name: 'heroicons',
        url: 'https://heroicons.com',
        version: versions['heroicons'],
        license: {
            title: 'MIT',
            url: 'https://github.com/tailwindlabs/heroicons/blob/master/LICENSE'
        },
        variants: [
            {
                title: 'Heroicons Solid',
                name: 'solid',
                prefix: 'his',
                path: 'heroicons/solid',
                fill: true,
                icon: (basename: string) => `his-${basename}`
            },
            {
                title: 'Heroicons Outline',
                name: 'outline',
                prefix: 'hio',
                path: 'heroicons/outline',
                fill: true,
                icon: (basename: string) => `hio-${basename}`
            }
        ]
    },
    {
        title: 'Inkline',
        name: 'inkline',
        url: 'https://inkline.io',
        version: versions['inkline'],
        license: {
            title: 'MIT',
            url: 'https://github.com/inkline/inkline/blob/master/packages/inkline/LICENSE'
        },
        variants: [
            {
                prefix: 'ink',
                path: '../src/assets',
                fill: true,
                import: '@inkline/inkline/src/assets/icons',
                icon: (basename: string) => `ink-${basename}`,
            }
        ]
    },
    {
        title: 'Ionicons',
        name: 'ionicons',
        url: 'https://ionicons.com',
        version: versions['ionicons'],
        license: {
            title: 'MIT',
            url: 'https://github.com/ionic-team/ionicons/blob/master/LICENSE'
        },
        variants: [
            {
                prefix: 'ion',
                path: 'ionicons/dist/svg',
                fill: true,
                icon: (basename: string) => `ion-${basename}`,
            }
        ]
    },
    {
        title: 'Line Awesome',
        name: 'lineawesome',
        url: 'https://icons8.com/line-awesome',
        version: versions['line-awesome'],
        license: {
            title: 'MIT',
            url: 'https://github.com/icons8/line-awesome/blob/master/LICENSE.md'
        },
        variants: [
            {
                prefix: 'la',
                path: 'line-awesome/svg',
                fill: true,
                icon: (basename: string) => `la-${basename}`,
            }
        ]
    },
    {
        title: 'Material Design Icons',
        name: 'material-design',
        url: 'https://fonts.google.com/icons',
        version: versions['material-design-icons'],
        license: {
            title: 'Apache 2.0',
            url: 'https://github.com/google/material-design-icons/blob/master/LICENSE'
        },
        variants: [
            {
                prefix: 'mdi',
                path: 'material-design-icons',
                fill: true,
                pattern: '**/production/*.svg',
                icon: (basename: string) => `mdi-${basename.replace(/^ic_/, '').replace(/px$/, '')}`
            }
        ]
    },
    {
        title: 'Primer Octicons',
        name: 'octicons',
        url: 'https://primer.style/octicons',
        version: versions['@primer/octicons'],
        license: {
            title: 'MIT',
            url: 'https://github.com/primer/octicons/blob/master/LICENSE'
        },
        variants: [
            {
                prefix: 'oi',
                path: '@primer/octicons/build/svg',
                fill: true,
                icon: (basename: string) => `oi-${basename}`
            }
        ]
    },
    {
        title: 'Pixelart Icons',
        name: 'pixelart',
        url: 'https://pixelarticons.com',
        version: versions['pixelarticons'],
        license: {
            title: 'MIT',
            url: 'https://github.com/halfmage/pixelarticons/blob/master/LICENSE'
        },
        variants: [
            {
                prefix: 'px',
                path: 'pixelarticons/svg',
                fill: true,
                icon: (basename: string) => `px-${basename}`
            }
        ]
    },
    {
        title: 'Prime Icons',
        name: 'prime',
        url: 'http://primefaces.org/showcase/icons.xhtml',
        version: versions['primeicons'],
        license: {
            title: 'MIT',
            url: 'https://github.com/primefaces/primeicons/blob/master/LICENSE'
        },
        variants: [
            {
                prefix: 'pi',
                path: 'primeicons/raw-svg',
                fill: true,
                icon: (basename: string) => `pi-${basename}`
            }
        ]
    },
    {
        title: 'Remix Icon',
        name: 'remix',
        url: 'https://remixicon.com',
        version: versions['remixicon'],
        license: {
            title: 'Apache 2.0',
            url: 'https://github.com/Remix-Design/RemixIcon/blob/master/License'
        },
        variants: [
            {
                prefix: 'ri',
                path: 'remixicon/icons',
                fill: true,
                icon: (basename: string) => `ri-${basename}`
            }
        ]
    },
    {
        title: 'Simple Icons',
        name: 'simple',
        url: 'https://simpleicons.org',
        version: versions['simple-icons'],
        license: {
            title: 'CC0 1.0 Universal',
            url: 'https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md'
        },
        variants: [
            {
                prefix: 'si',
                path: 'simple-icons/icons',
                fill: true,
                icon: (basename: string) => `si-${basename}`
            }
        ]
    },
];

export default iconPacks;
