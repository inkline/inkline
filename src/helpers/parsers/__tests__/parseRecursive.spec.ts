import { parseRecursive } from '../parseRecursive';
import {Configuration, ConfigurationContext} from '../../../types';

describe('helpers', () => {
    describe('parsers', () => {
        describe('parseRecursive', () => {
            it('should go through value keys and parse entries', () => {
                const config = {
                    resolvers: [],
                    generators: [],
                    theme: {
                        default: {
                            value: 'a'
                        }
                    }
                } as Configuration;
                const value = {
                    value: '<% theme.value %>',
                    nested: {
                        value: '<% theme.value %>',
                        fn: () => '<% theme.value %>'
                    }
                };
                const context: ConfigurationContext<any, any> = { config, value, theme: config.theme.default, path: [] };

                expect(parseRecursive(context)).toEqual({
                    value: 'a',
                    nested: {
                        value: 'a',
                        fn: 'a'
                    }
                });
            });
        });
    });
});
