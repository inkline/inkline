import {
    codegenCssVariables,
    defineGenerator,
    defineGeneratorValueFn,
    getCssVariableName,
    getCssVariablePreamble,
    getCssVariablePreamblePath
} from '../utils';
import { GeneratorType } from '../types';

export const generateGeneric = defineGeneratorValueFn<string | number>((value, meta) => {
    const variablePreamblePath = getCssVariablePreamblePath(meta);
    const variablePreamble = getCssVariablePreamble(variablePreamblePath);
    const variableName = getCssVariableName(meta);

    return [codegenCssVariables.set(`${variablePreamble}${variableName}`, `${value}`)];
});

export const genericFieldGenerator = defineGenerator<any>({
    key: /.*/,
    type: GeneratorType.CssVariables,
    generate: generateGeneric
});
