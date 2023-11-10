<p align="center">
    <a href="https://inkline.io/">
        <img src="https://www.inkline.io/assets/images/logo/logo-black.svg" alt="Inkline" width=72 height=72>
    </a>
</p>

<h1 align="center">@inkline/config</h1>

<p align="center">
    Generate Design System variables for Inkline using a configuration file with sensible defaults.
    <br/>
    <br/>
    <br/>
    <a href="https://next.inkline.io">Homepage (WIP)</a>
    ·
    <a href="https://next.inkline.io/docs/introduction">Documentation (WIP)</a>
    ·
    <a href="https://storybook.next.inkline.io/">Storybook</a>
    ·
    <a href="https://github.com/inkline/inkline/issues">Issue Tracker</a>
</p>

<br/>

<p align="center">
    <a href="https://www.npmjs.com/package/@inkline/config">
        <img src="https://img.shields.io/npm/v/@inkline/config.svg" alt="npm version">
    </a>
    <a href="https://www.npmjs.com/package/@inkline/config">
        <img src="https://img.shields.io/npm/dm/@inkline/config.svg" alt="Downloads">
    </a>
    <a href="https://chat.inkline.io">
        <img src="https://img.shields.io/discord/550436704482492429.svg" alt="Discord">
    </a>
</p>

## Table of contents

