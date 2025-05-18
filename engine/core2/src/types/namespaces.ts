import type { CamelCase, Replace } from 'type-fest';

export type NamespaceStringType = string;
export type NamespaceArrayStringType = readonly string[];
export type NamespaceType = NamespaceStringType | NamespaceArrayStringType;

export type ExportedName<T extends string> = Replace<
    CamelCase<Replace<T, '--', '-', { all: true }>>,
    '.',
    '_'
>;

export type JoinNamespaceKeys<Parts extends readonly string[]> = Parts extends []
    ? ''
    : Parts extends readonly [string]
      ? Parts[0]
      : Parts extends readonly [infer First, ...infer Rest]
        ? Rest extends readonly string[]
            ? `${First & string}--${JoinNamespaceKeys<Rest>}`
            : First & string
        : '';

export type NamespacedKey<
    Namespace extends NamespaceType,
    Name extends string
> = Namespace extends string
    ? `${Namespace}--${Name}`
    : Namespace extends readonly string[]
      ? `${JoinNamespaceKeys<Namespace>}--${Name}`
      : never;
