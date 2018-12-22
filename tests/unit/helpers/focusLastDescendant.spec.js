import { focusLastDescendant } from 'inkline/helpers/focusLastDescendant';

describe('Helpers', () => {
    describe('focusLastDescendant()', () => {
        let element;

        beforeEach(() => {
            element = {
                childNodes: []
            };
        });

        it('should return false if element has no child nodes', () => {
            expect(focusLastDescendant(element)).toEqual(false);
        });

        it('should return true if element has focusable child', () => {
            element.childNodes.push({ tabIndex: 1, childNodes: [] }, { tabIndex: 1, childNodes: [] });
            document.activeElement = element.childNodes[1];

            expect(focusLastDescendant(element)).toEqual(true);
        });

        it('should return true if element\'s child has focusable child', () => {
            element.childNodes.push({ childNodes: [] }, { childNodes: [] });
            element.childNodes[1].childNodes.push({ tabIndex: 1, childNodes: [] });

            document.activeElement = element.childNodes[1].childNodes[0];

            expect(focusLastDescendant(element)).toEqual(true);
        });
    });
});
