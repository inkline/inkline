import {
    elementsResolver
} from '../elements';
import { Configuration, Theme } from '../../types';

describe('resolvers', () => {
    describe('elements', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'elements.body.color';
                expect((elementsResolver.test as RegExp).test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'elements.body';
                expect(path.replace(elementsResolver.test as RegExp, elementsResolver.set as string)).toEqual('elements.body');
            });
        });

        describe('resolve', () => {
            it('should return element direct values', () => {
                const config = {} as Configuration;
                const theme = {
                    elements: {
                        body: {
                            color: 'red'
                        }
                    }
                } as unknown as Theme;
                const value = '#ff00ff';
                const path = ['elements', 'body'];

                expect(elementsResolver.apply({ config, theme, value, path })).toEqual(value);
            });
        });
    });
});
