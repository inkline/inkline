import {
    consume,
    consumeArray,
    consumeCalc,
    consumeColor,
    consumeAtRule,
    consumeRef,
    consumeSelector,
    consumeSelectorProperty,
    consumeTheme,
    consumeVariable,
    consumeCSS,
    consumeTransform
} from './consume';
import {
    calc,
    hsla,
    atRule,
    ref,
    selector,
    theme,
    variable,
    keyframes,
    css,
    transform,
    createContext,
    defaultThemeName
} from '@inkline/core';
import { defaultIndent } from '@inkline/utils';

const context = createContext();
const options = { context };

afterEach(() => {
    context.themes = {};
});

describe('consume', () => {
    it('should return a string for string input', () => {
        expect(consume('primitive')).toBe('primitive');
    });

    it('should return a string for number input', () => {
        expect(consume(55)).toBe('55');
    });

    it('should return a string for boolean input', () => {
        expect(consume(true)).toBe('true');
    });

    it('should return empty string for undefined input', () => {
        expect(consume(undefined)).toBe('');
    });
});

describe('consumeArray', () => {
    it('should apply consume on all primitive array values and return array joined by space', () => {
        expect(consumeArray(['one', 1, true])).toBe('one 1 true');
    });

    it('should handle array of mixed instances correctly', () => {
        const mixedArray = [ref('color'), 'static', ref('padding', '5px')];
        expect(consumeArray(mixedArray)).toBe('var(--color) static var(--padding, 5px)');
    });
    it('should process an empty array correctly', () => {
        expect(consumeArray([])).toBe('');
    });
});

describe('consumeVariable', () => {
    it('should return correct CSS for variable instance with primitive value', () => {
        const variableInstance = variable('color', 'blue', options);
        expect(consumeVariable(variableInstance)).toBe('--color: blue;');
    });

    it('should return correct CSS for variable instance with ref value', () => {
        const refInstance = ref('value');
        const variableInstance = variable('color', refInstance, options);
        expect(consumeVariable(variableInstance)).toBe('--color: var(--value);');
    });

    it('should return correct CSS for variable instance with array value', () => {
        const refInstance = ref('value');
        const variableInstance = variable('color', [refInstance, '10px'], options);
        expect(consumeVariable(variableInstance)).toBe('--color: var(--value) 10px;');
    });
});

describe('consumeRef', () => {
    it('should return correct CSS for variable ref', () => {
        const variableInstance = variable('color', 'blue', options);
        const refInstance = ref(variableInstance);
        expect(consumeRef(refInstance)).toBe('var(--color)');
    });

    it('should return correct CSS for variable ref with primitive value fallback', () => {
        const variableInstance = variable('color', 'blue', options);
        const refInstance = ref(variableInstance, 'red');
        expect(consumeRef(refInstance)).toBe('var(--color, red)');
    });

    it('should return correct CSS for variable ref with ref value fallback', () => {
        const variableInstance = variable('color', 'blue', options);
        const fallbackVariableInstance = variable('fallback', 'red', options);
        const refInstance = ref(variableInstance, ref(fallbackVariableInstance));
        expect(consumeRef(refInstance)).toBe('var(--color, var(--fallback))');
    });

    it('should return correct CSS for variable ref with array value fallback', () => {
        const variableInstance = variable('color', 'blue', options);
        const fallbackVariableInstance = variable('fallback', 'red', options);
        const refInstance = ref(variableInstance, [ref(fallbackVariableInstance), '10px']);
        expect(consumeRef(refInstance)).toBe('var(--color, var(--fallback) 10px)');
    });
});

describe('consumeCalc', () => {
    it('should process calc instance correctly', () => {
        const calcInstance = calc('100%', '-', '10px');
        expect(consumeCalc(calcInstance)).toBe('calc(100% - 10px)');
    });

    it('should process mixed calc instance correctly', () => {
        const calcInstance = calc('100%', '-', ref('padding', '10px'));
        expect(consumeCalc(calcInstance)).toBe('calc(100% - var(--padding, 10px))');
    });

    it('should process nested calc instance correctly', () => {
        const calcInstance = calc('100%', '-', calc('10px', '+', '5px'));
        expect(consumeCalc(calcInstance)).toBe('calc(100% - calc(10px + 5px))');
    });
});

