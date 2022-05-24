import { parseValue } from '../parseValue';
import { Configuration, UserConfiguration } from '../../../types';

describe('helpers', () => {
    describe('parsers', () => {
        describe('parseValue', () => {
            it('should return value itself if string', () => {
                const config = {} as Configuration;
                const value = 'red';

                expect(parseValue(config, value)).toEqual(value);
            });

            it('should return value itself if number', () => {
                const config = {} as Configuration;
                const value = 10;

                expect(parseValue(config, value)).toEqual(value);
            });

            it('should call parseFn and parse return value if function', () => {
                const config = {
                    theme: {
                        margin: '1rem'
                    }
                } as Configuration;
                const value: UserConfiguration.PropertyFn<string> = ({ theme }) => theme.margin as string;

                expect(parseValue(config, value)).toEqual(config.theme.margin);
            });
        });
    });
});
