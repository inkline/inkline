import { removeClass } from '@inkline/inkline/helpers';

describe('Helpers', () => {
    describe('removeClass()', () => {
        it('should return if element not provided', () => {
            expect((removeClass as any)(undefined, undefined)).toEqual(undefined);
        });

        it('should return if classes not provided', () => {
            expect((removeClass as any)(true, undefined)).toEqual(undefined);
        });

        describe('className', () => {
            let element: HTMLElement;

            beforeEach(() => {
                element = {
                    className: ''
                } as HTMLElement;
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

            it('should ignore double spaces', () => {
                element.className = 'class1   class2';

                removeClass(element, 'class1');

                expect(element.className).toEqual('class2');
            });

            it('should continue if empty string given', () => {
                element.className = 'class1 class2';

                removeClass(element, ' ');

                expect(element.className).toEqual('class1 class2');
            });
        });

        describe('classList', () => {
            let element: HTMLElement;

            beforeEach(() => {
                element = {
                    classList: {
                        remove() {}
                    }
                } as HTMLElement;
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
