import {
    defineGenerator,
    createGenerateFn,
    createGenericDesignTokenVariantGenerateFn,
    defineGeneratorValueFn,
    codegenCssVariables,
    shouldGenerateAggregateValue,
    getResolvedPath
} from '../utils';
import {
    GeneratorPriority,
    GeneratorType,
    ResolvedTheme,
    ResolvedThemeScaleRatio,
    ResolvedThemeValueType
} from '../types';

export const generateScaleRatio = defineGeneratorValueFn<ResolvedThemeScaleRatio>((value, meta) => {
    const path = getResolvedPath(meta);
    const tokens = createGenericDesignTokenVariantGenerateFn({
        replacePath: (p) => ['scaleRatio', ...p.slice(1)]
    })(value, meta);

    if (shouldGenerateAggregateValue(meta) && path[path.length - 1] === 'default') {
        [1, 2, 3, 4, 5, 6].forEach((pow) => {
            const scaleRatioCssVariable = codegenCssVariables.get(`scale-ratio`);

            tokens.push(
                codegenCssVariables.set(
                    `scale-ratio-pow-${pow}`,
                    `calc(${new Array(pow).fill(scaleRatioCssVariable).join(' * ')})`
                )
            );
        });
    }

    return tokens;
});

export const scaleRatiosGenerator = defineGenerator<
    ResolvedThemeValueType<ResolvedTheme['scaleRatios']>
>({
    key: /^scaleRatios\.[^.]+$/,
    type: GeneratorType.CssVariables,
    priority: GeneratorPriority.Highest,
    generate: createGenerateFn(generateScaleRatio)
});
