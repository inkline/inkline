import {
    RawThemeBorder,
    type RawThemeBorderRadius,
    type RawThemeBorderRadiusVariant,
    RawThemeBoxShadow,
    RawThemeBreakpoint,
    RawThemeColor,
    RawThemeColorVariant,
    type RawThemeGridColumns,
    type RawThemeGridContainer,
    type RawThemeGridGutter,
    type RawThemeGridGutterVariant,
    RawThemeMargin,
    RawThemeMarginVariant,
    RawThemePadding,
    RawThemePaddingVariant,
    type RawThemePercentage,
    type RawThemeScaleRatio,
    type RawThemeSizeMultiplier,
    type RawThemeSizeMultiplierVariant,
    RawThemeSpacing,
    RawThemeSpacingVariant,
    type RawThemeTransition,
    type RawThemeTypographyColor,
    type RawThemeTypographyFontFamily,
    RawThemeTypographyFontSize,
    type RawThemeTypographyFontSizeVariant,
    RawThemeTypographyFontWeight,
    RawThemeTypographyLetterSpacing,
    RawThemeTypographyLineHeight,
    RawThemeTypographyTextAlignment,
    RawThemeElementDefinition,
    RawThemeAnimation
} from '../modules';
import {
    BuildFile,
    ClassificationType,
    GenerateValueFn,
    Generator,
    Module,
    OutputModifier,
    RawTheme,
    Resolver,
    ResolveValueFn,
    ResolveVariantFn,
    ThemeChildElement,
    RawThemeElement,
    ThemeElementMetadata,
    ThemeGroup,
    ThemeVariable,
    UserConfiguration
} from '../types';
import type { PartialDeep } from 'type-fest';
import { toKebabCase } from './string';
import { isReservedChildElementKey } from './properties';
import { isInternalKey } from './matchKey';
import { isThemeElementDefinition } from './typeGuards';

export function defineConfig(config: UserConfiguration = {}): UserConfiguration {
    config.themes = defineThemes(config.themes ?? {});
    return config;
}

export function defineModule(module: Module): Module {
    return module;
}

export function defineResolver<RawValue, ResolvedValue>(
    resolver: Resolver<RawValue, ResolvedValue>
): Resolver<RawValue, ResolvedValue> {
    return resolver;
}

export function defineResolverValueFn<RawValue, ResolvedValue>(
    fn: ResolveValueFn<RawValue, ResolvedValue>
): ResolveValueFn<RawValue, ResolvedValue> {
    return fn;
}

export function defineResolverVariantFn<RawVariant, ResolvedValue>(
    fn: ResolveVariantFn<RawVariant, ResolvedValue>
): ResolveVariantFn<RawVariant, ResolvedValue> {
    return fn;
}

export function defineGenerator<Resolved>(generator: Generator<Resolved>): Generator<Resolved> {
    return generator;
}

export function defineGeneratorValueFn<ResolvedValue>(
    fn: GenerateValueFn<ResolvedValue>
): GenerateValueFn<ResolvedValue> {
    return fn;
}

export function defineOutputModifier(modifier: OutputModifier) {
    return modifier;
}

export function defineBuildFile(file: BuildFile) {
    return file;
}

export function defineElement<
    ValueType extends RawThemeElementDefinition,
    VariantType extends RawThemeElementDefinition = ValueType
>(
    value: ValueType,
    variants?: Record<string, VariantType>,
    options: { name?: string; selector?: string } = {}
): RawThemeElement {
    const selector = options.selector ?? (options.name ? toKebabCase(options.name) : '');

    const defaultValue = classifyChildElements(value);
    const resolvedVariants: Record<string, RawThemeElementDefinition> = {};
    for (const key in variants) {
        resolvedVariants[key] = classifyChildElements(variants[key]);
    }

    const metadata: ThemeElementMetadata = {
        __type: ClassificationType.Element,
        __selector: selector,
        ...(options.name ? { __name: options.name } : {})
    };

    return {
        ...metadata,
        default: defaultValue,
        ...resolvedVariants
    } as unknown as RawThemeElement;
}

