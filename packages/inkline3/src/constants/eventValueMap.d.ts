declare type IEventValueMapFn = (e: Event) => string;
declare type IEventValueMapKey = 'input' | 'blur' | 'focus' | 'mouseenter' | 'mouseleave';
declare type IEventValueMap = {
    [key in IEventValueMapKey]: IEventValueMapFn;
}

declare const eventValueMap: IEventValueMap;

export { eventValueMap };
