import { addModifier, divideModifier, multiplyModifier, subtractModifier } from './generic';

describe('addModifier', () => {
    it('should correctly generate a calc expression for addition', () => {
        const rawValue = '16px';
        const variantValue = '2px';
        const expected = 'calc(16px + 2px)';

        const result = addModifier(rawValue, variantValue);
        expect(result).toBe(expected);
    });
});

describe('subtractModifier', () => {
    it('should correctly generate a calc expression for subtraction', () => {
        const rawValue = '18px';
        const variantValue = '2px';
        const expected = 'calc(18px - 2px)';

        const result = subtractModifier(rawValue, variantValue);
        expect(result).toBe(expected);
    });
});

describe('multiplyModifier', () => {
    it('should correctly generate a calc expression for multiplication', () => {
        const rawValue = '16px';
        const variantValue = '2';
        const expected = 'calc(16px * 2)';

        const result = multiplyModifier(rawValue, variantValue);
        expect(result).toBe(expected);
    });
});

describe('divideModifier', () => {
    it('should correctly generate a calc expression for division', () => {
        const rawValue = '16px';
        const variantValue = '2';
        const expected = 'calc(16px / 2)';

        const result = divideModifier(rawValue, variantValue);
        expect(result).toBe(expected);
    });
});
