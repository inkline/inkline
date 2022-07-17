import { getStyleProperty } from '@inkline/inkline/helpers';

describe('Helpers', () => {
    describe('getStyleProperty()', () => {
        it('should return if element not provided', () => {
            expect((getStyleProperty as any)(undefined, undefined)).toEqual(undefined);
        });

        it('should return if property not provided', () => {
            const element = document.createElement('div');

            expect((getStyleProperty as any)(element, undefined)).toEqual(undefined);
        });

        it('should return currentStyle if element currentStyle exists', () => {
            const element = {
                currentStyle: { padding: '10px' }
            };

            expect(getStyleProperty(element as any, 'padding')).toEqual('10px');
        });

        it('should return property using getComputedStyle', () => {
            const element = document.createElement('div');
            element.style.padding = '10px';

            expect(getStyleProperty(element, 'padding')).toEqual('10px');
        });

        it('should return property using getComputedStyle and getPropertyValue', () => {
            const spy = vi.spyOn(window, 'getComputedStyle');
            const element = document.createElement('div');
            const getPropertyValue = vi.fn();

            spy.mockImplementation(() => ({
                getPropertyValue
            }) as any);

            element.style.padding = '10px';
            getStyleProperty(element, 'padding');

            expect(getPropertyValue).toHaveBeenCalled();
        });
    });
});
