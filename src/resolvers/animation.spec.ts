import { animationResolver } from './animation';
import { matchKey } from '../utils';

describe('animationResolver', () => {
    describe('match', () => {
        it.each([
            ['animation', false],
            ['animation.default', true],
            ['animation.default.property', false],
            ['components.button.default.animation', true],
            ['other.animation.value', false]
        ])('should match "%s" path', (path, result) => {
            const match = (animationResolver.key as RegExp[]).some((key) => matchKey(path, key));
            expect(match).toBe(result);
        });
    });
});
