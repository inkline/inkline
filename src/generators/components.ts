import {
    defineGenerator,
    defineGeneratorValueFn,
    createFieldWithVariantsGenerateFn,
    matchKey,
    getResolvedPath,
    toKebabCase
} from '../utils';
import {
    Generator,
    GeneratorType,
    GeneratorPriority,
    ResolvedTheme,
    ResolvedThemeComponent
} from '../types';
import { animationGenerator } from './animation';
import { backgroundGenerator, colorGenerator } from './colors';
import { boxShadowGenerator } from './boxShadow';
import { borderGenerator } from './border';
import { marginGenerator, paddingGenerator } from './spacing';
import { borderRadiusGenerator } from './borderRadius';
import { typographyFontSizeGenerator, typographyFontWeightGenerator } from './typography';
import { genericFieldWithVariantsGenerator } from './generic';
import { transitionGenerator } from './transition';

const componentGenerators: Generator<any>[] = [
    animationGenerator,
    backgroundGenerator,
    boxShadowGenerator,
    borderGenerator,
    borderRadiusGenerator,
    colorGenerator,
    marginGenerator,
    paddingGenerator,
    transitionGenerator,
    { ...typographyFontSizeGenerator, key: 'fontSize' },
    { ...typographyFontWeightGenerator, key: 'fontWeight' }
];

export const generateComponent = defineGeneratorValueFn<ResolvedThemeComponent>(
    (component, meta) => {
        const path = getResolvedPath(meta);
        const tokens: string[] = [];
        const variantName = path[path.length - 1];

        Object.keys(component).forEach((propertyName) => {
            const propertyValue = component[propertyName];
            const generator = componentGenerators.find((generator) =>
                matchKey(propertyName, generator.key)
            );
            const generatorPath = [
                ...(variantName === 'default' ? meta.path.slice(0, -1) : meta.path),
                propertyName
            ];

            if (generator) {
                tokens.push(
                    ...generator.generate(
                        typeof propertyValue === 'object' && 'default' in propertyValue
                            ? propertyValue
                            : { default: propertyValue },
                        {
                            ...meta,
                            path: generatorPath
                        }
                    )
                );
            } else if (typeof propertyValue === 'object') {
                tokens.push(
                    ...generateComponent(propertyValue, {
                        ...meta,
                        path: [
                            ...(variantName === 'default' ? meta.path.slice(0, -1) : meta.path),
                            propertyName
                        ]
                    })
                );
            } else {
                tokens.push(
                    ...genericFieldWithVariantsGenerator.generate(
                        { default: propertyValue },
                        {
                            ...meta,
                            path: generatorPath
                        }
                    )
                );
            }
        });

        return tokens;
    }
);

export const componentsGenerator = defineGenerator<ResolvedTheme['components'][string]>({
    key: 'components.*',
    type: GeneratorType.CssVariables,
    priority: GeneratorPriority.Lowest,
    generate: createFieldWithVariantsGenerateFn(generateComponent)
});

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
        if (typeof obj[key] === 'undefined') {
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
    key: 'components.*',
    type: GeneratorType.Default,
    priority: GeneratorPriority.Low,
    generate: (value, meta) => {
        const result = [];
        const path = getResolvedPath(meta);
        const variants = Object.keys(value).filter((key) => key !== 'default');
        const componentName = toKebabCase(path[path.length - 1]);
        const componentSelector = `.${componentName}`;

        result.push(`@use '../mixins/variants';`);
        result.push(`@layer components {`);
        result.push(`${componentSelector} {`);

        for (const variant of variants) {
            const variantName = toKebabCase(variant);

            result.push(`@include variants.selector('${variantName}') {`);
            result.push(...generateIncludeProperties(value[variant], componentName, variantName));
            result.push(`}`);
        }

        result.push('}');
        result.push('}');

        return result;
    }
});
