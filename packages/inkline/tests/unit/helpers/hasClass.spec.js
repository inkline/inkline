import { hasClass } from '@inkline/inkline/src/helpers/hasClass';

describe('Helpers', () => {
    describe('hasClass()', () => {
        it('should return false if element not defined', () => {
            expect(hasClass(undefined, 'test')).toEqual(false);
        });

        it('should return false if className not defined', () => {
            expect(hasClass({}, undefined)).toEqual(false);
        });

        it('should throw error if className contains spaces', () => {
            expect(() => hasClass({}, 'class1 class2')).toThrowError();
        });

        describe('className', () => {
            let element;

            beforeEach(() => {
                element = {
                    className: ''
                };
            });

            it('should return false if className not found', () => {
                element.className = 'class';

                expect(hasClass(element, 'other')).toEqual(false);
            });

            it('should return true if className found', () => {
                element.className = 'class';

                expect(hasClass(element, 'class')).toEqual(true);
            });
        });

        describe('classList', () => {
            let element;

            beforeEach(() => {
                element = {
                    classList: {
                        contains: () => {}
                    }
                };
            });

            it('should call classList contains()', () => {
                const spy = jest.spyOn(element.classList, 'contains');

                hasClass(element, 'other');

                expect(spy).toHaveBeenCalled();
            });
        });
    });
});
