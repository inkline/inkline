import { applyResolvers } from '../resolvers';
import { defaultConfig } from '../../defaults';
import {Configuration, ResolvedTheme, Theme} from '../../types';

const config = {
    resolvers: defaultConfig.resolvers,
    generators: defaultConfig.generators,
    theme: {
        default: {
            margin: '1rem'
        }
    }
} as Configuration;

describe('applyResolvers()', () => {
    it('should apply resolvers to each key-value pair that is not an object', () => {
        const target: ResolvedTheme = {} as ResolvedTheme;

        applyResolvers(config, config.theme.default as Theme, config.theme.default as Theme, target);

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
            const target: ResolvedTheme = {} as ResolvedTheme;

            applyResolvers(config, config.theme.default as Theme, source as Theme[keyof Theme], target);

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
                    default: {
                        components: {
                            'i-button': {
                                margin: '1rem'
                            }
                        }
                    }
                }
            } as Configuration;
            const target: ResolvedTheme = {} as ResolvedTheme;

            applyResolvers(config, config.theme.default as Theme, config.theme.default as Theme, target);

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
