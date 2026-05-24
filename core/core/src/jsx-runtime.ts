export namespace JSX {
  export type Element = any;

  export interface IntrinsicElements {
    slot: { name?: string; children?: any; [attr: string]: any };
    [elemName: string]: any;
  }

  export interface ElementChildrenAttribute {
    children: {};
  }
}

export function jsx(type: any, props: any, _key?: any): JSX.Element {
  return { type, props };
}

export function jsxs(type: any, props: any, _key?: any): JSX.Element {
  return { type, props };
}

export const Fragment: unique symbol = Symbol.for("inkline.fragment") as any;
