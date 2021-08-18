declare type EventValueMapFn = (e: any) => string;
declare type EventValueMapKey = 'input' | 'blur' | 'focus' | 'mouseenter' | 'mouseleave';
declare type EventValueMap = {
    [key in EventValueMapKey]: EventValueMapFn;
};
export declare const eventValueMap: EventValueMap;
export {};
