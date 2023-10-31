import { DefineComponent, Raw, VNode } from 'vue';
import { Component, VNodeChild } from 'vue/dist/vue';

export type PrimitiveOrRenderable<T> =
    | T
    | VNode
    | DefineComponent<any, any, any>
    | Raw<DefineComponent<any, any, any>>;

export type StringOrRenderableType = PrimitiveOrRenderable<string>;
export type BooleanOrRenderable = PrimitiveOrRenderable<boolean>;
export type NumberOrRenderable = PrimitiveOrRenderable<number>;

export type LabelRenderFunction<T = object> = (ctx: T) => VNodeChild;

export type Renderable = string | number | boolean | LabelRenderFunction | Raw<Component>;
