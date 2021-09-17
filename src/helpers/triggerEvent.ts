/**
 * Manually trigger an event
 *
 * mouseenter, mouseleave, mouseover, keyup, change, click
 *
 * @param {Element} element
 * @param {String} name
 * @param rawOptions
 */
export function triggerEvent (element: HTMLElement, name: string, rawOptions?: any) {
    if (typeof window === 'undefined') {
        return;
    }

    let eventName;

    const options = {
        bubbles: false,
        cancelable: true,
        ...rawOptions
    };

    if (/^mouse|click/.test(name)) {
        eventName = 'MouseEvents';
    } else if (/^key/.test(name)) {
        eventName = 'KeyboardEvent';
    } else {
        eventName = 'HTMLEvents';
    }

    const evt = document.createEvent(eventName);
    evt.initEvent(name, options.bubbles, options.cancelable);

    Object.keys(options).forEach((optionName) => {
        if (optionName !== 'bubbles' && optionName !== 'cancelable') {
            (evt as any)[optionName] = options[optionName];
        }
    });

    element.dispatchEvent
        ? element.dispatchEvent(evt)
        : (element as any).fireEvent('on' + name, evt);

    return element;
}
