import { parseRecursive } from '../parseRecursive';
import { Configuration } from '../../../types';

describe('helpers', () => {
    describe('parsers', () => {
        describe('parseRecursive', () => {
            it('should go through value keys and parse entries', () => {
                const config = {
                    theme: {
                        value: 'a'
                    } as any
                } as Configuration;
                const value = {
                    value: '<% theme.value %>',
                    nested: {
                        value: '<% theme.value %>',
                        fn: () => '<% theme.value %>'
                    }
                };

                expect(parseRecursive(config, value)).toEqual({
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
