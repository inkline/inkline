import { isFocusable } from '@inkline/inkline/helpers/isFocusable';

describe('Helpers', () => {
    describe('isFocusable()', () => {
        let element;

        beforeEach(() => {
            element = {
                tabIndex: null,
                disabled: false,
                nodeName: 'A',
                getAttribute() { return element.tabIndex },
                focus() {}
            };
        });

        it('should return true if tabIndex is greater than 0', () => {
            element.tabIndex = 0;

            expect(isFocusable(element)).toEqual(true);
        });

        it('should return true if tabIndex is equal to 0 and tabIndex attribute is present', () => {
            element.tabIndex = 0;

            expect(isFocusable(element)).toEqual(true);
        });

        it('should return false if element is disabled', () => {
            element.disabled = true;

            expect(isFocusable(element)).toEqual(false);
        });

        it('should return false if element nodeName not in list', () => {
            element.nodeName = 'OTHER';

            expect(isFocusable(element)).toEqual(false);
        });

        it('should return true if element is <button>', () => {
            element.nodeName = 'BUTTON';

            expect(isFocusable(element)).toEqual(true);
        });

        it('should return true if element is <select>', () => {
            element.nodeName = 'SELECT';

            expect(isFocusable(element)).toEqual(true);
        });

        it('should return true if element is <textarea>', () => {
            element.nodeName = 'TEXTAREA';

            expect(isFocusable(element)).toEqual(true);
        });

        it('should return true if element is <a>, has href and rel is not ignore', () => {
            element.nodeName = 'A';
            element.href = 'http://example.com';

            expect(isFocusable(element)).toEqual(true);
        });

        it('should return false if element is <a>, has href and rel is ignore', () => {
            element.nodeName = 'A';
            element.href = 'http://example.com';
            element.rel = 'ignore';

            expect(isFocusable(element)).toEqual(false);
        });

        it('should return false if element is <a>, and doesn\'t have href', () => {
            element.nodeName = 'A';
            element.href = null;

            expect(isFocusable(element)).toEqual(false);
        });

        it('should return true if element is <input> and type is not "hidden" or "file"', () => {
            element.nodeName = 'INPUT';
            element.type = 'text';

            expect(isFocusable(element)).toEqual(true);
        });

        it('should return false if element is <input> and type is "hidden"', () => {
            element.nodeName = 'INPUT';
            element.type = 'hidden';

            expect(isFocusable(element)).toEqual(false);
        });

        it('should return false if element is <input> and type is "hidden"', () => {
            element.nodeName = 'INPUT';
            element.type = 'file';

            expect(isFocusable(element)).toEqual(false);
        });
    });
});
