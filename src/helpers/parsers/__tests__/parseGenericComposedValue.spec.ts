import {Configuration, ConfigurationContext} from '../../../types';
import { parseGenericComposedValue, ParseGenericComposedValueSetFn } from '../parseGenericComposedValue';

describe('helpers', () => {
    describe('parsers', () => {
        describe('parseGenericComposedValue', () => {
            it('should go through value keys and parse entries', () => {
                const config = {} as Configuration;
                const value = 'a b c d';
                const setFn: ParseGenericComposedValueSetFn = (target, [a, b, c, d]) => {
                    target.a = a;
                    target.b = b;
                    target.c = c;
                    target.d = d;
                };
                const context: ConfigurationContext<any, any> = { config, value, theme: {}, path: [] };

                expect(parseGenericComposedValue(context, setFn)).toEqual({
                    a: 'a',
                    b: 'b',
                    c: 'c',
                    d: 'd'
                });
            });

            it('should support colors with spaces', () => {
                const config = {} as Configuration;
                const value = '1px solid rgba(0, 0, 0, 1)';
                const setFn: ParseGenericComposedValueSetFn = (target, [width, style, color]) => {
                    target.width = width;
                    target.style = style;
                    target.color = color;
                };
                const context: ConfigurationContext<any, any> = { config, value, theme: {}, path: [] };

                expect(parseGenericComposedValue(context, setFn)).toEqual({
                    width: '1px',
                    style: 'solid',
                    color: 'rgba(0, 0, 0, 1)'
                });
            });
        });
    });
});
