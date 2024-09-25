import { HSLAColorInlineProperty } from './properties';

export const enum TokenType {
    Variable = 'variable',
    Calc = 'calc',
    Reference = 'reference',
    HSLAColor = 'hsla',
    Selector = 'selector',
    Theme = 'theme'
}

export type PrimitiveTokenValue = number | string | boolean;

export type TokenValue = Calc | Reference | Color | PrimitiveTokenValue | TokenValue[];

export type Variable<Name extends string = string> = {
    __type: TokenType.Variable;
    __name: Name;
    __value: TokenValue;
};

export type Calc = {
    __type: TokenType.Calc;
    __value: any[];
};

export type Reference = {
    __type: TokenType.Reference;
    __name: string;
    __fallback?: TokenValue;
};

export type Color = {
    __type: TokenType.HSLAColor;
    __value: HSLAColorInlineProperty;
};

export type ComponentValue = Record<string, TokenValue>;

export type Selector = {
    __type: TokenType.Selector;
    __name: string;
    __value: ComponentValue;
};

export type Theme = {
    __type: TokenType.Theme;
    __name: string;
    __keys: {
        variables: Set<string>;
        selectors: Set<string>;
    };
    variables: Record<string, Variable>;
    selectors: Record<string, Selector>;
};

export type Themes = Record<string, Theme>;
