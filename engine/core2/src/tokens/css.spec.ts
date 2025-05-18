import { css } from './css';
import { TokenType } from '../types';
import { ref } from './ref';

describe('css', () => {
    it('should return a token with the correct type', () => {
        // prettier-ignore
        const result = css`color: ${'red'};`;

        expect(result.__type).toBe(TokenType.CSS);
    });

    it('should return a token with the correct value for a single interpolation', () => {
        // prettier-ignore
        const result = css`color: ${'red'};`;
        expect(result.__value).toEqual(['color: ', 'red', ';']);
    });

    it('should return a Css token with the correct value for multiple interpolations', () => {
        const result = css`
            color: ${'red'};
            background: ${'blue'};
        `;

        expect(result.__value).toEqual([
            '\n            color: ',
            'red',
            ';\n            background: ',
            'blue',
            ';\n        '
        ]);
    });

    it('should handle empty template strings correctly', () => {
        const result = css``;
        expect(result.__value).toEqual(['']);
    });

    it('should handle template strings without interpolations correctly', () => {
        // prettier-ignore
        const result = css`color: red;`;
        expect(result.__value).toEqual(['color: red;']);
    });

    it('should handle template strings with number interpolations correctly', () => {
        // prettier-ignore
        const result = css`width: ${100}px;`;
        expect(result.__value).toEqual(['width: ', 100, 'px;']);
    });

    it('should handle template strings with boolean interpolations correctly', () => {
        // prettier-ignore
        const result = css`visible: ${true};`;
        expect(result.__value).toEqual(['visible: ', true, ';']);
    });

    it('should handle template strings with ref interpolations correctly', () => {
        const colorRef = ref('color');

        // prettier-ignore
        const result = css`color: ${colorRef};`;
        expect(result.__value).toEqual(['color: ', colorRef, ';']);
    });
});
