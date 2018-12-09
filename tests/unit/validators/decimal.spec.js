import { decimal } from 'inkline/validators/decimal';

describe('Validators', () => {
    describe('decimal()', () => {
        it('should return true for positive int', () => {
            expect(decimal('10')).toEqual(true);
        });

        it('should return true negative int', () => {
            expect(decimal('-10')).toEqual(true);
        });

        it('should return true for positive float', () => {
            expect(decimal('10.99')).toEqual(true);
        });

        it('should return true negative float', () => {
            expect(decimal('-10.99')).toEqual(true);
        });

        it('should return false for characters other than 0-9', () => {
            expect(decimal('-a10.99')).toEqual(false);
        });

        it('should return true if all array entries are decimal', () => {
            expect(decimal(['10', '10.99', '-10', '-10.99'])).toEqual(true);
        });

        it('should return false if not all array entries are decimal', () => {
            expect(decimal(['10', '10.99', 'string', '-10', '-10.99'])).toEqual(false);
        });
    });
});
