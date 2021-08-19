export interface ManifestEvent {
    name: string;
    description: string;
    type: string[];
}

export interface ManifestSlot {
    name: string;
    description: string;
    type: string[];
}

export interface ManifestProp {
    name: string;
    description: string;
    type: string[];
    default: string;
}


export interface ManifestCSSVariable {
    name: string;
    description: string;
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
    events: ManifestEvent[];
    slots: ManifestSlot[];
    props: ManifestProp[];
    css: ManifestCSS;
}
