import { sameAs } from '@inkline/inkline/validation/validators';

describe('Validators', () => {
    describe('sameAs()', () => {
        it('should return false if target is not defined', () => {
            expect(
                sameAs('', {
                    schema: () => ({})
                })
            ).toEqual(false);
        });

        it('should throw error if target does not exist in schema', () => {
            expect(() =>
                sameAs('', {
                    target: 'target',
                    schema: () => ({})
                })
            ).toThrow();
        });

        it('should return false if target schema exists but has different value', () => {
            expect(
                sameAs('', {
                    target: 'target',
                    schema: () => ({
                        target: { value: 'abc' }
                    })
                })
            ).toEqual(false);
        });

        it('should return true if target schema exists and has same value', () => {
            expect(
                sameAs('abc', {
                    target: 'target',
                    schema: () => ({
                        target: { value: 'abc' }
                    })
                })
            ).toEqual(true);
        });

        it('should return false if target nested schema exists but has different value', () => {
            expect(
                sameAs('', {
                    target: 'nested.target',
                    schema: () => ({
                        nested: {
                            target: {
                                value: 'abc'
                            }
                        }
                    })
                })
            ).toEqual(false);
        });

        it('should return true if target nested schema exists and has same value', () => {
            expect(
                sameAs('abc', {
                    target: 'nested.target',
                    schema: () => ({
                        nested: {
                            target: {
                                value: 'abc'
                            }
                        }
                    })
                })
            ).toEqual(true);
        });

        it('should return false if target not provided', () => {
            expect(sameAs('abc')).toEqual(false);
        });
    });
});
