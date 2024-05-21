export type Transition = {
    duration: string;
    timingFunction: string;
    property?: string;
};

export type RawThemeTransition = string | Transition;

export type ResolvedThemeTransition = Transition;
