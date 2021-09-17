import { getStyleProperty } from '@inkline/inkline/helpers';

describe('Helpers', () => {
    describe('getStyleProperty()', () => {
        const windowSpy = jest.spyOn(global as any, 'window', 'get');
        let element: HTMLElement;

        beforeEach(() => {
            element = document.createElement('div');
        });

        it('should return if element not provided', () => {
            expect((getStyleProperty as any)(undefined, undefined)).toEqual(undefined);
        });

        it('should return if property not provided', () => {
            expect((getStyleProperty as any)(element, undefined)).toEqual(undefined);
        });

        it('should return currentStyle if element currentStyle exists', () => {
            (element as any).currentStyle = { padding: '10px' };

            expect(getStyleProperty(element, 'padding')).toEqual('10px');
        });

        it('should return property using getComputedStyle', () => {
            element.style.padding = '10px';

            expect(getStyleProperty(element, 'padding')).toEqual('10px');
        });

        it('should return property using getComputedStyle and getPropertyValue', () => {
            const getPropertyValue = jest.fn();

            windowSpy.mockImplementation(() => ({
                getComputedStyle: () => ({
                    getPropertyValue
                })
            }));

            element.style.padding = '10px';
            getStyleProperty(element, 'padding');

            expect(getPropertyValue).toHaveBeenCalled();

            jest.clearAllMocks();
        });

        it('should return if isServer', () => {
            windowSpy.mockImplementation(() => undefined);

            expect(getStyleProperty(element, 'property')).toEqual(undefined);

            jest.clearAllMocks();
        });
    });
});
