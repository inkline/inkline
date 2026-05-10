import * as ts from "typescript";

import type { IRComponent, IREventDeclaration, IRProp, IRSlotDeclaration } from "../ir/nodes.ts";

import { locOf } from "./source-location.ts";

/**
 * Parse the static options object passed to defineComponent — the part that
 * declares props/slots/events/name. Type-only props (declared via the setup
 * function's first parameter type) are handled elsewhere by the parser.
 *
 * Mutates `component` in place. Skips members that aren't shaped as we expect
 * (computed property names, spreads, methods) — those don't survive
 * compilation regardless.
 */
export function applyDefineComponentOptions(
  options: ts.ObjectLiteralExpression,
  component: IRComponent,
  sourceFile: ts.SourceFile,
): void {
  for (const prop of options.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    if (!ts.isIdentifier(prop.name) && !ts.isStringLiteral(prop.name)) continue;
    switch (prop.name.text) {
      case "name":
        if (ts.isStringLiteral(prop.initializer)) component.name = prop.initializer.text;
        break;
      case "props":
        if (ts.isObjectLiteralExpression(prop.initializer)) {
          parseProps(prop.initializer, component, sourceFile);
        }
        break;
      case "slots":
        if (ts.isObjectLiteralExpression(prop.initializer)) {
          parseSlots(prop.initializer, component, sourceFile);
        }
        break;
      case "events":
        if (ts.isObjectLiteralExpression(prop.initializer)) {
          parseEvents(prop.initializer, component, sourceFile);
        }
        break;
    }
  }
}

function parseProps(
  obj: ts.ObjectLiteralExpression,
  component: IRComponent,
  sourceFile: ts.SourceFile,
): void {
  for (const member of obj.properties) {
    if (!ts.isPropertyAssignment(member)) continue;
    if (!ts.isIdentifier(member.name) && !ts.isStringLiteral(member.name)) continue;
    const decl: IRProp = {
      name: member.name.text,
      required: false,
      loc: locOf(member, sourceFile),
    };
    if (ts.isObjectLiteralExpression(member.initializer)) {
      for (const sub of member.initializer.properties) {
        if (!ts.isPropertyAssignment(sub)) continue;
        if (!ts.isIdentifier(sub.name)) continue;
        if (sub.name.text === "required" && sub.initializer.kind === ts.SyntaxKind.TrueKeyword) {
          decl.required = true;
        }
      }
    }
    component.props.push(decl);
  }
}

function parseSlots(
  obj: ts.ObjectLiteralExpression,
  component: IRComponent,
  sourceFile: ts.SourceFile,
): void {
  for (const member of obj.properties) {
    if (!ts.isPropertyAssignment(member)) continue;
    if (!ts.isIdentifier(member.name) && !ts.isStringLiteral(member.name)) continue;
    const slot: IRSlotDeclaration = {
      name: member.name.text,
      isScoped: false,
      scopedProps: [],
      required: false,
      loc: locOf(member, sourceFile),
    };
    if (ts.isObjectLiteralExpression(member.initializer)) {
      for (const sub of member.initializer.properties) {
        if (!ts.isPropertyAssignment(sub)) continue;
        if (!ts.isIdentifier(sub.name)) continue;
        if (sub.name.text === "scoped") slot.isScoped = true;
        if (sub.name.text === "required" && sub.initializer.kind === ts.SyntaxKind.TrueKeyword) {
          slot.required = true;
        }
      }
    }
    component.slots.push(slot);
  }
}

function parseEvents(
  obj: ts.ObjectLiteralExpression,
  component: IRComponent,
  sourceFile: ts.SourceFile,
): void {
  for (const member of obj.properties) {
    if (!ts.isPropertyAssignment(member)) continue;
    if (!ts.isIdentifier(member.name) && !ts.isStringLiteral(member.name)) continue;
    const decl: IREventDeclaration = {
      name: member.name.text,
      loc: locOf(member, sourceFile),
    };
    component.events.push(decl);
  }
}
