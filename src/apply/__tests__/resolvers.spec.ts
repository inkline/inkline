import { applyResolvers } from '../resolvers';
import { defaultConfig } from '../../defaults';
import { Configuration } from '../../types';

const config = {
    resolvers: defaultConfig.resolvers,
    generators: defaultConfig.generators,
    theme: {
        margin: '1rem'
    }
} as Configuration;

describe('applyResolvers()', () => {
    it('should apply resolvers to each key-value pair that is not an object', () => {
        const source = {
            margin: '1rem'
        };
        const target: Record<string, string> = {};

        applyResolvers(config, config.theme, target);

        expect(target).toEqual({
            margin: {
                top: '1rem',
                right: '1rem',
                bottom: '1rem',
                left: '1rem'
            }
        });
    });

    describe('set', () => {
        it('should set resolved value at a nested level', () => {
            const source = {
                components: {
                    'i-button': {
                        margin: '1rem'
                    }
                }
            };
            const target: Record<string, string> = {};

            applyResolvers(config, source, target);

            expect(target).toEqual({
                components: {
                    'i-button': {
                        margin: {
                            top: '1rem',
                            right: '1rem',
                            bottom: '1rem',
                            left: '1rem'
                        }
                    }
                }
            });
        });

        it('should set resolved value using set function', () => {
            const config = {
                resolvers: defaultConfig.resolvers,
                generators: defaultConfig.generators,
                theme: {
                    components: {
                        'i-button': {
                            margin: '1rem'
                        }
                    }
                }
            } as Configuration;
            const target: Record<string, string> = {};

            applyResolvers(config, config.theme, target);

            expect(target).toEqual({
                components: {
                    'i-button': {
                        margin: {
                            top: '1rem',
                            right: '1rem',
                            bottom: '1rem',
                            left: '1rem'
                        }
                    }
                }
            });
        });
    });
});