describe('consumeColor', () => {
    it('should return correct CSS for color instance with all values provided', () => {
        const colorInstance = hsla([210, 50, 50, 0.5]);
        expect(consumeColor(colorInstance)).toBe('hsla(210 50% 50% / 0.5)');
    });

    it('should return correct CSS for color instance with integer values', () => {
        const colorInstance = hsla([210, 50, 50, 1]);
        expect(consumeColor(colorInstance)).toBe('hsla(210 50% 50% / 1)');
    });

    it('should return correct CSS for color instance with string values', () => {
        const colorInstance = hsla(['210', '50', '50', '0.5']);
        expect(consumeColor(colorInstance)).toBe('hsla(210 50% 50% / 0.5)');
    });

    it('should return correct CSS for color instance with mixed values', () => {
        const colorInstance = hsla([210, '50', 50, '0.5']);
        expect(consumeColor(colorInstance)).toBe('hsla(210 50% 50% / 0.5)');
    });

    it('should return correct CSS for color instance with percentage values', () => {
        const colorInstance = hsla([210, '50%', '50%', '0.5']);
        expect(consumeColor(colorInstance)).toBe('hsla(210 50% 50% / 0.5)');
    });

    it('should return correct CSS for color instance with ref values', () => {
        const colorHRef = ref('colorH');
        const colorSRef = ref('colorS');
        const colorLRef = ref('colorL');
        const colorARef = ref('colorA');

        const colorInstance = hsla([colorHRef, colorSRef, colorLRef, colorARef]);
        expect(consumeColor(colorInstance)).toBe(
            'hsla(var(--colorH) var(--colorS) var(--colorL) / var(--colorA))'
        );
    });
});

describe('consumeSelectorProperty', () => {
    it('should process selector property correctly', () => {
        expect(consumeSelectorProperty('color', 'red')).toBe(`color: red;`);
    });

    it('should process selector property with ref correctly', () => {
        const refInstance = ref('color');
        expect(consumeSelectorProperty('color', refInstance)).toBe(`color: var(--color);`);
    });

    it('should process selector property with calc correctly', () => {
        const calcInstance = calc('100%', '-', '10px');
        expect(consumeSelectorProperty('width', calcInstance)).toBe(`width: calc(100% - 10px);`);
    });

    it('should map property name to kebab-case', () => {
        expect(consumeSelectorProperty('backgroundColor', 'red')).toBe(`background-color: red;`);
    });
});

describe('consumeSelector', () => {
    it('should process selector instance with component value correctly', () => {
        const selectorInstance = selector(
            'body',
            {
                background: ref('background'),
                color: 'red'
            },
            options
        );
        expect(consumeSelector(selectorInstance)).toBe(`body {
${defaultIndent}background: var(--background);
${defaultIndent}color: red;
}`);
    });

    it('should process selector instance with token value correctly', () => {
        const selectorInstance = selector(':root', variable('example', '1rem', options), options);
        expect(consumeSelector(selectorInstance)).toBe(`:root {
${defaultIndent}--example: 1rem;
}`);
    });
});

describe('consumeAtRule', () => {
    it('should process at-rule instance correctly with selector value', () => {
        const mediaInstance = atRule(
            'media',
            '(min-width: 768px)',
            selector('body', { color: 'red' }, options),
            options
        );

        expect(consumeAtRule(mediaInstance)).toEqual(`@media (min-width: 768px) {
${defaultIndent}body {
${defaultIndent.repeat(2)}color: red;
${defaultIndent}}
}`);
    });

    it('should process at-rule instance correctly with selector array value', () => {
        const mediaInstance = atRule(
            'media',
            '(min-width: 768px)',
            [
                selector('body', { color: 'red' }, options),
                selector('h1', { color: 'blue' }, options)
            ],
            options
        );

        expect(consumeAtRule(mediaInstance)).toEqual(`@media (min-width: 768px) {
${defaultIndent}body {
${defaultIndent.repeat(2)}color: red;
${defaultIndent}}
${defaultIndent}
${defaultIndent}h1 {
${defaultIndent.repeat(2)}color: blue;
${defaultIndent}}
}`);
    });

    it('should process at-rule instance correctly with component value', () => {
        const mediaInstance = atRule(
            'media',
            'example',
            {
                color: 'red'
            },
            options
        );

        expect(consumeAtRule(mediaInstance)).toEqual(`@media example {
${defaultIndent}color: red;
}`);
    });

    it('should process at-rule instance correctly with root selector value', () => {
        const mediaInstance = atRule(
            'media',
            'example',
            selector(':root', variable('variable', '1rem', options), options),
            options
        );

        expect(consumeAtRule(mediaInstance)).toEqual(`@media example {
${defaultIndent}:root {
${defaultIndent.repeat(2)}--variable: 1rem;
${defaultIndent}}
}`);
    });

    it('should process at-keyframes instance correctly with keyframes value', () => {
        const keyframesInstance = keyframes(
            'example',
            {
                '0%': { color: 'red' },
                '100%': { color: 'blue' }
            },
            options
        );

        expect(consumeAtRule(keyframesInstance)).toEqual(`@keyframes example {
${defaultIndent}0% {
${defaultIndent.repeat(2)}color: red;
${defaultIndent}}
${defaultIndent}
${defaultIndent}100% {
${defaultIndent.repeat(2)}color: blue;
${defaultIndent}}
}`);
    });
});

