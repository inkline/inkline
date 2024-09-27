import { clone } from './clone';

describe('Helpers', () => {
    describe('clone()', () => {
        describe('Object', () => {
            it('should return different object instance', () => {
                const object = {};

                expect(clone(object)).toEqual(object);
                expect(clone(object) === object).not.toEqual(true);
            });

            it('should clone object with one level of nesting', () => {
                const object = { a: 1, b: 2 };
                const cloned = clone(object);

                expect(cloned).toEqual(object);
            });

            it('should clone object with multiple levels of nesting', () => {
                const object = { a: 1, b: { c: 2, d: { e: 3 } } };
                const cloned = clone(object);

                expect(cloned).toEqual(object);
            });
        });

        describe('Array', () => {
            it('should return different array instance', () => {
                const object: any[] = [];

                expect(clone(object)).toEqual(object);
                expect(clone(object) === object).not.toEqual(true);
            });

            it('should recursively clone array', () => {
                const object = [{ a: 1 }, { b: 2 }];
                const cloned = clone(object);

                expect(cloned).toEqual(object);
                expect(cloned[0] === object[0]).not.toEqual(true);
            });

            it('should add array custom fields', () => {
                const object: any[] = [];
                (object as any).field = 'example';
                const cloned = clone(object);
                expect(cloned.field).toEqual((object as any).field);
            });
        });
    });
});
