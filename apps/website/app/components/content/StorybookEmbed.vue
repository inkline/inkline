<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import { BrowserFrame } from "#components";
import {
  buildStorybookEmbedUrl,
  DOCS_EMBED_THEME_MESSAGE,
  readDocsEmbedHeight,
  STORYBOOK_EMBED_DEFAULT_HEIGHTS,
  storybookEmbedCssHeight,
  type StorybookEmbedMode,
} from "~/lib/storybookEmbed";

/**
 * Embeds a single story from Inkline's deployed Storybook, ported from
 * `@uxfront/layer-docs` 0.4.1. The host comes from
 * `runtimeConfig.public.storybookBaseUrl` in nuxt.config.ts, or
 * `NUXT_PUBLIC_STORYBOOK_BASE_URL` at build time.
 *
 * ```md
 * :storybook-embed{story="components-actions-button--default"}
 * :storybook-embed{story="components-forms-input--default" mode="panel"}
 * ```
 *
 * Three behaviours are always on, and all three degrade rather than fail:
 *
 * - **Lazy mount.** The iframe is not created until the embed comes near the
 *   viewport, so a page with twenty embeds loads one Storybook, not twenty.
 * - **Theme sync.** The page's colour mode is posted to the story on load and
 *   on every change, so an embed never sits light inside a dark page.
 * - **Auto-height.** The story reports what it needs and the frame follows.
 *
 * Theme and height both need the Storybook to answer the messages in
 * app/lib/storybookEmbed.ts. Without that the frame keeps `height` (or the
 * mode's default) and the story renders in its own theme.
 */
interface Props {
  /** Storybook story id, e.g. `components-actions-button--default`. */
  story: string;
  /**
   * Framework substituted into the base URL's `{framework}` placeholder.
   * Defaults to the reader's selected framework, so an embed inside a
   * `::framework-switcher` slot needs it and a standalone one does not.
   */
  framework?: string;
  /** Storybook surface to embed. */
  mode?: StorybookEmbedMode;
  /**
   * Fixed height. Set this and auto-height is off: the story's own report is
   * ignored, which is what you want for a story whose height oscillates.
   */
  height?: number | string;
  /** Caption for the browser frame. Omit to render the story unframed. */
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  framework: undefined,
  mode: "preview",
  height: undefined,
  title: undefined,
});

const config = useRuntimeConfig();
const storybookBaseUrl = computed(() => (config.public.storybookBaseUrl as string) ?? "");

const { framework: selectedFramework } = useFramework();
const framework = computed(() => props.framework ?? selectedFramework.value);

const colorMode = useColorMode();
const containerRef = useTemplateRef<HTMLElement>("container");
const iframeRef = useTemplateRef<HTMLIFrameElement>("iframe");

// Mount the iframe just before it is scrolled to, then stop observing: the
// answer cannot change back.
const visible = ref(false);
const { stop } = useIntersectionObserver(
  containerRef,
  ([entry]) => {
    if (!entry?.isIntersecting) return;
    visible.value = true;
    stop();
  },
  { rootMargin: "200px" },
);

const src = computed(() =>
  buildStorybookEmbedUrl({
    template: storybookBaseUrl.value,
    story: props.story,
    framework: framework.value,
    mode: props.mode,
  }),
);

const reportedHeight = ref<number | null>(null);
const cssHeight = computed(() =>
  storybookEmbedCssHeight(
    props.height ?? reportedHeight.value ?? STORYBOOK_EMBED_DEFAULT_HEIGHTS[props.mode],
  ),
);

// An iframe is an unlabelled frame to a screen reader. The caption names it
// when there is one; otherwise say what it holds rather than leaving it silent.
const frameTitle = computed(
  () => props.title ?? `Storybook preview: ${props.story.replace(/-+/g, " ")}`,
);

const wrapper = computed(() => (props.title ? BrowserFrame : "div"));
const wrapperProps = computed(() => (props.title ? { title: props.title } : {}));

function sendTheme() {
  const target = iframeRef.value?.contentWindow;
  if (!target) return;

  const theme = colorMode.value === "dark" ? "dark" : "light";
  target.postMessage({ type: DOCS_EMBED_THEME_MESSAGE, theme }, "*");
}

function onMessage(event: MessageEvent) {
  // Scope by source, not by origin: the Storybook host differs per framework,
  // but only one window can be this iframe.
  if (event.source !== iframeRef.value?.contentWindow) return;

  const height = readDocsEmbedHeight(event.data);
  if (height !== null) reportedHeight.value = height;
}

onMounted(() => window.addEventListener("message", onMessage));
onUnmounted(() => window.removeEventListener("message", onMessage));

watch(() => colorMode.value, sendTheme);
</script>

<template>
  <component :is="wrapper" v-bind="wrapperProps">
    <div
      ref="container"
      class="storybook-embed border border-default rounded overflow-hidden min-h-25 resize-y transition-[height] duration-150 ease-out motion-reduce:transition-none"
      :style="{ height: cssHeight }"
    >
      <iframe
        v-if="visible"
        ref="iframe"
        :src="src"
        :title="frameTitle"
        class="block w-full h-full border-0"
        @load="sendTheme"
      />
    </div>
  </component>
</template>
