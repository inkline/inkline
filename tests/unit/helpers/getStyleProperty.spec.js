import { getStyleProperty } from '@inkline/inkline/src/helpers/getStyleProperty';

describe('Helpers', () => {
    describe('addClass()', () => {
        let element;

        beforeEach(() => {
            element = document.createElement('div');
        });

        it('should return if element not provided', () => {
            expect(getStyleProperty(undefined, undefined)).toEqual(undefined);
        });

        it('should return if property not provided', () => {
            expect(getStyleProperty(element, undefined)).toEqual(undefined);
        });

        it('should return if window not defined', () => {
            const tmp = global.window;
            global.window = undefined;

            expect(getStyleProperty(element, 'property')).toEqual(undefined);

            global.window = tmp;
        });

        it('should return currentStyle if element currentStyle exists', () => {
            element.currentStyle = { padding: '10px'};

            expect(getStyleProperty(element, 'padding')).toEqual('10px');
        });

        it('should return property using getComputedStyle', () => {
            element.style.padding = '10px';

            expect(getStyleProperty(element, 'padding')).toEqual('10px');
        });

        it('should return property using getComputedStyle and getPropertyValue', () => {
            element.style.padding = '10px';
            global.getComputedStyle.getPropertyValue = function(p) { return this[p] };

            expect(getStyleProperty(element, 'padding')).toEqual('10px');

            global.getComputedStyle.getPropertyValue = undefined;
        });
    });
});
