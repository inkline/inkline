import { Configuration, ConfigurationContext, FnProperty } from '../../../types';
import { parseFn } from '../parseFn';

describe('helpers', () => {
    describe('parsers', () => {
        describe('parseFn', () => {
            it('should execute function and return value', () => {
                const config = {
                    resolvers: [],
                    generators: [],
                    theme: {
                        default: {
                            margin: '1px'
                        }
                    }
                } as Configuration;
                const value: FnProperty<string> = ({ theme }) => theme.margin as string;
                const context: ConfigurationContext<any, any> = { config, value, theme: config.theme.default, path: [] };

                expect(parseFn(context)).toEqual(config.theme.default.margin);
            });
        });
    });
});
