<script setup lang="ts">
import { storybookEmbedUrl } from "../../constants/storybook";

/**
 * Local (app-owned) content component: embeds a single deployed Storybook story
 * for one framework, used inside the package's `FrameworkSwitcher` to render a
 * live per-framework preview per tab (ADR-002 option (b)). This is exactly the
 * "inkline-specific demo component" the shared/per-app boundary reserves for the
 * consumer — the package stays framework- and brand-agnostic.
 */
interface Props {
  /** Framework key — matches a `docsTheme.frameworks` value and its Storybook subdomain. */
  framework: string;
  /** Storybook story id, e.g. `components-actions-button--default`. */
  story: string;
  /** Optional visible frame title. */
  title?: string;
  /** Iframe height in pixels. */
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  height: 320,
});

// Allow a build-time override of the Storybook host template via
// NUXT_PUBLIC_STORYBOOK_BASE_URL without touching content or this component.
const config = useRuntimeConfig();
const template = (config.public.storybookBaseUrl as string) || undefined;

const src = computed(() => storybookEmbedUrl(props.framework, props.story, template));
</script>

<template>
  <BrowserFrame :title="title">
    <iframe
      :src="src"
      :title="`${framework} Storybook preview`"
      loading="lazy"
      class="w-full rounded"
      :style="{ height: `${height}px`, border: '0' }"
    />
  </BrowserFrame>
</template>
