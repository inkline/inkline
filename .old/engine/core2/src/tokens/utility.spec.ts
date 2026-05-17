import { variable } from './variable';
import { ref } from './ref';
import { utility } from './utility';
import { TokenType } from '../types';
import { createContext } from '../context';
import { selector } from './selector';

const options = { context: createContext() };

describe('utility', () => {
    it('should create a utility with name and value', () => {
        const background = variable('background', 'red', options);
        const padding = variable('padding', '10px', options);

        const utilityName = 'padding';
        const utilityValue = selector(
            '.padding',
            {
                background: ref(background),
                padding: ref(padding)
            },
            options
        );
        const utilityInstance = utility(utilityName, utilityValue, options);

        expect(utilityInstance).toEqual({
            __type: TokenType.Utility,
            __name: utilityName,
            __value: utilityValue
        });
    });

    it('should automatically get added to a theme', () => {
        const { context } = options;
        const themeName = 'test';
        const utilityName = 'utility';
        const utilityValue = selector(
            '.utility',
            {
                background: 'red',
                padding: '10px'
            },
            options
        );
        const utilityInstance = utility(utilityName, utilityValue, {
            theme: themeName,
            ...options
        });

        expect(
            context.themes[themeName].utilities[context.themes[themeName].utilities.length - 1]
        ).toEqual(utilityInstance);
    });
});
