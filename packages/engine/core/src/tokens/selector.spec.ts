import { variable } from './variable';
import { ref } from './ref';
import { selector } from './selector';
import { TokenType } from '../types';
import { css } from './css';
import { createContext } from '../context';

const options = { context: createContext() };

describe('selector', () => {
    it('should create a selector with name and value', () => {
        const background = variable('background', 'red', options);
        const padding = variable('padding', '10px', options);

        const selectorName = '.button';
        const selectorValue = {
            background: ref(background),
            padding: ref(padding)
        };
        const selectorInstance = selector(selectorName, selectorValue, options);

        expect(selectorInstance).toEqual({
            __id: expect.any(String) as string,
            __type: TokenType.Selector,
            __name: selectorName,
            __value: selectorValue
        });
    });

    it('should automatically get added to a theme', () => {
        const { context } = options;
        const themeName = 'test';
        const selectorName = '.button';
        const selectorValue = {
            background: 'red',
            padding: '10px'
        };
        const selectorInstance = selector(selectorName, selectorValue, {
            theme: themeName,
            ...options
        });

        expect(
            context.themes[themeName].selectors[context.themes[themeName].selectors.length - 1]
        ).toEqual(selectorInstance);
    });

    it('should create a selector with css template string', () => {
        const background = variable('background', 'red', options);
        const padding = variable('padding', '10px', options);

        const selectorName = '.button';
        const selectorValue = css`
            background: ${ref(background)};
            padding: ${ref(padding)};
        `;
        const selectorInstance = selector(selectorName, selectorValue, options);

        expect(selectorInstance).toEqual({
            __id: expect.any(String) as string,
            __type: TokenType.Selector,
            __name: selectorName,
            __value: selectorValue
        });
    });
});
