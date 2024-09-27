import { getStyleProperty } from './getStyleProperty';

describe('Helpers', () => {
    describe('getStyleProperty()', () => {
        const windowSpy = vi.spyOn(global as any, 'window', 'get');
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
            const getPropertyValue = vi.fn();

            windowSpy.mockImplementation(() => ({
                getComputedStyle: () => ({
                    getPropertyValue
                })
            }));

            element.style.padding = '10px';
            getStyleProperty(element, 'padding');

            expect(getPropertyValue).toHaveBeenCalled();

            vi.clearAllMocks();
        });

        it('should return if isServer', () => {
            windowSpy.mockImplementation(() => undefined);

            expect(getStyleProperty(element, 'property')).toEqual(undefined);

            vi.clearAllMocks();
        });
    });
});
