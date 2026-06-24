---
name: research-component
description: Phase 1 of building an Inkline component — design the API. Survey the WAI-ARIA pattern and prior art, then write a complete component spec (props, slots, events, variants, accessibility, styling plan) to .context/ for sign-off before any code. Use when starting a new component or redesigning an existing one's API.
triggers:
  - research a component
  - spec a component
  - design a component api
  - plan a new component
allowed-tools:
  - Read
  - Grep
  - Glob
  - WebSearch
  - WebFetch
  - Write
  - AskUserQuestion
---

# Component research — design the API before any code

The goal of this phase is a **spec good enough that implementation is mechanical**. A great component is decided here: the right anatomy, the best prop names, the exact accessibility contract. Produce a written spec, get it signed off, then hand it to `implement-component`.

## Read first

1. `.claude/skills/create-component/reference/conventions.md` — naming philosophy, the prop/variant vocabulary, the a11y baseline. **The prop-naming rules there are the bar.**
2. The nearest exemplar to what you're building (badge = simplest, button = stateful, input = multi-part family) under `ui/components/src/components/`.

## Steps

1. **Pin the accessibility pattern.** Identify the WAI-ARIA Authoring Practices (APG) pattern for this widget (button, dialog, combobox, tabs, switch, tooltip, …). If unsure or it's non-trivial, `WebSearch` / `WebFetch` the APG page and extract: the required role(s), the states/properties, and the **full keyboard map**. Prefer a native element (`<button>`, `<input>`, `<dialog>`, `<a href>`) — note which native element gives you the pattern for free.

2. **Survey prior art for the API surface.** Look at how mature libraries name things for this component — Radix UI, Ark UI, Headless UI / Reka, MUI — and the Inkline **v0** implementation in `.old/` (read-only reference; grep it for the component name). Capture the prop/variant names worth adopting and explicitly note what you reject and why. Goal: idiomatic, unsurprising names a senior engineer wouldn't second-guess.

3. **Decide the anatomy.** One part or a family? List the headless parts and the single styled composition that ties them together (Input is the model: shell + control + prefix + suffix → one `IInput`). Each structural part = one `I<Name>*Base`.

4. **Design the props.** Apply the naming philosophy from `conventions.md` literally:
   - positive boolean state adjectives, no `is`/`has` prefix;
   - the `color` / `variant` / `size` trio only with the values the recipe supports;
   - native attribute names mirrored exactly;
   - a `label` + default-slot fallback for simple content, named slots for structured content;
   - two-way state as a `defineModel`, semantic unprefixed events.
     The zero-config case should be the common case. Give every prop a one-line rationale.

5. **Check the styling source.** `@styleframe/theme` ships a broad recipe catalog (Accordion, Alert, Avatar, Badge, Breadcrumb, Calendar, Callout, Card, …), so for most components a recipe **already exists** and you reuse it. Confirm whether `use<Name>Recipe` is exported:

   ```bash
   grep -rhoE "use[A-Z][A-Za-z]+Recipe\b" node_modules/.pnpm/@styleframe+theme@*/node_modules/@styleframe/theme/ | sort -u | grep -i "<name>"
   ```

   Record the answer — it decides the implement phase's styling branch: **reuse** `use<Name>Recipe(s)` if it exists (the common case), else **author styles locally** in `.styleframe.ts`. If the grep is inconclusive, default to "author locally" (safe) and note it for sign-off.

6. **Write the spec** to `.context/component-<name>-spec.md` using the template below. Fill every section. Where a decision is genuinely open, list it under "Open questions" rather than guessing.

7. **Gate.** Present the spec's headline decisions (anatomy, prop table, a11y contract, styling branch) and ask for sign-off. Use `AskUserQuestion` only for genuine forks; otherwise state assumptions and proceed. Do not start implementing from this skill.

## Spec template

```markdown
# Component spec: I<Name>

## Purpose

<one paragraph: what it is, when a consumer reaches for it>

## Prior art

- APG pattern: <name + key requirements>
- Libraries reviewed: <takeaways adopted / rejected, with reasons>

## Anatomy

<headless parts + the single styled composition; ASCII tree>

## Props

| Prop | Type | Default | Required | Rationale |
| ---- | ---- | ------- | -------- | --------- |

<every prop, including the color/variant/size trio if styled>

## Slots

| Slot | Purpose | Gated by hasSlot? |

## Events & models

- models: defineModel("<name>") → …
- emits: <event>: [payload] — when it fires

## Variants

- color / variant / size: <only the supported value sets>
- state: disabled / loading / invalid / … as applicable

## Accessibility contract

- Native element / role:
- APG states & properties:
- Keyboard map: <key → action>
- Focus management:
- Accessible name / labelling:

## Styling plan

- @styleframe/theme exports use<Name>Recipe? <yes/no — checked via grep>
- Plan: <reuse theme recipe | author locally: selectors/recipe axes + :empty rules for gated addons>

## Open questions

<anything needing the user's call>
```

## Exit criteria

`.context/component-<name>-spec.md` exists, every section filled, styling branch decided, and the user has signed off on the API. The spec is the contract the next four phases build against.
