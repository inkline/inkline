declare type EventValueMapFn = (e: any) => string;
declare type EventValueMapKey = 'input' | 'blur' | 'focus' | 'mouseenter' | 'mouseleave';
declare type EventValueMap = {
    [key in EventValueMapKey]: EventValueMapFn;
};

export const eventValueMap: EventValueMap = {
    input: (e) => e,
    blur: (e) => e.target.value,
    focus: (e) => e.target.value,
    mouseenter: (e) => e.target.value,
    mouseleave: (e) => e.target.value
};
