/// <reference types="miragejs" />
export declare const usePagination: (schema: any, req: any, model: any) => {
    items: any;
    total: any;
};
export declare const useServer: () => import("miragejs").Server<import("miragejs").Registry<{
    user: import("miragejs/-types").ModelDefinition<{}>;
}, import("miragejs/-types").AnyFactories>>;
