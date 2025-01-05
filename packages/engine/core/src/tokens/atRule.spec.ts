import { variable } from './variable';
import { selector } from './selector';
import { ref } from './ref';
import { atRule, keyframes } from './atRule';
import { TokenType } from '../types';
import { createContext } from '../context';

const options = { context: createContext() };

describe('atRule', () => {
    it('should create a media query with a selector', () => {
        const background = variable('background', 'red', options);
        const padding = variable('padding', '10px', options);

        const selectorName = '.button';
        const selectorInstance = selector(
            selectorName,
            {
                background: ref(background),
                padding: ref(padding)
            },
            options
        );

        const mediaInstance = atRule('media', 'min-width: 600px', selectorInstance, options);

        expect(mediaInstance).toEqual({
            __id: expect.any(String) as string,
            __type: TokenType.AtRule,
            __name: 'media',
            __identifier: 'min-width: 600px',
            __value: selectorInstance
        });
    });
});

describe('keyframes', () => {
    it('should create a keyframes token with name and value', () => {
        const keyframesName = 'loader-rotate';
        const keyframesValue = {
            '0%': {
                transform: 'rotate(360deg)'
            },
            '100%': {
                transform: 'rotate(360deg)'
            }
        };

        const keyframesInstance = keyframes(keyframesName, keyframesValue, options);

        expect(keyframesInstance).toEqual({
            __id: expect.any(String) as string,
            __type: TokenType.AtRule,
            __name: 'keyframes',
            __identifier: keyframesName,
            __value: [
                {
                    ...selector('0%', keyframesValue['0%'], options),
                    __id: expect.any(String) as string
                },
                {
                    ...selector('100%', keyframesValue['100%'], options),
                    __id: expect.any(String) as string
                }
            ]
        });
    });
});
