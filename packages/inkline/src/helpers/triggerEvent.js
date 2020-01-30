import Vue from 'vue';

/**
 * Manually trigger an event
 *
 * mouseenter, mouseleave, mouseover, keyup, change, click
 *
 * @param {Element} element
 * @param {String} name
 * @param {*} opts
 */
export function triggerEvent (element, name, options) {
    if (Vue.prototype.$isServer || !document) { return; }

    let eventName;

    options = {
        bubbles: false,
        cancelable: true,
        ...options
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
            evt[optionName] = options[optionName];
        }
    });

    element.dispatchEvent
        ? element.dispatchEvent(evt)
        : element.fireEvent('on' + name, evt);

    return element;
}
