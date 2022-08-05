export enum GeneratorLocationKeyword {
    Schemes = 'schemes',
}

export enum GeneratorLocationDefault {
    Root = 'root',
    None = 'none',
}

export type GeneratorLocation = GeneratorLocationDefault | `${GeneratorLocationKeyword}/${string}`;

export enum GeneratorPriority {
    High = 0,
    Medium = 1,
    Low = 2,
}
