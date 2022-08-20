import { scaleRatioResolver } from '../scale-ratio';
import { Configuration, Theme } from '../../types';

describe('resolvers', () => {
    describe('scaleRatio.[name]', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'scaleRatio.golden';
                expect(scaleRatioResolver.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.scaleRatio.golden';
                expect(scaleRatioResolver.test.test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'scaleRatio.golden';
                expect(path.replace(scaleRatioResolver.test, scaleRatioResolver.set as string)).toEqual('scaleRatio.golden');
            });

            it('should replace nested path', () => {
                const path = 'nested.scaleRatio.golden';
                expect(path.replace(scaleRatioResolver.test, scaleRatioResolver.set as string)).toEqual('nested.scaleRatio.golden');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = 1.618;
                const path = ['scaleRatio', 'primary'];

                expect(scaleRatioResolver.apply({ config, theme, value, path })).toEqual(value);
            });
        });
    });
});
