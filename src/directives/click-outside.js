import Vue from 'vue';
import { on } from 'inkline/helpers/on';

const nodeList = [];
const ctx = '@@clickOutsideContext';

let startClick;
let seed = 0;

!Vue.prototype.$isServer && on(document, 'mousedown', e => (startClick = e));

!Vue.prototype.$isServer && on(document, 'mouseup', e => {
    nodeList.forEach(node => node[ctx].documentHandler(e, startClick));
});

function createDocumentHandler(element, binding, vnode) {
    return function(mouseup = {}, mousedown = {}) {
        if (!vnode ||
            !vnode.context ||
            !mouseup.target ||
            !mousedown.target ||
            element.contains(mouseup.target) ||
            element.contains(mousedown.target) ||
            element === mouseup.target ||
            (vnode.context.popupElement &&
                (vnode.context.popupElement.contains(mouseup.target) ||
                    vnode.context.popupElement.contains(mousedown.target)))) return;

        if (binding.expression &&
            element[ctx].methodName &&
            vnode.context[element[ctx].methodName]) {
            vnode.context[element[ctx].methodName]();
        } else {
            element[ctx].bindingFn && element[ctx].bindingFn();
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
        nodeList.push(element);
        const id = seed++;
        element[ctx] = {
            id,
            documentHandler: createDocumentHandler(element, binding, vnode),
            methodName: binding.expression,
            bindingFn: binding.value
        };
    },

    update(element, binding, vnode) {
        element[ctx].documentHandler = createDocumentHandler(element, binding, vnode);
        element[ctx].methodName = binding.expression;
        element[ctx].bindingFn = binding.value;
    },

    unbind(element) {
        let len = nodeList.length;

        for (let i = 0; i < len; i++) {
            if (nodeList[i][ctx].id === element[ctx].id) {
                nodeList.splice(i, 1);
                break;
            }
        }

        delete element[ctx];
    }
};