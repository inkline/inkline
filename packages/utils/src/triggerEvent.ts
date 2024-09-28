/**
 * Manually trigger an event
 *
 * mouseenter, mouseleave, mouseover, keyup, change, click
 *
 * @param {Element} element
 * @param {String} name
 * @param {EventInit} rawOptions
 */
export function triggerEvent(
    element: HTMLElement | Document | Window,
    name: string,
    rawOptions: EventInit & Record<string, unknown> = {}
) {
    if (typeof window === "undefined") {
        return element;
    }

    // Determine the event type based on the event name
    let eventType: string;
    if (/^mouse|click/.test(name)) {
        eventType = "MouseEvent";
    } else if (/^key/.test(name)) {
        eventType = "KeyboardEvent";
    } else {
        eventType = "Event";
    }

    const evt = document.createEvent(eventType);

    const { bubbles = false, cancelable = true, composed, ...customEventOptions } = rawOptions;

    const options: EventInit = {
        bubbles,
        cancelable,
        composed
    };

    evt.initEvent(name, options.bubbles, options.cancelable);
    Object.assign(evt, customEventOptions);

    element.dispatchEvent
        ? element.dispatchEvent(evt)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        : (element as any).fireEvent('on' + name, evt);

    return element;
}