describe('consumeCSS', () => {
    it('should return an empty string for an empty CSS instance', () => {
        const cssInstance = css``;
        expect(consumeCSS(cssInstance)).toBe('');
    });

    it('should return a single string for a CSS instance with one value', () => {
        const cssInstance = css`
            color: red;
        `;
        expect(consumeCSS(cssInstance)).toBe(`
            color: red;
        `);
    });

    it('should concatenate multiple strings for a CSS instance with multiple values', () => {
        const cssInstance = css`
            color: red;
            background: blue;
        `;
        expect(consumeCSS(cssInstance)).toBe(`
            color: red;
            background: blue;
        `);
    });

    it('should handle CSS instance with nested references correctly', () => {
        const cssInstance = css`
            color: ${ref('color')};
        `;
        expect(consumeCSS(cssInstance)).toBe(`
            color: var(--color);
        `);
    });

    it('should handle CSS instance with mixed types correctly', () => {
        const cssInstance = css`
            width: ${100}px;
        `;
        expect(consumeCSS(cssInstance)).toBe(`
            width: 100px;
        `);
    });
});

describe('consumeTransform', () => {
    it('should return correct CSS for transform instance with single value', () => {
        const transformInstance = transform('scale', 1.5);
        expect(consumeTransform(transformInstance)).toBe('scale(1.5)');
    });

    it('should return correct CSS for transform instance with multiple values', () => {
        const transformInstance = transform('translate', '10px', '20px');
        expect(consumeTransform(transformInstance)).toBe('translate(10px, 20px)');
    });

    it('should handle transform instance with nested references correctly', () => {
        const transformInstance = transform('translate', ref('x'), ref('y'));
        expect(consumeTransform(transformInstance)).toBe('translate(var(--x), var(--y))');
    });

    it('should handle transform instance with mixed types correctly', () => {
        const transformInstance = transform('translate', '10px', ref('y'));
        expect(consumeTransform(transformInstance)).toBe('translate(10px, var(--y))');
    });
});

describe('consumeTheme', () => {
    it('should generate CSS for a theme with variables and selectors', () => {
        const themeName = 'example';
        const themeInstance = theme(themeName, options);
        const colorVariableInstance = variable('color', 'blue', { theme: themeName, ...options });
        const backgroundVariableInstance = variable('background', 'white', {
            theme: themeName,
            ...options
        });
        const bodySelectorInstance = selector(
            'body',
            {
                color: ref(colorVariableInstance),
                background: ref(backgroundVariableInstance)
            },
            { theme: themeName, ...options }
        );

        expect(consumeTheme(themeInstance)).toBe(`.${themeName}-theme {
    --${colorVariableInstance.__name}: ${colorVariableInstance.__value as string};
    --${backgroundVariableInstance.__name}: ${backgroundVariableInstance.__value as string};

    ${bodySelectorInstance.__name} {
        color: var(--color);
        background: var(--background);
    }
}
`);
    });

    it('should use :root for the default theme name', () => {
        const themeInstance = theme(defaultThemeName, options);
        const colorVariableInstance = variable('color', 'blue', options);
        const backgroundVariableInstance = variable('background', 'white', options);
        const bodySelectorInstance = selector(
            'body',
            {
                color: ref(colorVariableInstance),
                background: ref(backgroundVariableInstance)
            },
            options
        );

        expect(consumeTheme(themeInstance)).toBe(`:root {
    --${colorVariableInstance.__name}: ${colorVariableInstance.__value as string};
    --${backgroundVariableInstance.__name}: ${backgroundVariableInstance.__value as string};
}

${bodySelectorInstance.__name} {
    color: var(--color);
    background: var(--background);
}
`);
    });

    it('should handle themes without variables', () => {
        const themeName = 'no-variables';
        const themeInstance = theme(themeName, options);
        const containerSelectorInstance = selector(
            '.container',
            { color: ref('color') },
            { theme: themeName, ...options }
        );

        expect(consumeTheme(themeInstance)).toBe(`.no-variables-theme {
    ${containerSelectorInstance.__name} {
        color: var(--color);
    }
}
`);
    });

    it('should handle themes without selectors', () => {
        const themeInstance = theme('no-selectors', options);
        variable('color', 'black', { theme: themeInstance, ...options });

        expect(consumeTheme(themeInstance)).toBe(`.no-selectors-theme {
    --color: black;
}
`);
    });

    it('should handle empty themes', () => {
        const themeInstance = theme('empty', options);

        expect(consumeTheme(themeInstance)).toBe('');
    });

    it('should correctly indent nested selectors', () => {
        const themeInstance = theme('nested', options);

        selector(
            '.container .nested',
            {
                color: ref('color')
            },
            { theme: themeInstance, ...options }
        );

        expect(consumeTheme(themeInstance)).toBe(`.nested-theme {
    .container .nested {
        color: var(--color);
    }
}
`);
    });
});
