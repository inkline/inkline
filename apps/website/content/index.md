---
title: One component library, native in seven frameworks
description: Inkline ships the same UI components as native React, Vue 3, Svelte 5, Solid, Angular, Qwik and Astro packages — identical API, idiomatic output, headless underneath.
---

<!--
Hero ------------------------------------------------------------------------------------------------------
-->

::gradient-page-hero
---
orientation: horizontal
---

::browser-frame
---
title: App.tsx
---

```tsx
import { IButton } from "@inkline/react";
import "@inkline/react/css";

export function SaveChanges() {
  return (
    <IButton color="primary" variant="solid" size="lg">
      Save changes
    </IButton>
  );
}
```

::

#title
[One component library. Native in [seven frameworks]{.text-primary}]{.text-balance}

#description
Inkline ships the same components as real React, Vue 3, Svelte 5, Solid, Angular, Qwik and Astro packages — not web components in a wrapper. Install the one for your framework and get idiomatic components with an identical API everywhere.

#links
    :::u-button
    ---
    color: primary
    size: xl
    to: /docs/getting-started/installation
    trailing-icon: i-lucide-arrow-right
    ---
    Get started
    :::

    :::u-button
    ---
    color: neutral
    icon: i-lucide-github
    size: xl
    target: _blank
    to: https://github.com/inkline/inkline
    variant: outline
    ---
    View on GitHub
    :::
::

<!--
Section A — Consistency across frameworks ------------------------------------------------------------------
-->

::u-page-section{class="border-t border-b border-default"}
#title
The same components, wherever you build

#description
One source of truth, compiled to native packages — so the API can't drift between your apps.

#features
    :::u-page-feature
    ---
    icon: i-lucide-git-compare-arrows
    ---
    #title
    [Identical API]{.text-primary} everywhere

    #description
    Props, events and slots come from a single definition, so the React button and the Vue button can't drift apart. Move between your team's apps without relearning the library.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-layers
    ---
    #title
    [Headless]{.text-primary} underneath, styled on top

    #description
    Every component ships an unstyled base with the accessibility wiring already done, and a styled layer over it. Take our styles, or import the headless base and bring your own.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-package-check
    ---
    #title
    Real packages, [idiomatic output]{.text-primary}

    #description
    `@inkline/vue` is `.vue` SFCs. `@inkline/svelte` is runes. No custom elements, no wrapper layer, no framework adapter to debug at 2 a.m.
    :::
::

<!--
Section B — One package per framework ----------------------------------------------------------------------
-->

::u-page-section
#title
One package per framework

#description
Install the one your app already uses — same components inside, published as native source for each target.

#features
    :::u-page-feature
    ---
    icon: i-mdi-react
    ---
    #title
    React

    #description
    `@inkline/react`
    :::

    :::u-page-feature
    ---
    icon: i-mdi-vuejs
    ---
    #title
    Vue 3

    #description
    `@inkline/vue`
    :::

    :::u-page-feature
    ---
    icon: i-simple-icons-svelte
    ---
    #title
    Svelte 5

    #description
    `@inkline/svelte`
    :::

    :::u-page-feature
    ---
    icon: i-mdi-atom
    ---
    #title
    Solid

    #description
    `@inkline/solid`
    :::

    :::u-page-feature
    ---
    icon: i-mdi-angular
    ---
    #title
    Angular

    #description
    `@inkline/angular`
    :::

    :::u-page-feature
    ---
    icon: i-mdi-lightning-bolt
    ---
    #title
    Qwik

    #description
    `@inkline/qwik`
    :::

    :::u-page-feature
    ---
    icon: i-mdi-rocket-launch
    ---
    #title
    Astro

    #description
    `@inkline/astro`
    :::

#links
    :::u-button
    ---
    color: neutral
    icon: i-lucide-book-open
    to: /docs/components/button
    variant: outline
    ---
    Browse the components
    :::
::
