export type Border = {
    width: string;
    style: string;
    color: string;
};

export type BorderSide = 'top' | 'right' | 'bottom' | 'left';

export type RawThemeBorder = string | Border | Record<BorderSide, string | Border>;

export type ResolvedThemeBorder = Record<BorderSide, Border>;
