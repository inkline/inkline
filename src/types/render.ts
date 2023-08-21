import { DefineComponent, Raw, VNode } from 'vue';

export type PrimitiveOrRenderable<T> =
    | T
    | VNode
    | DefineComponent<any, any, any>
    | Raw<DefineComponent<any, any, any>>;

export type StringOrRenderableType = PrimitiveOrRenderable<string>;
export type BooleanOrRenderable = PrimitiveOrRenderable<boolean>;
export type NumberOrRenderable = PrimitiveOrRenderable<number>;
