import { uid } from './uid';

describe('Helpers', () => {
    describe('uid()', () => {
        it('should return an unique string starting with baseId', () => {
            expect(uid('example')).toEqual(expect.stringContaining('example'));
        });

        it('should return a different string every call', () => {
            expect(uid('any')).not.toEqual(uid('any'));
        });

        it('should work without a base id', () => {
            expect(uid()[0]).not.toEqual('-');
        });
    });
});
