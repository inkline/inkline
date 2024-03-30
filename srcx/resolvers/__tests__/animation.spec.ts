import {
    animationResolver,
    animationDefaultResolver,
    animationFieldResolver
} from '../animation';
import { Configuration, Theme } from '../../types';

describe('resolvers', () => {
    describe('animation', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'animation';
                expect((animationResolver.test as RegExp).test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.animation';
                expect((animationResolver.test as RegExp).test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'animation';
                expect(path.replace(animationResolver.test as RegExp, animationResolver.set as string)).toEqual('animation');
            });

            it('should replace nested path', () => {
                const path = 'nested.animation';
                expect(path.replace(animationResolver.test as RegExp, animationResolver.set as string)).toEqual('nested.animation');
            });
        });

        describe('resolve', () => {
            it('should return animation values', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '300ms ease-in-out';
                const path = ['animation'];

                expect(animationResolver.apply({ config, theme, value, path })).toEqual({
                    duration: '300ms',
                    timingFunction: 'ease-in-out'
                });
            });
        });
    });

    describe('animation.default', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'animation.default';
                expect((animationDefaultResolver.test as RegExp).test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.animation.default';
                expect((animationDefaultResolver.test as RegExp).test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'animation.default';
                expect(path.replace(animationDefaultResolver.test as RegExp, animationDefaultResolver.set as string)).toEqual('animation');
            });

            it('should replace nested path', () => {
                const path = 'nested.animation.default';
                expect(path.replace(animationDefaultResolver.test as RegExp, animationDefaultResolver.set as string)).toEqual('nested.animation');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '300ms ease-in-out';
                const path = ['animation', 'default'];

                expect(animationDefaultResolver.apply({ config, theme, value, path })).toEqual({
                    duration: '300ms',
                    timingFunction: 'ease-in-out'
                });
            });
        });
    });

    describe('animation.[side]', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'animation.duration';
                expect((animationFieldResolver.test as RegExp).test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.animation.duration';
                expect((animationFieldResolver.test as RegExp).test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'animation.duration';
                expect(path.replace(animationFieldResolver.test as RegExp, animationFieldResolver.set as string)).toEqual('animation.duration');
            });

            it('should replace nested path', () => {
                const path = 'nested.animation.duration';
                expect(path.replace(animationFieldResolver.test as RegExp, animationFieldResolver.set as string)).toEqual('nested.animation.duration');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '300ms';
                const path = ['animation', 'duration'];

                expect(animationFieldResolver.apply({ config, theme, value, path })).toEqual(value);
            });
        });
    });
});
