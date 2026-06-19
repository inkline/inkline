export interface Ref<T = any> {
  current: T | null;
}

interface ComponentOptions {
  slots?: Record<string, { scoped?: boolean; required?: boolean }>;
  events?: Record<string, Record<string, never>>;
  runtime?: "client" | "server" | "iso";
  name?: string;
  /**
   * Component-level metadata read by the compiler. `headless: true` marks a behavior-only component
   * (no styling) whose single static-element root the Angular target extracts as the host — emitting
   * an attribute-selector component (`button[ink-x]`) alongside the element-selector one, so the
   * native element carries the behavior with no wrapper.
   */
  meta?: { headless?: boolean };
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

/**
 * Declare a two-way-bindable model: a prop named `name` plus its paired `update:<name>` event.
 * Returns a signal tuple `[get, set]` like {@link createSignal}, except the getter reads the incoming
 * prop and the setter emits the update event so a parent can `$bind:<name>` to it.
 */
export function defineModel<T = any>(_name = "value"): [get: () => T, set: (value: T) => void] {
  let value = undefined as T;
  return [
    () => value,
    (v: T) => {
      value = v;
    },
  ];
}

/**
 * Declare the custom events a component can emit and return an `emit` function. Authoring stub only —
 * the compiler reads the declaration at the call site and rewrites `emit(name, …)` to each target's
 * idiomatic event channel (a callback prop, `defineEmits`/`emit`, an `@Output()`, etc.).
 */
export function defineEmits<E extends Record<string, any[]> = Record<string, any[]>>(
  _events?: readonly (keyof E & string)[],
): <K extends keyof E & string>(event: K, ...args: E[K]) => void {
  return () => {};
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

export function defineSlot(_name?: string): any {
  return null;
}

/**
 * Returns whether the named slot (default if omitted) was filled by the parent. Authoring-time stub;
 * the compiler lowers it to each target's slot-presence check (e.g. `props.renderX != null` in React,
 * `!!$slots.x` in Vue, `Astro.slots.has("x")` in Astro). Qwik and Angular have no runtime slot-presence
 * API, so it lowers to `true` there (gated content always renders — pair it with CSS `:empty`).
 */
export function hasSlot(_name?: string): boolean {
  return false;
}

export function Slot(_props: { name?: string; args?: any[]; children?: any }): any {
  return null;
}

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
