import { defineGenerator, getResolvedPath, toKebabCase } from '../utils';
import { GeneratorPriority, GeneratorType, ResolvedTheme } from '../types';

const knownCssProperties = [
    'background',
    'border',
    'box-shadow',
    'border-radius',
    'color',
    'font-size',
    'font-weight',
    'line-height',
    'margin',
    'padding',
    'height',
    'width',
    'transition'
];

export function getPropertyPaths(obj: any, currentPath: string = ''): string[] {
    const paths: string[] = [];

    if (typeof obj !== 'object') {
        return [currentPath];
    }

    for (const key in obj) {
        if (typeof obj[key] === 'undefined' || key.startsWith('$')) {
            continue;
        }

        const newPath = currentPath ? `${currentPath}-${toKebabCase(key)}` : toKebabCase(key);
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            paths.push(...getPropertyPaths(obj[key], newPath));
        } else {
            paths.push(newPath);
        }
    }

    return paths;
}

export function generateIncludeProperties(
    variant: Record<string, any>,
    componentName: string,
    variantName: string,
    path: string[] = []
): string[] {
    const elementOrState = path.map((p) => `'${p}'`).join(' ');
    const elementOrStateString = elementOrState ? `, ${elementOrState}` : '';

    return Object.keys(variant).flatMap((property) => {
        if (property.startsWith('$')) {
            return '';
        }

        const propertyValue = variant[property];
        const propertyName = toKebabCase(property);

        if (knownCssProperties.includes(propertyName)) {
            const propertyPaths = getPropertyPaths(
                propertyValue.default ? propertyValue.default : propertyValue,
                propertyName
            ).map((propertyPath) => {
                if (propertyPath.startsWith('border-radius')) {
                    return `${propertyPath.replace('border-radius-', 'border-')}-radius`;
                }

                return propertyPath;
            });

            return propertyPaths.map((part) => {
                return `@include variants.${part}('${componentName}', '${variantName}'${elementOrStateString});`;
            });
        } else if (typeof variant[property] === 'object') {
            return generateIncludeProperties(variant[property], componentName, variantName, [
                ...path,
                property
            ]);
        }

        return '';
    });
}

export const componentVariantsGenerator = defineGenerator<ResolvedTheme['components'][string]>({
    key: /^components\.[^.]+$/,
    type: GeneratorType.Default,
    priority: GeneratorPriority.Highest,
    sideEffects: true,
    generate: (value, meta) => {
        const result = [];
        const path = getResolvedPath(meta);
        const variants = Object.keys(value).filter(
            (key) => key !== 'default' && !key.startsWith('$')
        );
        const componentName = toKebabCase(path[path.length - 1]);
        const componentSelector = `.${componentName}`;

        result.push(`@use '../mixins/variants';\n`);
        result.push(`${componentSelector} {`);

        for (const variant of variants) {
            const variantName = toKebabCase(variant);

            result.push(`@include variants.selector('${variantName}') {`);
            result.push(...generateIncludeProperties(value[variant], componentName, variantName));
            result.push(`}`);
        }

        result.push('}\n');

        return result;
    }
});
