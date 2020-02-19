import { focusFirstDescendant } from '@inkline/inkline/src/helpers/focusFirstDescendant';

describe('Helpers', () => {
    describe('focusFirstDescendant()', () => {
        let element;

        beforeEach(() => {
            element = {
                childNodes: []
            };
        });

        it('should return false if element has no child nodes', () => {
            expect(focusFirstDescendant(element)).toEqual(false);
        });

        it('should return false if element has no focusable children', () => {
            element.childNodes.push({ tabIndex: -1, childNodes: [] }, { tabIndex: -1, childNodes: [] });
            document.activeElement = element.childNodes[0];

            expect(focusFirstDescendant(element)).toEqual(false);
        });

        it('should return true if element has focusable child', () => {
            element.childNodes.push({ tabIndex: 1, childNodes: [] }, { tabIndex: 1, childNodes: [] });
            document.activeElement = element.childNodes[0];

            expect(focusFirstDescendant(element)).toEqual(true);
        });

        it('should return true if element\'s child has focusable child', () => {
            element.childNodes.push({ childNodes: [] }, { childNodes: [] });
            element.childNodes[0].childNodes.push({ tabIndex: 1, childNodes: [] });

            document.activeElement = element.childNodes[0].childNodes[0];

            expect(focusFirstDescendant(element)).toEqual(true);
        });
    });
});
