<script setup lang="ts">
import { FRAMEWORKS } from "@uxfront/ui";
import { corridor, ink, prism, stack, tokens } from "@uxfront/scene/formations";

import { DOCS_URL, GITHUB_URL } from "~/data/site";

useUxHead({
  title: "UI components for seven frameworks - Inkline",
  description:
    "Inkline is a UI component library with a native package for React, Vue, Svelte, Solid, Angular, Qwik and Astro, styled with Styleframe and accessible by default.",
  siteName: "Inkline",
  sameAs: [GITHUB_URL],
});

// The hero pours ink, then each chapter has a formation of its own: the prism's
// seven rails are the seven framework packages, the token matrix is the
// Styleframe theme, and the stack deals the same form onto seven cards.
const scene = [
  ink({ label: "Inkline" }),
  prism({ label: "Seven frameworks" }),
  tokens({ label: "Styled with Styleframe", views: { desktop: { shift: [-0.42, 0.02] } } }),
  stack({ label: "Accessible by default" }),
  corridor({ label: "Build with it" }),
];

const nav = [
  { href: "#frameworks", label: "Frameworks", index: "01" },
  { href: "#styling", label: "Styling", index: "02" },
  { href: "#accessibility", label: "Accessibility", index: "03" },
];

// In the order of the prism's rails, top to bottom, so chip `i` shares rail
// `i`'s colour.
const packages = FRAMEWORKS.map((framework, i) => ({
  framework,
  label: `@inkline/${framework.toLowerCase()}`,
  tone: `var(--ux-spectrum-${i})`,
}));

const styling = [
  {
    title: "One config",
    text: "Give the design tokens preset your brand colour, and it builds the whole scale from 50 to 950.",
  },
  {
    title: "Every framework",
    text: "A React app and a Vue admin panel can share one styleframe.config.ts and look the same.",
  },
  {
    title: "Your own rules",
    text: "Add a selector to the same config, and it lands in the same stylesheet as the components.",
  },
  {
    title: "Headless parts",
    text: "Every styled component has an unstyled counterpart, for a design that shares nothing with ours.",
  },
];

const accessibility = [
  {
    title: "Native elements",
    text: "The Button renders a native button element, so focus, Enter and Space come with it.",
  },
  {
    title: "Roles and states",
    text: "The Switch has the switch role and aria-checked, and a loading Button sets aria-busy.",
  },
  {
    title: "One pattern each",
    text: "Each interactive component follows the WAI-ARIA pattern for its widget and its keyboard map.",
  },
  {
    title: "Same in every framework",
    text: "All seven packages are built from one source, so the markup and its ARIA match across them.",
  },
];
</script>

<template>
  <UxSite :scene="scene" skip-to="#frameworks" skip-label="Skip to the frameworks">
    <template #anchors>
      <UxAnchor
        v-for="(item, i) in packages"
        :key="`prism-${item.label}`"
        :anchor="`prism:${i}`"
        :label="item.label"
      />
      <UxAnchor
        v-for="(framework, i) in FRAMEWORKS"
        :key="`stack-${framework}`"
        :anchor="`stack:${i}`"
        :label="framework"
      />
    </template>
    <template #header>
      <UxHeader brand="Inkline" :nav="nav" nav-label="Inkline">
        <template #mark />
        <template #brand><strong>Ink</strong>line</template>
        <template #byline>
          by
          <a href="https://uxfront.com">
            <UxFrontMark />
            <span><strong>UX</strong>Front</span>
          </a>
        </template>
        <template #actions>
          <NuxtLink class="header-link header-page" :to="DOCS_URL">Documentation</NuxtLink>
          <a class="header-link" :href="GITHUB_URL" aria-label="GitHub">
            <UxGithubIcon class="header-icon" />
            <span class="header-label">GitHub</span>
          </a>
        </template>
      </UxHeader>
    </template>

    <UxHero
      title="One UI library for seven frameworks"
      :index="nav"
      index-label="Inkline"
      scroll-href="#frameworks"
    >
      <template #lines>
        <UxHeroLine>One UI library</UxHeroLine>
        <UxHeroLine>for <strong>seven</strong></UxHeroLine>
        <UxHeroLine>frameworks</UxHeroLine>
      </template>
      <template #lead>
        Accessible components with one API in React, Vue, Svelte, Solid, Angular, Qwik and Astro,
        each a native package for its framework, all themed from one Styleframe config.
        <br />
        <UxPillLink class="mt-8" :href="DOCS_URL" label="Read the documentation" />
      </template>
    </UxHero>

    <UxChapter
      id="frameworks"
      index="01"
      role="Frameworks"
      title="Seven native packages"
      :steps="7"
    >
      <template #lead>
        Install the package for the framework you already use. <code>@inkline/react</code> is React
        components and <code>@inkline/vue</code> is Vue components, with no wrapper layer and no
        shared runtime.
      </template>
      <UxChips :items="packages" />
    </UxChapter>

    <UxChapter
      id="styling"
      index="02"
      role="Styling"
      title="Styled with Styleframe"
      :steps="4"
      align="end"
    >
      <template #lead>
        Components carry no brand of their own. Their look comes from Styleframe's design tokens, so
        you theme every component, in every framework, from one config file.
      </template>
      <UxTraits :items="styling" />
    </UxChapter>

    <UxChapter
      id="accessibility"
      index="03"
      role="Accessibility"
      title="Accessible by default"
      :steps="4"
      valign="end"
    >
      <template #lead>
        Each component starts from a native element or the WAI-ARIA pattern for its widget, so it
        works with a keyboard and a screen reader as well as a pointer.
      </template>
      <UxTraits :items="accessibility" />
    </UxChapter>

    <UxFinale>
      <template #mark><UxFrontMark /></template>
      <template #title>Build with <strong>Inkline</strong>.</template>
      <template #lead>
        Pick your framework, install its package and render your first component.
      </template>
      <template #actions>
        <UxPillLink :href="DOCS_URL" label="Read the documentation" />
      </template>
      <template #footer>
        <span>© 2026 Inkline</span>
        <a :href="GITHUB_URL">GitHub</a>
      </template>
    </UxFinale>
  </UxSite>
</template>

<style scoped>
/* The first frame only has the components' inline styles (Tailwind loads after
   it), so the header links are styled here rather than with utilities. */
.header-link {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
}

.header-icon {
  width: 1.125rem;
  height: 1.125rem;
}

/* Phones can't fit the byline beside the links. The hero links to the docs just
   below, and the GitHub link's aria-label still names it without the label. */
@media (max-width: 639px) {
  .header-page,
  .header-label {
    display: none;
  }

  .header-link {
    min-width: 2.75rem;
    justify-content: flex-end;
  }
}
</style>
