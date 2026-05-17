import type { TokenValue } from '../tokens';

export interface HSLAColorProperty {
    h: TokenValue;
    s: TokenValue;
    l: TokenValue;
    a: TokenValue;
}

export type HSLAColorInlineProperty = [h: TokenValue, s: TokenValue, l: TokenValue, a: TokenValue];
