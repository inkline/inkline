import { createContext } from './context';

describe('createContext()', () => {
    it('should create a context', () => {
        const ctx = createContext();

        expect(ctx).toHaveProperty('themes');
        expect(Array.isArray(ctx.themes)).toBe(true);
        expect(ctx).toHaveProperty('variable');
        expect(typeof ctx.variable).toBe('function');
        expect(ctx).toHaveProperty('ref');
        expect(typeof ctx.ref).toBe('function');
        expect(ctx).toHaveProperty('css');
        expect(typeof ctx.css).toBe('function');
    });

    describe('theme()', () => {
        it('should create a theme', () => {
            const ctx = createContext();
            const theme = ctx.theme('default');

            expect(theme).toHaveProperty('name', 'default');
            expect(theme).toHaveProperty('variables');
            expect(Array.isArray(theme.variables)).toBe(true);
        });

        it('should not create duplicate themes', () => {
            const ctx = createContext();
            const theme1 = ctx.theme('default');
            const theme2 = ctx.theme('default');

            expect(theme1).toEqual(theme2);
        });

        it('should add the theme to the context', () => {
            const ctx = createContext();
            const theme = ctx.theme('default');

            expect(ctx.themes).toHaveLength(1);
            expect(ctx.themes[0]).toEqual(theme);
        });
    });

    describe('variable()', () => {
        it('should create a variable token', () => {
            const ctx = createContext();
            const variable = ctx.variable('test', 'value');

            expect(variable).toHaveProperty('type', 'variable');
            expect(variable).toHaveProperty('name', 'test');
            expect(variable).toHaveProperty('value', 'value');
        });

        it('should not create duplicate variable tokens', () => {
            const ctx = createContext();
            const variable1 = ctx.variable('test', 'value1');
            const variable2 = ctx.variable('test', 'value2');

            expect(variable1).toEqual(variable2);
        });

        it('should add the variable to the context', () => {
            const ctx = createContext();
            const theme = ctx.theme('default');
            const variable = ctx.variable('test', 'value');

            expect(theme.variables).toHaveLength(1);
            expect(theme.variables[0]).toEqual(variable);
        });

        it('should not add the variable to the context if register is false', () => {
            const ctx = createContext();
            const theme = ctx.theme('default');
            const variable = ctx.variable('test', 'value', { register: false });

            expect(theme.variables).toHaveLength(0);
            expect(variable).toBeDefined();
        });
    });

    describe('ref()', () => {
        it('should create a reference token', () => {
            const ctx = createContext();
            const variable = ctx.variable('test', 'value');
            const reference = ctx.ref(variable);

            expect(reference).toHaveProperty('type', 'reference');
            expect(reference).toHaveProperty('name', 'test');
        });

        it('should create a reference token with fallback', () => {
            const ctx = createContext();
            const variable = ctx.variable('test', 'value');
            const reference = ctx.ref(variable, 'fallback');

            expect(reference).toHaveProperty('type', 'reference');
            expect(reference).toHaveProperty('name', 'test');
            expect(reference).toHaveProperty('fallback', 'fallback');
        });
    });

    describe('css()', () => {
        it('should create a CSS token', () => {
            const ctx = createContext();
            const cssToken = ctx.css`calc(2 * ${ctx.ref('spacing')});`;

            expect(cssToken).toHaveProperty('type', 'css');
            expect(cssToken.value).toHaveLength(3);
            expect(cssToken.value[0]).toBe('calc(2 * ');
            expect(cssToken.value[1]).toHaveProperty('type', 'reference');
            expect(cssToken.value[2]).toBe(');');
        });
    });

    describe('selector()', () => {
        it('should create a selector token', () => {
            const ctx = createContext();
            const selector = ctx.selector('.test', { color: 'red' });

            expect(selector).toHaveProperty('type', 'selector');
            expect(selector).toHaveProperty('query', '.test');
            expect(selector).toHaveProperty('declaration');
            expect(selector.declaration).toEqual({ color: 'red' });
        });

        it('should support css in selector declarations', () => {
            const ctx = createContext();
            const theme = ctx.theme('default');
            const variable = ctx.variable('color', 'red');
            const selector = ctx.selector('.test', ctx.css`color: ${ctx.ref(variable)};`);

            expect(theme.selectors).toHaveLength(1);
            expect(theme.selectors[0]).toEqual(selector);
            expect(selector.declaration).toHaveProperty('type', 'css');
            expect(selector.declaration.value).toHaveLength(3);
            expect(selector.declaration.value).toEqual(
                expect.arrayContaining([
                    'color: ',
                    expect.objectContaining({
                        type: 'reference',
                        name: 'color'
                    }),
                    ';'
                ])
            );
        });

        it('should add the selector to the context', () => {
            const ctx = createContext();
            const theme = ctx.theme('default');
            const selector = ctx.selector('.test', { color: 'red' });

            expect(theme.selectors).toHaveLength(1);
            expect(theme.selectors[0]).toEqual(selector);
        });

        it('should not add the selector to the context if register is false', () => {
            const ctx = createContext();
            const theme = ctx.theme('default');
            const selector = ctx.selector('.test', { color: 'red' }, { register: false });

            expect(theme.selectors).toHaveLength(0);
            expect(selector).toBeDefined();
        });
    });

    describe('media()', () => {
        it('should create a media token', () => {
            const ctx = createContext();
            const media = ctx.media('screen', '.red', { color: 'red' });

            expect(media).toHaveProperty('type', 'media');
            expect(media).toHaveProperty('query', 'screen');
            expect(media).toHaveProperty('selector');
            expect(media.selector).toHaveProperty('type', 'selector');
            expect(media.selector).toHaveProperty('query', '.red');
            expect(media.selector.declaration).toEqual({ color: 'red' });
        });

        it('should add the media to the context', () => {
            const ctx = createContext();
            const theme = ctx.theme('default');
            const media = ctx.media('screen', '.red', { color: 'red' });

            expect(theme.selectors).toHaveLength(1);
            expect(theme.selectors[0]).toEqual(media);
        });

        it('should not add the media to the context if register is false', () => {
            const ctx = createContext();
            const theme = ctx.theme('default');
            const media = ctx.media('screen', '.red', { color: 'red' }, { register: false });

            expect(theme.selectors).toHaveLength(0);
            expect(media).toBeDefined();
        });
    });

    describe('keyframes()', () => {
        it('should create a keyframes token', () => {
            const ctx = createContext();
            const keyframes = ctx.keyframes('fadeIn', {
                '0%': { opacity: 0 },
                '100%': { opacity: 1 }
            });

            expect(keyframes).toHaveProperty('type', 'keyframes');
            expect(keyframes).toHaveProperty('name', 'fadeIn');
            expect(keyframes).toHaveProperty('declaration');
            expect(keyframes.declaration).toEqual({
                '0%': { opacity: 0 },
                '100%': { opacity: 1 }
            });
        });

        it('should add the keyframes to the context', () => {
            const ctx = createContext();
            const theme = ctx.theme('default');
            const keyframes = ctx.keyframes('fadeIn', {
                '0%': { opacity: 0 },
                '100%': { opacity: 1 }
            });

            expect(theme.selectors).toHaveLength(1);
            expect(theme.selectors[0]).toEqual(keyframes);
        });

        it('should not add the keyframes to the context if register is false', () => {
            const ctx = createContext();
            const theme = ctx.theme('default');
            const keyframes = ctx.keyframes(
                'fadeIn',
                {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 }
                },
                { register: false }
            );

            expect(theme.selectors).toHaveLength(0);
            expect(keyframes).toBeDefined();
        });
    });

    describe('utility()', () => {
        it('should create a utility token', () => {
            const ctx = createContext();
            const utility = ctx.utility('bg-red', { backgroundColor: 'red' }, 'hover');

            expect(utility).toHaveProperty('type', 'utility');
            expect(utility).toHaveProperty('name', 'bg-red');
            expect(utility).toHaveProperty('modifier', 'hover');
            expect(utility).toHaveProperty('declaration');
            expect(utility.declaration).toEqual({ backgroundColor: 'red' });
        });

        it('should add the utility to the context', () => {
            const ctx = createContext();
            const theme = ctx.theme('default');
            const utility = ctx.utility('bg-red', { backgroundColor: 'red' });

            expect(theme.utilities).toHaveLength(1);
            expect(theme.utilities[0]).toEqual(utility);
        });

        it('should not add the utility to the context if register is false', () => {
            const ctx = createContext();
            const theme = ctx.theme('default');
            const utility = ctx.utility('bg-red', { backgroundColor: 'red' }, 'default', {
                register: false
            });

            expect(theme.utilities).toHaveLength(0);
            expect(utility).toBeDefined();
        });
    });

    describe('variant()', () => {
        it('should create a variant token', () => {
            const ctx = createContext();
            const variant = ctx.variant('hover:bg-red', { backgroundColor: 'red' }, 'hover');

            expect(variant).toHaveProperty('type', 'variant');
            expect(variant).toHaveProperty('name', 'hover:bg-red');
            expect(variant).toHaveProperty('modifier', 'hover');
            expect(variant).toHaveProperty('declaration');
            expect(variant.declaration).toEqual({ backgroundColor: 'red' });
        });

        it('should add the variant to the context', () => {
            const ctx = createContext();
            const theme = ctx.theme('default');
            const variant = ctx.variant('hover:bg-red', { backgroundColor: 'red' });

            expect(theme.variants).toHaveLength(1);
            expect(theme.variants[0]).toEqual(variant);
        });

        it('should not add the variant to the context if register is false', () => {
            const ctx = createContext();
            const theme = ctx.theme('default');
            const variant = ctx.variant('hover:bg-red', { backgroundColor: 'red' }, 'default', {
                register: false
            });

            expect(theme.variants).toHaveLength(0);
            expect(variant).toBeDefined();
        });
    });
});
