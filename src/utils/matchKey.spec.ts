import { matchKey } from './matchKey';

describe('matchKey', () => {
    it('should return true for an exact match', () => {
        const key = 'user.name';
        const pattern = 'user.name';
        const result = matchKey(key, pattern);
        expect(result).toBe(true);
    });

    it('should return false for a non-match', () => {
        const key = 'user.email';
        const pattern = 'user.name';
        const result = matchKey(key, pattern);
        expect(result).toBe(false);
    });

    it('should support wildcard (*) patterns', () => {
        const key = 'user.name';
        const pattern = 'user.*';
        const result = matchKey(key, pattern);
        expect(result).toBe(true);
    });

    it('should support globstar (**) patterns for one segment', () => {
        const key = 'user.profile.name';
        const pattern = 'user.**.name';
        const result = matchKey(key, pattern);
        expect(result).toBe(true);
    });

    it('should support globstar (**) patterns for multiple segments', () => {
        const key = 'user.profile.nested.name';
        const pattern = 'user.**.name';
        const result = matchKey(key, pattern);
        expect(result).toBe(true);
    });

    it('should return false when globstar (**) pattern does not match', () => {
        const key = 'user.profile.email';
        const pattern = 'user.**.name';
        const result = matchKey(key, pattern);
        expect(result).toBe(false);
    });

    it('should support question mark (?) patterns', () => {
        const key = 'user1';
        const pattern = 'user?';
        const result = matchKey(key, pattern);
        expect(result).toBe(true);
    });

    it('should return false when question mark (?) pattern does not match', () => {
        const key = 'user12';
        const pattern = 'user?';
        const result = matchKey(key, pattern);
        expect(result).toBe(false);
    });
});
