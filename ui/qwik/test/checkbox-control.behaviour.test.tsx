// INK-31 behaviour test: proves the Qwik target's codegen'd `$()` change handler actually resumes and
// fires at runtime — not merely that the emitted source string looks right.
//
// `test/generate-fixtures.ts` (globalSetup) compiles the real headless checkbox control to Qwik and
// writes it to `test/__generated__/ICheckboxControlBase.tsx`. Importing it here runs it through
// qwikVite, which extracts each `onX$={$(…)}` into a lazy QRL and — on client render — resumes it onto
// the element as a resolved `_qDispatch` handler (the same map Qwik's own event dispatch invokes).
//
// The regression this guards: before the fix the codegen emitted a bare `onChange={$(…)}` with no `$`
// suffix, so the optimizer treated it as a plain DOM attribute, stringified the QRL inline
// (`onchange="async function…"`) and it never bound on resume. A broken build therefore has NO
// `_qDispatch["e:change"]` entry, so `resolveChangeHandler` below throws and the test fails loudly.
//
// We invoke the resolved handler with a plain-object event carrying `currentTarget` — the browser sets
// this during real dispatch, but Qwik's synthetic `trigger` builds a native `Event` whose
// `currentTarget`/`target` are getter-only, so it cannot supply the element the control reads
// (`e.currentTarget.checked`). Calling the resolved handler directly is exactly what Qwik's
// `dispatchOnElement` does (`handlers(event, element)`); we only substitute an event object that a real
// browser would have populated.
import { describe, it, expect, beforeAll } from "vitest";
import { component$, useSignal, $, type Component } from "@qwik.dev/core";
import { createDOM } from "@qwik.dev/core/testing";

// The fixture is compiled fresh into `test/__generated__/` by `generate-fixtures.ts` (globalSetup) and
// is intentionally never committed (see that file's header). A static import would make the static gates
// — `vp check` (tsc) and `vp lint` (oxlint), both of which run without vitest — resolve a path that only
// exists at runtime. Loading it through a runtime specifier keeps those gates honest while still routing
// the module through qwikVite, which is what extracts the codegen'd `$()` handlers into real QRLs.
const GENERATED_FIXTURE = "./__generated__/ICheckboxControlBase.tsx";
let ICheckboxControlBase: Component<Record<string, unknown>>;

beforeAll(async () => {
  ({ ICheckboxControlBase } = await import(GENERATED_FIXTURE));
});

/** The resolved `change` QRL Qwik wired onto the input during resume; absent on a broken build. */
function resolveChangeHandler(
  input: HTMLInputElement,
): (event: unknown, element: Element) => unknown {
  const handler = (input as unknown as { _qDispatch?: Record<string, unknown> })._qDispatch?.[
    "e:change"
  ];
  if (typeof handler !== "function") {
    throw new Error(
      "No resumed `change` handler on the checkbox input — the Qwik optimizer did not extract the " +
        "codegen'd `$()` into a QRL (INK-31 regression). `_qDispatch` was: " +
        JSON.stringify(Object.keys((input as unknown as { _qDispatch?: object })._qDispatch ?? {})),
    );
  }
  return handler as (event: unknown, element: Element) => unknown;
}

/** A `change` event as the browser would deliver it: `currentTarget` is the toggled input. */
function changeEventOn(input: HTMLInputElement) {
  return { currentTarget: input, target: input, preventDefault() {} };
}

describe("Qwik checkbox control — interactive behaviour (INK-31)", () => {
  it("toggles the bound model when the user checks the box", async () => {
    const emitted: boolean[] = [];
    const Harness = component$(() => {
      const checked = useSignal(false);
      return (
        <ICheckboxControlBase
          checked={checked.value}
          onUpdateChecked$={$((value: boolean) => {
            emitted.push(value);
            checked.value = value;
          })}
        />
      );
    });

    const { screen, render } = await createDOM();
    await render(<Harness />);

    const input = screen.querySelector("input") as HTMLInputElement;
    expect(input.checked).toBe(false);

    // Simulate the browser flipping the box, then fire the resumed `change` QRL the codegen produced.
    input.checked = true;
    await resolveChangeHandler(input)(changeEventOn(input), input);

    // The handler ran and forwarded the new state through the two-way `checked` model.
    expect(emitted).toEqual([true]);
    expect(input.checked).toBe(true);
  });

  it("rejects the toggle when read-only, leaving the model untouched", async () => {
    const emitted: boolean[] = [];
    const Harness = component$(() => {
      const checked = useSignal(false);
      return (
        <ICheckboxControlBase
          readonly={true}
          checked={checked.value}
          onUpdateChecked$={$((value: boolean) => {
            emitted.push(value);
            checked.value = value;
          })}
        />
      );
    });

    const { screen, render } = await createDOM();
    await render(<Harness />);

    const input = screen.querySelector("input") as HTMLInputElement;

    // The browser toggles the box on click; the read-only change handler must snap it back.
    input.checked = true;
    await resolveChangeHandler(input)(changeEventOn(input), input);

    // The handler ran, re-asserted `el.checked = checked()` (false), and never emitted an update.
    expect(input.checked).toBe(false);
    expect(emitted).toEqual([]);
  });
});
