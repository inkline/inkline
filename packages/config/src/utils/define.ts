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
    RawThemeElementDefinition
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
    ThemeElement,
    ThemeElementMetadata,
    ThemeGroup,
    ThemeVariable,
    UserConfiguration
} from '../types';
import type { PartialDeep } from 'type-fest';
import { toKebabCase } from './string';
import { isReservedChildElementKey } from './properties';
import { isInternalKey } from './matchKey';
import { isThemeElementDefinition, isThemeGroup } from './typeGuards';

export function defineConfig(config: UserConfiguration = {}): UserConfiguration {
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
): ThemeElement {
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
    } as unknown as ThemeElement;
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
): ThemeElement {
    const selector = options.selector ?? (options.name ? `.${toKebabCase(options.name)}` : '');

    return {
        ...defineElement(value, variants, {
            ...options,
            selector
        }),
        __type: ClassificationType.Element
    } as unknown as ThemeElement;
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
): Themes {
    for (const key in themes) {
        const theme = themes[key];
        if (!theme.__name && isThemeGroup(theme)) {
            theme.__name = toKebabCase(key);
        }
    }

    return themes;
}

/**
 * Properties
 */

export function defineBorderVariable(
    value: RawThemeBorder,
    variants?: Record<string, RawThemeBorder>
) {
    return defineVariable(value, variants, { name: 'border' });
}

export function defineBorderRadiusVariable(
    value: RawThemeBorderRadius,
    variants?: Record<string, RawThemeBorderRadiusVariant>
) {
    return defineVariable(value, variants, { name: 'borderRadius' });
}

export function defineBoxShadowVariable(
    value: RawThemeBoxShadow,
    variants?: Record<string, RawThemeBoxShadow>
) {
    return defineVariable(value, variants, { name: 'boxShadow' });
}

export function defineBreakpointsVariable(variants: Record<string, RawThemeBreakpoint>) {
    return defineVariable<RawThemeBreakpoint>('', variants, { name: 'breakpoints' });
}

export function defineColorVariable(
    value: RawThemeColor,
    variants?: Record<string, RawThemeColorVariant>
) {
    return defineVariable(value, variants, { name: 'color' });
}

export function defineColorsGroup(value: Record<string, ReturnType<typeof defineColorVariable>>) {
    return defineGroup(value, { name: 'colors' });
}

export function defineColumnsVariable(
    value: RawThemeGridColumns,
    variants?: Record<string, RawThemeGridColumns>
) {
    return defineVariable(value, variants, { name: 'columns' });
}

export function defineGutterVariable(
    value: RawThemeGridGutter,
    variants?: Record<string, RawThemeGridGutterVariant>
) {
    return defineVariable(value, variants, { name: 'gutter' });
}

export function defineContainerVariable(
    value: RawThemeGridContainer,
    variants?: Record<string, RawThemeGridContainer>
) {
    return defineVariable(value, variants, { name: 'container' });
}

export function definePercentagesVariable(variants: Record<string, RawThemePercentage>) {
    return defineVariable<RawThemePercentage>('', variants, { name: 'percentages' });
}

export function defineScaleRatiosVariable(
    value: RawThemeScaleRatio,
    variants?: Record<string, RawThemeScaleRatio>
) {
    return defineVariable(value, variants, { name: 'scaleRatios' });
}

export function defineSizeMultiplierVariable(
    value: RawThemeSizeMultiplier,
    variants?: Record<string, RawThemeSizeMultiplierVariant>
) {
    return defineVariable(value, variants, { name: 'sizeMultiplier' });
}

export function defineSpacingVariable(
    value: RawThemeSpacing,
    variants?: Record<string, RawThemeSpacingVariant>
) {
    return defineVariable(value, variants, { name: 'spacing' });
}

export function defineMarginVariable(
    value: RawThemeMargin,
    variants?: Record<string, RawThemeMarginVariant>
) {
    return defineVariable(value, variants, { name: 'margin' });
}

export function definePaddingVariable(
    value: RawThemePadding,
    variants?: Record<string, RawThemePaddingVariant>
) {
    return defineVariable(value, variants, { name: 'padding' });
}

export function defineTransitionVariable(
    value: RawThemeTransition,
    variants?: Record<string, RawThemeTransition>
) {
    return defineVariable(value, variants, { name: 'transition' });
}

export function defineTextColorVariable(
    value: RawThemeTypographyColor,
    variants?: Record<string, RawThemeTypographyColor>
) {
    return defineVariable(value, variants, { name: 'textColor' });
}

export function defineFontFamilyVariable(
    value: RawThemeTypographyFontFamily,
    variants?: Record<string, RawThemeTypographyFontFamily>
) {
    return defineVariable(value, variants, { name: 'fontFamily' });
}

export function defineFontSizeVariable(
    value: RawThemeTypographyFontSize,
    variants?: Record<string, RawThemeTypographyFontSizeVariant>
) {
    return defineVariable(value, variants, { name: 'fontSize' });
}

export function defineFontWeightVariable(
    value: RawThemeTypographyFontWeight,
    variants?: Record<string, RawThemeTypographyFontWeight>
) {
    return defineVariable(value, variants, { name: 'fontWeight' });
}

export function defineLineHeightVariable(
    value: RawThemeTypographyLineHeight,
    variants?: Record<string, RawThemeTypographyLineHeight>
) {
    return defineVariable(value, variants, { name: 'lineHeight' });
}

export function defineLetterSpacingVariable(
    value: RawThemeTypographyLetterSpacing,
    variants?: Record<string, RawThemeTypographyLetterSpacing>
) {
    return defineVariable(value, variants, { name: 'letterSpacing' });
}

export function defineTextAlignmentVariable(
    value: RawThemeTypographyTextAlignment,
    variants?: Record<string, RawThemeTypographyTextAlignment>
) {
    return defineVariable(value, variants, { name: 'textAlign' });
}

export function defineComponentsGroup(value: Record<string, ThemeElement>) {
    for (const key in value) {
        if (!value[key].__selector) {
            value[key].__selector = `.${toKebabCase(key)}`;
        }
    }

    return defineGroup(value, { name: 'elements' });
}

export function defineElementsGroup(value: Record<string, ThemeElement>) {
    for (const key in value) {
        if (!value[key].__selector) {
            value[key].__selector = toKebabCase(key);
        }
    }

    return defineGroup(value, { name: 'elements' });
}
