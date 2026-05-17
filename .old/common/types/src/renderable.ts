import type { Component, ConcreteComponent, ComponentOptions, DefineComponent, VNode } from 'vue';

export type RenderablePrimitives = string | number | boolean;
export type RenderableComponent =
    | ConcreteComponent
    | Component
    | ComponentOptions
    | DefineComponent;
export type RenderableNode = VNode;
export type RenderableFunction = (...args: any[]) => RenderablePrimitives | RenderableNode;
export type RenderableArray = Array<RenderablePrimitives | RenderableNode>;
export type Renderable =
    | RenderablePrimitives
    | RenderableNode
    | RenderableArray
    | RenderableComponent
    | RenderableFunction;

export interface DOMNode {
    type: string;
    props?: Record<string, string>;
    children?: DOMNode[];
}
