import {
    defineGenerator,
    defineGeneratorValueFn,
    createFieldWithVariantsGenerateFn,
    matchKey,
    getResolvedPath
} from '../utils';
import {
    Generator,
    GeneratorType,
    GeneratorPriority,
    ResolvedTheme,
    ResolvedThemeComponent
} from '../types';
import { backgroundGenerator, colorGenerator } from './colors';
import { boxShadowGenerator } from './boxShadow';
import { borderGenerator } from './border';
import { marginGenerator, paddingGenerator } from './spacing';
import { borderRadiusGenerator } from './borderRadius';
import {
    typographyFontFamilyGenerator,
    typographyFontSizeGenerator,
    typographyFontWeightGenerator
} from './typography';
import { genericGenerator } from './generic';
import { transitionGenerator } from './transition';

const componentGenerators: Generator<any>[] = [
    backgroundGenerator,
    boxShadowGenerator,
    borderGenerator,
    borderRadiusGenerator,
    colorGenerator,
    marginGenerator,
    paddingGenerator,
    { ...transitionGenerator, key: 'transition' },
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
                    ...genericGenerator.generate(
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
