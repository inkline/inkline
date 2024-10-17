import type { Component, VNodeChild, Raw, VNode } from 'vue';

export type PrimitiveOrRenderable<T> = T | VNode | Component | Raw<Component>;

export type StringOrRenderableType = PrimitiveOrRenderable<string>;
export type BooleanOrRenderable = PrimitiveOrRenderable<boolean>;
export type NumberOrRenderable = PrimitiveOrRenderable<number>;

export type LabelRenderFunction<T = object> = (ctx: T) => VNodeChild;

export type Renderable = string | number | boolean | LabelRenderFunction | Raw<Component>;
