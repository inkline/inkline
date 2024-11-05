import { DOMNode } from '../renderable';

export interface IconDefinition {
    prefix: string;
    name: string;
    body: DOMNode[];
}
