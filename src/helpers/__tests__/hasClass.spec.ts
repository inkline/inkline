import { hasClass } from '@inkline/inkline/helpers';

describe('Helpers', () => {
    describe('hasClass()', () => {
        it('should return false if element not defined', () => {
            expect((hasClass as any)(undefined, 'test')).toEqual(false);
        });

        it('should return false if className not defined', () => {
            expect((hasClass as any)({}, undefined)).toEqual(false);
        });

        it('should throw error if className contains spaces', () => {
            expect(() => (hasClass as any)({}, 'class1 class2')).toThrowError();
        });

        describe('className', () => {
            let element: HTMLElement;

            beforeEach(() => {
                element = {
                    className: ''
                } as HTMLElement;
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
            let element: HTMLElement;

            beforeEach(() => {
                element = {
                    classList: {
                        contains: () => {}
                    }
                } as any;
            });

            it('should call classList contains()', () => {
                const spy = vi.spyOn(element.classList, 'contains');

                hasClass(element, 'other');

                expect(spy).toHaveBeenCalled();
            });
        });
    });
});
