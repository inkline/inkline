/* eslint-disable no-invalid-this, @typescript-eslint/ban-ts-comment */
import { defineComponent } from 'vue';
/**
 * Broadcast an event with given params to specific child properties
 *
 * @param componentName
 * @param eventName
 * @param params
 */
export function broadcast(componentName, eventName, params) {
    this.$children.forEach((child) => {
        const name = child.$options.name;
        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params));
        }
        else {
            // @ts-ignore
            broadcast.apply(child, [componentName, eventName].concat([params]));
        }
    });
}
/**
 * Dispatch an event from child to parents of given type
 *
 * @param componentName
 * @param eventName
 * @param params
 */
export function dispatch(componentName, eventName, params) {
    // @ts-ignore
    let parent = this.$parent || this.$root;
    let name = parent.$options.name;
    while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
            name = parent.$options.name;
        }
    }
    if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
    }
}
export default defineComponent({
    methods: {
        dispatch(componentName, eventName, params) {
            dispatch.call(this, componentName, eventName, params);
        },
        broadcast(componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params);
        }
    }
});
//# sourceMappingURL=BroadcastDispatchMixin.js.map