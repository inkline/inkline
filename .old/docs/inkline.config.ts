import { defineConfig, useInklineTheme } from 'inkline';

export default defineConfig(
    (options) => {
        useInklineTheme(options);
    },
    {
        generator: {
            addons: ['layers', 'tailwindcss', 'normalizecss'],
            tailwindcss: {
                prefix: 'tw'
            }
        }
    }
);
