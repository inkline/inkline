import { HSLAColorInlineProperty } from './properties';
import { ExportedName } from './namespaces';
import { CamelCase } from 'type-fest';

export const enum TokenType {
    Variable = 'variable',
    Calc = 'calc',
    Reference = 'reference',
    HSLAColor = 'hsla',
    Selector = 'selector',
    Keyframes = 'keyframes',
    AtRule = 'media',
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
    __id: string;
    __type: TokenType.Selector;
    __name: string;
    __value: ComponentValue;
};

export type AtRules = 'media' | 'supports' | 'keyframes';

export type AtRuleValue = ComponentValue | Selector | Selector[];

export type AtRule = {
    __id: string;
    __type: TokenType.AtRule;
    __name: AtRules;
    __identifier: string;
    __value: AtRuleValue;
};

export type Theme = {
    __type: TokenType.Theme;
    __name: string;
    __keys: {
        variables: Set<string>;
        selectors: Set<string>;
    };
    variables: Record<string, Variable>;
    selectors: Array<Selector | AtRule>;
};

export type Themes = Record<string, Theme>;

export type ColorComposedReturnKey<RootKey extends string> = ExportedName<RootKey>;

export type ColorPartsReturnKeys<RootKey extends string> =
    `${ColorComposedReturnKey<RootKey>}${'H' | 'S' | 'L' | 'A'}`;

export type ColorVariantKeys<VariantKeys extends string> =
    | CamelCase<VariantKeys>
    | ColorPartsReturnKeys<VariantKeys>;
