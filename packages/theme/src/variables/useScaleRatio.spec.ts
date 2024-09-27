import { useScaleRatio } from './useScaleRatio';

describe('useScaleRatio', () => {
    it('should return the correct variables', () => {
        const result = useScaleRatio();

        expect(result.scaleRatioMajorSecond).toBeDefined();
        expect(result.scaleRatioMinorSecond).toBeDefined();
        expect(result.scaleRatioMinorThird).toBeDefined();
        expect(result.scaleRatioMajorThird).toBeDefined();
        expect(result.scaleRatioPerfectFourth).toBeDefined();
        expect(result.scaleRatioAugmentedFourth).toBeDefined();
        expect(result.scaleRatioPerfectFifth).toBeDefined();
        expect(result.scaleRatioGolden).toBeDefined();
        expect(result.scaleRatio).toBeDefined();
        expect(result.scaleRatioPow1).toBeDefined();
        expect(result.scaleRatioPow2).toBeDefined();
        expect(result.scaleRatioPow3).toBeDefined();
        expect(result.scaleRatioPow4).toBeDefined();
        expect(result.scaleRatioPow5).toBeDefined();
    });
});
