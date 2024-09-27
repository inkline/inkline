import { email } from '@inkline/inkline/validation/validators';

describe('Validators', () => {
    describe('email()', () => {
        const options = { path: '', schema: undefined };

        it('should return true for standard email formats', () => {
            expect(email('user@example.com', options)).toEqual(true);
        });

        it('should return false for missing @', () => {
            expect(email('userexample.com', options)).toEqual(false);
        });

        it('should return false for missing domain', () => {
            expect(email('user@.com', options)).toEqual(false);
        });

        it('should return false for missing tld', () => {
            expect(email('user@example', options)).toEqual(false);
        });

        it('should return true if array contains only valid emails', () => {
            expect(email(['user1@example.com', 'user2@example.com'], options)).toEqual(true);
        });

        it("should return false if array doesn't contain only valid emails", () => {
            expect(email(['user1@example.com', 'user2@example'], options)).toEqual(false);
        });

        it('should return true if value not provided', () => {
            expect(email('', options)).toEqual(true);
        });

        it('should return true if array values not provided', () => {
            expect(email(['', ''], options)).toEqual(true);
        });
    });
});
