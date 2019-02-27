import { getStyleProperty } from '@inkline/inkline/src/helpers/getStyleProperty';

describe('Helpers', () => {
    describe('addClass()', () => {
        let element;

        beforeEach(() => {
            element = document.createElement('div');
        });

        it('should return if element or property not provided', () => {
            expect(getStyleProperty(undefined, undefined)).toEqual(undefined);
        });

        it('should return currentStyle if element currentStyle exists', () => {
            element.currentStyle = { padding: '10px'};

            expect(getStyleProperty(element, 'padding')).toEqual('10px');
        });

        it('should return property using getComputedStyle', () => {
            element.style.padding = '10px';

            expect(getStyleProperty(element, 'padding')).toEqual('10px');
        });
    });
});
