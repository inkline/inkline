export type CallbackFn = (...args: any[]) => any;

export type UnregisterFn = () => void;

export function createEventBus() {
    const handlers = new Map<string, CallbackFn[]>();

    function on(eventName: string, fn: CallbackFn): UnregisterFn {
        let eventFns = handlers.get(eventName);

        if (!eventFns) {
            eventFns = [fn];
        } else {
            eventFns.push(fn);
        }

        handlers.set(eventName, eventFns);

        return () => off(eventName, fn);
    }

    function off(eventName: string, fn: CallbackFn) {
        const eventFns = handlers.get(eventName);

        if (eventFns) {
            eventFns.splice(eventFns.indexOf(fn) >>> 0, 1);
        }
    }

    function emit<T = Event>(eventName: string, event: T) {
        const eventFns = handlers.get(eventName);

        if (eventFns) {
            eventFns.slice().forEach((handler) => {
                handler(event);
            });
        }
    }

    return {
        on,
        off,
        emit
    };
}

export type EventBus = ReturnType<typeof createEventBus>;
