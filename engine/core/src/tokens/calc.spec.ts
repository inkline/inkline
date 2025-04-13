import { variable } from './variable';
import { add, calc, divide, multiply, subtract } from './calc';
import { ref } from './ref';
import { TokenType } from '../types';
import { createContext } from '../context';

const options = { context: createContext() };

describe('calc', () => {
    const a = variable('a', 10, options);
    const b = variable('b', 5, options);

    it('should create a calc token with references and operations', () => {
        const calcInstance = calc(ref(a), '+', ref(b));

        expect(calcInstance.__type).toBe(TokenType.Calc);
        expect(calcInstance.__value).toEqual([ref(a), '+', ref(b)]);
        expect(calcInstance.__value.length).toBe(3);
    });

    describe('multiply', () => {
        it('should correctly multiply variables', () => {
            const result = multiply(ref(a), ref(b));
            expect(result.__value).toEqual([ref(a), '*', ref(b)]);
        });
    });

    describe('divide', () => {
        it('should correctly divide variables', () => {
            const result = divide(ref(a), ref(b));
            expect(result.__value).toEqual([ref(a), '/', ref(b)]);
        });
    });

    describe('add', () => {
        it('should correctly add variables', () => {
            const result = add(ref(a), ref(b));
            expect(result.__value).toEqual([ref(a), '+', ref(b)]);
        });
    });

    describe('subtract', () => {
        it('should correctly subtract variables', () => {
            const result = subtract(ref(a), ref(b));
            expect(result.__value).toEqual([ref(a), '-', ref(b)]);
        });
    });
});
