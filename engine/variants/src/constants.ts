import type { PropertyFold } from './types';
import type { VariantState } from '@inkline/types';

export const variantValueReferenceMarker = '{{';

export const propertyFoldingDefinitions: PropertyFold[] = [
    { fold: 'padding', unfold: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'] },
    { fold: 'paddingX', unfold: ['paddingRight', 'paddingLeft'] },
    { fold: 'paddingY', unfold: ['paddingTop', 'paddingBottom'] },
    { fold: 'margin', unfold: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'] },
    { fold: 'marginX', unfold: ['marginRight', 'marginLeft'] },
    { fold: 'marginY', unfold: ['marginTop', 'marginBottom'] },
    {
        fold: 'borderWidth',
        unfold: ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth']
    },
    {
        fold: 'borderColor',
        unfold: ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor']
    },
    {
        fold: 'borderStyle',
        unfold: ['borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle']
    },
    {
        fold: 'borderRadius',
        unfold: [
            'borderTopLeftRadius',
            'borderTopRightRadius',
            'borderBottomRightRadius',
            'borderBottomLeftRadius'
        ]
    }
];

export const propertyToVariableMap: Record<string, string | string[]> = {
    background: 'color',
    margin: 'spacing',
    marginTop: 'spacing',
    marginRight: 'spacing',
    marginBottom: 'spacing',
    marginLeft: 'spacing',
    padding: 'spacing',
    paddingTop: 'spacing',
    paddingRight: 'spacing',
    paddingBottom: 'spacing',
    paddingLeft: 'spacing'
};

export const variantStateKeys: VariantState[] = [
    'default',
    'active',
    'hover',
    'focus',
    'visited',
    'disabled',
    'readonly'
] as const;
