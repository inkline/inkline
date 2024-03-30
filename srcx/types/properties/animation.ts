import * as CSS from 'csstype';

export interface Animation {
    duration: CSS.Property.AnimationDuration;
    timingFunction: CSS.Property.AnimationTimingFunction;
    [key: string]: CSS.Property.AnimationDuration | CSS.Property.AnimationTimingFunction;
}

export type AnimationProperty = string | Animation;

export type ResolvedAnimationProperty = Animation;
