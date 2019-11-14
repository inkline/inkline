import Vue from 'vue';
import { on, isVisible } from '@inkline/inkline/src/helpers';

export const clickOutsideHandler = {
    nodeList: [],
    ctx: '@@clickOutsideContext',
    startClick: undefined,
    seed: 0,
    onMouseDown(e) {
        clickOutsideHandler.startClick = e;
    },
    onMouseUp(e) {
        clickOutsideHandler.nodeList
            .forEach(node => node[clickOutsideHandler.ctx].documentHandler(e, clickOutsideHandler.startClick));
    }
};

export function bindClickOutsideHandler() {
    if (!Vue.prototype.$isServer && typeof window !== 'undefined' && window.document) {
        on(window.document, 'mousedown', clickOutsideHandler.onMouseDown);
        on(window.document, 'mouseup', clickOutsideHandler.onMouseUp);
    }
}

export function createDocumentHandler(element, binding, vnode) {
    return function(mouseup = {}, mousedown = {}) {
        if (!isVisible(element) ||
            !vnode ||
            !vnode.context ||
            !mouseup.target ||
            !mousedown.target) { return; }

        for (let targetElement of [mousedown.target, mouseup.target]) {
            if (element === targetElement || element.contains(targetElement)) {
                return;
            }
        }

        if (binding.expression &&
            element[clickOutsideHandler.ctx].methodName &&
            vnode.context[element[clickOutsideHandler.ctx].methodName]) {
            vnode.context[element[clickOutsideHandler.ctx].methodName]();
        } else {
            element[clickOutsideHandler.ctx].bindingFn && element[clickOutsideHandler.ctx].bindingFn();
        }
    };
}

/**
 * v-click-outside
 * @example
 * ```vue
 * <div v-click-outside="handleClose">
 * ```
 */
export default {
    bind(element, binding, vnode) {
        clickOutsideHandler.nodeList.push(element);
        const id = clickOutsideHandler.seed++;
        element[clickOutsideHandler.ctx] = {
            id,
            documentHandler: createDocumentHandler(element, binding, vnode),
            methodName: binding.expression,
            bindingFn: binding.value
        };
    },

    update(element, binding, vnode) {
        element[clickOutsideHandler.ctx].documentHandler = createDocumentHandler(element, binding, vnode);
        element[clickOutsideHandler.ctx].methodName = binding.expression;
        element[clickOutsideHandler.ctx].bindingFn = binding.value;
    },

    unbind(element) {
        let len = clickOutsideHandler.nodeList.length;

        for (let i = 0; i < len; i++) {
            if (clickOutsideHandler.nodeList[i][clickOutsideHandler.ctx].id === element[clickOutsideHandler.ctx].id) {
                clickOutsideHandler.nodeList.splice(i, 1);
                break;
            }
        }

        delete element[clickOutsideHandler.ctx];
    }
};

bindClickOutsideHandler();
