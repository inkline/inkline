import { Generator } from '../types';
import { codegenSetCSSVariable } from '../helpers';
import { toDashCase } from '@grozav/utils';

export const genericGenerator: Generator<string> = {
    name: 'generic',
    location: 'root',
    test: /(.+)$/,
    apply: ({ value, path }) => {
        const [_, ...variablePath] = path;

        return [codegenSetCSSVariable(variablePath.map((part) => toDashCase(part)).join('--'), value)];
    }
};

export const genericGenerators = [
    genericGenerator
];
