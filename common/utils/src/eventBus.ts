export type CallbackFn = (...args: any[]) => any;

type EventPayloadMap<EventMap> = {
    [EventName in keyof EventMap]: unknown[];
};

type Listener<Payload extends unknown[]> = (...payload: Payload) => void;

export interface EventBus<EventMap extends EventPayloadMap<EventMap> = Record<string, any>> {
    on<EventName extends keyof EventMap & string>(
        eventName: EventName,
        fn: Listener<EventMap[EventName]>,
    ): () => void;

    once<EventName extends keyof EventMap & string>(
        eventName: EventName,
        fn: Listener<EventMap[EventName]>,
    ): void;

    off<EventName extends keyof EventMap & string>(
        eventName: EventName,
        fn: Listener<EventMap[EventName]>,
    ): void;

    emit<EventName extends keyof EventMap & string>(
        eventName: EventName,
        ...args: EventMap[EventName]
    ): void;
}

export function createEventBus<
    EventMap extends EventPayloadMap<EventMap> = Record<string, any>,
>(): EventBus<EventMap> {
    const handlers = new Map<string, CallbackFn[]>();

    return {
        on(eventName, fn) {
            let eventFns = handlers.get(eventName);
            if (!eventFns) {
                eventFns = [fn];
            } else {
                eventFns.push(fn);
            }
            handlers.set(eventName, eventFns);

            return () => this.off(eventName, fn);
        },

        once(eventName, fn) {
            const handler: typeof fn = (...payload) => {
                this.off(eventName, handler);
                fn(...payload);
            };

            this.on(eventName, handler);
        },

        off(eventName, fn) {
            const eventFns = handlers.get(eventName);
            if (eventFns) {
                eventFns.splice(eventFns.indexOf(fn) >>> 0, 1);
            }
        },

        emit(eventName, ...args) {
            const eventFns = handlers.get(eventName);
            if (eventFns) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                eventFns.slice().forEach((handler) => handler(...args));
            }
        },
    };
}
