import { Classes } from '../../types';
declare const _default: import("vue").DefineComponent<Readonly<import("vue").ComponentPropsOptions<{
    [x: string]: unknown;
}>>, unknown, {
    visible: boolean;
}, {
    classes(): Classes;
}, {
    show(): void;
    hide(): void;
    onClickOutside(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<(readonly unknown[] & {
    [x: number]: string;
} & {
    [Symbol.iterator]?: IterableIterator<string> | undefined;
    length?: number | undefined;
    toString?: string | undefined;
    toLocaleString?: string | undefined;
    concat?: string[] | undefined;
    join?: string | undefined;
    slice?: string[] | undefined;
    indexOf?: ((searchElement: string, fromIndex?: number | undefined) => number) | undefined;
    lastIndexOf?: ((searchElement: string, fromIndex?: number | undefined) => number) | undefined;
    every?: {
        <S extends string>(predicate: (value: string, index: number, array: readonly string[]) => value is S, thisArg?: any): this is readonly S[];
        (predicate: (value: string, index: number, array: readonly string[]) => unknown, thisArg?: any): boolean;
    } | undefined;
    some?: ((predicate: (value: string, index: number, array: readonly string[]) => unknown, thisArg?: any) => boolean) | undefined;
    forEach?: ((callbackfn: (value: string, index: number, array: readonly string[]) => void, thisArg?: any) => void) | undefined;
    map?: (<U>(callbackfn: (value: string, index: number, array: readonly string[]) => U, thisArg?: any) => U[]) | undefined;
    filter?: {
        <S_1 extends string>(predicate: (value: string, index: number, array: readonly string[]) => value is S_1, thisArg?: any): S_1[];
        (predicate: (value: string, index: number, array: readonly string[]) => unknown, thisArg?: any): string[];
    } | undefined;
    reduce?: {
        (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: readonly string[]) => string): string;
        (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: readonly string[]) => string, initialValue: string): string;
        <U_1>(callbackfn: (previousValue: U_1, currentValue: string, currentIndex: number, array: readonly string[]) => U_1, initialValue: U_1): U_1;
    } | undefined;
    reduceRight?: {
        (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: readonly string[]) => string): string;
        (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: readonly string[]) => string, initialValue: string): string;
        <U_2>(callbackfn: (previousValue: U_2, currentValue: string, currentIndex: number, array: readonly string[]) => U_2, initialValue: U_2): U_2;
    } | undefined;
    find?: {
        <S_2 extends string>(predicate: (this: void, value: string, index: number, obj: readonly string[]) => value is S_2, thisArg?: any): S_2 | undefined;
        (predicate: (value: string, index: number, obj: readonly string[]) => unknown, thisArg?: any): string | undefined;
    } | undefined;
    findIndex?: ((predicate: (value: string, index: number, obj: readonly string[]) => unknown, thisArg?: any) => number) | undefined;
    entries?: IterableIterator<[number, string]> | undefined;
    keys?: IterableIterator<number> | undefined;
    values?: IterableIterator<string> | undefined;
    includes?: ((searchElement: string, fromIndex?: number | undefined) => boolean) | undefined;
    flatMap?: (<U_3, This = undefined>(callback: (this: This, value: string, index: number, array: string[]) => U_3 | readonly U_3[], thisArg?: This | undefined) => U_3[]) | undefined;
    flat?: unknown[] | undefined;
}) | ({
    [x: string]: unknown;
} & {} & {
    [x: string]: import("vue").Prop<unknown, unknown> | null | undefined;
})>, {
    [x: number]: string;
} | {}>;
export default _default;
