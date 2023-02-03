import { number } from '@inkline/inkline/validation/validators';

describe('Validators', () => {
    describe('number()', () => {
        it('should return true for positive int', () => {
            expect(number('10')).toEqual(true);
        });

        it('should return true negative int', () => {
            expect(number('-10', { allowNegative: true })).toEqual(true);
        });

        it('should return true for positive float', () => {
            expect(number('10.99', { allowDecimal: true })).toEqual(true);
        });

        it('should return true negative float', () => {
            expect(
                number('-10.99', {
                    allowNegative: true,
                    allowDecimal: true
                })
            ).toEqual(true);
        });

        it('should return false for characters other than 0-9', () => {
            expect(
                number('-a10.99', {
                    allowNegative: true,
                    allowDecimal: true
                })
            ).toEqual(false);
        });

        it('should return true if all array entries are decimal', () => {
            expect(
                number(['10', '10.99', '-10', '-10.99'], {
                    allowNegative: true,
                    allowDecimal: true
                })
            ).toEqual(true);
        });

        it('should return false if not all array entries are decimal', () => {
            expect(
                number(['10', '10.99', 'string', '-10', '-10.99'], {
                    allowNegative: true,
                    allowDecimal: true
                })
            ).toEqual(false);
        });
    });
});
