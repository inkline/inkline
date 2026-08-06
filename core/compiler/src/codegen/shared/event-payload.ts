// Lowering of an event's declared payload tuple to each target's event-channel typing.
//
// `defineEmits<{ change: [value: string] }>()` declares `change` as carrying the *argument list*
// `(value: string)` — the tuple mirrors what `emit("change", …)` takes, exactly like Vue's macro.
// Targets differ in how many values their event channel can carry, so each lowers the same tuple:
//
//   - callback-prop targets (React/Solid/Svelte/Qwik) take the whole list: `(value: string) => void`
//   - Vue passes the declaration through verbatim as a typed `defineEmits<{…}>()`
//   - Angular's `output<T>` carries exactly ONE value, so the tuple is unwrapped (see below)
//
// An event with no `payloadType` (the runtime array form, or the options-API `events` object)
// declares names only and stays untyped — every helper here returns `undefined` for it.

import * as ts from "typescript";
import type { IREventDeclaration } from "../../ir/render/nodes.ts";
import { nodeText } from "./expr-rewrite.ts";

/**
 * The elements of an event's payload tuple, or `undefined` when the event is untyped or its declared
 * type is not a tuple (e.g. `defineEmits<{ change: string }>()`, which the authoring type forbids).
 */
export function payloadTupleElements(
  event: IREventDeclaration,
): readonly ts.TypeNode[] | undefined {
  const declared = event.payloadType;
  if (!declared || !ts.isTupleTypeNode(declared)) return undefined;
  return declared.elements;
}

/** The type of one tuple element, dropping the `name:` label of a named member (`count: number` → `number`). */
function elementType(element: ts.TypeNode): string {
  return nodeText(ts.isNamedTupleMember(element) ? element.type : element);
}

/**
 * The callback-prop function type for an event — `[count: number]` → `(count: number) => void`,
 * `[]` → `() => void`, `[string, number]` → `(arg0: string, arg1: number) => void`. An untyped event
 * falls back to `(...args: any[]) => void`.
 */
export function eventCallbackType(event: IREventDeclaration): string {
  const elements = payloadTupleElements(event);
  const params = elements
    ? elements
        .map((el, i) => (ts.isNamedTupleMember(el) ? nodeText(el) : `arg${i}: ${nodeText(el)}`))
        .join(", ")
    : "...args: any[]";
  return `(${params}) => void`;
}

/**
 * Angular's `output<T>()` type argument, including the angle brackets, or `""` when untyped.
 *
 * `output<T>` carries a single value, so the payload tuple is unwrapped by arity:
 * - `[]` → `<void>` (a valueless event; `emit()` takes no argument)
 * - `[value: string]` → `<string>` — the common case, and the point of this whole exercise
 * - `[a: string, b: number]` → `<[a: string, b: number]>` — Angular cannot carry two values, so a
 *   multi-value event lowers to the tuple itself and the `emit` call packs its arguments into an
 *   array (see {@link packedPayloadEvents}). Dropping the extras would silently lose data.
 */
export function angularOutputTypeArgument(event: IREventDeclaration): string {
  const elements = payloadTupleElements(event);
  if (!elements) return "";
  if (elements.length === 0) return "<void>";
  if (elements.length === 1) return `<${elementType(elements[0]!)}>`;
  return `<[${elements.map((el) => nodeText(el)).join(", ")}]>`;
}

/**
 * The type argument for Vue's `defineEmits<{…}>()`, rebuilt from the declared payload tuples — the
 * closest mapping there is, since the Vue macro takes the same shape the authoring API does.
 * `undefined` when any event is untyped, in which case the target keeps the runtime
 * `defineEmits([...])` array form rather than emitting a half-typed declaration.
 */
export function vueEmitsTypeArgument(events: readonly IREventDeclaration[]): string | undefined {
  if (events.length === 0) return undefined;
  const members: string[] = [];
  for (const event of events) {
    const elements = payloadTupleElements(event);
    if (!elements) return undefined;
    const params = elements.map((el) => nodeText(el)).join(", ");
    // Event names are semantic and unprefixed, but `update:value` needs quoting.
    const key = /^[A-Za-z_$][\w$]*$/.test(event.name) ? event.name : JSON.stringify(event.name);
    members.push(`${key}: [${params}]`);
  }
  return `{ ${members.join("; ")} }`;
}

/**
 * The events whose payload is a multi-value tuple. The Angular rewriter uses this to pack
 * `emit("x", a, b)` into `this.x.emit([a, b])`, matching the tuple type argument above. Events that
 * are untyped or carry 0–1 values are absent and pass through unchanged.
 */
export function packedPayloadEvents(events: readonly IREventDeclaration[]): ReadonlySet<string> {
  const packed = new Set<string>();
  for (const event of events) {
    const elements = payloadTupleElements(event);
    if (elements && elements.length > 1) packed.add(event.name);
  }
  return packed;
}
