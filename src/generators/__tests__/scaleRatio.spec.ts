import { scaleRatioGenerators } from '../scale-ratio';
import { Configuration, Theme } from '../../types';

const [scaleRatioGenerator] = scaleRatioGenerators();

describe('generators', () => {
    describe('scaleRatio', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'scaleRatio';
                expect(scaleRatioGenerator.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.scaleRatio';
                expect(scaleRatioGenerator.test.test(path)).toEqual(true);
            });
        });

        describe('generator', () => {
            it('should generate variables for all parts of composed variable', () => {
                const config = {} as Configuration;
                const theme = {
                    scaleRatio: {
                        primary: 'var(--scale-ratio-minor-third)',
                        golden: 1.618,
                        minorThird: 1.2,
                        perfectFourth: 1.333
                    }
                } as unknown as Theme;
                const value = theme.scaleRatio;
                const path = ['scaleRatio'];

                expect(scaleRatioGenerator.generate({ config, theme, value, path })).toEqual([
                    '/**',
                    ' * Scale ratio variables',
                    ' */',
                    `--scale-ratio-golden: ${theme.scaleRatio.golden};`,
                    `--scale-ratio-minor-third: ${theme.scaleRatio.minorThird};`,
                    `--scale-ratio-perfect-fourth: ${theme.scaleRatio.perfectFourth};`,
                    '--scale-ratio: var(--scale-ratio-minor-third);',
                    '--scale-ratio--pow-1: var(--scale-ratio);',
                    '--scale-ratio--pow-2: calc(var(--scale-ratio--pow-1) * var(--scale-ratio));',
                    '--scale-ratio--pow-3: calc(var(--scale-ratio--pow-2) * var(--scale-ratio));',
                    '--scale-ratio--pow-4: calc(var(--scale-ratio--pow-3) * var(--scale-ratio));',
                    '--scale-ratio--pow-5: calc(var(--scale-ratio--pow-4) * var(--scale-ratio));',
                    '--scale-ratio--pow-6: calc(var(--scale-ratio--pow-5) * var(--scale-ratio));'
                ]);
            });
        });
    });
});
