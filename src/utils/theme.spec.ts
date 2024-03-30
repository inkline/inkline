import { defineThemes } from './theme';
import { themes } from '../defaults';

describe('defineThemes', () => {
    it('should return the same themes that were passed in', () => {
        const result = defineThemes(themes);
        expect(result).toBe(themes);
    });
});
