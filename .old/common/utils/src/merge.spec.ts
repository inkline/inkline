import { merge } from './merge';

interface INamedObject {
    propertyA: string[];
    propertyB: string;
}

describe('merge', () => {
    const object1 = {
        array: ['a'],
        date: new Date('2020-01-01'),
        functions: {
            func1: () => 'Object 1',
            func2: () => 'Object 1'
        },
        nest: {
            nest: {
                a: 1,
                b: 2
            }
        },
        object: {
            a: 1,
            b: 2
        }
    };
    const object1Backup = { ...object1 };

    const object2 = {
        nest: {
            nest: {
                b: 3,
                d: 5
            }
        },
        object: {
            b: undefined,
            c: 3,
            d: 5
        }
    };
    const object2Backup = { ...object2 };

    const object3 = {
        array: ['b', 'c', 'a'],
        date: new Date('2020-01-02'),
        functions: {
            func2: () => 'Object 3',
            func3: () => 'Object 3'
        },
        nest: {
            nest: {
                c: 4
            }
        },
        object: {
            d: null
        }
    };
    const object3Backup = { ...object3 };

    const namedObject: INamedObject = {
        propertyA: ['a', 'b'],
        propertyB: 'propertyB'
    };

    describe('without options', () => {
        const result = merge(object1, object2, object3);

        it('merges arrays correctly', () => {
            expect(result.array).toEqual(['a', 'b', 'c']);
        });

        it('merges objects with functions correctly', () => {
            const { functions } = result;

            expect(Object.keys(functions)).toEqual(['func1', 'func2', 'func3']);

            expect(functions.func1()).toBe('Object 1');
            expect(functions.func2()).toBe('Object 3');
            expect(functions.func3()).toBe('Object 3');
        });

        it('merges nested objects correctly', () => {
            const { nest } = result.nest;

            expect(nest.a).toBe(1);
            expect(nest.b).toBe(3);
            expect(nest.c).toBe(4);
            expect(nest.d).toBe(5);
            expect(result.nest).toEqual({
                nest: {
                    a: 1,
                    b: 3,
                    c: 4,
                    d: 5
                }
            });
        });

        it('merges objects with undefined values correctly', () => {
            const { object } = result;

            expect(object.a).toBe(1);
            expect(object.c).toBe(3);
            expect(object.d).toBe(null);
            expect(object).toEqual({
                a: 1,
                c: 3,
                d: null
            });
        });

        it('doesn\'t mutate the arguments', () => {
            expect(object1).toEqual(object1Backup);
            expect(object2).toEqual(object2Backup);
            expect(object3).toEqual(object3Backup);
        });

        it('overrides date correctly', () => {
            expect(result.date).toEqual(object3.date);
        });

        it('retains Date instance', () => {
            expect(result.date instanceof Date).toBe(true);
        });

        it('merges a named object', () => {
            const obj = merge(namedObject, { propertyB: 'merged' });

            expect(obj).toEqual({
                propertyA: namedObject.propertyA,
                propertyB: 'merged'
            });
            expect(obj.propertyA).toBe(namedObject.propertyA);
            expect(obj.propertyB).toBe('merged');
        });
    });

    describe('with options', () => {
        describe('allowUndefinedOverrides', () => {
            const result = merge(
                { value: 1 },
                { value: undefined },
                {
                    allowUndefinedOverrides: false
                }
            );

            it('doesn\'t overwrite with undefined values when allowUndefinedOverrides is false', () => {
                expect(result.value).toBe(1);
            });
        });

        describe('uniqueArrayItems', () => {
            const result = merge(
                object1,
                object2,
                object3,
                {
                    uniqueArrayItems: false
                }
            );

            it('allows duplicates when uniqueArrayItems is false', () => {
                expect(result.array).toEqual([...object1.array, ...object3.array]);
            });
        });

        describe('mergeArrays', () => {
            const result = merge(
                object1,
                object2,
                object3,
                {
                    mergeArrays: false
                }
            );

            it('doesn\'t merge arrays when mergeArrays is false', () => {
                expect(result.array).toEqual(object3.array);
            });
        });
    });

    describe('reported issues', () => {
        it('can merge objects with array-like properties', () => {
            expect(merge({ length: 1 }, { length: 2 })).toEqual({ length: 2 });
        });

        it('can\'t merge arrays when provided directly as args', () => {
            expect(() => merge([1], [2])).toThrowError(
                new TypeError(
                    'Arguments provided to ts-deepmerge must be objects, not arrays.'
                )
            );
        });

        it('safeguards against prototype pollution', () => {
            const merged: any = merge(
                {},
                JSON.parse('{ "__proto__": { "hasProto": true } }')
            );

            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            expect(merged.__proto__.hasProto).toBe(undefined);
        });

        it('can merge objects that use `as const`', () => {
            const a = { a: { b: 1, c: 'foo' } } as const;
            const b = { a: { c: 'bar' } } as const;

            const result = merge(a, b);

            expect(result.a.c).toBe('bar');
        });

        it('can merge objects that have inconsistent property value types', () => {
            const a = { a: { b: '1' } };
            const b = { a: { b: 1 } };
            const result = merge(a, b);

            const value = result.a.b;

            expect(value).toBe(1);
        });
    });
});
