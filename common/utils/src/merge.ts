type TAllKeys<T> = T extends any ? keyof T : never;

type TIndexValue<T, K extends PropertyKey, D = never> = T extends any
    ? K extends keyof T
        ? T[K]
        : D
    : never;

type TPartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>> extends infer O
    ? { [P in keyof O]: O[P] }
    : never;

type TFunction = (...a: any[]) => any;

type TPrimitives = string | number | boolean | bigint | symbol | Date | TFunction;

type TMerged<T> = [T] extends [Array<any>]
    ? { [K in keyof T]: TMerged<T[K]> }
    : [T] extends [TPrimitives]
      ? T
      : [T] extends [object]
        ? TPartialKeys<{ [K in TAllKeys<T>]: TMerged<TIndexValue<T, K>> }, never>
        : T;

interface GenericObject {
    [key: string]: any;
}

export interface MergeOptions {
    /**
     * When `true`, values explicitly provided as `undefined` will override existing values, though properties that are simply omitted won't affect anything.
     * When `false`, values explicitly provided as `undefined` won't override existing values.
     *
     * Default: `true`
     */
    allowUndefinedOverrides: boolean;

    /**
     * When `true` it will merge array properties.
     * When `false` it will replace array properties with the last instance entirely instead of merging their contents.
     *
     * Default: `true`
     */
    mergeArrays: boolean;

    /**
     * When `true` it will ensure there are no duplicate array items.
     * When `false` it will allow duplicates when merging arrays.
     *
     * Default: `true`
     */
    uniqueArrayItems: boolean;
}

const defaultOptions: MergeOptions = {
    allowUndefinedOverrides: true,
    mergeArrays: true,
    uniqueArrayItems: true
};

function isObject(object: unknown): object is Record<string, unknown> {
    if (typeof object === 'object' && object !== null) {
        if (typeof Object.getPrototypeOf === 'function') {
            const prototype: unknown = Object.getPrototypeOf(object);
            return prototype === Object.prototype || prototype === null;
        }

        return Object.prototype.toString.call(object) === '[object Object]';
    }

    return false;
}

export function createMerge(userOptions: Partial<MergeOptions> = {}) {
    const options: MergeOptions = { ...defaultOptions, ...userOptions };

    return function merge<T extends GenericObject[]>(...args: T): TMerged<T[number]> {
        return args.reduce((result, current) => {
            if (Array.isArray(current)) {
                throw new TypeError('Arguments provided to merge must be objects, not arrays.');
            }

            Object.keys(current).forEach((key) => {
                if (['__proto__', 'constructor', 'prototype'].includes(key)) {
                    return;
                }

                if (Array.isArray(result[key]) && Array.isArray(current[key])) {
                    result[key] = options.mergeArrays
                        ? options.uniqueArrayItems
                            ? Array.from(new Set((result[key] as unknown[]).concat(current[key])))
                            : [...(result[key] as T), ...(current[key] as T)]
                        : current[key];
                } else if (isObject(result[key]) && isObject(current[key])) {
                    result[key] = merge(
                        result[key] as GenericObject,
                        current[key] as GenericObject
                    );
                } else {
                    result[key] = (
                        current[key] === undefined
                            ? options.allowUndefinedOverrides
                                ? current[key]
                                : result[key]
                            : current[key]
                    ) as T[number];
                }
            });

            return result;
        }, {}) as TMerged<T[number]>;
    };
}

export const merge = createMerge();
