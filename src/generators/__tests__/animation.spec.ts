import { animationGenerators } from '../animation';
import { Configuration, Theme } from '../../types';

const [animationGenerator] = animationGenerators();

describe('generators', () => {
    describe('animation', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'animation';
                expect(animationGenerator.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.animation';
                expect(animationGenerator.test.test(path)).toEqual(true);
            });
        });

        describe('generator', () => {
            it('should generate variables for all parts of composed variable', () => {
                const config = {} as Configuration;
                const theme = {
                    animation: {
                        duration: '300ms',
                        timingFunction: 'ease-in-out'
                    }
                } as Theme;
                const value = theme.animation;
                const path = ['animation'];

                expect(animationGenerator.generate({ config, theme, value, path })).toEqual([
                    '/**',
                    ' * Animation variables',
                    ' */',
                    `--animation-duration: ${theme.animation.duration};`,
                    `--animation-timing-function: ${theme.animation.timingFunction};`
                ]);
            });
        });
    });
});
