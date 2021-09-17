import { debounce } from '@inkline/inkline/helpers';

describe('Helpers', () => {
    describe('debounce()', () => {
        it('should return a new function', () => {
            expect(debounce(() => {}, 0)).toEqual(expect.any(Function));
        });

        it('should call clearTimeout if returned function is called', () => {
            const debouncedFn = debounce(() => {}, 0);
            const spy = jest.spyOn(global, 'clearTimeout');

            debouncedFn();

            expect(spy).toHaveBeenCalled();
        });

        it('should call setTimeout if returned function is called', () => {
            const debouncedFn = debounce(() => {}, 0);
            const spy = jest.spyOn(global, 'setTimeout');

            debouncedFn();

            expect(spy).toHaveBeenCalled();
        });

        it('should call wrapped function after delay', () => {
            const fn = jest.fn(() => {});
            const debouncedFn = debounce(fn, 10);
            const spy = jest.spyOn(global, 'setTimeout');

            debouncedFn();
            spy.mock.calls[1][0]();

            expect(fn).toHaveBeenCalled();
        });
    });
});
