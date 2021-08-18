export declare function removeEventListenerBinding(element: HTMLElement, event: string, handler: any): void;
export declare function detachEventBinding(element: HTMLElement, event: string, handler: any): void;
export declare const _off: () => typeof removeEventListenerBinding;
export declare const off: typeof removeEventListenerBinding;
