import { unfold } from './unfold';

describe('unfold', () => {
    it('should unfold padding property', () => {
        const input = { padding: '1rem' };
        const expected = {
            paddingTop: '1rem',
            paddingRight: '1rem',
            paddingBottom: '1rem',
            paddingLeft: '1rem'
        };

        expect(unfold(input)).toEqual(expected);
    });

    it('should unfold paddingX and paddingY properties', () => {
        const input = { paddingX: '1rem', paddingY: '2rem' };
        const expected = {
            paddingRight: '1rem',
            paddingLeft: '1rem',
            paddingTop: '2rem',
            paddingBottom: '2rem'
        };

        expect(unfold(input)).toEqual(expected);
    });

    it('should unfold margin property', () => {
        const input = { margin: '1rem' };
        const expected = {
            marginTop: '1rem',
            marginRight: '1rem',
            marginBottom: '1rem',
            marginLeft: '1rem'
        };

        expect(unfold(input)).toEqual(expected);
    });

    it('should unfold borderWidth property', () => {
        const input = { borderWidth: '1px' };
        const expected = {
            borderTopWidth: '1px',
            borderRightWidth: '1px',
            borderBottomWidth: '1px',
            borderLeftWidth: '1px'
        };

        expect(unfold(input)).toEqual(expected);
    });

    it('should unfold borderRadius property', () => {
        const input = { borderRadius: '4px' };
        const expected = {
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
            borderBottomRightRadius: '4px',
            borderBottomLeftRadius: '4px'
        };

        expect(unfold(input)).toEqual(expected);
    });

    it('should handle multiple fold properties', () => {
        const input = {
            padding: '1rem',
            margin: '2rem',
            borderWidth: '1px'
        };
        const expected = {
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

        expect(unfold(input)).toEqual(expected);
    });

    it('should keep non-foldable properties', () => {
        const input = {
            padding: '1rem',
            color: 'red',
            width: '100%'
        };
        const expected = {
            paddingTop: '1rem',
            paddingRight: '1rem',
            paddingBottom: '1rem',
            paddingLeft: '1rem',
            color: 'red',
            width: '100%'
        };

        expect(unfold(input)).toEqual(expected);
    });

    it('should handle empty input', () => {
        expect(unfold({})).toEqual({});
    });

    it('should handle undefined values', () => {
        const input = { padding: undefined };
        const expected = {
            paddingTop: undefined,
            paddingRight: undefined,
            paddingBottom: undefined,
            paddingLeft: undefined
        };

        expect(unfold(input)).toEqual(expected);
    });
});
