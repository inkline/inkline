export declare function addEventListenerBinding(element: HTMLElement, event: string, handler: any): void;
export declare function attachEventBinding(element: HTMLElement, event: string, handler: any): void;
export declare const _on: () => typeof addEventListenerBinding;
export declare const on: typeof addEventListenerBinding;
