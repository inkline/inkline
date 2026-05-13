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
  Counter: [
    {
      name: "initial",
      asserts: {
        textOf: { "p:nth-of-type(1)": "0", "p:nth-of-type(2)": "0" },
      },
    },
    {
      name: "click+3",
      events: [{ click: "button" }, { click: "button" }, { click: "button" }],
      asserts: {
        textOf: { "p:nth-of-type(1)": "3", "p:nth-of-type(2)": "6" },
      },
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
    {
      name: "initial visible",
      asserts: { textOf: { span: "Visible" } },
    },
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
};
