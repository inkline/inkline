import { modifierClass } from 'inkline/helpers/modifierClass';

describe('Helpers', () => {
    describe('modifierClass', () => {
        it('should return the className preceded by a dash', () => {
            expect(modifierClass('abc')).toEqual('-abc');
        });
    });
});
