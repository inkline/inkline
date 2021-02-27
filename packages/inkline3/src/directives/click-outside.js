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
    if (typeof window !== 'undefined') {
        on(window.document, 'mousedown', clickOutsideHandler.onMouseDown);
        on(window.document, 'mouseup', clickOutsideHandler.onMouseUp);
    }
}

export function createDocumentHandler(element, binding, vnode) {
    return function(mouseup = {}, mousedown = {}) {
        console.log(element, mouseup, mousedown, isVisible(element));

        if (!isVisible(element) ||
            !vnode ||
            !vnode.context ||
            !mouseup.target ||
            !mousedown.target) { return; }

        console.log(element, mouseup, mousedown);

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

const onClickOutside = (element, binding) => (e) => {
    if (!isVisible(element) || !e.target) {
        return;
    }

    if (element === e.target || element.contains(e.target)) {
        return;
    }

    binding.value();
};

/**
 * v-click-outside
 * @example
 * ```vue
 * <div v-click-outside="handleClose">
 * ```
 */
export default {
    beforeMount(element, binding, vnode) {
        if (typeof window !== 'undefined') {
            // on(window.document, 'mousedown', onClickOutside(element, binding, vnode));
            on(window.document, 'mouseup', onClickOutside(element, binding, vnode));
        }
    },
    updated(element, binding, vnode) {
        // element[clickOutsideHandler.ctx].documentHandler = createDocumentHandler(element, binding, vnode);
        // element[clickOutsideHandler.ctx].methodName = binding.expression;
        // element[clickOutsideHandler.ctx].bindingFn = binding.value;
    },
    // unmounted(element) {
    //     let len = clickOutsideHandler.nodeList.length;
    //
    //     for (let i = 0; i < len; i++) {
    //         if (clickOutsideHandler.nodeList[i][clickOutsideHandler.ctx].id === element[clickOutsideHandler.ctx].id) {
    //             clickOutsideHandler.nodeList.splice(i, 1);
    //             break;
    //         }
    //     }
    //
    //     delete element[clickOutsideHandler.ctx];
    // }
};

bindClickOutsideHandler();
