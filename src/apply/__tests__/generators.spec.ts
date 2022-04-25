import { defaultConfig } from '../../defaults';
import { Configuration, Theme } from '../../types';
import { applyGenerators } from '../generators';

describe('applyGenerators()', () => {
    it('should apply all generators from config to theme', () => {
        const config = {
            resolvers: defaultConfig.resolvers,
            generators: [
                {
                    test: /.*/,
                    generate: vi.fn(() => [])
                },
                {
                    test: /.*/,
                    generate: vi.fn(() => [])
                }
            ],
            theme: {
                margin: '1rem'
            }
        } as Configuration;
        const path = ['margin'];
        const theme = {
            margin: {
                top: '1rem'
            }
        } as Theme;

        applyGenerators(config, theme);

        expect(config.generators[0].generate).toHaveBeenCalledWith({ config, theme, path, value: theme[path[0]] });
        expect(config.generators[1].generate).toHaveBeenCalledWith({ config, theme, path, value: theme[path[0]] });
    });

    it('should apply all generators from config to nested theme', () => {
        const config = {
            resolvers: defaultConfig.resolvers,
            generators: [
                {
                    test: /top$/,
                    generate: vi.fn(() => [])
                }
            ],
            theme: {
                margin: '1rem'
            }
        } as Configuration;
        const path = ['margin', 'top'];
        const theme = {
            margin: {
                top: '1rem'
            }
        } as Theme;

        applyGenerators(config, theme);

        expect(config.generators[0].generate).toHaveBeenCalledWith({ config, theme: theme.margin as any, path, value: theme.margin.top });
    });
});
