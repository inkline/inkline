export interface ManifestEntry {
    name: string;
    description: string;
}

export interface ManifestProp extends ManifestEntry {
    type: string[];
    default: string;
}

export interface ManifestCSSVariable extends ManifestEntry {
    type?: string;
    value?: string | string[];
    variants?: {
        [key: string]: string;
    }
}

export interface ManifestCSS {
    selector: string;
    type: string;
    defaults: {
        size: string;
        color: string;
        [key: string]: string;
    };
    variables: ManifestCSSVariable[]
}

export interface Manifest {
    name: string;
    events: ManifestEntry[];
    slots: ManifestEntry[];
    props: ManifestProp[];
    css: ManifestCSS;
}
