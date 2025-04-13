import { fold } from './fold';
import { unfold } from './unfold';

describe('fold', () => {
    it('should fold padding properties with same values', () => {
        const input = {
            paddingTop: '1rem',
            paddingRight: '1rem',
            paddingBottom: '1rem',
            paddingLeft: '1rem'
        };
        const expected = { padding: '1rem' };

        expect(fold(input)).toEqual(expected);
    });

    it('should not fold padding properties with different values', () => {
        const input = {
            paddingTop: '1rem',
            paddingRight: '2rem',
            paddingBottom: '3rem',
            paddingLeft: '4rem'
        };

        expect(fold(input)).toEqual(input);
    });

    it('should fold paddingX and paddingY properties', () => {
        const input = {
            paddingRight: '1rem',
            paddingLeft: '1rem',
            paddingTop: '2rem',
            paddingBottom: '2rem'
        };
        const expected = {
            paddingX: '1rem',
            paddingY: '2rem'
        };

        expect(fold(input)).toEqual(expected);
    });

    it('should fold margin properties with same values', () => {
        const input = {
            marginTop: '1rem',
            marginRight: '1rem',
            marginBottom: '1rem',
            marginLeft: '1rem'
        };
        const expected = { margin: '1rem' };

        expect(fold(input)).toEqual(expected);
    });

    it('should fold marginX and marginY properties', () => {
        const input = {
            marginRight: '1rem',
            marginLeft: '1rem',
            marginTop: '2rem',
            marginBottom: '2rem'
        };
        const expected = {
            marginX: '1rem',
            marginY: '2rem'
        };

        expect(fold(input)).toEqual(expected);
    });

    it('should fold borderWidth properties with same values', () => {
        const input = {
            borderTopWidth: '1px',
            borderRightWidth: '1px',
            borderBottomWidth: '1px',
            borderLeftWidth: '1px'
        };
        const expected = { borderWidth: '1px' };

        expect(fold(input)).toEqual(expected);
    });

    it('should fold borderRadius properties with same values', () => {
        const input = {
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
            borderBottomRightRadius: '4px',
            borderBottomLeftRadius: '4px'
        };
        const expected = { borderRadius: '4px' };

        expect(fold(input)).toEqual(expected);
    });

    it('should handle multiple foldable property groups', () => {
        const input = {
            paddingTop: '1rem',
            paddingRight: '1rem',
            paddingBottom: '1rem',
            paddingLeft: '1rem',
            marginTop: '2rem',
            marginRight: '2rem',
            marginBottom: '2rem',
            marginLeft: '2rem',
            borderTopWidth: '1px',
            borderRightWidth: '1px',
            borderBottomWidth: '1px',
            borderLeftWidth: '1px'
        };
        const expected = {
            padding: '1rem',
            margin: '2rem',
            borderWidth: '1px'
        };

        expect(fold(input)).toEqual(expected);
    });

    it('should keep non-foldable properties', () => {
        const input = {
            paddingTop: '1rem',
            paddingRight: '1rem',
            paddingBottom: '1rem',
            paddingLeft: '1rem',
            color: 'red',
            width: '100%'
        };
        const expected = {
            padding: '1rem',
            color: 'red',
            width: '100%'
        };

        expect(fold(input)).toEqual(expected);
    });

    it('should handle empty input', () => {
        expect(fold({})).toEqual({});
    });

    it('should respect existing fold properties', () => {
        const input = {
            padding: '1rem',
            marginTop: '2rem',
            marginRight: '2rem',
            marginBottom: '2rem',
            marginLeft: '2rem'
        };

        expect(fold(input)).toEqual({
            padding: '1rem',
            margin: '2rem'
        });
    });

    it('should not fold properties when any is missing', () => {
        const input = {
            paddingTop: '1rem',
            paddingRight: '1rem'
            // paddingBottom is missing
            // paddingLeft is missing
        };

        expect(fold(input)).toEqual(input);
    });

    it('should handle undefined values', () => {
        const input = {
            paddingTop: undefined,
            paddingRight: undefined,
            paddingBottom: undefined,
            paddingLeft: undefined
        };
        const expected = { padding: undefined };

        expect(fold(input)).toEqual(expected);
    });

    it('should properly handle complex nested scenarios', () => {
        const input = {
            paddingTop: '1rem',
            paddingRight: '1rem',
            paddingBottom: '1rem',
            paddingLeft: '1rem',
            marginRight: '2rem',
            marginLeft: '2rem',
            marginTop: '3rem',
            marginBottom: '3rem',
            borderTopWidth: '1px',
            borderRightWidth: '2px',
            borderBottomWidth: '3px',
            borderLeftWidth: '4px',
            color: 'red'
        };
        const expected = {
            padding: '1rem',
            marginX: '2rem',
            marginY: '3rem',
            borderTopWidth: '1px',
            borderRightWidth: '2px',
            borderBottomWidth: '3px',
            borderLeftWidth: '4px',
            color: 'red'
        };

        expect(fold(input)).toEqual(expected);
    });

    it('should correctly handle roundtrip conversion', () => {
        const original = {
            padding: '1rem',
            marginX: '2rem',
            marginY: '3rem',
            borderWidth: '1px',
            color: 'red'
        };

        // First unfold, then fold again
        const unfolded = unfold(original);
        const folded = fold(unfolded);

        expect(folded).toEqual(original);
    });
});
