import type { SidesPropertyKey } from './generic';

export type Border = {
    width: string;
    style: string;
    color: string;
};

export type BorderSide = SidesPropertyKey;

export type RawThemeBorder = string | Border | Record<BorderSide, string | Border>;

export type ResolvedThemeBorder = Record<BorderSide, Border>;
