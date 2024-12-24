import type { RawTheme } from './theme';
import { ThemeGroup } from './classifier';

export interface ResolverMeta {
    path: string[];
    theme: ThemeGroup<RawTheme>;
    resolvers: Resolver<any, any>[];
}

export interface Resolver<Raw, Resolved> {
    key: string | RegExp | Array<RegExp | string>;
    ignore?: string | RegExp | Array<RegExp | string>;
    resolve: (value: Raw, meta: ResolverMeta) => Resolved;
}

export type ResolverRawValue<R> = R extends Resolver<infer Raw, infer _> ? Raw : never;
export type ResolverResolvedValue<R> =
    R extends Resolver<infer _, infer Resolved> ? Resolved : never;

export type ResolveValueFn<RawValue, ResolvedValue> = (
    value: RawValue,
    meta: ResolverMeta
) => ResolvedValue;

export type ResolveVariantFn<RawValue, ResolvedValue> = (
    value: RawValue,
    meta: ResolverMeta
) => ResolvedValue;
