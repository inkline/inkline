import { removeClass } from '@inkline/inkline/helpers/removeClass';

describe('Helpers', () => {
    describe('removeClass()', () => {
        it('should return if element not provided', () => {
            expect(removeClass(undefined, undefined)).toEqual(undefined);
        });

        it('should return if classes not provided', () => {
            expect(removeClass(true, undefined)).toEqual(undefined);
        });

        describe('className', () => {
            let element;

            beforeEach(() => {
                element = {
                    className: ''
                };
            });

            it('should not remove class if class doesn\'t exist', () => {
                element.className = 'other';

                removeClass(element, 'test');

                expect(element.className).toEqual('other');
            });

            it('should remove a class', () => {
                element.className = 'class';

                removeClass(element, 'class');

                expect(element.className).toEqual('');
            });

            it('should remove multiple classes', () => {
                element.className = 'class1 class2 class3';

                removeClass(element, 'class1 class2');

                expect(element.className).toEqual('class3');
            });
        });

        describe('classList', () => {
            let element;

            beforeEach(() => {
                element = {
                    classList: {
                        remove() {}
                    }
                }
            });

            it('should add a class', () => {
                const spy = jest.spyOn(element.classList, 'remove');

                removeClass(element, 'class');

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('class');
            });

            it('should remove multiple classes', () => {
                const spy = jest.spyOn(element.classList, 'remove');

                removeClass(element, 'class1 class2');

                expect(spy).toHaveBeenCalledTimes(2);
                expect(spy).toHaveBeenCalledWith('class1');
                expect(spy).toHaveBeenCalledWith('class2');
            });
        });
    });
});
