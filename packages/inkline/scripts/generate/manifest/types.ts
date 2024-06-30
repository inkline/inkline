import { Block } from 'comment-parser';

export interface ContextBlock extends Block {
    context: string[];
}

export interface ManifestEntry {
    name: string;
    description: string;
}

export interface ManifestProp extends ManifestEntry {
    type: string[];
    default: string;
}

export interface ManifestCSSVariable {
    name?: string;
    value?: ManifestCSSVariable[] | number | string;
    variants?: ManifestCSSVariable[];
}

export interface ManifestCSS {
    selector: string;
    variables: ManifestCSSVariable[];
}

export interface Manifest {
    name: string;
    events: ManifestEntry[];
    slots: ManifestEntry[];
    props: ManifestProp[];
    css: ManifestCSS;
}
