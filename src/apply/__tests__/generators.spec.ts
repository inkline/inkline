import { defaultConfig } from '../../defaults';
import { Configuration, ResolvedConfiguration, Theme } from '../../types';
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
                    generate: vi.fn(() => [])
                },
                {
                    name: '',
                    test: /.*/,
                    generate: vi.fn(() => [])
                }
            ],
            theme
        } as Configuration;
        const path = ['margin'];

        applyGenerators(config as ResolvedConfiguration, theme);

        expect(config.generators[0].generate).toHaveBeenCalledWith({ config, theme, path, value: theme[path[0]] });
        expect(config.generators[1].generate).toHaveBeenCalledWith({ config, theme, path, value: theme[path[0]] });
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
                    generate: vi.fn(() => [])
                }
            ],
            theme
        } as Configuration;
        const path = ['margin', 'top'];

        applyGenerators(config as ResolvedConfiguration, theme);

        expect(config.generators[0].generate).toHaveBeenCalledWith({ config, theme, path, value: theme.margin.top });
    });
});
