import { sizePropValidator } from '@inkline/inkline/mixins';

describe('mixins', () => {
    describe('default', () => {
        describe('sizePropValidator()', () => {
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach((size) => {
                it(`should return true if size is ${size}`, () => {
                    expect(sizePropValidator(size)).toEqual(true);
                });
            });

            it('should return true if size is empty string', () => {
                expect(sizePropValidator('')).toEqual(true);
            });

            it('should return false otherwise', () => {
                expect(sizePropValidator('other')).toEqual(false);
            });
        });
    });
});
