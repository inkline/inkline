import { defineScaleRatios } from '../../../../utils';

export const scaleRatios = defineScaleRatios('var(--scale-ratio-minor-third)', {
    minorSecond: 1.067,
    majorSecond: 1.125,
    minorThird: 1.2,
    majorThird: 1.25,
    perfectFourth: 1.333,
    augmentedFourth: 1.414,
    perfectFifth: 1.5,
    golden: 1.618
});
