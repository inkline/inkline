export interface ComponentManifestProp {
    name: string;
    type: string[];
    default: string;
    description: string;
}

export interface ComponentManifestEvent {
    name: string;
    description: string;
}

export interface ComponentManifestSlot {
    name: string;
    description: string;
}

export interface ComponentManifestCssVariable {
    name?: string;
    value?: ComponentManifestCssVariable[] | string;
    variants?: ComponentManifestCssVariable[];
}

export interface ComponentManifestCss {
    selector: string;
    variables: ComponentManifestCssVariable[];
}

export interface ComponentManifest {
    name: string;
    props?: ComponentManifestProp[];
    events?: ComponentManifestEvent[];
    slots?: ComponentManifestSlot[];
    css?: ComponentManifestCss;
}
