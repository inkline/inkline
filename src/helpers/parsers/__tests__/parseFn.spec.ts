import { Configuration, UserConfiguration } from '../../../types';
import { parseFn } from '../parseFn';

describe('helpers', () => {
    describe('parsers', () => {
        describe('parseFn', () => {
            it('should execute function and return value', () => {
                const config = { theme: { margin: '1px' } } as Configuration;
                const value: UserConfiguration.PropertyFn<string> = ({ theme }) => theme.margin as string;

                expect(parseFn(config, value)).toEqual(config.theme.margin);
            });
        });
    });
});