export function classifyChildElements<ValueType extends RawThemeElementDefinition>(
    parent: ValueType
): RawThemeElementDefinition {
    Object.keys(parent).forEach((key) => {
        if (isInternalKey(key) || isReservedChildElementKey(key)) {
            return;
        }

        const value = parent[key];
        if (isThemeElementDefinition(value)) {
            (parent as Record<string, any>)[key] = defineChildElement(
                classifyChildElements(value),
                { name: key }
            );
        }
    });

    return parent;
}

export function defineChildElement<ValueType extends RawThemeElementDefinition>(
    value: ValueType,
    options: { name?: string } = {}
): ThemeChildElement<ValueType> {
    return {
        __type: ClassificationType.ChildElement,
        ...(options.name ? { __name: options.name } : {}),
        ...value
    };
}

export function defineComponent<
    ValueType extends RawThemeElementDefinition,
    VariantType extends RawThemeElementDefinition = ValueType
>(
    value: ValueType,
    variants?: Record<string, VariantType>,
    options: { selector?: string; name?: string } = {}
): RawThemeElement {
    const selector = options.selector ?? (options.name ? `.${toKebabCase(options.name)}` : '');

    return {
        ...defineElement(value, variants, {
            ...options,
            selector
        }),
        __type: ClassificationType.Element
    } as unknown as RawThemeElement;
}

export function defineGroup<T extends object>(
    value: T,
    options: { consume?: boolean; name?: string } = {}
): ThemeGroup<T> {
    return {
        __type: ClassificationType.Group,
        ...(options.name ? { __name: options.name } : {}),
        ...(options.consume ? { __consume: true } : {}),
        ...value
    } satisfies ThemeGroup<T>;
}

export function defineVariable<ValueType, VariantType = ValueType>(
    value?: ValueType,
    variants?: Record<string, VariantType>,
    options: { name?: string } = {}
): ThemeVariable<ValueType, VariantType> {
    return {
        __type: ClassificationType.Variable,
        ...(options.name ? { __name: options.name } : {}),
        ...(value !== undefined ? { default: value } : {}),
        ...variants
    } as unknown as ThemeVariable<ValueType, VariantType>;
}

export function defineTheme(
    value: PartialDeep<RawTheme>,
    options: { name?: string } = {}
): ThemeGroup<PartialDeep<RawTheme>> {
    return defineGroup(value, options);
}

export function defineThemes<Themes extends Record<string, PartialDeep<RawTheme>>>(
    themes: Themes
): Record<string, ReturnType<typeof defineTheme>> {
    const resolvedThemes: Record<string, ReturnType<typeof defineTheme>> = {};

    for (const key in themes) {
        const theme = themes[key];

        resolvedThemes[key] = defineTheme(theme, { name: toKebabCase(key) });
    }

    return resolvedThemes;
}

/**
 * Properties
 */

export function defineAnimation(variants: Record<string, RawThemeAnimation>) {
    return defineVariable(undefined, variants, { name: 'animation' });
}

export function defineBorder(value: RawThemeBorder, variants?: Record<string, RawThemeBorder>) {
    return defineVariable(value, variants, { name: 'border' });
}

export function defineBorderRadius(
    value: RawThemeBorderRadius,
    variants?: Record<string, RawThemeBorderRadiusVariant>
) {
    return defineVariable(value, variants, { name: 'borderRadius' });
}

export function defineBoxShadow(
    value: RawThemeBoxShadow,
    variants?: Record<string, RawThemeBoxShadow>
) {
    return defineVariable(value, variants, { name: 'boxShadow' });
}

export function defineBreakpoints(variants: Record<string, RawThemeBreakpoint>) {
    return defineVariable<RawThemeBreakpoint>('', variants, { name: 'breakpoints' });
}

export function defineColor(value: RawThemeColor, variants?: Record<string, RawThemeColorVariant>) {
    return defineVariable(value, variants, { name: 'color' });
}

export function defineColorsGroup(value: Record<string, ReturnType<typeof defineColor>>) {
    return defineGroup(value, { name: 'colors' });
}

