export interface Ref<T = any> {
  current: T | null;
}

interface ComponentOptions {
  slots?: Record<string, { scoped?: boolean; required?: boolean }>;
  events?: Record<string, Record<string, never>>;
  runtime?: "client" | "server" | "iso";
  name?: string;
}

export type InkComponent<P = {}> = (
  props: P & { class?: string; children?: any; ref?: Ref; key?: any; [attr: string]: any },
) => any;

export function defineComponent<P = {}>(setup: (props: P) => any): InkComponent<P>;
export function defineComponent<P = {}>(
  options: ComponentOptions,
  setup: (props: P) => any,
): InkComponent<P>;
export function defineComponent<P = {}>(
  optionsOrSetup: ComponentOptions | ((props: P) => any),
  setup?: (props: P) => any,
): InkComponent<P> {
  const fn = typeof optionsOrSetup === "function" ? optionsOrSetup : setup!;
  return fn as unknown as InkComponent<P>;
}

export function createSignal<T>(initial: T): [get: () => T, set: (value: T) => void] {
  let value = initial;
  return [
    () => value,
    (v: T) => {
      value = v;
    },
  ];
}

export function createMemo<T>(fn: () => T): () => T {
  return fn;
}

export function createEffect(fn: () => void | (() => void)): void {
  fn();
}

export function createRef<T = any>(): Ref<T> {
  return { current: null };
}

export function createResource<T>(
  _fn: () => Promise<T>,
): [data: T | undefined, meta: { loading: boolean; error: Error | undefined }] {
  return [undefined, { loading: true, error: undefined }];
}

export function onMount(_fn: () => void): void {}
export function onCleanup(_fn: () => void): void {}

export function batch(fn: () => void): void {
  fn();
}
export function untrack<T>(fn: () => T): T {
  return fn();
}

export function defineSlot(_name?: string): void {}

export function Show(_props: { when: boolean; fallback?: any; children?: any }): any {
  return null;
}
export function For<T>(_props: {
  each: T[];
  key?: (item: T, index: number) => any;
  children: (item: T, index: number) => any;
}): any {
  return null;
}
export function Switch(_props: { children?: any; fallback?: any }): any {
  return null;
}
export function Match(_props: { when: boolean; children?: any }): any {
  return null;
}
export function Transition(_props: { name?: string; appear?: boolean; children?: any }): any {
  return null;
}
