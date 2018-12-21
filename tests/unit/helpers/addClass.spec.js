import { addClass } from 'inkline/helpers/addClass';

describe('Helpers', () => {
    describe('addClass', () => {
        it('should return if element not provided', () => {
            expect(addClass(undefined, undefined)).toEqual(undefined);
        });

        describe('className', () => {
            let element;

            beforeEach(() => {
                element = {
                    className: ''
                };
            });

            it('should not add class if class already exists', () => {
                element.className = 'test';

                addClass(element, 'test');

                expect(element.className).toEqual('test');
            });

            it('should not add any class if classes not provided', () => {
                addClass(element, '');

                expect(element.className).toEqual('');
            });

            it('should add a class', () => {
                addClass(element, 'class');

                expect(element.className).toEqual(' class');
            });

            it('should add multiple classes', () => {
                addClass(element, 'class1 class2');

                expect(element.className).toEqual(' class1 class2');
            });
        });

        describe('classList', () => {
            let element;

            beforeEach(() => {
                element = {
                    classList: {
                        add() {}
                    }
                }
            });

            it('should not add any class if classes not provided', () => {
                addClass(element, '');

                expect(element.className).toEqual(undefined);
            });

            it('should add a class', () => {
                const spy = jest.spyOn(element.classList, 'add');

                addClass(element, 'class');

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('class');
            });

            it('should add multiple classes', () => {
                const spy = jest.spyOn(element.classList, 'add');

                addClass(element, 'class1 class2');

                expect(spy).toHaveBeenCalledTimes(2);
                expect(spy).toHaveBeenCalledWith('class1');
                expect(spy).toHaveBeenCalledWith('class2');
            });
        });
    });
});
