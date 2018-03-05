/**
 * Manually trigger an event
 *
 * mouseenter, mouseleave, mouseover, keyup, change, click
 *
 * @param {Element} element
 * @param {String} name
 * @param {*} opts
 */
export function triggerEvent (element, name, ...opts) {
    let eventName;

    if (/^mouse|click/.test(name)) {
        eventName = 'MouseEvents';
    } else if (/^key/.test(name)) {
        eventName = 'KeyboardEvent';
    } else {
        eventName = 'HTMLEvents';
    }
    const evt = document.createEvent(eventName);

    evt.initEvent(name, ...opts);
    element.dispatchEvent
        ? element.dispatchEvent(evt)
        : element.fireEvent('on' + name, evt);

    return element;
}
