import { sameAs } from '@inkline/inkline/validators/sameAs';

describe('Validators', () => {
    describe('sameAs()', () => {
        it('should return false if target is not defined', () => {
            expect(sameAs('', {}, {})).toEqual(false);
        });

        it('should throw error if target does not exist in schema', () => {
            expect(() => sameAs('', { target: 'target' }, { getSchema: () => ({}) })).toThrow();
        });

        it('should return false if target schema exists but has different value', () => {
            expect(sameAs('', { target: 'target' }, { getSchema: () => ({ target: { value: 'abc' } }) })).toEqual(false);
        });

        it('should return true if target schema exists and has same value', () => {
            expect(sameAs('abc', { target: 'target' }, { getSchema: () => ({ target: { value: 'abc' } }) })).toEqual(true);
        });

        it('should return false if target nested schema exists but has different value', () => {
            expect(sameAs('', {
                target: 'nested.target'
            }, {
                getSchema: () => ({
                    nested: {
                        target: {
                            value: 'abc'
                        }
                    }
                })
            })).toEqual(false);
        });

        it('should return true if target nested schema exists and has same value', () => {
            expect(sameAs('abc', {
                target: 'nested.target'
            }, {
                getSchema: () => ({
                    nested: {
                        target: {
                            value: 'abc'
                        }
                    }
                })
            })).toEqual(true);
        });

    });
});
