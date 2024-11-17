import { variable } from './variable';
import { ref } from './ref';
import { selector } from './selector';
import { TokenType } from '../types';
import { state } from '../globals';

describe('selector', () => {
    it('should create a selector with name and value', () => {
        const background = variable('background', 'red');
        const padding = variable('padding', '10px');

        const selectorName = '.button';
        const selectorValue = {
            background: ref(background),
            padding: ref(padding)
        };
        const selectorInstance = selector(selectorName, selectorValue);

        expect(selectorInstance).toEqual({
            __id: expect.any(String) as string,
            __type: TokenType.Selector,
            __name: selectorName,
            __value: selectorValue
        });
    });

    it('should automatically get added to a theme', () => {
        const themeName = 'test';
        const selectorName = '.button';
        const selectorValue = {
            background: 'red',
            padding: '10px'
        };
        const selectorInstance = selector(selectorName, selectorValue, { theme: themeName });

        expect(
            state.themes[themeName].selectors[state.themes[themeName].selectors.length - 1]
        ).toEqual(selectorInstance);
    });
});
