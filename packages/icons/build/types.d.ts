export interface Svg {
    name: string;
    type: string;
    value: string;
    attributes: Record<string, string>;
    children: Svg[];
}
