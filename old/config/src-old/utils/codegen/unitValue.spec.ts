import { toUnitValue } from './unitValue';

describe('toUnitValue', () => {
    it('should return value with default unit when input is a number', () => {
        const result = toUnitValue(10);
        expect(result).toEqual('10px');
    });

    it('should return value without unit when input is zero', () => {
        const result = toUnitValue(0);
        expect(result).toEqual('0');
    });

    it('should return value with custom unit when input is a number', () => {
        const result = toUnitValue(10, 'em');
        expect(result).toEqual('10em');
    });

    it('should return value as is when input is a string', () => {
        const result = toUnitValue('auto');
        expect(result).toEqual('auto');
    });
});
