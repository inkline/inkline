/**
 * Broadcast an event with given params to specific child properties
 *
 * @param componentName
 * @param eventName
 * @param params
 */
export declare function broadcast(this: any, componentName: string, eventName: string, params: any): void;
/**
 * Dispatch an event from child to parents of given type
 *
 * @param componentName
 * @param eventName
 * @param params
 */
export declare function dispatch(componentName: string, eventName: string, params: any): void;
declare const _default: import("vue").DefineComponent<{}, {}, {}, {}, {
    dispatch(componentName: string, eventName: string, params: any): void;
    broadcast(componentName: string, eventName: string, params: any): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
export default _default;
