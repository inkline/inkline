import { email } from 'inkline/validators/email';

describe('Validators', () => {
    describe('email()', () => {
        it('should return true for standard email formats', () => {
            expect(email('user@example.com')).toEqual(true);
        });

        it('should return false for missing @', () => {
            expect(email('userexample.com')).toEqual(false);
        });

        it('should return false for missing domain', () => {
            expect(email('user@.com')).toEqual(false);
        });

        it('should return false for missing tld', () => {
            expect(email('user@example')).toEqual(false);
        });

        it('should return true if array contains only valid emails', () => {
            expect(email(['user1@example.com', 'user2@example.com'])).toEqual(true);
        });

        it('should return false if array doesn\'t contain only valid emails', () => {
            expect(email(['user1@example.com', 'user2@example'])).toEqual(false);
        });
    });
});
