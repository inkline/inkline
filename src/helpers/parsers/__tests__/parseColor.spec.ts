import {Configuration, ConfigurationContext} from '../../../types';
import { parseColor } from '../parseColor';

describe('helpers', () => {
    describe('parsers', () => {
        describe('parseColor', () => {
            it('should return hsla color object from color string', () => {
                const config = {} as Configuration;
                const value = 'red';
                const context: ConfigurationContext<any, any> = { config, value, theme: {}, path: [] };

                expect(parseColor(context)).toEqual({ h: 0, s: 100, l: 50, a: 1 });
            });

            it('should return hsla color object from hex string', () => {
                const config = {} as Configuration;
                const value = '#ffffff';
                const context: ConfigurationContext<any, any> = { config, value, theme: {}, path: [] };

                expect(parseColor(context)).toEqual({ h: 0, s: 0, l: 100, a: 1 });
            });

            it('should return hsla color object from rgba string', () => {
                const config = {} as Configuration;
                const value = 'rgba(255, 255, 255, 1)';
                const context: ConfigurationContext<any, any> = { config, value, theme: {}, path: [] };

                expect(parseColor(context)).toEqual({ h: 0, s: 0, l: 100, a: 1 });
            });

            it('should return hsla color object from rgba object', () => {
                const config = {} as Configuration;
                const value = { r: 255, g: 0, b: 0, a: 1 };
                const context: ConfigurationContext<any, any> = { config, value, theme: {}, path: [] };

                expect(parseColor(context)).toEqual({ h: 0, s: 100, l: 50, a: 1 });
            });

            it('should return hsla color object from hsla string', () => {
                const config = {} as Configuration;
                const value = 'hsla(0, 0%, 0%, 1)';
                const context: ConfigurationContext<any, any> = { config, value, theme: {}, path: [] };

                expect(parseColor(context)).toEqual({ h: 0, s: 0, l: 0, a: 1 });
            });

            it('should return hsla color object from hsla short string', () => {
                const config = {} as Configuration;
                const value = 'hsla(0 0% 0% / 1)';
                const context: ConfigurationContext<any, any> = { config, value, theme: {}, path: [] };

                expect(parseColor(context)).toEqual({ h: 0, s: 0, l: 0, a: 1 });
            });

            it('should return hsla color object from hsla object', () => {
                const config = {} as Configuration;
                const value = { h: '0', s: '0', l: '0', a: 1 };
                const context: ConfigurationContext<any, any> = { config, value, theme: {}, path: [] };

                expect(parseColor(context)).toEqual({ h: 0, s: 0, l: 0, a: 1 });
            });
        });
    });
});
