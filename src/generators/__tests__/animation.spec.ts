import { animationGenerator } from '../animation';
import { ResolvedConfiguration, ResolvedTheme } from '../../types';

describe('generators', () => {
    describe('animation', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'animation';
                expect((animationGenerator.test as RegExp).test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.animation';
                expect((animationGenerator.test as RegExp).test(path)).toEqual(true);
            });
        });

        describe('generator', () => {
            it('should generate variables for all parts of composed variable', () => {
                const config = {} as ResolvedConfiguration;
                const theme = {
                    animation: {
                        duration: '300ms',
                        timingFunction: 'ease-in-out'
                    }
                } as ResolvedTheme;
                const value = theme.animation;
                const path = ['animation'];

                expect(animationGenerator.apply({ config, theme, value, path })).toEqual([
                    '/**',
                    ' * Animation variables',
                    ' */',
                    `--transition-duration: ${theme.animation.duration};`,
                    `--transition-timing-function: ${theme.animation.timingFunction};`
                ]);
            });
        });
    });
});