export function defineColumns(
    value: RawThemeGridColumns,
    variants?: Record<string, RawThemeGridColumns>
) {
    return defineVariable(value, variants, { name: 'columns' });
}

export function defineGutter(
    value: RawThemeGridGutter,
    variants?: Record<string, RawThemeGridGutterVariant>
) {
    return defineVariable(value, variants, { name: 'gutter' });
}

export function defineContainer(
    value: RawThemeGridContainer,
    variants?: Record<string, RawThemeGridContainer>
) {
    return defineVariable(value, variants, { name: 'container' });
}

export function definePercentages(variants: Record<string, RawThemePercentage>) {
    return defineVariable<RawThemePercentage>('', variants, { name: 'percentages' });
}

export function defineScaleRatios(
    value: RawThemeScaleRatio,
    variants?: Record<string, RawThemeScaleRatio>
) {
    return defineVariable(value, variants, { name: 'scaleRatios' });
}

export function defineSizeMultiplier(
    value: RawThemeSizeMultiplier,
    variants?: Record<string, RawThemeSizeMultiplierVariant>
) {
    return defineVariable(value, variants, { name: 'sizeMultiplier' });
}

export function defineSpacing(
    value: RawThemeSpacing,
    variants?: Record<string, RawThemeSpacingVariant>
) {
    return defineVariable(value, variants, { name: 'spacing' });
}

export function defineMargin(
    value: RawThemeMargin,
    variants?: Record<string, RawThemeMarginVariant>
) {
    return defineVariable(value, variants, { name: 'margin' });
}

export function definePadding(
    value: RawThemePadding,
    variants?: Record<string, RawThemePaddingVariant>
) {
    return defineVariable(value, variants, { name: 'padding' });
}

export function defineTransition(
    value: RawThemeTransition,
    variants?: Record<string, RawThemeTransition>
) {
    return defineVariable(value, variants, { name: 'transition' });
}

export function defineTextColor(
    value?: RawThemeTypographyColor,
    variants?: Record<string, RawThemeTypographyColor>
) {
    return defineVariable(value, variants, { name: 'textColor' });
}

export function defineFontFamily(
    value: RawThemeTypographyFontFamily,
    variants?: Record<string, RawThemeTypographyFontFamily>
) {
    return defineVariable(value, variants, { name: 'fontFamily' });
}

export function defineFontSize(
    value: RawThemeTypographyFontSize,
    variants?: Record<string, RawThemeTypographyFontSizeVariant>
) {
    return defineVariable(value, variants, { name: 'fontSize' });
}

export function defineFontWeight(
    value: RawThemeTypographyFontWeight,
    variants?: Record<string, RawThemeTypographyFontWeight>
) {
    return defineVariable(value, variants, { name: 'fontWeight' });
}

export function defineLineHeight(
    value: RawThemeTypographyLineHeight,
    variants?: Record<string, RawThemeTypographyLineHeight>
) {
    return defineVariable(value, variants, { name: 'lineHeight' });
}

export function defineLetterSpacing(
    value: RawThemeTypographyLetterSpacing,
    variants?: Record<string, RawThemeTypographyLetterSpacing>
) {
    return defineVariable(value, variants, { name: 'letterSpacing' });
}

export function defineTextAlignment(
    value: RawThemeTypographyTextAlignment,
    variants?: Record<string, RawThemeTypographyTextAlignment>
) {
    return defineVariable(value, variants, { name: 'textAlign' });
}

export function defineComponentsGroup(value: Record<string, RawThemeElement>) {
    for (const key in value) {
        if (!value[key].__selector) {
            value[key].__selector = `.${toKebabCase(key)}`;
        }
    }

    return defineGroup(value, { name: 'elements' });
}

export function defineElementsGroup(value: Record<string, RawThemeElement>) {
    for (const key in value) {
        if (!value[key].__selector) {
            value[key].__selector = toKebabCase(key);
        }
    }

    return defineGroup(value, { name: 'elements' });
}
