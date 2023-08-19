import { CSSProperties } from 'vue';

export interface Classes {
    [key: string]: boolean;
}

export type Styles = CSSProperties;

export interface SvgNode {
    name: string,
    type: string,
    value: string,
    attributes: Record<string, string>,
    children: SvgNode[]
}
