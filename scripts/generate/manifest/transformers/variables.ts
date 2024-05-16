import type { Spec } from 'comment-parser';
import type { ManifestCSSVariable, ContextBlock } from '../types';

export const sassValueRegEx = /-*[\w-]+:(.+);/;
export const sassInterpolationRegEx = /^#{(.*)}$/;

export const mapBlocksToVariants = (blocks: ContextBlock[]) =>
    blocks.reduce((acc: any, { description, tags, context }) => {
        const { name } = tags.find(({ tag }) => tag === 'name') as Spec;
        const { name: type } = (tags.find(({ tag }) => tag === 'type') || { name: '' }) as Spec;
        const value = context[0]
            .replace(sassValueRegEx, '$1')
            .trim()
            .replace(sassInterpolationRegEx, '$1');

        if (type === 'variant') {
            acc.push({
                name,
                type,
                description,
                variables: []
            });
        } else {
            acc[acc.length - 1].variables.push({
                name,
                type,
                value,
                description
            });
        }

        return acc;
    }, []);

export const mapBlocksToVariables = (blocks: ContextBlock[]): ManifestCSSVariable[] =>
    blocks.map(({ description, tags }) => {
        const { name } = tags.find(({ tag }) => tag === 'name') as Spec;
        const { name: type } = (tags.find(({ tag }) => tag === 'type') || { name: '' }) as Spec;

        return {
            name,
            description,
            type
        };
    });

export function mapVariantsToVariables(
    variables: ManifestCSSVariable[],
    unmappedVariants: ManifestCSSVariable[][],
    depth = 0,
    seenVariants: string[] = []
): ManifestCSSVariable[] {
    return variables.reduce<ManifestCSSVariable[]>((acc, variable) => {
        const variants = unmappedVariants.flat().filter(({ name }) => {
            const variableNameBasedOnVariant = name
                ?.split('--')
                .filter((part, index) => index !== 2)
                .join('--');

            return variableNameBasedOnVariant === variable.name && !seenVariants.includes(name!);
        });

        if (variants.length > 0) {
            seenVariants.push(...variants.map(({ name }) => name!));
        }

        const isDuplicate = acc.find(({ name }) => name === variable.name);
        const isFoundAsChild =
            depth === 0 &&
            variables.find(
                ({ value, name }) =>
                    Array.isArray(value) &&
                    name?.split('--').length === 3 &&
                    value.find((child) => child.name === variable.name)
            );

        if (!isDuplicate && !isFoundAsChild) {
            acc.push({
                name: variable.name,
                ...(variable.value
                    ? {
                          value: Array.isArray(variable.value)
                              ? mapVariantsToVariables(
                                    variable.value,
                                    unmappedVariants,
                                    depth + 1,
                                    seenVariants
                                )
                              : variable.value
                      }
                    : {}),
                ...(variants.length > 0 ? { variants } : {})
            });
        }

        return acc;
    }, []);
}

export const partsMap: Record<string, string> = {
    'animation-property': 'animation',
    'animation-duration': 'animation',
    'animation-timing-function': 'animation',
    'animation-delay': 'animation',
    'padding-left': 'padding',
    'padding-right': 'padding',
    'padding-top': 'padding',
    'padding-bottom': 'padding',
    'margin-left': 'margin',
    'margin-right': 'margin',
    'margin-top': 'margin',
    'margin-bottom': 'margin',
    'color-h': 'color',
    'color-s': 'color',
    'color-l': 'color',
    'color-a': 'color',
    'background-h': 'background',
    'background-s': 'background',
    'background-l': 'background',
    'background-a': 'background',
    'transition-property': 'transition',
    'transition-duration': 'transition',
    'transition-timing-function': 'transition',
    'transition-delay': 'transition',
    'border-top-left-radius': 'border-radius',
    'border-top-right-radius': 'border-radius',
    'border-bottom-left-radius': 'border-radius',
    'border-bottom-right-radius': 'border-radius',
    'border-top-width': 'border-width',
    'border-right-width': 'border-width',
    'border-bottom-width': 'border-width',
    'border-left-width': 'border-width',
    'border-top-color': 'border-color',
    'border-right-color': 'border-color',
    'border-bottom-color': 'border-color',
    'border-left-color': 'border-color',
    'border-top-style': 'border-style',
    'border-right-style': 'border-style',
    'border-bottom-style': 'border-style',
    'border-left-style': 'border-style'
};

