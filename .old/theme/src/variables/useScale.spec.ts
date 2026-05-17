import { useScale } from './useScale';
import { createContext } from '@inkline/core';

const options = { context: createContext() };

describe('useScale', () => {
    it('should return the correct variables', () => {
        const result = useScale(options);

        expect(result.scaleMajorSecond).toBeDefined();
        expect(result.scaleMinorSecond).toBeDefined();
        expect(result.scaleMinorThird).toBeDefined();
        expect(result.scaleMajorThird).toBeDefined();
        expect(result.scalePerfectFourth).toBeDefined();
        expect(result.scaleAugmentedFourth).toBeDefined();
        expect(result.scalePerfectFifth).toBeDefined();
        expect(result.scaleGolden).toBeDefined();
        expect(result.scale).toBeDefined();
        expect(result.scalePow1).toBeDefined();
        expect(result.scalePow2).toBeDefined();
        expect(result.scalePow3).toBeDefined();
        expect(result.scalePow4).toBeDefined();
        expect(result.scalePow5).toBeDefined();
    });
});