-   [Installation](#installation)
-   [Configuration](#configuration)
-   [Usage](#usage)
-   [Bugs and feature requests](#bugs-and-feature-requests)
-   [Contributing](#contributing)
-   [Community](#community)
-   [Releases](#releases)
-   [Versioning](#versioning)
-   [Creator](#creator)
-   [Copyright and license](#copyright-and-license)


## Installation

1. First, install the package:

~~~bash
npm i -S @inkline/config
~~~

2. Create an `inkline.config.ts` file and override the default configuration as needed:

~~~ts
import { defineConfig } from '@inkline/config';

export default defineConfig({
    theme: {
        default: {
            color: {
                primary: '#178ab0'
            }
        }
    }
});
~~~

## Configuration

Read the [Configuration Reference](./docs/config.md) to learn about available configuration options.

### Defaults

The configuration provides sensible, overridable, interdependent defaults that work well in any Design System.

~~~ts
import { defineConfig, ColorPropertyVariant, NumberPropertyVariant } from '@inkline/config';

const colorShadeAndTintVariants: Record<string, ColorPropertyVariant> = {
    'shade-150': { darken: 15 },
    'shade-100': { darken: 10 },
    'shade-50': { darken: 5 },
    'tint-50': { lighten: 5 },
    'tint-100': { lighten: 10 },
    'tint-150': { lighten: 15 }
};

const colorLightnessVariants: Record<string, ColorPropertyVariant> = {
    50: { lightness: 95 },
    100: { lightness: 90 },
    200: { lightness: 80 },
    300: { lightness: 70 },
    400: { lightness: 60 },
    500: { lightness: 50 },
    600: { lightness: 40 },
    700: { lightness: 30 },
    800: { lightness: 20 },
    900: { lightness: 10 }
};

const sizeMultiplierVariants: Record<string, NumberPropertyVariant> = {
    xs: { multiply: 'var(--size-multiplier-xs)' },
    sm: { multiply: 'var(--size-multiplier-sm)' },
    md: { multiply: 'var(--size-multiplier-md)' },
    lg: { multiply: 'var(--size-multiplier-lg)' },
    xl: { multiply: 'var(--size-multiplier-xl)' }
};

const spacingVariants: Record<string, NumberPropertyVariant> = {
    ...sizeMultiplierVariants,
    '1-5': { divide: 5 },
    '1-4': { divide: 4 },
    '3-4': { divide: 4, multiply: 3 },
    '1-3': { divide: 3 },
    '2-3': { divide: 3, multiply: 2 },
    '1-2': { divide: 2 },
    2: { multiply: 2 },
    3: { multiply: 3 },
    4: { multiply: 4 },
    5: { multiply: 5 }
};

export default defineConfig({
    theme: {
        default: {
            animation: {
                duration: '300ms',
                timingFunction: 'ease'
            },
            boxShadow: {
                offsetX: '0',
                offsetY: '0.5rem',
                blurRadius: '1rem',
                spreadRadius: '-0.75rem',
                color: 'rgba(0, 0, 0, 0.15)'
            },
            breakpoints: {
                xs: 0,
                sm: 576,
                md: 768,
                lg: 992,
                xl: 1200,
                '2xl': 1400
            },
            color: {
                red: '#f2413d',
                orange: '#f98e5a',
                yellow: '#ffda77',
                green: '#2fb079',
                teal: '#48b4a9',
                blue: '#178bb2',
                purple: '#8268ae',
                pink: '#fc778a',
                white: '#ffffff',
                light: 'var(--color-gray-100)',
                gray: '#8e9fa4',
                dark: 'var(--color-gray-800)',
                black: '#000000',
                primary: '<% theme.color.blue %>',
                secondary: '<% theme.color.purple %>',
                info: '<% theme.color.teal %>',
                success: '<% theme.color.green %>',
                warning: '<% theme.color.yellow %>',
                danger: '<% theme.color.red %>'
            },
            margin: '1rem',
            padding: '1rem',
            border: '1px solid #c4cdd0',
            borderRadius: '4px',
            scaleRatio: {
                minorSecond: 1.067,
                majorSecond: 1.125,
                minorThird: 1.2,
                majorThird: 1.25,
                perfectFourth: 1.333,
                augmentedFourth: 1.414,
                perfectFifth: 1.5,
                golden: 1.618,
                primary: 'var(--scale-ratio-minor-third)'
            },
            size: {
                multiplier: 1,
                percentages: {
                    0: '0%',
                    25: '25%',
                    50: '50%',
                    75: '75%',
                    100: '100%'
                }
            },
            typography: {
                fontFamily: {
                    primary: {
                        base: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
                        monospace:
                            "'SFMono-Regular', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                        print: "'Georgia', 'Times New Roman', 'Times', serif"
                    },
                    secondary: {
                        base: 'var(--font-family-primary-base)',
                        monospace: 'var(--font-family-primary-monospace)',
                        print: 'var(--font-family-primary-print)'
                    }
                },
                fontWeight: {
                    extralight: 200,
                    light: 300,
                    normal: 'normal',
                    semibold: 600,
                    bold: 'bold',
                    black: 900,
                    lighter: 'lighter',
                    bolder: 'bolder'
                },
                fontSize: '1rem',
                lineHeight: 1.5,
                letterSpacing: 0,
                color: {
                    dark: 'var(--color-gray-900)',
                    muted: 'var(--color-gray-600)',
                    light: 'var(--color-gray-100)'
                },
                contrastColor: {
                    light: 'var(--color-gray-900)',
                    dark: 'var(--color-white)'
                }
            },
            elements: {
                body: {
                    background: 'var(--color-white)',
                    color: 'var(--color-gray-900)'
                },
                grid: {
                    columns: 12,
                    gutter: '28px',
                    xs: {
                        gutter: 'calc(var(--grid--gutter) * var(--size-multiplier-xs))',
                        width: '100%'
                    },
                    sm: {
                        gutter: 'calc(var(--grid--gutter) * var(--size-multiplier-sm))',
                        width: 'calc(var(--breakpoint-sm) - var(--grid--sm--gutter))'
                    },
                    md: {
                        gutter: 'calc(var(--grid--gutter) * var(--size-multiplier-md))',
                        width: 'calc(var(--breakpoint-md) - var(--grid--md--gutter))'
                    },
                    lg: {
                        gutter: 'calc(var(--grid--gutter) * var(--size-multiplier-lg))',
                        width: 'calc(var(--breakpoint-lg) - var(--grid--lg--gutter))'
                    },
                    xl: {
                        gutter: 'calc(var(--grid--gutter) * var(--size-multiplier-xl))',
                        width: 'calc(var(--breakpoint-xl) - var(--grid--xl--gutter))'
                    },
                    '2xl': {
                        gutter: 'calc(var(--grid--gutter) * var(--size-multiplier-2xl))',
                        width: 'calc(var(--breakpoint-2xl) - var(--grid--2xl--gutter))'
                    }
                }
            },
            variants: {
                borderRadius: sizeMultiplierVariants,
                color: {
                    primary: {
                        ...colorShadeAndTintVariants,
                        ...colorLightnessVariants
                    },
                    secondary: {
                        ...colorShadeAndTintVariants,
                        ...colorLightnessVariants
                    },
                    info: {
                        ...colorShadeAndTintVariants,
                        ...colorLightnessVariants
                    },
                    success: {
                        ...colorShadeAndTintVariants,
                        ...colorLightnessVariants
                    },
                    warning: {
                        ...colorShadeAndTintVariants,
                        ...colorLightnessVariants
                    },
                    danger: {
                        ...colorShadeAndTintVariants,
                        ...colorLightnessVariants
                    },
                    gray: {
                        ...colorShadeAndTintVariants,
                        ...colorLightnessVariants
                    },
                    light: colorShadeAndTintVariants,
                    dark: colorShadeAndTintVariants
                },
                margin: spacingVariants,
                padding: spacingVariants,
                size: {
                    multiplier: {
                        '2xs': { divide: 'var(--scale-ratio-pow-3)' },
                        xs: { divide: 'var(--scale-ratio-pow-2)' },
                        sm: { divide: 'var(--scale-ratio-pow-1)' },
                        md: {},
                        lg: { multiply: 'var(--scale-ratio-pow-1)' },
                        xl: { multiply: 'var(--scale-ratio-pow-2)' },
                        '2xl': { multiply: 'var(--scale-ratio-pow-3)' }
                    }
                },
                typography: {
                    fontSize: sizeMultiplierVariants
                }
            }
        },
        dark: {
            border: {
                color: '#4a4a4c'
            },
            typography: {
                color: {
                    muted: 'var(--color-gray-400)'
                }
            },
            elements: {
                body: {
                    background: 'var(--color-gray-900)',
                    color: 'var(--color-gray-100)'
                }
            }
        }
    }
});
~~~


## Usage

The easiest and fastest way to use the configuration would be:
- using the [@inkline/plugin](https://github.com/inkline/plugin) integration package for Vite.js, Webpack.js, or Nuxt.js 
- using the [@inkline/cli](https://github.com/inkline/cli) package


### Programmatic usage

⚠️ **Note**: This package is bundled as part of other `@inkline` packages. You will likely never need to build it programatically.

~~~ts
import { build, getResolvedOptions } from '@inkline/config';
import { getResolvedConfiguration } from './config';

export async function generate (options: UserOptions) {
    const { configFile, outputDir, extName } = getResolvedOptions(options);

    await buildConfig({ configFile, outputDir, extName });
}
~~~

## Bugs and feature requests

Have a bug or a feature request? Please first search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/inkline/inkline/issues/new).

## Community

Get updates on Inkline's development and chat with the project maintainers and community members.

-   Follow [@inkline on Twitter](https://twitter.com/inkline).
-   Join [Inkline on Discord](https://chat.inkline.io).
-   Developers should use the keyword `inkline` on packages which modify or add to the functionality of Inkline when distributing through [npm](https://www.npmjs.com/browse/keyword/inkline) or similar delivery mechanisms for maximum discoverability.

## Releases

[Previous releases](https://github.com/inkline/config/releases) and their documentation are also available for download.

## Versioning

For increased transparency and backward compatibility, Inkline is maintained under [the Semantic Versioning guidelines](https://semver.org/).

## Creator

### **Alex Grozav**

-   <https://grozav.com>
-   <https://twitter.com/alexgrozav>
-   <https://facebook.com/alexgrozav>
-   <https://github.com/alexgrozav>

If you use Inkline in your daily work and feel that it has made your life easier, please consider
sponsoring me on [Github Sponsors](https://github.com/sponsors/alexgrozav). 💖

## Contributing

Please read through our [contributing guidelines](https://github.com/inkline/inkline/blob/main/.github/CONTRIBUTING.md). There you can find directions for opening issues, feature requests, coding standards, and how to setup a local development environment.

## Copyright and license
Code copyright 2022-Present [Inkline Plugin Authors](https://github.com/inkline/config/graphs/contributors). Code released under the [ISC License](https://github.com/inkline/config/blob/main/LICENSE).
