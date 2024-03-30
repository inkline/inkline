import { defaultConfig } from '../../defaults';
import { Configuration, ResolvedConfiguration, ResolvedTheme, Theme } from '../../types';
import { applyGenerators } from '../generators';

describe('applyGenerators()', () => {
    it('should apply all generators from config to theme', () => {
        const theme = {
            margin: {
                top: '1rem'
            }
        } as Theme;
        const config = {
            resolvers: defaultConfig.resolvers,
            generators: [
                {
                    name: '',
                    test: /.*/,
                    apply: vi.fn(() => [])
                },
                {
                    name: '',
                    test: /.*/,
                    apply: vi.fn(() => [])
                }
            ],
            theme: {
                default: theme
            }
        } as Configuration;
        const path = ['margin'];

        applyGenerators(config as ResolvedConfiguration, config.theme.default as ResolvedTheme, config.theme.default as ResolvedTheme);

        config.generators.forEach((generator) => {
            expect(generator.apply).toHaveBeenCalledWith({
                config, theme, path, value: (theme as Record<string, any>)[path[0]]
            });
        });
    });

    it('should apply all generators from config to nested theme', () => {
        const theme = {
            margin: {
                top: '1rem'
            }
        } as Theme;
        const config = {
            resolvers: defaultConfig.resolvers,
            generators: [
                {
                    name: '',
                    test: /top$/,
                    apply: vi.fn(() => [])
                }
            ],
            theme: {
                default: theme
            }
        } as Configuration;
        const path = ['margin', 'top'];

        applyGenerators(config as ResolvedConfiguration, config.theme.default as ResolvedTheme, config.theme.default as ResolvedTheme);

        expect(config.generators[0].apply).toHaveBeenCalledWith({
            config, theme, path, value: (theme.margin as Record<string, any>).top
        });
    });
});
