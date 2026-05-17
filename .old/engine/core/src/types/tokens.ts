import type { VariantProps } from '@inkline/types';

export type TokenType =
    | 'theme'
    | 'variable'
    | 'reference'
    | 'selector'
    | 'utility'
    | 'variant'
    | 'media'
    | 'keyframes'
    | 'css';

export type Theme<Name extends string = string> = {
    type: 'theme';
    name: Name;
    variables: Variable[];
    variants: Variant[];
    selectors: Array<Selector | Media | Keyframes>;
    utilities: Utility[];
};

export type Variable<Name extends string = string> = {
    type: 'variable';
    name: Name;
    value: TokenValue;
};

export type Reference<Name extends string = string> = {
    type: 'reference';
    name: Name;
    fallback?: TokenValue;
};

export type CSS = {
    type: 'css';
    value: TokenValue[];
};

export type Selector = {
    type: 'selector';
    query: string;
    declaration: ComponentValue | CSS;
};

export type Media = {
    type: 'media';
    query: string;
    selector: Selector;
};

export type Keyframes = {
    type: 'keyframes';
    name: string;
    declaration: Record<string, ComponentValue>;
};

export type Modifier =
    | 'default'
    | 'hover'
    | 'focus'
    | 'active'
    | 'disabled'
    | 'visited' // Not currently supported
    | 'checked' // Not currently supported
    | 'valid' // Not currently supported
    | 'invalid' // Not currently supported
    | 'first-child' // Not currently supported
    | 'last-child' // Not currently supported
    | 'nth-child' // Not currently supported
    | 'nth-of-type' // Not currently supported
    | 'first-of-type' // Not currently supported
    | 'last-of-type' // Not currently supported
    | 'nth-last-child' // Not currently supported
    | 'nth-last-of-type' // Not currently supported
    | 'before' // Not currently supported
    | 'after'; // Not currently supported

export type Utility = {
    type: 'utility';
    name: string;
    modifier: Modifier | string;
    declaration: ComponentValue | CSS;
};

export type Variant = {
    type: 'variant';
    name: string;
    declaration: VariantProps;
    modifier: Modifier | string;
};

export type PrimitiveTokenValue = number | string | boolean;

export type TokenValue = PrimitiveTokenValue | Variable | Reference | CSS | TokenValue[];

export type ComponentValue = Record<string, TokenValue>;
