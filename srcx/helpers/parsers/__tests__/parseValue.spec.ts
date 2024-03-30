import { parseValue } from '../parseValue';
import { Configuration, ConfigurationContext, FnProperty } from '../../../types';

describe('helpers', () => {
    describe('parsers', () => {
        describe('parseValue', () => {
            it('should return value itself if string', () => {
                const config = {} as Configuration;
                const value = 'red';
                const context: ConfigurationContext<any, any> = { config, value, theme: {}, path: [] };

                expect(parseValue(context)).toEqual(value);
            });

            it('should return value itself if number', () => {
                const config = {} as Configuration;
                const value = 10;
                const context: ConfigurationContext<any, any> = { config, value, theme: {}, path: [] };

                expect(parseValue(context)).toEqual(value);
            });

            it('should call parseFn and parse return value if function', () => {
                const config = {
                    resolvers: [],
                    generators: [],
                    theme: {
                        default: {
                            margin: '1rem'
                        }
                    }
                } as Configuration;
                const value: FnProperty<string> = ({ theme }) => theme.margin as string;
                const context: ConfigurationContext<any, any> = { config, value, theme: {}, path: [] };

                expect(parseValue(context)).toEqual(config.theme.margin);
            });
        });
    });
});