export function extractVariableParts(variable: ManifestCSSVariable) {
    const variableName = variable.name!;
    const variableValue = variable.value;
    const nameParts = variableName.split('--').slice(1);
    const aggregatedComponentName = nameParts[0];
    const componentStateOrElements = nameParts.slice(1, -1);
    const aggregatedComponentStateOrElements =
        componentStateOrElements.length > 0 ? `--${componentStateOrElements.join('--')}` : '';
    const propertyName = nameParts[nameParts.length - 1];
    const aggregatedPropertyName = partsMap[propertyName] || propertyName;
    const aggregatedVariableName = `--${aggregatedComponentName}${aggregatedComponentStateOrElements}--${aggregatedPropertyName}`;

    return {
        variableName,
        aggregatedVariableName,
        aggregatedComponentName,
        variableValue,
        propertyName,
        aggregatedPropertyName,
        componentStateOrElements,
        aggregatedComponentStateOrElements
    };
}

export function mapDefinedCssVariablesToUsedCssVariables(
    definedCssVariables: ManifestCSSVariable[],
    usedCssVariables: ManifestCSSVariable[]
): ManifestCSSVariable[] {
    const variablesMap: Record<string, string[]> = {};
    const variantsMap: Record<string, string[]> = {};

    for (const variable of usedCssVariables) {
        const { variableName, aggregatedVariableName } = extractVariableParts(variable);

        variablesMap[aggregatedVariableName] = variablesMap[aggregatedVariableName] || [];
        variantsMap[aggregatedVariableName] = variantsMap[aggregatedVariableName] || [];

        if (
            variableName !== aggregatedVariableName &&
            !variablesMap[aggregatedVariableName].includes(variableName)
        ) {
            variablesMap[aggregatedVariableName].push(variableName);
        }
    }

    for (const variable of definedCssVariables) {
        const {
            variableName,
            aggregatedVariableName,
            aggregatedComponentName,
            componentStateOrElements,
            aggregatedPropertyName
        } = extractVariableParts(variable);

        if (variablesMap[aggregatedVariableName] && aggregatedVariableName !== variableName) {
            variablesMap[aggregatedVariableName].push(variableName);
            continue;
        }

        if (variantsMap[aggregatedVariableName]) {
            continue;
        }

        for (let i = componentStateOrElements.length; i >= 0; i--) {
            const matchingComponentStateOrParts = componentStateOrElements.slice(0, i);
            const matchingMatchingComponentStateOrPartsString =
                matchingComponentStateOrParts.length > 0
                    ? `--${matchingComponentStateOrParts.join('--')}`
                    : '';
            const matchingVariableName = `--${aggregatedComponentName}${matchingMatchingComponentStateOrPartsString}--${aggregatedPropertyName}`;

            if (variantsMap[matchingVariableName]) {
                if (matchingVariableName !== aggregatedVariableName) {
                    variantsMap[matchingVariableName].push(aggregatedVariableName);
                }

                if (aggregatedVariableName !== variableName) {
                    variablesMap[aggregatedVariableName] =
                        variablesMap[aggregatedVariableName] || [];

                    if (!variablesMap[aggregatedVariableName].includes(variableName)) {
                        variablesMap[aggregatedVariableName].push(variableName);
                    }
                }
            }
        }
    }

    function createManifestVariable(variableName: string): ManifestCSSVariable {
        // Create the base variable structure
        const variableValue = definedCssVariables.find(({ name }) => name === variableName)?.value;
        const variableParts = (variablesMap[variableName] ?? []).map((variablePartName) => ({
            name: variablePartName,
            value: definedCssVariables.find(({ name }) => name === variablePartName)?.value
        }));

        // Recursively handle variants
        let variants: ManifestCSSVariable[] = [];
        if (variantsMap[variableName]) {
            variants = variantsMap[variableName].map((variantKey) =>
                createManifestVariable(variantKey)
            );
        }

        return {
            name: variableName,
            value: variableParts.length === 0 && variableValue ? variableValue : variableParts,
            ...(variants.length > 0 && { variants })
        };
    }

    return Object.keys(variablesMap)
        .filter((key) => !Object.values(variantsMap).find((keys) => keys.includes(key)))
        .map(createManifestVariable);
}
