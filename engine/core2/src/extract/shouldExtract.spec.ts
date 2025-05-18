import { shouldExtract } from './shouldExtract';
import { disableComment } from '../constants';

describe('shouldExtract', () => {
    it('should return true when code does not include the disable comment', () => {
        const code = 'Some random code';
        expect(shouldExtract(code)).toBe(true);
    });

    it('should return false when code includes the disable comment', () => {
        const code = `${disableComment}\nSome code`;
        expect(shouldExtract(code)).toBe(false);
    });

    it('should return true for an empty string', () => {
        const code = '';
        expect(shouldExtract(code)).toBe(true);
    });

    it('should be case-sensitive and does not match a differently cased disable comment', () => {
        const code = ` ${disableComment.toUpperCase()}Some code`;
        expect(shouldExtract(code)).toBe(true);
    });
});
