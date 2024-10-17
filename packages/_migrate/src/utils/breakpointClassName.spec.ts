import { breakpointClassName } from './breakpointClassName';

describe('Utils', () => {
    describe('breakpointClassName()', () => {
        it('handles all lowercase property with string value', () => {
            const result = breakpointClassName('color', 'xs');
            assert.equal(result, '-color-xs');
        });

        it('handles camelCased property with string value', () => {
            const result = breakpointClassName('backgroundColor', 'xs');
            assert.equal(result, '-background-color-xs');
        });

        it('handles numeric in property with string value', () => {
            const result = breakpointClassName('font3d', 'xs');
            assert.equal(result, '-font-3d-xs');
        });

        it('handles boolean value', () => {
            const result = breakpointClassName('visible', true);
            assert.equal(result, '-visible');
        });

        it('handles numeric value', () => {
            const result = breakpointClassName('fontSize', 12);
            assert.equal(result, '-font-size-12');
        });

        it('handles string value', () => {
            const result = breakpointClassName('fontWeight', 'xs');
            assert.equal(result, '-font-weight-xs');
        });

        it('handles "xxl" in property', () => {
            const result = breakpointClassName('test', 'xxl');
            assert.equal(result, '-test-xxl');
        });
    });
});
