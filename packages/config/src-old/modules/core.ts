import { defineBuildFile, defineModule, defineOutputModifier, isDefaultTheme } from '../utils';
import { GeneratorOutput } from '../types';

const aggregatorOutputModifier = defineOutputModifier({
    path: ({ path, output }) => {
        let resolvedPath = path;

        const replacer = ['colors'].find((category) => path[0] === category);
        switch (output) {
            case GeneratorOutput.CssVariables:
                if (replacer) {
                    resolvedPath = [replacer];
                }

                break;
            case GeneratorOutput.Mixins:
                resolvedPath = ['mixins', ...path];
                break;
        }

        return resolvedPath;
    },
    content: ({ content, output }, meta) => {
        let resolvedContent = content;
        switch (output) {
            case GeneratorOutput.CssVariables:
                resolvedContent = [
                    `${isDefaultTheme(meta.themeName) ? ':root' : meta.themeSelector} {`,
                    ...content,
                    '}'
                ];

                break;
        }

        return resolvedContent;
    }
});

const variantMixinsFile = defineBuildFile({
    path: ['mixins', 'variants'],
    content: [
        `@function _create-css-variables-chain($elementOrState) {
    @if $elementOrState {
        $result: '';
        @each $elementOrStateItem in $elementOrState {
            $result: '#{$result}--#{$elementOrStateItem}';
        }

        @return $result;
    }

    @return '';
}

@mixin _generic-property($component, $variant, $property, $elementOrState: null) {
    $elementOrStateChain: _create-css-variables-chain($elementOrState);
    $variantChain: _create-css-variables-chain($variant);

    --#{$component}#{$elementOrStateChain}--#{$property}: var(
            --#{$component}#{$variantChain}#{$elementOrStateChain}--#{$property}
    );
}

@mixin _border-property-side($component, $variant, $side, $property, $elementOrState: null) {
    $elementOrStateChain: _create-css-variables-chain($elementOrState);
    $variantChain: _create-css-variables-chain($variant);

    --#{$component}#{$elementOrStateChain}--border-#{$side}-#{$property}: var(
            --#{$component}#{$variantChain}#{$elementOrStateChain}--border-#{$side}-#{$property}
    );
}

@mixin _border-property($component, $variant, $property, $elementOrState: null) {
    @include _border-property-side($component, $variant, 'top', $property, $elementOrState);
    @include _border-property-side($component, $variant, 'right', $property, $elementOrState);
    @include _border-property-side($component, $variant, 'bottom', $property, $elementOrState);
    @include _border-property-side($component, $variant, 'left', $property, $elementOrState);
}

@mixin _border-radius-corner($component, $variant, $corner, $elementOrState: null) {
    $elementOrStateChain: _create-css-variables-chain($elementOrState);
    $variantChain: _create-css-variables-chain($variant);

    --#{$component}#{$elementOrStateChain}--border-#{$corner}-radius: var(
            --#{$component}#{$variantChain}#{$elementOrStateChain}--border-#{$corner}-radius
    );
}

@mixin _box-shadow-part($component, $variant, $property, $elementOrState: null) {
    $elementOrStateChain: _create-css-variables-chain($elementOrState);
    $variantChain: _create-css-variables-chain($variant);

    --#{$component}#{$elementOrStateChain}--box-shadow-#{$property}: var(
            --#{$component}#{$variantChain}#{$elementOrStateChain}--box-shadow-#{$property}
    );
}

@mixin _color-property-part($component, $variant, $property, $part, $elementOrState: null) {
    $elementOrStateChain: _create-css-variables-chain($elementOrState);
    $variantChain: _create-css-variables-chain($variant);

    --#{$component}#{$elementOrStateChain}--#{$property}-#{$part}: var(
            --#{$component}#{$variantChain}#{$elementOrStateChain}--#{$property}-#{$part}
    );
}

@mixin _color-property($component, $variant, $property, $elementOrState: null) {
    @include _color-property-part($component, $variant, $property, 'h', $elementOrState);
    @include _color-property-part($component, $variant, $property, 's', $elementOrState);
    @include _color-property-part($component, $variant, $property, 'l', $elementOrState);
    @include _color-property-part($component, $variant, $property, 'a', $elementOrState);
}

@mixin _spacing-property-side($component, $variant, $property, $side, $elementOrState: null) {
    $elementOrStateChain: _create-css-variables-chain($elementOrState);
    $variantChain: _create-css-variables-chain($variant);

    --#{$component}#{$elementOrStateChain}--#{$property}-#{$side}: var(
            --#{$component}#{$variantChain}#{$elementOrStateChain}--#{$property}-#{$side}
    );
}

@mixin _spacing-property($component, $variant, $property, $elementOrState) {
    @include _spacing-property-side($component, $variant, $property, 'top', $elementOrState);
    @include _spacing-property-side($component, $variant, $property, 'right', $elementOrState);
    @include _spacing-property-side($component, $variant, $property, 'bottom', $elementOrState);
    @include _spacing-property-side($component, $variant, $property, 'left', $elementOrState);
}

@mixin selector($variant) {
    &.-#{$variant} {
        @content;
    }
}

@mixin animation-property($component, $variant, $elementOrState: null) {
    @include _generic-property($component, $variant, 'animation-property', $elementOrState);
}

@mixin animation-duration($component, $variant, $elementOrState: null) {
    @include _generic-property($component, $variant, 'animation-duration', $elementOrState);
}

@mixin animation-timing-function($component, $variant, $elementOrState: null) {
    @include _generic-property($component, $variant, 'animation-timing-function', $elementOrState);
}

@mixin animation($component, $variant, $elementOrState: null) {
    @include animation-property($component, $variant, $elementOrState);
    @include animation-duration($component, $variant, $elementOrState);
    @include animation-timing-function($component, $variant, $elementOrState);
}

@mixin color-h($component, $variant, $elementOrState: null) {
    @include _color-property-part($component, $variant, 'color', 'h', $elementOrState);
}

@mixin color-s($component, $variant, $elementOrState: null) {
    @include _color-property-part($component, $variant, 'color', 's', $elementOrState);
}

@mixin color-l($component, $variant, $elementOrState: null) {
    @include _color-property-part($component, $variant, 'color', 'l', $elementOrState);
}

@mixin color-a($component, $variant, $elementOrState: null) {
    @include _color-property-part($component, $variant, 'color', 'a', $elementOrState);
}

@mixin color($component, $variant, $elementOrState: null) {
    @include _color-property($component, $variant, 'color', $elementOrState);
}

@mixin background-h($component, $variant, $elementOrState: null) {
    @include _color-property-part($component, $variant, 'background', 'h', $elementOrState);
}

@mixin background-s($component, $variant, $elementOrState: null) {
    @include _color-property-part($component, $variant, 'background', 's', $elementOrState);
}

@mixin background-l($component, $variant, $elementOrState: null) {
    @include _color-property-part($component, $variant, 'background', 'l', $elementOrState);
}

@mixin background-a($component, $variant, $elementOrState: null) {
    @include _color-property-part($component, $variant, 'background', 'a', $elementOrState);
}

@mixin background($component, $variant, $elementOrState: null) {
    @include _color-property($component, $variant, 'background', $elementOrState);
}

@mixin border-width($component, $variant, $elementOrState: null) {
    @include _border-property($component, $variant, 'width', $elementOrState);
}

@mixin border-top-width($component, $variant, $elementOrState: null) {
    @include _border-property-side($component, $variant, 'top', 'width', $elementOrState);
}

@mixin border-right-width($component, $variant, $elementOrState: null) {
    @include _border-property-side($component, $variant, 'right', 'width', $elementOrState);
}

@mixin border-bottom-width($component, $variant, $elementOrState: null) {
    @include _border-property-side($component, $variant, 'bottom', 'width', $elementOrState);
}

@mixin border-left-width($component, $variant, $elementOrState: null) {
    @include _border-property-side($component, $variant, 'left', 'width', $elementOrState);
}

@mixin border-style($component, $variant, $elementOrState: null) {
    @include _border-property($component, $variant, 'style', $elementOrState);
}

@mixin border-top-style($component, $variant, $elementOrState: null) {
    @include _border-property-side($component, $variant, 'top', 'style', $elementOrState);
}

@mixin border-right-style($component, $variant, $elementOrState: null) {
    @include _border-property-side($component, $variant, 'right', 'style', $elementOrState);
}

@mixin border-bottom-style($component, $variant, $elementOrState: null) {
    @include _border-property-side($component, $variant, 'bottom', 'style', $elementOrState);
}

@mixin border-left-style($component, $variant, $elementOrState: null) {
    @include _border-property-side($component, $variant, 'left', 'style', $elementOrState);
}

@mixin border-color($component, $variant, $elementOrState: null) {
    @include _border-property($component, $variant, 'color', $elementOrState);
}

@mixin border-top-color($component, $variant, $elementOrState: null) {
    @include _border-property-side($component, $variant, 'top', 'color', $elementOrState);
}

@mixin border-right-color($component, $variant, $elementOrState: null) {
    @include _border-property-side($component, $variant, 'right', 'color', $elementOrState);
}

@mixin border-bottom-color($component, $variant, $elementOrState: null) {
    @include _border-property-side($component, $variant, 'bottom', 'color', $elementOrState);
}

@mixin border-left-color($component, $variant, $elementOrState: null) {
    @include _border-property-side($component, $variant, 'left', 'color', $elementOrState);
}

@mixin border-top-left-radius($component, $variant, $elementOrState: null) {
    @include _border-radius-corner($component, $variant, 'top-left', $elementOrState);
}

@mixin border-top-right-radius($component, $variant, $elementOrState: null) {
    @include _border-radius-corner($component, $variant, 'top-right', $elementOrState);
}

@mixin border-bottom-right-radius($component, $variant, $elementOrState: null) {
    @include _border-radius-corner($component, $variant, 'bottom-right', $elementOrState);
}

@mixin border-bottom-left-radius($component, $variant, $elementOrState: null) {
    @include _border-radius-corner($component, $variant, 'bottom-left', $elementOrState);
}

@mixin border-radius($component, $variant, $elementOrState: null) {
    @include border-top-left-radius($component, $variant, $elementOrState);
    @include border-top-right-radius($component, $variant, $elementOrState);
    @include border-bottom-right-radius($component, $variant, $elementOrState);
    @include border-bottom-left-radius($component, $variant, $elementOrState);
}

@mixin box-shadow-offset-x($component, $variant, $elementOrState: null) {
    @include _box-shadow-part($component, $variant, 'offset-x', $elementOrState);
}

@mixin box-shadow-offset-y($component, $variant, $elementOrState: null) {
    @include _box-shadow-part($component, $variant, 'offset-y', $elementOrState);
}

@mixin box-shadow-blur-radius($component, $variant, $elementOrState: null) {
    @include _box-shadow-part($component, $variant, 'blur-radius', $elementOrState);
}

@mixin box-shadow-spread-radius($component, $variant, $elementOrState: null) {
    @include _box-shadow-part($component, $variant, 'spread-radius', $elementOrState);
}

@mixin box-shadow-color($component, $variant, $elementOrState: null) {
    @include _box-shadow-part($component, $variant, 'color', $elementOrState);
}

@mixin box-shadow($component, $variant, $elementOrState: null) {
    @include box-shadow-offset-x($component, $variant, $elementOrState);
    @include box-shadow-offset-y($component, $variant, $elementOrState);
    @include box-shadow-blur-radius($component, $variant, $elementOrState);
    @include box-shadow-spread-radius($component, $variant, $elementOrState);
    @include box-shadow-color($component, $variant, $elementOrState);
}

@mixin font-size($component, $variant, $elementOrState: null) {
    @include _generic-property($component, $variant, 'font-size', $elementOrState);
}

@mixin font-weight($component, $variant, $elementOrState: null) {
    @include _generic-property($component, $variant, 'font-weight', $elementOrState);
}

@mixin gap($component, $variant, $elementOrState: null) {
    @include _generic-property($component, $variant, 'gap', $elementOrState);
}

@mixin margin-top($component, $variant, $elementOrState: null) {
    @include _spacing-property-side($component, $variant, 'margin', 'top', $elementOrState);
}

@mixin margin-right($component, $variant, $elementOrState: null) {
    @include _spacing-property-side($component, $variant, 'margin', 'right', $elementOrState);
}

@mixin margin-bottom($component, $variant, $elementOrState: null) {
    @include _spacing-property-side($component, $variant, 'margin', 'bottom', $elementOrState);
}

@mixin margin-left($component, $variant, $elementOrState: null) {
    @include _spacing-property-side($component, $variant, 'margin', 'left', $elementOrState);
}

@mixin margin($component, $variant, $elementOrState: null) {
    @include _spacing-property($component, $variant, 'margin', $elementOrState);
}

@mixin padding-top($component, $variant, $elementOrState: null) {
    @include _spacing-property-side($component, $variant, 'padding', 'top', $elementOrState);
}

@mixin padding-right($component, $variant, $elementOrState: null) {
    @include _spacing-property-side($component, $variant, 'padding', 'right', $elementOrState);
}

@mixin padding-bottom($component, $variant, $elementOrState: null) {
    @include _spacing-property-side($component, $variant, 'padding', 'bottom', $elementOrState);
}

@mixin padding-left($component, $variant, $elementOrState: null) {
    @include _spacing-property-side($component, $variant, 'padding', 'left', $elementOrState);
}

@mixin padding($component, $variant, $elementOrState: null) {
    @include _spacing-property($component, $variant, 'padding', $elementOrState);
}

@mixin width($component, $variant, $elementOrState: null) {
    @include _generic-property($component, $variant, 'width', $elementOrState);
}

@mixin min-width($component, $variant, $elementOrState: null) {
    @include _generic-property($component, $variant, 'min-width', $elementOrState);
}

@mixin height($component, $variant, $elementOrState: null) {
    @include _generic-property($component, $variant, 'height', $elementOrState);
}

@mixin min-height($component, $variant, $elementOrState: null) {
    @include _generic-property($component, $variant, 'min-height', $elementOrState);
}

@mixin size($component, $variant, $elementOrState: null) {
    @include width($component, $variant, $elementOrState);
    @include height($component, $variant, $elementOrState);
}

@mixin transition-property($component, $variant, $elementOrState: null) {
    @include _generic-property($component, $variant, 'transition-property', $elementOrState);
}

@mixin transition-duration($component, $variant, $elementOrState: null) {
    @include _generic-property($component, $variant, 'transition-duration', $elementOrState);
}

@mixin transition-timing-function($component, $variant, $elementOrState: null) {
    @include _generic-property($component, $variant, 'transition-timing-function', $elementOrState);
}

@mixin transition($component, $variant, $elementOrState: null) {
    @include transition-property($component, $variant, $elementOrState);
    @include transition-duration($component, $variant, $elementOrState);
    @include transition-timing-function($component, $variant, $elementOrState);
}`
    ]
});

export const core = defineModule(({ registerOutputModifier, registerFile }) => {
    registerOutputModifier(aggregatorOutputModifier);
    registerFile(variantMixinsFile);
});
