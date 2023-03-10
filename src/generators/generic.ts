import { Generator } from '../types';
import { codegenSetCSSVariable } from '../helpers';
import { toKebabCase } from '@grozav/utils';

const cssProperties = [
    'border',
    'border-radius',
    'border-top-left-radius',
    'border-top-right-radius',
    'border-bottom-right-radius',
    'border-bottom-left-radius',
    'border-width',
    'border-top-width',
    'border-right-width',
    'border-bottom-width',
    'border-left-width',
    'border-style',
    'border-top-style',
    'border-right-style',
    'border-bottom-style',
    'border-left-style',
    'color',
    'background',
    'margin',
    'margin-top',
    'margin-right',
    'margin-bottom',
    'margin-left',
    'padding',
    'padding-top',
    'padding-right',
    'padding-bottom',
    'padding-left',
    'transition',
    'transition-property',
    'transition-duration',
    'transition-timing-function',
    'height',
    'width'
];

export const genericGenerator: Generator<string> = {
    name: 'generic',
    location: 'root',
    test: /(.+)$/,
    apply: ({ value, path }) => {
        const [, ...variablePath] = path;
        const mappedPath = variablePath.map((part) => toKebabCase(part));

        let cssVariableName = mappedPath[0];
        let isCssPropertyPart = false;
        for (const part of mappedPath.slice(1)) {
            cssVariableName = `${cssVariableName}${isCssPropertyPart ? '-' : '--'}${part}`;

            if (cssProperties.includes(part)) {
                isCssPropertyPart = true;
            }
        }

        return [codegenSetCSSVariable(cssVariableName, value)];
    }
};

export const genericGenerators = [genericGenerator];
