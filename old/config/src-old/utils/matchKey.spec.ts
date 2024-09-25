import { matchKey } from './matchKey';

describe('matchKey', () => {
    it('should match key with string pattern', () => {
        const result = matchKey('key', 'key');
        expect(result).toBeTruthy();
    });

    it('should not match key with different string pattern', () => {
        const result = matchKey('key', 'differentKey');
        expect(result).toBeFalsy();
    });

    it('should match key with RegExp pattern', () => {
        const result = matchKey('key', /ke/);
        expect(result).toBeTruthy();
    });

    it('should not match key with different RegExp pattern', () => {
        const result = matchKey('key', /diff/);
        expect(result).toBeFalsy();
    });
});
