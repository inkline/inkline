import { focusLastDescendant } from '@inkline/inkline/helpers';

describe('Helpers', () => {
    describe('focusLastDescendant()', () => {
        const activeElementSpy = jest.spyOn(document, 'activeElement', 'get');
        let element: any;

        beforeEach(() => {
            element = {
                childNodes: []
            };
        });

        it('should return false if element has no child nodes', () => {
            expect(focusLastDescendant(element)).toEqual(false);
        });

        it('should return false if element has no focusable children', () => {
            element.childNodes.push({ tabIndex: -1, childNodes: [] }, { tabIndex: -1, childNodes: [] });
            activeElementSpy.mockImplementation(() => element.childNodes[1]);

            expect(focusLastDescendant(element)).toEqual(false);
        });

        it('should return true if element has focusable child', () => {
            element.childNodes.push({ tabIndex: 1, childNodes: [] }, { tabIndex: 1, childNodes: [] });
            activeElementSpy.mockImplementation(() => element.childNodes[1]);

            expect(focusLastDescendant(element)).toEqual(true);
        });

        it('should return true if element\'s child has focusable child', () => {
            element.childNodes.push({ childNodes: [] }, { childNodes: [] });
            element.childNodes[1].childNodes.push({ tabIndex: 1, childNodes: [] });
            activeElementSpy.mockImplementation(() => element.childNodes[1].childNodes[0]);

            expect(focusLastDescendant(element)).toEqual(true);
        });
    });
});
