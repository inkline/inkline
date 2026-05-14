import type { DiagnosticCode } from "../core/diagnostics/codes.ts";

export interface Scenario {
  readonly name: string;
  readonly props?: Readonly<Record<string, unknown>>;
  readonly events?: readonly EventStep[];
  readonly asserts: ScenarioAsserts;
}

export type EventStep = { readonly [type: string]: string };

export interface ScenarioAsserts {
  readonly textOf?: Readonly<Record<string, string>>;
  readonly htmlEquals?: string;
  readonly expectedDiagnostics?: readonly DiagnosticCode[];
}

export const scenarios: Readonly<Record<string, readonly Scenario[]>> = {
  // ── Existing 4 ──
  Counter: [
    {
      name: "initial",
      asserts: { textOf: { "p:nth-of-type(1)": "0", "p:nth-of-type(2)": "0" } },
    },
    {
      name: "click+3",
      events: [{ click: "button" }, { click: "button" }, { click: "button" }],
      asserts: { textOf: { "p:nth-of-type(1)": "3", "p:nth-of-type(2)": "6" } },
    },
  ],
  Button: [
    {
      name: "renders label",
      props: { label: "Click me" },
      asserts: { textOf: { button: "Click me" } },
    },
  ],
  Conditional: [
    { name: "initial visible", asserts: { textOf: { span: "Visible" } } },
    {
      name: "toggle to hidden",
      events: [{ click: "button" }],
      asserts: { textOf: { span: "Hidden" } },
    },
  ],
  ForLoop: [
    {
      name: "renders list",
      asserts: {
        textOf: {
          "li:nth-of-type(1)": "Apple",
          "li:nth-of-type(2)": "Banana",
          "li:nth-of-type(3)": "Cherry",
        },
      },
    },
  ],

  // ── 7A: Original 6 ──
  Card: [
    {
      name: "renders title",
      props: { title: "Hello" },
      asserts: { textOf: { h2: "Hello" } },
    },
  ],
  Composite: [
    { name: "initial sums", asserts: { textOf: { "#sum": "3" } } },
    {
      name: "increment X",
      events: [{ click: "#incX" }],
      asserts: { textOf: { "#sum": "4" } },
    },
  ],
  FormField: [{ name: "initial empty", asserts: { textOf: { p: "" } } }],
  Lifecycle: [{ name: "shows mounted", asserts: { textOf: { span: "mounted" } } }],
  List: [
    {
      name: "initial items",
      asserts: { textOf: { "li:nth-of-type(1)": "A", "li:nth-of-type(2)": "B" } },
    },
  ],
  SwitchTabs: [{ name: "initial tab A", asserts: { textOf: { p: "Tab A" } } }],

  // ── 7B: Reactivity 5 ──
  LateSignal: [{ name: "initial doubled", asserts: { textOf: { span: "10" } } }],
  DiamondMemo: [{ name: "initial combined", asserts: { textOf: { span: "5" } } }],
  ConditionalRead: [{ name: "initial value", asserts: { textOf: { span: "10" } } }],
  DynamicAccess: [{ name: "initial", asserts: { textOf: { span: "1" } } }],
  UntrackBoundary: [{ name: "initial count", asserts: { textOf: { span: "0" } } }],

  // ── 7C: Render tree 6 ──
  NestedLoops: [{ name: "renders grid", asserts: {} }],
  NestedSlots: [{ name: "renders structure", asserts: { textOf: { h1: "Title" } } }],
  ScopedSlot: [
    {
      name: "renders indexed items",
      asserts: { textOf: { "li:nth-of-type(1)": "0: One" } },
    },
  ],
  FragmentRoot: [{ name: "renders both elements", asserts: { textOf: { h1: "Title" } } }],
  MapInExpression: [{ name: "renders tags", asserts: {} }],
  TextWithSiblings: [{ name: "renders greeting", asserts: { textOf: { strong: "world" } } }],

  // ── 7D: Events/binding 4 ──
  TypedEvent: [{ name: "initial position", asserts: { textOf: { span: "0, 0" } } }],
  EventModifier: [{ name: "initial pending", asserts: { textOf: { span: "Pending" } } }],
  TwoWayCheckbox: [{ name: "initial off", asserts: { textOf: { span: "off" } } }],
  TwoWayNumber: [{ name: "initial zero", asserts: { textOf: { span: "0" } } }],

  // ── 7E: Components 4 ──
  PropDefaults: [
    {
      name: "renders with defaults",
      props: { size: 12 },
      asserts: { textOf: { div: "12" } },
    },
  ],
  RequiredProps: [
    {
      name: "renders name and age",
      props: { name: "Alice", age: 30 },
      asserts: {},
    },
  ],
  OptionalSlot: [{ name: "renders header", asserts: { textOf: { h1: "Header" } } }],
  MultipleComponentsPerFile: [{ name: "initial count", asserts: { textOf: { span: "0" } } }],

  // ── 7F: Refs 1 ──
  ElementRef: [{ name: "renders input", asserts: {} }],

  // ── 7G: Diagnostic-only 8 ──
  Diag_NamespaceImport: [
    { name: "triggers INK0001", asserts: { expectedDiagnostics: ["INK0001"] } },
  ],
  Diag_EmptyEffect: [{ name: "triggers INK0010", asserts: { expectedDiagnostics: ["INK0010"] } }],
  Diag_EmptyMemo: [{ name: "triggers INK0011", asserts: { expectedDiagnostics: ["INK0011"] } }],
  Diag_Cycle: [{ name: "triggers INK0030", asserts: { expectedDiagnostics: ["INK0030"] } }],
  Diag_MissingKey: [{ name: "triggers INK0050", asserts: { expectedDiagnostics: ["INK0050"] } }],
  Diag_ShowNoWhen: [{ name: "triggers INK0060", asserts: { expectedDiagnostics: ["INK0060"] } }],
  Diag_ForNoEach: [{ name: "triggers INK0062", asserts: { expectedDiagnostics: ["INK0062"] } }],
  Diag_ComponentRef: [{ name: "compiles without error (ref forwarding supported)", asserts: {} }],

  // ── v1: Component refs ──
  ComponentRef: [{ name: "compiles component ref", asserts: {} }],

  // ── Common UI patterns ──
  ControlledSelect: [{ name: "initial B selected", asserts: {} }],
  ConditionalClass: [{ name: "initial inactive", asserts: {} }],
  MemoChain: [{ name: "initial chain value", asserts: { textOf: { span: "Value: 4" } } }],
  EffectCleanup: [{ name: "initial active", asserts: {} }],
  MixedControlFlow: [{ name: "renders all items", asserts: {} }],
  BatchUpdates: [{ name: "initial zero sum", asserts: { textOf: { span: "0" } } }],
  MultiRefs: [{ name: "renders both elements", asserts: {} }],
  SlotWithDefault: [{ name: "renders structure", asserts: { textOf: { p: "Default content" } } }],
  ControlledTextarea: [{ name: "initial empty", asserts: { textOf: { p: "0 characters" } } }],
  DynamicList: [{ name: "initial empty list", asserts: {} }],

  // ── Scoped CSS ──
  ScopedStyle: [{ name: "renders with style", asserts: { textOf: { h1: "Hello" } } }],

  // ── Server/Client boundaries ──
  ClientComponent: [{ name: "client component", asserts: {} }],
  ServerComponent: [{ name: "server component", asserts: {} }],
  IsoComponent: [{ name: "iso component", asserts: {} }],
};
